export const ATOMIC_WEIGHTS = {
  H: 1.008,
  Li: 6.94,
  Be: 9.0122,
  B: 10.81,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  F: 18.998,
  Na: 22.9898,
  Mg: 24.305,
  Al: 26.9815,
  Si: 28.085,
  P: 30.9738,
  S: 32.06,
  Cl: 35.45,
  K: 39.0983,
  Ca: 40.078,
  Sc: 44.9559,
  Ti: 47.867,
  V: 50.9415,
  Cr: 51.9961,
  Mn: 54.938,
  Fe: 55.845,
  Co: 58.9332,
  Ni: 58.6934,
  Cu: 63.546,
  Zn: 65.38,
  Ga: 69.723,
  Ge: 72.63,
  Rb: 85.4678,
  Sr: 87.62,
  Y: 88.9058,
  Zr: 91.224,
  Nb: 92.9064,
  Mo: 95.95,
  Ag: 107.8682,
  Cd: 112.414,
  In: 114.818,
  Sn: 118.71,
  Sb: 121.76,
  Te: 127.6,
  Cs: 132.9055,
  Ba: 137.327,
  La: 138.9055,
  Ce: 140.116,
  Pr: 140.9077,
  Nd: 144.242,
  Sm: 150.36,
  Eu: 151.964,
  Gd: 157.25,
  Tb: 158.9254,
  Dy: 162.5,
  Ho: 164.9303,
  Er: 167.259,
  Tm: 168.9342,
  Yb: 173.045,
  Lu: 174.9668,
  Hf: 178.49,
  Ta: 180.9479,
  W: 183.84,
  Pb: 207.2,
  Bi: 208.9804,
};

export const OXIDE_LIBRARY = [
  { element: "Li", formula: "Li2O", note: "吸湿性に注意" },
  { element: "B", formula: "B2O3", note: "ガラス化しやすい" },
  { element: "Na", formula: "Na2O", note: "炭酸塩換算が必要な場合あり" },
  { element: "Mg", formula: "MgO", note: "一般的" },
  { element: "Al", formula: "Al2O3", note: "一般的" },
  { element: "Si", formula: "SiO2", note: "一般的" },
  { element: "P", formula: "P2O5", note: "吸湿性に注意" },
  { element: "K", formula: "K2O", note: "炭酸塩換算が必要な場合あり" },
  { element: "Ca", formula: "CaO", note: "吸湿・炭酸化に注意" },
  { element: "Sc", formula: "Sc2O3", note: "一般的" },
  { element: "Ti", formula: "TiO2", note: "一般的" },
  { element: "V", formula: "V2O5", note: "酸化数に注意" },
  { element: "Cr", formula: "Cr2O3", note: "一般的" },
  { element: "Mn", formula: "MnO2", note: "酸化数に注意" },
  { element: "Mn", formula: "Mn2O3", note: "酸化数に注意" },
  { element: "Fe", formula: "Fe2O3", note: "一般的" },
  { element: "Fe", formula: "Fe3O4", note: "酸化数に注意" },
  { element: "Co", formula: "Co3O4", note: "一般的" },
  { element: "Co", formula: "CoO", note: "酸化数に注意" },
  { element: "Ni", formula: "NiO", note: "一般的" },
  { element: "Cu", formula: "CuO", note: "一般的" },
  { element: "Zn", formula: "ZnO", note: "一般的" },
  { element: "Ga", formula: "Ga2O3", note: "一般的" },
  { element: "Ge", formula: "GeO2", note: "一般的" },
  { element: "Rb", formula: "Rb2O", note: "炭酸塩換算が必要な場合あり" },
  { element: "Sr", formula: "SrO", note: "炭酸化に注意" },
  { element: "Y", formula: "Y2O3", note: "一般的" },
  { element: "Zr", formula: "ZrO2", note: "一般的" },
  { element: "Nb", formula: "Nb2O5", note: "一般的" },
  { element: "Mo", formula: "MoO3", note: "昇華に注意" },
  { element: "Ag", formula: "Ag2O", note: "光・熱に注意" },
  { element: "Cd", formula: "CdO", note: "安全管理必須" },
  { element: "In", formula: "In2O3", note: "一般的" },
  { element: "Sn", formula: "SnO2", note: "一般的" },
  { element: "Sb", formula: "Sb2O3", note: "安全管理必須" },
  { element: "Te", formula: "TeO2", note: "一般的" },
  { element: "Cs", formula: "Cs2O", note: "炭酸塩換算が必要な場合あり" },
  { element: "Ba", formula: "BaO", note: "炭酸化に注意" },
  { element: "La", formula: "La2O3", note: "吸湿・炭酸化に注意" },
  { element: "Ce", formula: "CeO2", note: "一般的" },
  { element: "Pr", formula: "Pr6O11", note: "混合原子価" },
  { element: "Nd", formula: "Nd2O3", note: "一般的" },
  { element: "Sm", formula: "Sm2O3", note: "一般的" },
  { element: "Eu", formula: "Eu2O3", note: "一般的" },
  { element: "Gd", formula: "Gd2O3", note: "一般的" },
  { element: "Tb", formula: "Tb4O7", note: "混合原子価" },
  { element: "Dy", formula: "Dy2O3", note: "一般的" },
  { element: "Ho", formula: "Ho2O3", note: "一般的" },
  { element: "Er", formula: "Er2O3", note: "一般的" },
  { element: "Tm", formula: "Tm2O3", note: "一般的" },
  { element: "Yb", formula: "Yb2O3", note: "一般的" },
  { element: "Lu", formula: "Lu2O3", note: "一般的" },
  { element: "Hf", formula: "HfO2", note: "一般的" },
  { element: "Ta", formula: "Ta2O5", note: "一般的" },
  { element: "W", formula: "WO3", note: "一般的" },
  { element: "Pb", formula: "PbO", note: "安全管理必須" },
  { element: "Bi", formula: "Bi2O3", note: "一般的" },
];

