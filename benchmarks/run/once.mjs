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

  function handle() {
    if (arguments.length > 100) console.log("damn");
  }

  var ee1 = new EventEmitter1.EventEmitter(),
    ee2 = new EventEmitter2.EventEmitter2(),
    ee3 = new EventEmitter3(),
    master = new Master(),
    drip = new Drip.EventEmitter(),
    fe = new FE(),
    ce = CE(),
    ee = EE();

  new Benchmark.Suite()
    .add("EventEmitter1", function () {
      ee1.once("foo", handle).emit("foo");
    })
    .add("EventEmitter2", function () {
      ee2.once("foo", handle).emit("foo");
    })
    .add("EventEmitter3", function () {
      ee3.once("foo", handle).emit("foo");
    })
    .add("ESMitter", function () {
      master.once("foo", handle).emit("foo");
    })
    .add("Drip", function () {
      drip.once("foo", handle).emit("foo");
    })
    .add("fastemitter", function () {
      fe.once("foo", handle).emit("foo");
    })
    .add("event-emitter", function () {
      ee.once("foo", handle).emit("foo");
    })
    .add("contra/emitter", function () {
      ce.once("foo", handle).emit("foo");
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
