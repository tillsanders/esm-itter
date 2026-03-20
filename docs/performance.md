# Performance

ESMitter is designed to be a high-performance event emitter, with a modern codebase and tooling. It
achieves great performance overall, with some scenarios being significantly faster than other
libraries.

The EventEmitter3 library comes with benchmarks that compare its performance with some
available alternatives. The results can be found here:
<https://github.com/tillsanders/esm-itter/blob/main/benchmarks/RESULTS_v1_1.md>

## Performance improvements in ESMitter 1.1.0

Prior to version 1.1.0, ESMitter was fast, but clearly less performant than EventEmitter3. With the
release of version 1.1.0, ESMitter has been optimized to be significantly faster than v1.0.x,
achieving performance that is consistently well above average and mostly on par with EventEmitter3
or better in certain scenarios.

| Scenario                | ops/s (current) | vs. ESMitter v1.0.x | vs. average | vs. fastest | vs. EventEmitter3 |
| :---------------------- | --------------: | ------------------: | ----------: | ----------: | ----------------: |
| context                 |          29.98M |             +188.8% |      +51.9% |       +0.0% |             +1.6% |
| remove-emit             |          18.52M |             +146.0% |      +15.3% |      -25.5% |            +46.5% |
| init                    |          89.96M |               +0.6% |      +27.8% |       -9.8% |             +1.1% |
| emit-multiple-listeners |           9.65M |              +64.9% |      +39.1% |      -10.5% |            -10.5% |
| hundreds                |         918.35K |              +41.1% |      +10.6% |      -15.9% |             -0.2% |
| once                    |          62.91M |             +705.7% |     +130.1% |       +0.0% |            +23.1% |
| listeners               |          24.65M |              +66.9% |       +6.5% |      -10.5% |             -2.2% |
| emit                    |          29.19M |             +183.1% |      +41.0% |       -2.5% |             -2.5% |
| add-remove              |          75.44M |             +651.2% |      +50.2% |      -29.6% |            -10.8% |