export const ELEMENT_OPTIONS = Array.from(
  new Set([...Object.keys(ATOMIC_WEIGHTS), ...OXIDE_LIBRARY.map((oxide) => oxide.element)])
).sort((a, b) => a.localeCompare(b));

export function getDefaultOxide(element) {
  return OXIDE_LIBRARY.find((oxide) => oxide.element === element)?.formula ?? "";
}

export function getOxideOptions(element) {
  return OXIDE_LIBRARY.filter((oxide) => oxide.element === element);
}

export function parseFormula(formula) {
  const input = String(formula ?? "").replace(/\s+/g, "");
  if (!input) {
    throw new Error("化学式が空です");
  }

  let cursor = 0;

  function readNumber() {
    let raw = "";
    while (cursor < input.length && /[0-9.]/.test(input[cursor])) {
      raw += input[cursor];
      cursor += 1;
    }
    if (!raw) return 1;
    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(`係数 "${raw}" を読めません`);
    }
    return value;
  }

  function merge(target, source, multiplier = 1) {
    for (const [element, count] of Object.entries(source)) {
      target[element] = (target[element] ?? 0) + count * multiplier;
    }
    return target;
  }

  function parseGroup(stopAtParen = false) {
    const counts = {};
    while (cursor < input.length) {
      const char = input[cursor];

      if (char === "(") {
        cursor += 1;
        const nested = parseGroup(true);
        const multiplier = readNumber();
        merge(counts, nested, multiplier);
        continue;
      }

      if (char === ")") {
        if (!stopAtParen) {
          throw new Error("閉じ括弧が余っています");
        }
        cursor += 1;
        return counts;
      }

      if (!/[A-Z]/.test(char)) {
        throw new Error(`"${char}" の位置で化学式を読めません`);
      }

      cursor += 1;
      let symbol = char;
      if (cursor < input.length && /[a-z]/.test(input[cursor])) {
        symbol += input[cursor];
        cursor += 1;
      }
      const multiplier = readNumber();
      counts[symbol] = (counts[symbol] ?? 0) + multiplier;
    }

    if (stopAtParen) {
      throw new Error("閉じ括弧がありません");
    }
    return counts;
  }

  const parsed = parseGroup(false);
  if (cursor !== input.length) {
    throw new Error("化学式を最後まで読めませんでした");
  }
  return parsed;
}

