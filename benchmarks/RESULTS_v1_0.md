> benchmarks@0.0.0 benchmark
> find run -name '\*.mjs' -exec ./start.sh {} \;

Starting benchmark context.mjs

EventEmitter1 x 22,187,681 ops/sec ±2.60% (91 runs sampled)
EventEmitter2 x 18,303,900 ops/sec ±6.30% (93 runs sampled)
EventEmitter3 x 29,255,566 ops/sec ±0.99% (98 runs sampled)
ESMitter x 10,380,542 ops/sec ±0.34% (98 runs sampled)
Drip x 22,408,890 ops/sec ±0.67% (94 runs sampled)
fastemitter x 17,543,164 ops/sec ±0.46% (99 runs sampled)
event-emitter x 12,679,676 ops/sec ±0.37% (100 runs sampled)
contra/emitter x 3,043,401 ops/sec ±0.22% (97 runs sampled)
Fastest is EventEmitter3

Starting benchmark remove-emit.mjs

EventEmitter1 x 23,792,220 ops/sec ±0.59% (98 runs sampled)
EventEmitter2 x 14,974,048 ops/sec ±0.41% (99 runs sampled)
EventEmitter3 x 12,522,638 ops/sec ±0.34% (100 runs sampled)
ESMitter x 7,526,046 ops/sec ±0.27% (98 runs sampled)
Drip x 25,101,836 ops/sec ±0.67% (96 runs sampled)
event-emitter x 13,680,791 ops/sec ±0.37% (98 runs sampled)
contra/emitter x 3,111,640 ops/sec ±0.21% (98 runs sampled)
Fastest is Drip

Starting benchmark init.mjs

EventEmitter1 x 38,750,853 ops/sec ±0.99% (93 runs sampled)
EventEmitter2 x 79,216,879 ops/sec ±2.18% (90 runs sampled)
EventEmitter3 x 92,883,123 ops/sec ±3.03% (91 runs sampled)
ESMitter x 89,443,496 ops/sec ±1.86% (91 runs sampled)
Drip x 101,406,529 ops/sec ±1.92% (94 runs sampled)
fastemitter x 51,422,492 ops/sec ±1.51% (91 runs sampled)
event-emitter x 81,605,484 ops/sec ±2.28% (93 runs sampled)
contra/emitter x 36,021,373 ops/sec ±0.97% (92 runs sampled)
Fastest is Drip

Starting benchmark emit-multiple-listeners.mjs

EventEmitter1 x 6,264,507 ops/sec ±0.23% (94 runs sampled)
EventEmitter2 x 6,502,840 ops/sec ±0.23% (97 runs sampled)
EventEmitter3 x 11,334,200 ops/sec ±0.43% (99 runs sampled)
ESMitter x 5,853,106 ops/sec ±0.19% (98 runs sampled)
fastemitter x 8,950,147 ops/sec ±0.22% (101 runs sampled)
event-emitter x 4,799,985 ops/sec ±0.22% (100 runs sampled)
contra/emitter x 2,490,415 ops/sec ±0.15% (100 runs sampled)
Fastest is EventEmitter3

Starting benchmark hundreds.mjs

EventEmitter1 x 749,098 ops/sec ±0.15% (97 runs sampled)
EventEmitter2 x 624,574 ops/sec ±6.72% (84 runs sampled)
EventEmitter3 x 921,166 ops/sec ±0.16% (100 runs sampled)
ESMitter x 650,876 ops/sec ±0.15% (102 runs sampled)
Drip x 1,041,911 ops/sec ±0.11% (98 runs sampled)
fastemitter x 1,052,238 ops/sec ±0.12% (99 runs sampled)
event-emitter x 675,987 ops/sec ±0.11% (99 runs sampled)
contra/emitter x 480,808 ops/sec ±0.14% (101 runs sampled)
Fastest is fastemitter

Starting benchmark once.mjs

EventEmitter1 x 14,627,577 ops/sec ±0.52% (95 runs sampled)
EventEmitter2 x 10,075,198 ops/sec ±3.21% (93 runs sampled)
EventEmitter3 x 49,791,085 ops/sec ±3.06% (89 runs sampled)
ESMitter x 7,807,407 ops/sec ±0.39% (96 runs sampled)
Drip x 36,414,282 ops/sec ±1.00% (96 runs sampled)
fastemitter x 23,812,479 ops/sec ±0.76% (96 runs sampled)
event-emitter x 9,874,544 ops/sec ±0.29% (100 runs sampled)
contra/emitter x 9,214,023 ops/sec ±0.30% (100 runs sampled)
Fastest is EventEmitter3

Starting benchmark listeners.mjs

EventEmitter1 x 27,630,382 ops/sec ±0.87% (90 runs sampled)
EventEmitter3 x 25,217,462 ops/sec ±0.77% (97 runs sampled)
ESMitter x 14,773,862 ops/sec ±0.48% (94 runs sampled)
fastemitter x 14,844,388 ops/sec ±2.41% (93 runs sampled)
Fastest is EventEmitter1

Starting benchmark emit.mjs

EventEmitter1 x 23,723,570 ops/sec ±0.64% (92 runs sampled)
EventEmitter2 x 22,190,845 ops/sec ±0.75% (91 runs sampled)
EventEmitter3 x 29,323,337 ops/sec ±0.77% (98 runs sampled)
ESMitter x 10,313,009 ops/sec ±1.24% (96 runs sampled)
Drip x 25,096,581 ops/sec ±1.60% (93 runs sampled)
fastemitter x 19,554,521 ops/sec ±0.56% (97 runs sampled)
event-emitter x 13,714,903 ops/sec ±0.39% (100 runs sampled)
contra/emitter x 3,043,534 ops/sec ±2.41% (100 runs sampled)
Fastest is EventEmitter3

Starting benchmark add-remove.mjs

EventEmitter1 x 20,574,351 ops/sec ±0.67% (93 runs sampled)
EventEmitter2 x 14,690,207 ops/sec ±0.36% (97 runs sampled)
EventEmitter3 x 85,345,432 ops/sec ±1.87% (89 runs sampled)
ESMitter x 10,042,730 ops/sec ±5.83% (89 runs sampled)
Drip x 107,118,274 ops/sec ±1.52% (95 runs sampled)
fastemitter x 53,945,798 ops/sec ±1.44% (94 runs sampled)
event-emitter x 16,305,756 ops/sec ±0.47% (99 runs sampled)
contra/emitter x 30,327,708 ops/sec ±0.80% (96 runs sampled)
Fastest is Drip
