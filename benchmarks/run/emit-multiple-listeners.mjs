"use strict";

import Benchmark from "benchmark";

import EventEmitter2 from "eventemitter2";
import EventEmitter1 from "events";
import EventEmitter3 from "eventemitter3";
import CE from "contra/emitter.js";
import EE from "event-emitter";
import FE from "fastemitter";

function foo() {
  if (arguments.length > 100) console.log("damn");

  return 1;
}

function bar() {
  if (arguments.length > 100) console.log("damn");

  return false;
}

function baz() {
  if (arguments.length > 100) console.log("damn");

  return true;
}

var ee1 = new EventEmitter1.EventEmitter(),
  ee2 = new EventEmitter2.EventEmitter2(),
  ee3 = new EventEmitter3(),
  fe = new FE(),
  ce = CE(),
  ee = EE();

import("../../dist/index.js").then((ESMitter) => {
  const master = new ESMitter.ESMitter();

  ce.on("foo", foo).on("foo", bar).on("foo", baz);
  ee.on("foo", foo).on("foo", bar).on("foo", baz);
  fe.on("foo", foo).on("foo", bar).on("foo", baz);
  ee3.on("foo", foo).on("foo", bar).on("foo", baz);
  ee2.on("foo", foo).on("foo", bar).on("foo", baz);
  ee1.on("foo", foo).on("foo", bar).on("foo", baz);
  master.on("foo", foo).on("foo", bar).on("foo", baz);

  //
  // Drip is omitted as it throws an error.
  // Ref: https://github.com/qualiancy/drip/pull/4
  //

  new Benchmark.Suite()
    .add("EventEmitter1", function () {
      ee1.emit("foo");
      ee1.emit("foo", "bar");
      ee1.emit("foo", "bar", "baz");
      ee1.emit("foo", "bar", "baz", "boom");
    })
    .add("EventEmitter2", function () {
      ee2.emit("foo");
      ee2.emit("foo", "bar");
      ee2.emit("foo", "bar", "baz");
      ee2.emit("foo", "bar", "baz", "boom");
    })
    .add("EventEmitter3", function () {
      ee3.emit("foo");
      ee3.emit("foo", "bar");
      ee3.emit("foo", "bar", "baz");
      ee3.emit("foo", "bar", "baz", "boom");
    })
    .add("ESMitter", function () {
      master.emit("foo");
      master.emit("foo", "bar");
      master.emit("foo", "bar", "baz");
      master.emit("foo", "bar", "baz", "boom");
    })
    .add("fastemitter", function () {
      fe.emit("foo");
      fe.emit("foo", "bar");
      fe.emit("foo", "bar", "baz");
      fe.emit("foo", "bar", "baz", "boom");
    })
    .add("event-emitter", function () {
      ee.emit("foo");
      ee.emit("foo", "bar");
      ee.emit("foo", "bar", "baz");
      ee.emit("foo", "bar", "baz", "boom");
    })
    .add("contra/emitter", function () {
      ce.emit("foo");
      ce.emit("foo", "bar");
      ce.emit("foo", "bar", "baz");
      ce.emit("foo", "bar", "baz", "boom");
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
