"use strict";

import Benchmark from "benchmark";

import EventEmitter2 from "eventemitter2";
import EventEmitter1 from "events";
import EventEmitter3 from "eventemitter3";
import Drip from "drip";
import CE from "contra/emitter.js";
import EE from "event-emitter";
import FE from "fastemitter";

import("../../dist/index.js").then((ESMitter) => {
  const Master = ESMitter.ESMitter;

  function foo() {
    if (arguments.length > 100) console.log("damn");

    return 1;
  }

  var ee1 = new EventEmitter1.EventEmitter(),
    ee2 = new EventEmitter2.EventEmitter2(),
    ee3 = new EventEmitter3(),
    master = new Master(),
    drip = new Drip.EventEmitter(),
    fe = new FE(),
    ce = CE(),
    ee = EE(),
    j,
    i;

  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      ce.on("event:" + i, foo);
      ee.on("event:" + i, foo);
      fe.on("event:" + i, foo);
      ee1.on("event:" + i, foo);
      ee2.on("event:" + i, foo);
      ee3.on("event:" + i, foo);
      drip.on("event:" + i, foo);
      master.on("event:" + i, foo);
    }
  }

  new Benchmark.Suite()
    .add("EventEmitter1", function () {
      for (i = 0; i < 10; i++) {
        ee1.emit("event:" + i);
      }
    })
    .add("EventEmitter2", function () {
      for (i = 0; i < 10; i++) {
        ee2.emit("event:" + i);
      }
    })
    .add("EventEmitter3", function () {
      for (i = 0; i < 10; i++) {
        ee3.emit("event:" + i);
      }
    })
    .add("ESMitter", function () {
      for (i = 0; i < 10; i++) {
        master.emit("event:" + i);
      }
    })
    .add("Drip", function () {
      for (i = 0; i < 10; i++) {
        drip.emit("event:" + i);
      }
    })
    .add("fastemitter", function () {
      for (i = 0; i < 10; i++) {
        fe.emit("event:" + i);
      }
    })
    .add("event-emitter", function () {
      for (i = 0; i < 10; i++) {
        ee.emit("event:" + i);
      }
    })
    .add("contra/emitter", function () {
      for (i = 0; i < 10; i++) {
        ce.emit("event:" + i);
      }
    })
    .on("cycle", function cycle(e) {
      console.log(e.target.toString());
    })
    .on("complete", function completed() {
      console.log(
        "Fastest is %s",
        this.filter("fastest").map("name").join(" & "),
      );
    })
    .run({ async: true });
});
