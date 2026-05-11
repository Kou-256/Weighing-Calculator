import {
  ELEMENT_OPTIONS,
  OXIDE_LIBRARY,
  calculateRecipe,
  createDefaultRecipe,
  getDefaultOxide,
  getOxideOptions,
} from "./calculator.js";

const STORAGE_KEY = "oxide-weighing-recipes-v1";
const app = document.querySelector("#app");
const formatter = new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 6 });

let recipes = loadRecipes();

function loadRecipes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (Array.isArray(saved) && saved.length) {
      return saved;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return Array.from({ length: 4 }, (_, index) => createDefaultRecipe(index));
}

function saveRecipes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

function formatMass(grams) {
  if (!Number.isFinite(grams)) return "-";
  if (grams < 0.001) return `${formatter.format(grams * 1000000)} ug`;
  if (grams < 1) return `${formatter.format(grams * 1000)} mg`;
  return `${formatter.format(grams)} g`;
}

function formatNumber(value, digits = 6) {
  if (!Number.isFinite(value)) return "-";
  return Number(value.toFixed(digits)).toLocaleString("ja-JP");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function recipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

function datalist(id, options) {
  return `
    <datalist id="${id}">
      ${options.map((option) => `<option value="${escapeHtml(option)}"></option>`).join("")}
    </datalist>
  `;
}

function elementInput(value, attributes = "") {
  return `
    <input
      class="field compact"
      list="element-options"
      value="${escapeHtml(value)}"
      autocomplete="off"
      spellcheck="false"
      ${attributes}
    />
  `;
}

function oxideInput(recipeId, section, index, element, value, attributes = "") {
  const listId = `oxide-${recipeId}-${section}-${index}`;
  const options = getOxideOptions(element).map((oxide) => oxide.formula);
  if (value && !options.includes(value)) options.push(value);
  return `
    <input
      class="field compact"
      list="${listId}"
      value="${escapeHtml(value)}"
      autocomplete="off"
      spellcheck="false"
      ${attributes}
    />
    ${datalist(listId, options)}
  `;
}

function renderBaseRows(recipe) {
  return recipe.bases
    .map((base, index) => {
      const rowId = `${recipe.id}-base-${index}`;
      return `
        <tr>
          <td data-label="元素">
            ${elementInput(base.element, `data-field="element" data-section="bases" data-index="${index}" data-recipe="${recipe.id}" aria-label="基準元素 ${index + 1}"`)}
          </td>
          <td data-label="係数">
            <input class="field number" type="number" min="0" step="0.0001" value="${escapeHtml(base.stoich)}" data-field="stoich" data-section="bases" data-index="${index}" data-recipe="${recipe.id}" aria-label="基準係数 ${index + 1}" />
          </td>
          <td data-label="酸化物">
            ${oxideInput(recipe.id, "base", index, base.element, base.precursorFormula, `data-field="precursorFormula" data-section="bases" data-index="${index}" data-recipe="${recipe.id}" aria-label="基準酸化物 ${index + 1}"`)}
          </td>
          <td data-label="純度%">
            <input class="field number" type="number" min="0.0001" max="100" step="0.01" value="${escapeHtml(base.purity ?? 100)}" data-field="purity" data-section="bases" data-index="${index}" data-recipe="${recipe.id}" aria-label="基準純度 ${index + 1}" />
          </td>
          <td class="row-action">
            <button class="icon-button" type="button" title="削除" data-action="remove-row" data-section="bases" data-index="${index}" data-recipe="${recipe.id}" ${recipe.bases.length === 1 ? "disabled" : ""}>×</button>
          </td>
        </tr>
        <tr class="note-row" id="${rowId}-note">
          <td colspan="5">${renderOxideNote(base.element, base.precursorFormula)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderAdditiveRows(recipe) {
  if (!recipe.additives.length) {
    return `
      <tr class="empty-row">
        <td colspan="8">添加物なし</td>
      </tr>
    `;
  }

  return recipe.additives
    .map((additive, index) => `
      <tr>
        <td data-label="元素">
          ${elementInput(additive.element, `data-field="element" data-section="additives" data-index="${index}" data-recipe="${recipe.id}" aria-label="添加元素 ${index + 1}"`)}
        </td>
        <td data-label="モード">
          <select class="field compact" data-field="mode" data-section="additives" data-index="${index}" data-recipe="${recipe.id}" aria-label="添加モード ${index + 1}">
            <option value="substitution" ${additive.mode !== "addition" ? "selected" : ""}>置換</option>
            <option value="addition" ${additive.mode === "addition" ? "selected" : ""}>外添加</option>
          </select>
        </td>
        <td data-label="置換先">
          ${elementInput(additive.targetElement, `data-field="targetElement" data-section="additives" data-index="${index}" data-recipe="${recipe.id}" aria-label="置換先 ${index + 1}" ${additive.mode === "addition" ? "disabled" : ""}`)}
        </td>
        <td data-label="濃度">
          <input class="field number" type="number" min="0" step="0.0001" value="${escapeHtml(additive.concentration)}" data-field="concentration" data-section="additives" data-index="${index}" data-recipe="${recipe.id}" aria-label="添加濃度 ${index + 1}" />
        </td>
        <td data-label="単位">
          <select class="field compact" data-field="unit" data-section="additives" data-index="${index}" data-recipe="${recipe.id}" aria-label="濃度単位 ${index + 1}">
            <option value="molPercent" ${additive.unit === "molPercent" || !additive.unit ? "selected" : ""}>mol%</option>
            <option value="mmol" ${additive.unit === "mmol" ? "selected" : ""}>mmol</option>
            <option value="mol" ${additive.unit === "mol" ? "selected" : ""}>mol</option>
          </select>
        </td>
        <td data-label="酸化物">
          ${oxideInput(recipe.id, "additive", index, additive.element, additive.precursorFormula, `data-field="precursorFormula" data-section="additives" data-index="${index}" data-recipe="${recipe.id}" aria-label="添加酸化物 ${index + 1}"`)}
        </td>
        <td data-label="純度%">
          <input class="field number" type="number" min="0.0001" max="100" step="0.01" value="${escapeHtml(additive.purity ?? 100)}" data-field="purity" data-section="additives" data-index="${index}" data-recipe="${recipe.id}" aria-label="添加純度 ${index + 1}" />
        </td>
        <td class="row-action">
          <button class="icon-button" type="button" title="削除" data-action="remove-row" data-section="additives" data-index="${index}" data-recipe="${recipe.id}">×</button>
        </td>
      </tr>
      <tr class="note-row">
        <td colspan="8">${renderOxideNote(additive.element, additive.precursorFormula)}</td>
      </tr>
    `)
    .join("");
}

function renderOxideNote(element, formula) {
  const note = OXIDE_LIBRARY.find((oxide) => oxide.element === element && oxide.formula === formula)?.note;
  return note ? `<span>${escapeHtml(formula)}: ${escapeHtml(note)}</span>` : "";
}

function renderResult(result) {
  const maxMass = Math.max(...result.items.map((item) => item.grams), 0);
  const resultRows = result.items
    .map((item) => {
      const width = maxMass > 0 ? Math.max(7, (item.grams / maxMass) * 100) : 0;
      return `
        <tr>
          <td data-label="元素">${escapeHtml(item.element)}</td>
          <td data-label="酸化物"><strong>${escapeHtml(item.formula)}</strong></td>
          <td data-label="元素mol">${formatNumber(item.cationMoles, 8)}</td>
          <td data-label="酸化物mol">${formatNumber(item.precursorMoles, 8)}</td>
          <td data-label="式量">${formatNumber(item.molarMass, 5)}</td>
          <td data-label="純度%">${formatNumber(item.purity, 4)}</td>
          <td data-label="秤量" class="mass-cell">${formatMass(item.grams)}</td>
        </tr>
        <tr class="equation-row">
          <td colspan="7">
            <div class="mass-bar" style="--bar-width:${width}%"></div>
            <code>${escapeHtml(item.equation)} = ${formatMass(item.grams)}</code>
          </td>
        </tr>
      `;
    })
    .join("");

  const warnings = result.warnings.length
    ? `<div class="notice warn">${result.warnings.map((warning) => `<p>${escapeHtml(warning)}</p>`).join("")}</div>`
    : "";

  const explanation = result.explanation.length
    ? `
      <details class="formula-details" open>
        <summary>計算式</summary>
        <ol>
          ${result.explanation.map((line) => `<li>${escapeHtml(line.text)}</li>`).join("")}
          <li>酸化物モル数 = 必要元素モル数 ÷ 化学式中の元素数</li>
          <li>秤量質量 = 酸化物モル数 × 酸化物式量 ÷ 純度</li>
        </ol>
      </details>
    `
    : "";

  return `
    <section class="result-panel" aria-label="計算結果">
      <div class="result-head">
        <div>
          <span class="eyebrow">Result</span>
          <h3>${escapeHtml(result.cationFormula || "組成未設定")}</h3>
        </div>
        <output>${formatMass(result.totalGrams)}</output>
      </div>
      ${warnings}
      <div class="table-wrap">
        <table class="result-table">
          <thead>
            <tr>
              <th>元素</th>
              <th>酸化物</th>
              <th>元素mol</th>
              <th>酸化物mol</th>
              <th>式量</th>
              <th>純度%</th>
              <th>秤量</th>
            </tr>
          </thead>
          <tbody>
            ${resultRows || `<tr class="empty-row"><td colspan="7">入力待ち</td></tr>`}
          </tbody>
        </table>
      </div>
      ${explanation}
    </section>
  `;
}

function renderRecipe(recipe, index, result) {
  return `
    <article class="recipe-card" data-card="${recipe.id}">
      <header class="recipe-header">
        <div class="recipe-title">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <input class="name-input" value="${escapeHtml(recipe.name)}" data-field="name" data-recipe="${recipe.id}" aria-label="レシピ名 ${index + 1}" />
        </div>
        <div class="recipe-actions">
          <button class="icon-button" type="button" title="複製" data-action="duplicate-recipe" data-recipe="${recipe.id}">⧉</button>
          <button class="icon-button" type="button" title="削除" data-action="remove-recipe" data-recipe="${recipe.id}" ${recipes.length === 1 ? "disabled" : ""}>×</button>
        </div>
      </header>

      <div class="batch-line">
        <label>
          <span>作製モル数</span>
          <input class="field number" type="number" min="0" step="0.0001" value="${escapeHtml(recipe.batchMoles)}" data-field="batchMoles" data-recipe="${recipe.id}" aria-label="作製モル数 ${index + 1}" />
        </label>
        <span class="unit-pill">mol</span>
      </div>

      <section class="input-section">
        <div class="section-title">
          <h2>基準組成</h2>
          <button class="text-button" type="button" data-action="add-row" data-section="bases" data-recipe="${recipe.id}">＋</button>
        </div>
        <div class="table-wrap">
          <table class="input-table">
            <thead>
              <tr>
                <th>元素</th>
                <th>係数</th>
                <th>酸化物</th>
                <th>純度%</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${renderBaseRows(recipe)}</tbody>
          </table>
        </div>
      </section>

      <section class="input-section">
        <div class="section-title">
          <h2>添加物</h2>
          <button class="text-button" type="button" data-action="add-row" data-section="additives" data-recipe="${recipe.id}">＋</button>
        </div>
        <div class="table-wrap">
          <table class="input-table additive-table">
            <thead>
              <tr>
                <th>元素</th>
                <th>モード</th>
                <th>置換先</th>
                <th>濃度</th>
                <th>単位</th>
                <th>酸化物</th>
                <th>純度%</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${renderAdditiveRows(recipe)}</tbody>
          </table>
        </div>
      </section>

      ${renderResult(result)}
    </article>
  `;
}

function renderSummary(results) {
  const totalMass = results.reduce((total, result) => total + result.totalGrams, 0);
  const warningCount = results.reduce((total, result) => total + result.warnings.length, 0);
  return `
    <section class="summary-strip" aria-label="サマリー">
      <div>
        <span>計算数</span>
        <strong>${recipes.length}</strong>
      </div>
      <div>
        <span>総秤量</span>
        <strong>${formatMass(totalMass)}</strong>
      </div>
      <div>
        <span>確認項目</span>
        <strong>${warningCount}</strong>
      </div>
      <label>
        <span>表示数</span>
        <input class="count-input" type="number" min="1" step="1" value="${recipes.length}" data-action="set-count" aria-label="表示数" />
      </label>
    </section>
  `;
}

function render() {
  const results = recipes.map((recipe) => calculateRecipe(recipe));
  app.innerHTML = `
    ${datalist("element-options", ELEMENT_OPTIONS)}
    <header class="app-header">
      <div class="brand-block">
        <div class="brand-mark" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <p class="eyebrow">Oxide Balance</p>
          <h1>酸化物秤量計算</h1>
        </div>
      </div>
      <div class="header-actions">
        <button class="text-button" type="button" data-action="add-recipe">＋ レシピ</button>
        <button class="text-button ghost" type="button" data-action="reset">リセット</button>
      </div>
    </header>

    ${renderSummary(results)}

    <main class="recipe-grid">
      ${recipes.map((recipe, index) => renderRecipe(recipe, index, results[index])).join("")}
    </main>

    <footer class="app-footer">
      <p>原子量は標準原子量ベースの研究用概算です。吸湿、炭酸化、強熱減量、酸化数、安全データシートは実験前に確認してください。</p>
    </footer>
  `;
}

function normalizeNumericFields(section, field, value) {
  if (["stoich", "purity", "concentration", "batchMoles"].includes(field)) {
    return Number(value);
  }
  return value;
}

function updateField(target, shouldRender = true) {
  const recipe = recipeById(target.dataset.recipe);
  if (!recipe) return;

  const { section, field } = target.dataset;
  const value = normalizeNumericFields(section, field, target.value);

  if (!section) {
    recipe[field] = value;
    saveRecipes();
    if (shouldRender) render();
    return;
  }

  const index = Number(target.dataset.index);
  const row = recipe[section]?.[index];
  if (!row) return;

  row[field] = value;

  if (field === "element") {
    row.precursorFormula = getDefaultOxide(value) || row.precursorFormula || "";
  }

  if (field === "mode" && value === "addition") {
    row.targetElement = "";
  }

  saveRecipes();
  if (shouldRender) render();
}

function addRow(recipe, section) {
  if (section === "bases") {
    recipe.bases.push({ element: "Al", stoich: 1, precursorFormula: "Al2O3", purity: 99.9 });
  } else {
    const targetElement = recipe.bases[0]?.element ?? "";
    recipe.additives.push({
      element: "La",
      mode: "substitution",
      targetElement,
      concentration: 1,
      unit: "molPercent",
      precursorFormula: "La2O3",
      purity: 99.9,
    });
  }
}

function duplicateRecipe(id) {
  const recipe = recipeById(id);
  if (!recipe) return;
  const copy = JSON.parse(JSON.stringify(recipe));
  copy.id = crypto.randomUUID();
  copy.name = `${copy.name} copy`;
  recipes.splice(recipes.indexOf(recipe) + 1, 0, copy);
}

function setRecipeCount(count) {
  const desired = Math.max(1, Math.floor(Number(count) || 1));
  while (recipes.length < desired) recipes.push(createDefaultRecipe(recipes.length));
  while (recipes.length > desired) recipes.pop();
}

app.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (target.dataset.action === "set-count") {
    setRecipeCount(target.value);
    saveRecipes();
    render();
    return;
  }
  if (target.dataset.field) updateField(target, false);
});

app.addEventListener("change", (event) => {
  const target = event.target;
  if (target instanceof HTMLSelectElement || target instanceof HTMLInputElement) {
    if (target.dataset.field) updateField(target, true);
  }
});

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const recipe = recipeById(button.dataset.recipe);

  if (action === "add-recipe") {
    recipes.push(createDefaultRecipe(recipes.length));
  }

  if (action === "remove-recipe" && recipe && recipes.length > 1) {
    recipes = recipes.filter((item) => item.id !== recipe.id);
  }

  if (action === "duplicate-recipe") {
    duplicateRecipe(button.dataset.recipe);
  }

  if (action === "add-row" && recipe) {
    addRow(recipe, button.dataset.section);
  }

  if (action === "remove-row" && recipe) {
    const section = button.dataset.section;
    const index = Number(button.dataset.index);
    if (section === "bases" && recipe.bases.length > 1) recipe.bases.splice(index, 1);
    if (section === "additives") recipe.additives.splice(index, 1);
  }

  if (action === "reset") {
    recipes = Array.from({ length: 4 }, (_, index) => createDefaultRecipe(index));
  }

  saveRecipes();
  render();
});

render();
