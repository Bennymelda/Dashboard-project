import { describe, it, expect } from "vitest";

import {

createHistoryState,

pushState,

undo,

redo,

} from "./historyUtils";



describe("undo/redo logic", () => {

it("creates the initial history state", () => {

const history = createHistoryState("state1");



expect(history).toEqual({

past: [],

present: "state1",

future: [],

});

});



it("pushes a new state correctly", () => {

const history = createHistoryState("state1");

const updatedHistory = pushState(history, "state2");



expect(updatedHistory).toEqual({

past: ["state1"],

present: "state2",

future: [],

});

});



it("undoes correctly", () => {

let history = createHistoryState("state1");

history = pushState(history, "state2");

history = pushState(history, "state3");



const result = undo(history);



expect(result).toEqual({

past: ["state1"],

present: "state2",

future: ["state3"],

});

});



it("redoes correctly", () => {

let history = createHistoryState("state1");

history = pushState(history, "state2");

history = pushState(history, "state3");

history = undo(history);



const result = redo(history);



expect(result).toEqual({

past: ["state1", "state2"],

present: "state3",

future: [],

});

});



it("does nothing when undo has no past", () => {

const history = createHistoryState("state1");

const result = undo(history);



expect(result).toEqual(history);

});



it("does nothing when redo has no future", () => {

const history = createHistoryState("state1");

const result = redo(history);



expect(result).toEqual(history);

});

});