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

  //
  // This is used to prevent the functions below from being transformed into
  // noops.
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let emitter;

  new Benchmark.Suite()
    .add("EventEmitter1", function () {
      emitter = new EventEmitter1.EventEmitter();
    })
    .add("EventEmitter2", function () {
      emitter = new EventEmitter2.EventEmitter2();
    })
    .add("EventEmitter3", function () {
      emitter = new EventEmitter3();
    })
    .add("ESMitter", function () {
      emitter = new Master();
    })
    .add("Drip", function () {
      emitter = new Drip.EventEmitter();
    })
    .add("fastemitter", function () {
      emitter = new FE();
    })
    .add("event-emitter", function () {
      emitter = EE();
    })
    .add("contra/emitter", function () {
      emitter = CE();
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