export function formulaMass(formula) {
  const counts = parseFormula(formula);
  return Object.entries(counts).reduce((total, [element, count]) => {
    const atomicWeight = ATOMIC_WEIGHTS[element];
    if (!atomicWeight) {
      throw new Error(`${element} の原子量データがありません`);
    }
    return total + atomicWeight * count;
  }, 0);
}

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function round(value, digits = 6) {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(digits));
}

function formatCoefficient(value) {
  const rounded = round(value, 5);
  if (Math.abs(rounded - 1) < 1e-9) return "";
  return String(rounded).replace(/\.?0+$/, "");
}

export function formatCationFormula(cationMoles, batchMoles) {
  if (!batchMoles) return "";
  return Array.from(cationMoles.entries())
    .filter(([, moles]) => moles > 1e-12)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([element, moles]) => `${element}${formatCoefficient(moles / batchMoles)}`)
    .join(" ");
}

export function calculateRecipe(recipe) {
  const warnings = [];
  const explanation = [];
  const batchMoles = toNumber(recipe.batchMoles);
  const cationMoles = new Map();
  const baseStoich = new Map();
  const preferredOxides = new Map();
  const preferredPurity = new Map();

  if (batchMoles <= 0) {
    warnings.push("作製モル数は0より大きい値にしてください。");
  }

  for (const base of recipe.bases ?? []) {
    const element = String(base.element ?? "").trim();
    const stoich = toNumber(base.stoich);
    const purity = Math.min(Math.max(toNumber(base.purity, 100), 0.0001), 100);

    if (!element || stoich <= 0 || batchMoles <= 0) continue;

    const moles = batchMoles * stoich;
    cationMoles.set(element, (cationMoles.get(element) ?? 0) + moles);
    baseStoich.set(element, (baseStoich.get(element) ?? 0) + stoich);
    preferredOxides.set(element, base.precursorFormula || getDefaultOxide(element));
    preferredPurity.set(element, purity);
    explanation.push({
      kind: "base",
      text: `${element}: ${batchMoles} mol x ${stoich} = ${round(moles, 8)} mol`,
    });
  }

  for (const additive of recipe.additives ?? []) {
    const element = String(additive.element ?? "").trim();
    const mode = additive.mode === "addition" ? "addition" : "substitution";
    const unit = additive.unit ?? "molPercent";
    const concentration = toNumber(additive.concentration);
    const targetElement = String(additive.targetElement ?? "").trim();
    const purity = Math.min(Math.max(toNumber(additive.purity, 100), 0.0001), 100);

    if (!element || concentration <= 0 || batchMoles <= 0) continue;

    let additiveMoles = 0;
    let basisText = "";

    if (unit === "mol") {
      additiveMoles = concentration;
      basisText = `${concentration} mol`;
    } else if (unit === "mmol") {
      additiveMoles = concentration / 1000;
      basisText = `${concentration} mmol / 1000`;
    } else if (mode === "substitution") {
      const targetStoich = baseStoich.get(targetElement) ?? 0;
      additiveMoles = batchMoles * targetStoich * concentration / 100;
      basisText = `${batchMoles} mol x ${targetStoich} x ${concentration}%`;
      if (!targetStoich) {
        warnings.push(`${element}: 置換先 ${targetElement || "(未設定)"} が基準組成にありません。`);
      }
    } else {
      additiveMoles = batchMoles * concentration / 100;
      basisText = `${batchMoles} mol x ${concentration}%`;
    }

    if (mode === "substitution" && targetElement) {
      const after = (cationMoles.get(targetElement) ?? 0) - additiveMoles;
      cationMoles.set(targetElement, after);
      if (after < -1e-12) {
        warnings.push(`${targetElement} の置換量が基準量を超えています。`);
      }
      explanation.push({
        kind: "additive",
        text: `${element} -> ${targetElement}: ${basisText} = ${round(additiveMoles, 8)} mol, ${targetElement} から同量を差し引き`,
      });
    } else {
      explanation.push({
        kind: "additive",
        text: `${element} 添加: ${basisText} = ${round(additiveMoles, 8)} mol`,
      });
    }

    cationMoles.set(element, (cationMoles.get(element) ?? 0) + additiveMoles);
    preferredOxides.set(element, additive.precursorFormula || getDefaultOxide(element));
    preferredPurity.set(element, purity);
  }

  const items = [];

  for (const [element, moles] of cationMoles.entries()) {
    if (moles <= 1e-12) continue;

    const formula = preferredOxides.get(element) || getDefaultOxide(element);
    const purity = preferredPurity.get(element) ?? 100;

    if (!formula) {
      warnings.push(`${element} の酸化物が未設定です。`);
      continue;
    }

    try {
      const counts = parseFormula(formula);
      const atomsInOxide = counts[element] ?? 0;
      if (!atomsInOxide) {
        warnings.push(`${formula} に ${element} が含まれていません。`);
        continue;
      }
      const molarMass = formulaMass(formula);
      const precursorMoles = moles / atomsInOxide;
      const grams = precursorMoles * molarMass / (purity / 100);
      const oxideNote = OXIDE_LIBRARY.find(
        (oxide) => oxide.element === element && oxide.formula === formula
      )?.note ?? "";

      items.push({
        element,
        formula,
        cationMoles: moles,
        atomsInOxide,
        precursorMoles,
        molarMass,
        purity,
        grams,
        milligrams: grams * 1000,
        note: oxideNote,
        equation: `m(${formula}) = n(${element}) / ${atomsInOxide} x ${round(molarMass, 5)} / ${round(purity / 100, 6)}`,
      });
    } catch (error) {
      warnings.push(`${formula}: ${error.message}`);
    }
  }

  items.sort((a, b) => a.element.localeCompare(b.element));

  const totalGrams = items.reduce((total, item) => total + item.grams, 0);

  return {
    id: recipe.id,
    name: recipe.name,
    batchMoles,
    cationFormula: formatCationFormula(cationMoles, batchMoles),
    items,
    totalGrams,
    warnings,
    explanation,
  };
}

