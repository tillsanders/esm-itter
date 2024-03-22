"use strict";

import Benchmark from "benchmark";

import EventEmitter1 from "events";
import EventEmitter3 from "eventemitter3";
import FE from "fastemitter";

import("../../dist/index.js").then((ESMitter) => {
  const Master = ESMitter.ESMitter;

  var MAX_LISTENERS = Math.pow(2, 32) - 1;

  function handle() {
    if (arguments.length > 100) console.log("damn");
  }

  var ee1 = new EventEmitter1.EventEmitter(),
    ee3 = new EventEmitter3(),
    master = new Master(),
    fe = new FE();

  ee1.setMaxListeners(MAX_LISTENERS);
  fe.setMaxListeners(MAX_LISTENERS);

  for (var i = 0; i < 25; i++) {
    ee1.on("event", handle);
    ee3.on("event", handle);
    master.on("event", handle);
    fe.on("event", handle);
  }

  //
  // eventemitter2 doesn't correctly handle listeners as they can be removed by
  // doing `ee2.listeners('event').length = 0;`. Same counts for Drip.
  //
  // event-emitter and contra/emitter do not implement `listeners`.
  //

  new Benchmark.Suite()
    .add("EventEmitter1", function () {
      ee1.listeners("event");
    })
    .add("EventEmitter3", function () {
      ee3.listeners("event");
    })
    .add("ESMitter", function () {
      master.listeners("event");
    })
    .add("fastemitter", function () {
      fe.listeners("event");
    })
    .on("cycle", function cycle(e) {
      console.log(e.target.toString());
    })
    .on("complete", function completed() {
      console.log("Fastest is %s", this.filter("fastest").map("name").join(' & '));
    })
    .run({ async: true });
});
