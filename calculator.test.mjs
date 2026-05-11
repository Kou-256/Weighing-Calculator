import assert from "node:assert/strict";
import { calculateRecipe, formulaMass, parseFormula } from "./calculator.js";

assert.deepEqual(parseFormula("Fe2(SO4)3"), { Fe: 2, S: 3, O: 12 });
assert.equal(Number(formulaMass("TiO2").toFixed(3)), 79.865);

const result = calculateRecipe({
  id: "test",
  name: "BaTiO3 La",
  batchMoles: 0.01,
  bases: [
    { element: "Ba", stoich: 1, precursorFormula: "BaO", purity: 100 },
    { element: "Ti", stoich: 1, precursorFormula: "TiO2", purity: 100 },
  ],
  additives: [
    {
      element: "La",
      mode: "substitution",
      targetElement: "Ba",
      concentration: 5,
      unit: "molPercent",
      precursorFormula: "La2O3",
      purity: 100,
    },
  ],
});

const byFormula = new Map(result.items.map((item) => [item.formula, item]));

assert.equal(Number(byFormula.get("BaO").cationMoles.toFixed(6)), 0.0095);
assert.equal(Number(byFormula.get("La2O3").cationMoles.toFixed(6)), 0.0005);
assert.equal(Number(byFormula.get("TiO2").cationMoles.toFixed(6)), 0.01);
assert.equal(Number(byFormula.get("BaO").grams.toFixed(5)), 1.4566);
assert.equal(Number(byFormula.get("La2O3").grams.toFixed(5)), 0.08145);
assert.equal(result.warnings.length, 0);

console.log("calculator tests passed");
