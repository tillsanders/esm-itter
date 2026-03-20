> benchmarks@0.0.0 benchmark
> find run -name '\*.mjs' -exec ./start.sh {} \;

Starting benchmark context.mjs

EventEmitter1 x 22,329,976 ops/sec ±0.54% (96 runs sampled)
EventEmitter2 x 20,187,870 ops/sec ±0.59% (95 runs sampled)
EventEmitter3 x 29,503,756 ops/sec ±0.94% (99 runs sampled)
ESMitter x 29,976,572 ops/sec ±0.72% (95 runs sampled)
Drip x 22,507,261 ops/sec ±0.51% (97 runs sampled)
fastemitter x 17,563,365 ops/sec ±0.61% (98 runs sampled)
event-emitter x 12,752,708 ops/sec ±0.30% (101 runs sampled)
contra/emitter x 3,050,997 ops/sec ±0.19% (99 runs sampled)
Fastest is ESMitter

Starting benchmark remove-emit.mjs

EventEmitter1 x 24,573,620 ops/sec ±0.54% (98 runs sampled)
EventEmitter2 x 14,985,814 ops/sec ±0.43% (97 runs sampled)
EventEmitter3 x 12,643,000 ops/sec ±0.31% (102 runs sampled)
ESMitter x 18,516,183 ops/sec ±0.41% (97 runs sampled)
Drip x 24,855,411 ops/sec ±1.56% (95 runs sampled)
event-emitter x 13,698,882 ops/sec ±0.39% (95 runs sampled)
contra/emitter x 3,108,023 ops/sec ±0.21% (98 runs sampled)
Fastest is Drip

Starting benchmark init.mjs

EventEmitter1 x 38,259,897 ops/sec ±1.14% (92 runs sampled)
EventEmitter2 x 78,950,481 ops/sec ±2.54% (88 runs sampled)
EventEmitter3 x 89,013,331 ops/sec ±3.22% (85 runs sampled)
ESMitter x 89,960,503 ops/sec ±2.58% (89 runs sampled)
Drip x 99,758,369 ops/sec ±2.64% (94 runs sampled)
fastemitter x 50,462,626 ops/sec ±1.78% (93 runs sampled)
event-emitter x 80,914,250 ops/sec ±2.23% (91 runs sampled)
contra/emitter x 35,906,078 ops/sec ±1.07% (97 runs sampled)
Fastest is Drip

Starting benchmark emit-multiple-listeners.mjs

EventEmitter1 x 6,270,631 ops/sec ±0.19% (95 runs sampled)
EventEmitter2 x 6,023,948 ops/sec ±5.62% (90 runs sampled)
EventEmitter3 x 10,789,957 ops/sec ±4.12% (96 runs sampled)
ESMitter x 9,654,030 ops/sec ±0.79% (97 runs sampled)
fastemitter x 8,654,980 ops/sec ±0.23% (99 runs sampled)
event-emitter x 4,701,809 ops/sec ±0.16% (102 runs sampled)
contra/emitter x 2,495,538 ops/sec ±0.12% (100 runs sampled)
Fastest is EventEmitter3

Starting benchmark hundreds.mjs

EventEmitter1 x 759,764 ops/sec ±0.23% (100 runs sampled)
EventEmitter2 x 707,435 ops/sec ±0.25% (92 runs sampled)
EventEmitter3 x 920,105 ops/sec ±0.12% (100 runs sampled)
ESMitter x 918,353 ops/sec ±0.09% (96 runs sampled)
Drip x 1,091,402 ops/sec ±0.11% (101 runs sampled)
fastemitter x 1,065,188 ops/sec ±0.12% (100 runs sampled)
event-emitter x 692,814 ops/sec ±0.09% (100 runs sampled)
contra/emitter x 488,640 ops/sec ±1.36% (99 runs sampled)
Fastest is Drip

Starting benchmark once.mjs

EventEmitter1 x 14,675,130 ops/sec ±0.59% (93 runs sampled)
EventEmitter2 x 10,668,475 ops/sec ±0.32% (96 runs sampled)
EventEmitter3 x 51,119,401 ops/sec ±1.58% (94 runs sampled)
ESMitter x 62,905,580 ops/sec ±1.55% (93 runs sampled)
Drip x 36,082,922 ops/sec ±0.80% (95 runs sampled)
fastemitter x 24,141,804 ops/sec ±0.71% (96 runs sampled)
event-emitter x 9,860,982 ops/sec ±0.30% (98 runs sampled)
contra/emitter x 9,230,703 ops/sec ±0.31% (97 runs sampled)
Fastest is ESMitter

Starting benchmark listeners.mjs

EventEmitter1 x 27,545,360 ops/sec ±0.96% (94 runs sampled)
EventEmitter3 x 25,212,157 ops/sec ±0.75% (96 runs sampled)
ESMitter x 24,652,149 ops/sec ±0.74% (94 runs sampled)
fastemitter x 15,180,089 ops/sec ±0.44% (96 runs sampled)
Fastest is EventEmitter1

Starting benchmark emit.mjs

EventEmitter1 x 24,311,530 ops/sec ±0.51% (96 runs sampled)
EventEmitter2 x 22,576,412 ops/sec ±0.80% (98 runs sampled)
EventEmitter3 x 29,937,596 ops/sec ±0.70% (97 runs sampled)
ESMitter x 29,192,692 ops/sec ±0.67% (95 runs sampled)
Drip x 25,303,038 ops/sec ±1.27% (99 runs sampled)
fastemitter x 17,433,366 ops/sec ±6.89% (87 runs sampled)
event-emitter x 13,757,731 ops/sec ±0.33% (95 runs sampled)
contra/emitter x 3,076,978 ops/sec ±0.24% (95 runs sampled)
Fastest is EventEmitter3

Starting benchmark add-remove.mjs

EventEmitter1 x 20,486,738 ops/sec ±0.64% (90 runs sampled)
EventEmitter2 x 14,639,556 ops/sec ±0.52% (97 runs sampled)
EventEmitter3 x 84,537,268 ops/sec ±2.61% (86 runs sampled)
ESMitter x 75,436,521 ops/sec ±2.51% (91 runs sampled)
Drip x 107,102,907 ops/sec ±1.51% (94 runs sampled)
fastemitter x 53,306,108 ops/sec ±2.02% (95 runs sampled)
event-emitter x 16,299,566 ops/sec ±0.61% (96 runs sampled)
contra/emitter x 29,926,314 ops/sec ±1.31% (94 runs sampled)
Fastest is Drip