export function createDefaultRecipe(index = 0) {
  const examples = [
    {
      name: "BaTiO3 : La 5 mol%",
      batchMoles: 0.01,
      bases: [
        { element: "Ba", stoich: 1, precursorFormula: "BaO", purity: 99.9 },
        { element: "Ti", stoich: 1, precursorFormula: "TiO2", purity: 99.9 },
      ],
      additives: [
        {
          element: "La",
          mode: "substitution",
          targetElement: "Ba",
          concentration: 5,
          unit: "molPercent",
          precursorFormula: "La2O3",
          purity: 99.9,
        },
      ],
    },
    {
      name: "SrTiO3 : Nb 1 mol%",
      batchMoles: 0.01,
      bases: [
        { element: "Sr", stoich: 1, precursorFormula: "SrO", purity: 99.9 },
        { element: "Ti", stoich: 1, precursorFormula: "TiO2", purity: 99.9 },
      ],
      additives: [
        {
          element: "Nb",
          mode: "substitution",
          targetElement: "Ti",
          concentration: 1,
          unit: "molPercent",
          precursorFormula: "Nb2O5",
          purity: 99.9,
        },
      ],
    },
    {
      name: "ZrO2 : Y 8 mol%",
      batchMoles: 0.02,
      bases: [{ element: "Zr", stoich: 1, precursorFormula: "ZrO2", purity: 99.9 }],
      additives: [
        {
          element: "Y",
          mode: "substitution",
          targetElement: "Zr",
          concentration: 8,
          unit: "molPercent",
          precursorFormula: "Y2O3",
          purity: 99.9,
        },
      ],
    },
    {
      name: "LiCoO2",
      batchMoles: 0.01,
      bases: [
        { element: "Li", stoich: 1, precursorFormula: "Li2O", purity: 99.9 },
        { element: "Co", stoich: 1, precursorFormula: "Co3O4", purity: 99.9 },
      ],
      additives: [],
    },
  ];

  const source = examples[index % examples.length];
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${index}`,
    name: source.name,
    batchMoles: source.batchMoles,
    bases: source.bases.map((base) => ({ ...base })),
    additives: source.additives.map((additive) => ({ ...additive })),
  };
}
