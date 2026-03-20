/**
 * Reads RESULTS_v1_0.md and RESULTS_v1_1.md from the benchmarks/ directory and
 * prints a Markdown comparison table to stdout.
 *
 * Usage:
 *   node --experimental-strip-types benchmarks/compare.ts
 *   node --experimental-strip-types benchmarks/compare.ts path/to/v1_0.md path/to/v1_1.md
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Maps library name → ops/sec for one scenario. */
type ScenarioResults = Map<string, number>;

/** Maps scenario name → per-library results. */
type BenchmarkData = Map<string, ScenarioResults>;

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

function parseResults(content: string): BenchmarkData {
  const data: BenchmarkData = new Map();
  let currentScenario: string | null = null;
  let currentResults: ScenarioResults = new Map();

  for (const raw of content.split("\n")) {
    const line = raw.trim();

    const scenarioMatch = line.match(/^Starting benchmark (.+?)(?:\.mjs)?$/);
    if (scenarioMatch) {
      currentScenario = scenarioMatch[1];
      currentResults = new Map();
      data.set(currentScenario, currentResults);
      continue;
    }

    const resultMatch = line.match(/^(.+?) x ([\d,]+) ops\/sec/);
    if (resultMatch && currentScenario) {
      const library = resultMatch[1].trim();
      const ops = parseInt(resultMatch[2].replace(/,/g, ""), 10);
      currentResults.set(library, ops);
    }
  }

  return data;
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatOps(ops: number): string {
  if (ops >= 1_000_000) return `${(ops / 1_000_000).toFixed(2)}M`;
  if (ops >= 1_000) return `${(ops / 1_000).toFixed(2)}K`;
  return String(ops);
}

/**
 * Returns a coloured +/- percentage string showing how much faster (+) or
 * slower (−) `current` is compared to `reference`.
 */
function formatDiff(current: number, reference: number): string {
  if (reference === 0) return "N/A";
  const pct = ((current - reference) / reference) * 100;
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}%`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const v1Path = resolve(args[0] ?? "benchmarks/RESULTS_v1_0.md");
const v2Path = resolve(args[1] ?? "benchmarks/RESULTS_v1_1.md");

const v1Data = parseResults(readFileSync(v1Path, "utf-8"));
const v2Data = parseResults(readFileSync(v2Path, "utf-8"));

const ESITTER = "ESMitter";
const EE3 = "EventEmitter3";

// Preserve the order in which scenarios appear in the v2 file.
const scenarios = [...v2Data.keys()];

const header =
  "| Scenario | ops/s (current) | vs. ESMitter v1.0.x | vs. average | vs. fastest | vs. EventEmitter3 |";
const separator =
  "| :-------- | ------: | ------: | ------: | ------: | ------: |";

const rows: string[] = [];

for (const scenario of scenarios) {
  const v2Results = v2Data.get(scenario)!;
  const v1Results = v1Data.get(scenario);

  const currentOps = v2Results.get(ESITTER);
  if (currentOps === undefined) continue;

  // vs. ESMitter v1.0.x
  const v1Ops = v1Results?.get(ESITTER);
  const vsV1 = v1Ops !== undefined ? formatDiff(currentOps, v1Ops) : "N/A";

  // vs. average of all solutions in this scenario (v2)
  const allOps = [...v2Results.values()];
  const avgOps = allOps.reduce((a, b) => a + b, 0) / allOps.length;
  const vsAvg = formatDiff(currentOps, avgOps);

  // vs. fastest solution in this scenario (v2)
  const fastestOps = Math.max(...allOps);
  const vsFastest = formatDiff(currentOps, fastestOps);

  // vs. EventEmitter3 (v2)
  const ee3Ops = v2Results.get(EE3);
  const vsEE3 = ee3Ops !== undefined ? formatDiff(currentOps, ee3Ops) : "N/A";

  rows.push(
    `| ${scenario} | ${formatOps(currentOps)} ops/s | ${vsV1} | ${vsAvg} | ${vsFastest} | ${vsEE3} |`,
  );
}

console.log(header);
console.log(separator);
for (const row of rows) {
  console.log(row);
}
