import assert from "node:assert";
import { usedOf, wouldExceed, sweptOf } from "../reserve.js";
import { step, close } from "../reserverun.js";
import { render } from "../app.js";

const base = {
  budget: 1, over: 5,
  state: { holds: [], refused: [], swept: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "hold", task: "a", need: 2, until: 10 }],
  bad_task_code: "E_BAD_TASK", bad_need_code: "E_BAD_NEED",
  bad_until_code: "E_BAD_UNTIL", dup_code: "E_DUP_HOLD",
  no_hold_code: "E_NO_HOLD", event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("usedOf returns a number", () => {
  assert.strictEqual(typeof usedOf([["a", 2, 9]]), "number");
});

check("wouldExceed returns a boolean", () => {
  assert.strictEqual(typeof wouldExceed([["a", 2, 9]], 1, 5), "boolean");
});

check("sweptOf returns a list", () => {
  assert.ok(Array.isArray(sweptOf([["a", 2, 9]], 9)));
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
