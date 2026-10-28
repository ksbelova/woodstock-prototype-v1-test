(() => {
  "use strict";

  const DATA_URL = "../../data/panels.json?v=20261017-remove-ready-shirts";
  const Core = window.WoodstockPanelsCore;
  // Общая спецификация: инженерная доска уже сохраняется в этот же ключ.
  const SPEC_STORAGE_KEY = "woodstockDetailedSpecification";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const el = (id) => document.getElementById(id);

  const form = {
    root: el("panelForm"),
    baseSelect: el("baseSelect"), baseThicknessSelect: el("baseThicknessSelect"),
    heavyPlateWarning: el("heavyPlateWarning"), baseProductionCostHint: el("baseProductionCostHint"),

    veneerTypeSelect: el("veneerTypeSelect"), veneerAInputLabel: el("veneerAInputLabel"), veneerAInput: el("veneerAInput"), veneerASuggestions: el("veneerASuggestions"), veneerAClear: el("veneerAClear"), veneerAError: el("veneerAError"),
    veneerSelectionDetailsGrid: el("veneerSelectionDetailsGrid"), veneerThicknessField: el("veneerThicknessField"), veneerThicknessSelect: el("veneerThicknessSelect"), veneerThicknessError: el("veneerThicknessError"),
    veneeredSidesField: el("veneeredSidesField"), veneeredSidesSelect: el("veneeredSidesSelect"), veneerSideBGrid: el("veneerSideBGrid"), reverseSideField: el("reverseSideField"), reverseSideSelect: el("reverseSideSelect"), reverseSideHint: el("reverseSideHint"),
    veneerBFields: el("veneerBFields"), veneerBModeSelect: el("veneerBModeSelect"), veneerBModeHint: el("veneerBModeHint"), veneerBSearchField: el("veneerBSearchField"), veneerBInputLabel: el("veneerBInputLabel"), veneerBInput: el("veneerBInput"), veneerBSuggestions: el("veneerBSuggestions"), veneerBClear: el("veneerBClear"), veneerBError: el("veneerBError"), veneerBCutField: el("veneerBCutField"), veneerBCutSelect: el("veneerBCutSelect"), veneerBCutError: el("veneerBCutError"), veneerBRoughThicknessField: el("veneerBRoughThicknessField"), veneerBRoughThicknessSelect: el("veneerBRoughThicknessSelect"),
    veneerLayoutGrid: el("veneerLayoutGrid"), layoutField: el("layoutField"), layoutSelect: el("layoutSelect"), layoutBSelect: el("layoutBSelect"), layoutBField: el("layoutBField"), sandingSelect: el("sandingSelect"), layoutError: el("layoutError"), veneerCutField: el("veneerCutField"), veneerCutSelect: el("veneerCutSelect"), veneerCutError: el("veneerCutError"), veneerInfoMessages: el("veneerInfoMessages"), readyShirtThicknessWarning: el("readyShirtThicknessWarning"), mixMatchWarning: el("mixMatchWarning"), designLayoutWarning: el("designLayoutWarning"), layoutTzFields: el("layoutTzFields"), layoutTzComment: el("layoutTzComment"), layoutTzFiles: el("layoutTzFiles"), layoutTzFileNames: el("layoutTzFileNames"), layoutTzError: el("layoutTzError"),

    sizeRows: el("sizeRows"), sizeBlockError: el("sizeBlockError"), addSizeRowBtn: el("addSizeRowBtn"),

    edgeModeSelect: el("edgeModeSelect"), attachedEdgeFields: el("attachedEdgeFields"), separateEdgeFields: el("separateEdgeFields"), edgeCommentField: el("edgeCommentField"), edgeCommentInput: el("edgeCommentInput"),
    edgeSidesSelect: el("edgeSidesSelect"), edgeTypeSelect: el("edgeTypeSelect"), edgeMaterialInput: el("edgeMaterialInput"), edgeMaterialSuggestions: el("edgeMaterialSuggestions"), edgeMaterialClear: el("edgeMaterialClear"), edgeMaterialError: el("edgeMaterialError"), edgeThicknessField: el("edgeThicknessField"), edgeThicknessSelect: el("edgeThicknessSelect"), edgeWidthField: el("edgeWidthField"), edgeWidthSelect: el("edgeWidthSelect"), edgeOrderWidthField: el("edgeOrderWidthField"), edgeOrderWidthInput: el("edgeOrderWidthInput"), edgeOrderPriceField: el("edgeOrderPriceField"), edgeOrderPriceInput: el("edgeOrderPriceInput"), edgeBevelSelect: el("edgeBevelSelect"), attachedEdgeMetersSummary: el("attachedEdgeMetersSummary"), positionEdgeToggle: el("positionEdgeToggle"), positionEdgeOverrides: el("positionEdgeOverrides"),
    separateEdgeSidesSelect: el("separateEdgeSidesSelect"), separateEdgeMetersSummary: el("separateEdgeMetersSummary"), separateEdgeMetersReset: el("separateEdgeMetersReset"),
    separateEdgeTypeSelect: el("separateEdgeTypeSelect"), separateEdgeMaterialInput: el("separateEdgeMaterialInput"), separateEdgeMaterialSuggestions: el("separateEdgeMaterialSuggestions"), separateEdgeMaterialClear: el("separateEdgeMaterialClear"), separateEdgeMaterialError: el("separateEdgeMaterialError"), separateEdgeThicknessField: el("separateEdgeThicknessField"), separateEdgeThicknessSelect: el("separateEdgeThicknessSelect"), separateEdgeWidthField: el("separateEdgeWidthField"), separateEdgeWidthSelect: el("separateEdgeWidthSelect"), separateEdgeOrderWidthField: el("separateEdgeOrderWidthField"), separateEdgeOrderWidthInput: el("separateEdgeOrderWidthInput"), separateEdgeOrderPriceField: el("separateEdgeOrderPriceField"), separateEdgeOrderPriceInput: el("separateEdgeOrderPriceInput"), separateEdgeMetersInput: el("separateEdgeMetersInput"), separateEdgeMetersError: el("separateEdgeMetersError"), separateEdgeMetersWarning: el("separateEdgeMetersWarning"),

    calibrationFields: el("calibrationFields"), calibrationSelect: el("calibrationSelect"), calibrationRequiredNote: el("calibrationRequiredNote"), calibrationTargetField: el("calibrationTargetField"), calibrationTargetInput: el("calibrationTargetInput"), calibrationTargetError: el("calibrationTargetError"), calibrationDepthField: el("calibrationDepthField"), calibrationDepthInput: el("calibrationDepthInput"), calibrationDepthNote: el("calibrationDepthNote"), calibrationDepthError: el("calibrationDepthError"),
    techVeneeringSummary: el("techVeneeringSummary"), techSandingSummary: el("techSandingSummary"), techCuttingSummary: el("techCuttingSummary"), techGluingRow: el("techGluingRow"), techGluingSummary: el("techGluingSummary"), techCalibrationRow: el("techCalibrationRow"), techCalibrationSummary: el("techCalibrationSummary"),
    finishSelect: el("finishSelect"), toningSelect: el("toningSelect"), finishParameterFields: el("finishParameterFields"), lacquerParameterFields: el("lacquerParameterFields"), lacquerExecutionField: el("lacquerExecutionField"), lacquerExecutionSelect: el("lacquerExecutionSelect"), lacquerGlossField: el("lacquerGlossField"), lacquerGlossSelect: el("lacquerGlossSelect"), lacquerGlossError: el("lacquerGlossError"), lacquerProcessField: el("lacquerProcessField"), lacquerProcessSelect: el("lacquerProcessSelect"), lacquerProcessError: el("lacquerProcessError"), enamelParameterFields: el("enamelParameterFields"), enamelVariantSelect: el("enamelVariantSelect"), enamelVariantError: el("enamelVariantError"), lacquerExtraFields: el("lacquerExtraFields"), finishCommonFields: el("finishCommonFields"), finishSidesField: el("finishSidesField"), finishSidesSelect: el("finishSidesSelect"), isolatorSelect: el("isolatorSelect"), positionFinishToggle: el("positionFinishToggle"), positionFinishOverrides: el("positionFinishOverrides"),

    clientConditionSelect: el("clientConditionSelect"), clientConditionNote: el("clientConditionNote"),
    retailPriceValue: el("retailPriceValue"), manualDiscountField: el("manualDiscountField"), manualDiscountInput: el("manualDiscountInput"), manualDiscountError: el("manualDiscountError"), finalPriceField: el("finalPriceField"), finalPriceValue: el("finalPriceValue"), finalPriceNote: el("finalPriceNote"), priceAdjustmentsBlock: el("priceAdjustmentsBlock"), priceAdjustmentsList: el("priceAdjustmentsList"),

    commentInput: el("commentInput"), filesInput: el("filesInput"), selectedFiles: el("selectedFiles"),
    specCharacteristics: el("specCharacteristics"), specSizes: el("specSizes"), specPricePerM2Label: el("specPricePerM2Label"), specPricePerM2: el("specPricePerM2"), specPricePerPieceLabel: el("specPricePerPieceLabel"), specPricePerPiece: el("specPricePerPiece"), specTotal: el("specTotal"), specVat: el("specVat"), addToSpecButton: el("addToSpecButton"), saveStatus: el("saveStatus")
  };

  let data = null;
  let selectedVeneerAGroup = null;
  let selectedVeneerA = null;
  let selectedVeneerBGroup = null;
  let selectedVeneerB = null;
  let attachedEdgeMaterialAuto = true;
  let separateEdgeMaterialAuto = true;
  const edgeWidthAutomatic = { attached: true, separate: true };
  let separateEdgeMetersManual = false;
  let veneerAPriceAuto = true;
  let veneerBPriceAuto = true;
  const veneerConditionChoices = { A: "", B: "" };
  let manualDiscountPercentState = 0;
  let activeSizeRow = null;
  let lastCalculation = null;
  let positionFinishOverridesEnabled = false;
  let positionEdgeOverridesEnabled = false;
  let globalFinishSidesManual = false;
  let calibrationForcedRequiredBaseId = "";
  const positionFinishState = new Map();
  const positionEdgeState = new Map();
  const uploadedFilesState = new WeakMap();
  const priceAdjustmentOverrides = new Map();
  let priceListClientConditionsCache = null;
  let veneerDemandSignatureState = "";
  let layoutFieldInteracted = false;
  let layoutValidationAttempted = false;
  let addAttempted = false;
  const touchedFields = new Set();

  function shouldShowError(key, hasEnteredValue = false) {
    return addAttempted || (hasEnteredValue && touchedFields.has(key));
  }

  function markFieldTouched(key) {
    if (key) touchedFields.add(key);
  }

  function clearTouchedFields(...keys) {
    keys.flat().filter(Boolean).forEach((key) => touchedFields.delete(key));
  }

  function clearTouchedPrefix(prefix) {
    [...touchedFields].forEach((key) => {
      if (String(key).startsWith(prefix)) touchedFields.delete(key);
    });
  }

  function setControlError(control, key, message = "", existingError = null) {
    const field = control?.closest?.(".field");
    field?.classList.toggle("field--invalid", Boolean(message));
    control?.setAttribute?.("aria-invalid", message ? "true" : "false");
    let error = existingError;
    if (!error && field) {
      error = field.querySelector(`[data-validation-error="${key}"]`);
      if (!error && message) {
        error = document.createElement("span");
        error.className = "field__error";
        error.dataset.validationError = key;
        field.append(error);
      }
    }
    if (error) {
      error.textContent = message;
      if (error.dataset?.validationError === key) error.classList.toggle("is-hidden", !message);
      else if (message) error.classList.remove("is-hidden");
    }
  }

  function clearValidationFor(control, key, existingError = null) {
    clearTouchedFields(key);
    setControlError(control, key, "", existingError);
  }

  const esc = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const num = Core.parseNumber;
  const round = Core.round;
  const money = Core.formatMoney;
  const qty = (value, unit) => Number.isFinite(value) ? `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(value)} ${unit}` : "—";
  const parseThicknessComposition = Core.parseThicknessComposition;

  function baseThicknessDisplay(thicknessValue) {
    const thickness = thicknessValue && typeof thicknessValue === "object" && Object.prototype.hasOwnProperty.call(thicknessValue, "raw")
      ? thicknessValue
      : parseThicknessComposition(thicknessValue);
    const raw = String(thickness?.raw ?? "").trim();
    if (thickness?.composite && Number.isFinite(thickness.total)) return `${thickness.total} мм (${raw})`;
    return raw ? `${raw} мм` : "—";
  }

  function selectedBase() { return data?.bases.find((x) => x.id === form.baseSelect.value) || null; }
  function currentBaseThicknessRaw() {
    return form.baseThicknessSelect.value;
  }

  function baseThicknessOptions(base) {
    if (!base) return [];
    const own = window.WoodstockPanelsView?.thicknesses?.(base, data?.thicknesses?.[base.id], data) ?? data?.thicknesses?.[base.id];
    return Array.isArray(own) ? own : [];
  }

  function normalizeThicknessKey(raw) {
    return String(raw ?? "").trim().replace(/\s+/g, "").replace(/,/g, ".");
  }

  function selectedBasePriceMode(size = null) {
    const base = selectedBase();
    const key = normalizeThicknessKey(currentBaseThicknessRaw());
    if (!base || !key) return null;
    const scenarios = data?.baseThicknessScenarioPriceModes?.[base.id]?.[key];
    if (scenarios && size) {
      const manufacturingType = manufacturingTypeForSize(size);
      const configured = scenarios[manufacturingType] || "production";
      if (configured !== "automatic") return configured;
      const sides = Number(form.veneeredSidesSelect.value);
      const veneerThickness = selectedVeneerThickness();
      if (manufacturingType === "standard") {
        // Legacy standard rates confirm thin veneer only; do not extend them
        // to thick veneer or to an unpriced manufacturing scenario.
        if (!Number.isFinite(veneerThickness) || Math.abs(veneerThickness - 0.6) > 0.001) return "production";
        return standardProductionRateRowFor(key, sides, veneerThickness, base.id) ? "automatic" : "production";
      }
      return nonstandardRateRowFor(key, sides, base.id) ? "automatic" : "production";
    }
    return data?.baseThicknessPriceModes?.[base.id]?.[key] || "production";
  }

  function priceListClientConditions() {
    if (priceListClientConditionsCache) return priceListClientConditionsCache;
    const allowedIds = new Set(["retail", "loyalty", "regular", "vip"]);
    const definitions = (Array.isArray(data?.plateClientConditions) ? data.plateClientConditions : [])
      .filter((item) => allowedIds.has(item?.id));
    const configuredByPriceKey = new Map(definitions
      .filter((item) => item?.id)
      .map((item) => [item.priceKey || item.id, item]));
    const availablePriceKeys = new Set();
    const collect = (prices) => {
      if (!prices || typeof prices !== "object") return;
      Object.keys(prices).forEach((key) => { if (configuredByPriceKey.has(key)) availablePriceKeys.add(key); });
    };

    (data?.standardMdfItems || []).forEach((item) => { collect(item?.pricesPerSheet); collect(item?.pricesPerM2); });
    (data?.veneers || []).forEach((item) => collect(item?.prices));
    (data?.edgeCatalog || []).forEach((item) => Object.values(item?.pricesPerRunningM || {}).forEach(collect));
    [...(data?.standardProductionRates || []), ...(data?.nonstandardRates || [])].forEach((row) => {
      collect(row?.pricesPerM2);
      collect(row?.discountsPercent);
    });

    const available = definitions.filter((item) => availablePriceKeys.has(item.priceKey || item.id));
    priceListClientConditionsCache = available.length ? available : definitions.filter((item) => item.id === "retail");
    return priceListClientConditionsCache;
  }

  function clientConditionById(id) {
    return priceListClientConditions().find((item) => item.id === id)
      || (data?.plateClientConditions || []).find((item) => item.id === id)
      || null;
  }

  function clientConditionPriceKey(id) {
    const condition = clientConditionById(id);
    return condition?.priceKey || condition?.id || id || "retail";
  }

  function clientConditionUiName(id) {
    if (id === "loyalty") return "Лояльный клиент";
    if (id === "regular") return "Постоянный покупатель";
    if (id === "vip") return "VIP-клиент";
    return "Розничная цена";
  }

  function bestPriceCandidate(candidates = []) {
    return candidates
      .filter((candidate) => Number.isFinite(num(candidate?.price)))
      .sort((a, b) => num(a.price) - num(b.price))[0] || null;
  }

  function manualDiscountAvailable() {
    // Глобальная скидка на всю сумму расчёта отключена: корректировки цены
    // должны относиться к конкретным ценовым компонентам, а не к retailTotal целиком.
    return false;
  }

  function manualDiscountInputValid() {
    if (!manualDiscountAvailable()) return true;
    const raw = String(form.manualDiscountInput?.value ?? "").trim();
    if (!raw) return false;
    const value = Number(raw.replace(",", "."));
    if (!Number.isFinite(value) || value < 0 || value > 10) return false;
    return Math.abs(value * 10 - Math.round(value * 10)) < 1e-8;
  }

  function manualDiscountValidationMessage() {
    const raw = String(form.manualDiscountInput?.value ?? "").trim();
    const value = Number(raw.replace(",", "."));
    if (raw && Number.isFinite(value) && value >= 0 && value <= 10 && Math.abs(value * 10 - Math.round(value * 10)) >= 1e-8) {
      return "Ручная скидка: используйте шаг 0,1.";
    }
    return "Ручная скидка: допустимо от 0 до 10.";
  }

  function existingSpecificationItems() {
    if(Array.isArray(window.WoodstockSpecificationContext?.items))return window.WoodstockSpecificationContext.items;
    try {
      const parsed = JSON.parse(sessionStorage.getItem(SPEC_STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function savedOrderEdgeMeters() {
    return existingSpecificationItems().reduce((sum, item) => {
      const edge = item?.edge || null;
      if (!edge || edge.mode === "none") return sum;
      const meters = num(edge.calculatedMeters ?? edge.orderedMeters ?? edge.meters);
      return sum + (Number.isFinite(meters) && meters > 0 ? meters : 0);
    }, 0);
  }

  function applicableEdgeVolumeLevels(orderRunningM) {
    if (!Number.isFinite(orderRunningM) || orderRunningM <= 0) return [];
    return (data?.edgePriceLevels || []).filter((level) => {
      if (level?.scope !== "order_volume") return false;
      const min = num(level.minRunningM);
      const max = num(level.maxRunningM);
      if (Number.isFinite(min) && (level.minExclusive ? orderRunningM <= min : orderRunningM < min)) return false;
      if (Number.isFinite(max) && (level.maxExclusive ? orderRunningM >= max : orderRunningM > max)) return false;
      return true;
    });
  }

  function automaticEdgePrice(priceRow, clientConditionId, orderRunningM) {
    if (!priceRow || typeof priceRow !== "object") return null;
    const retail = num(priceRow.retail);
    const requestedConditionId = clientConditionId || "retail";
    const clientKey = clientConditionPriceKey(requestedConditionId);
    const clientPrice = requestedConditionId === "retail" ? retail : num(priceRow[clientKey]);
    const base = {
      id: requestedConditionId, name: clientConditionUiName(requestedConditionId),
      source: Number.isFinite(clientPrice) ? (requestedConditionId === "retail" ? "retail" : "client") : "missing_client_condition",
      price: Number.isFinite(clientPrice) ? clientPrice : null,
      retailPrice: Number.isFinite(retail) ? retail : null,
      orderRunningM, conditionUnresolved: !Number.isFinite(clientPrice),
      volumePricingDeferred: !window.WoodstockPanelsView?.edgeVolumePricing
    };
    if (!window.WoodstockPanelsView?.edgeVolumePricing || !Number.isFinite(clientPrice)) return base;
    const candidates = applicableEdgeVolumeLevels(orderRunningM)
      .map(level => ({ level, price: num(priceRow[level.priceKey || level.id]) }))
      .filter(candidate => Number.isFinite(candidate.price) && candidate.price < base.price)
      .sort((a, b) => a.price - b.price);
    if (!candidates.length) return base;
    const selected = candidates[0];
    return { ...base, id: selected.level.id, name: selected.level.name, source: "volume", price: selected.price };
  }

  const MULTI_LAYOUT_IDS = new Set(["straight", "diagonal45", "herringbone", "custom"]);

  function allowedLayoutsForType(type = selectedMaterialType()) {
    const layouts = (data?.layouts || []).filter(item => !window.WoodstockPanelsView?.allowLayout || window.WoodstockPanelsView.allowLayout(item));
    return type === "multi" ? layouts.filter((item) => MULTI_LAYOUT_IDS.has(item.id)) : layouts;
  }

  function isLayoutAllowedForType(layoutId, type = selectedMaterialType()) {
    if (!layoutId) return false;
    return allowedLayoutsForType(type).some((item) => item.id === layoutId);
  }

  function syncLayoutOptions({ preserve = true } = {}) {
    const previous = preserve ? form.layoutSelect.value : "";
    const type = selectedMaterialType();
    form.layoutSelect.replaceChildren(new Option("Выберите раскладку", ""));
    allowedLayoutsForType(type).forEach((item) => form.layoutSelect.add(new Option(item.name, item.id)));

    if (type === "multi") {
      form.layoutSelect.value = MULTI_LAYOUT_IDS.has(previous) ? previous : "straight";
      if (!form.layoutSelect.value && MULTI_LAYOUT_IDS.has("straight")) form.layoutSelect.value = "straight";
      return;
    }
    if (previous && isLayoutAllowedForType(previous, type)) form.layoutSelect.value = previous;
  }

  function effectiveLayoutId() {
    const layoutId = form.layoutSelect.value;
    return isLayoutAllowedForType(layoutId) ? layoutId : "";
  }

  function sideBNeedsLayout() {
    if (Number(form.veneeredSidesSelect.value) !== 2 || form.veneerBModeSelect.value === "rough") return false;
    const material = form.veneerBModeSelect.value === "other" ? (selectedVeneerB || selectedVeneerBGroup) : (selectedVeneerA || selectedVeneerAGroup);
    return Boolean(material && !isReadyShirt(material));
  }

  function effectiveLayoutBId() {
    if (!sideBNeedsLayout()) return "";
    return form.layoutBSelect?.value || effectiveLayoutId();
  }

  function syncLayoutBUI() {
    if (!form.layoutBSelect) return;
    const visible = sideBNeedsLayout();
    form.layoutBField.classList.toggle("is-hidden", !visible);
    const material = form.veneerBModeSelect.value === "other" ? (selectedVeneerB || selectedVeneerBGroup) : (selectedVeneerA || selectedVeneerAGroup);
    const type = materialTypeOf(material);
    const previous = form.layoutBSelect.value;
    const allowed = allowedLayoutsForType(type);
    form.layoutBSelect.replaceChildren(new Option("Как на стороне А", ""));
    allowed.forEach(item => form.layoutBSelect.add(new Option(item.name, item.id)));
    if (visible && allowed.some(item => item.id === previous)) form.layoutBSelect.value = previous;
    else form.layoutBSelect.value = "";
    // При разных типах материала раскладка А может быть недоступна для Б.
    if (visible && !form.layoutBSelect.value && effectiveLayoutId() && !isLayoutAllowedForType(effectiveLayoutId(), type)) {
      form.layoutBSelect.value = allowed.some(item => item.id === "straight") ? "straight" : (allowed[0]?.id || "");
    }
  }

  function backLayoutRequiresProduction() {
    const layout = effectiveLayoutBId();
    const definition = data?.layouts.find(item => item.id === layout);
    return sideBNeedsLayout() && Boolean(definition?.requiresProductionCost);
  }

  function sandingEnabled() { return window.WoodstockPanelsView?.automaticOperations || form.sandingSelect?.value !== "no"; }

  function selectedLayout() {
    const layoutId = effectiveLayoutId();
    return layoutId ? (data?.layouts.find((x) => x.id === layoutId) || null) : null;
  }
  function selectedFinish() { return data?.finishOptions.find((x) => x.id === form.finishSelect.value) || null; }

  const ALLOWED_FINISH_IDS = ["none", "lacquer_acrylic", "lacquer_polyurethane", "enamel"];
  const STANDARD_LACQUER_EXECUTION = "standard";
  const GLOSS_100_EXECUTION = "gloss100";

  function allowedFinishOptions() {
    return (data?.finishOptions || []).filter((item) => ALLOWED_FINISH_IDS.includes(item.id));
  }

  function finishOption(id) {
    return (data?.finishOptions || []).find((item) => item.id === id) || null;
  }

  function isLacquerFinish(id) {
    return ["lacquer_acrylic", "lacquer_polyurethane"].includes(id);
  }

  function isAcrylicLacquer(id) {
    return id === "lacquer_acrylic";
  }

  function isPolyurethaneLacquer(id) {
    return id === "lacquer_polyurethane";
  }

  function finishUsesSides(id) {
    return isLacquerFinish(id) || id === "enamel";
  }

  function lacquerTypeIdForFinish(id) {
    if (id === "lacquer_acrylic") return "acrylic";
    if (id === "lacquer_polyurethane") return "polyurethane";
    return "";
  }

  function lacquerExecutionOptions() {
    const configured = data?.finishParameters?.lacquerExecutions;
    if (Array.isArray(configured) && configured.length) return configured;
    return [
      { id: STANDARD_LACQUER_EXECUTION, name: "Обычное лаковое покрытие" },
      { id: GLOSS_100_EXECUTION, name: "Глянец 100%", priceMode: "production" }
    ];
  }

  function lacquerExecutionExists(id) {
    return lacquerExecutionOptions().some((item) => item.id === id);
  }

  function lacquerGlossOptions(id) {
    const technicalTypeId = lacquerTypeIdForFinish(id);
    return data?.finishParameters?.lacquerTypes?.find((item) => item.id === technicalTypeId)?.gloss || [];
  }

  function finishAllowsIsolator(id) {
    return isLacquerFinish(id);
  }

  function isQuickDetailsPanel() {
    return document.body.classList.contains("quick-panels-page") && document.body.dataset.panelScenario === "details";
  }

  let quickPaperBackResetHint = "";

  function syncQuickPaperBack() {
    if (!isQuickStandardPanel() && !isQuickDetailsPanel()) return;
    const thickness = selectedVeneerThickness();
    const base = parseThicknessComposition(currentBaseThicknessRaw()).total;
    const faceReady = faceMaterialSelectionReady();
    const paperAllowed = faceReady && Math.abs(thickness - 0.6) < 0.001 && Number.isFinite(base) && base > 0 && base <= 10;
    if (paperAllowed || !faceReady) quickPaperBackResetHint = "";
    if (!paperAllowed && form.reverseSideSelect.value === "paper") {
      form.reverseSideSelect.value = "rough";
      quickPaperBackResetHint = "Бумага возможна только с лицевым слоем 0,6 мм и основой до 10 мм";
    }
    const paperOption = form.reverseSideSelect.querySelector('option[value="paper"]');
    if (paperOption) {
      paperOption.hidden = !paperAllowed;
      paperOption.disabled = !paperAllowed;
    }
    const selectable = paperAllowed && Number(form.veneeredSidesSelect.value) === 1;
    form.reverseSideField.classList.toggle("is-hidden", !selectable);
    form.veneerSideBGrid.classList.toggle("is-hidden", !selectable);
    const hint = el("quickPaperBackHint");
    if (hint) {
      hint.textContent = quickPaperBackResetHint;
      hint.classList.toggle("is-hidden", !quickPaperBackResetHint);
    }
  }

  function isQuickStandardPanel() {
    return document.body.classList.contains("quick-panels-page") && document.body.dataset.panelScenario === "standard";
  }

  function twoSidedVeneerRequirementMessage() {
    return document.body.classList.contains("quick-panels-page")
      ? "Шпон толщиной 1,5 мм и более требует шпона с двух сторон."
      : "Шпон толщиной 1,5 мм и более требует двух фанерованных сторон.";
  }

  function isQuickWallPanel() {
    return document.body.classList.contains("quick-panels-page") && document.body.dataset.panelScenario === "wall";
  }

  function requiresTwoFaceSides(thickness) {
    return isQuickWallPanel() ? Number.isFinite(thickness) && thickness >= 2 - 0.001 : isAtLeastOnePointFive(thickness);
  }

  let quickWallPaperResetHint = "";

  function syncQuickWallBack() {
    if (!isQuickWallPanel()) return;
    const thickness = selectedVeneerThickness();
    const faceReady = faceMaterialSelectionReady();
    const two = requiresTwoFaceSides(thickness);
    const backExplanation = el("quickWallBackExplanation");
    if (backExplanation) {
      const thin = faceReady && [0.6, 1, 1.5].some(value => Math.abs(thickness - value) < 0.001);
      const thick = faceReady && [2, 2.5].some(value => Math.abs(thickness - value) < 0.001);
      backExplanation.textContent = thin
        ? "Обратная сторона панели закрывается черновым шпоном. Это шпон невысокого качества любой породы. После монтажа он не виден и нужен, чтобы панель не повело"
        : thick
          ? "На обратную сторону клеится более доступный шпон той же толщины, чтобы панель не повело. Он не покрывается лаком и после монтажа не виден"
          : "";
      backExplanation.classList.toggle("is-hidden", !thin && !thick);
    }
    const paperAllowed = faceReady && Math.abs(thickness - 0.6) < 0.001
      && Math.abs(parseThicknessComposition(currentBaseThicknessRaw()).total - 10) < 0.001;
    form.veneeredSidesSelect.value = two ? "2" : "1";
    form.veneeredSidesSelect.disabled = true;
    form.veneeredSidesField.setAttribute("data-quick-hidden", "");
    if (paperAllowed || !faceReady) quickWallPaperResetHint = "";
    if (!paperAllowed && form.reverseSideSelect.value === "paper") {
      quickWallPaperResetHint = thickness >= 1 - 0.001
        ? "Бумага возможна только с лицевым слоем 0,6 мм"
        : "Бумага возможна только на основе 10 мм";
    }
    if (!paperAllowed) form.reverseSideSelect.value = "rough";
    const paperHint = el("quickWallPaperHint");
    if (paperHint) {
      paperHint.textContent = quickWallPaperResetHint;
      paperHint.classList.toggle("is-hidden", !quickWallPaperResetHint);
    }
    form.reverseSideField.classList.toggle("is-hidden", !paperAllowed);
    form.veneerSideBGrid.classList.toggle("is-hidden", !paperAllowed);
    form.veneerBFields.setAttribute("data-quick-hidden", "");
    form.layoutBField?.setAttribute("data-quick-hidden", "");
    if (two && Math.abs(thickness - 2.5) < 0.001) {
      const variants = (data?.veneers || []).filter(item => item.type === "natural"
        && item.group === "ЯСЕНЬ БЕЛЫЙ" && sameConfirmedThickness(itemThickness(item), thickness));
      const back = bestVeneerVariant(variants);
      form.veneerBModeSelect.value = "other";
      selectedVeneerBGroup = back;
      selectedVeneerB = back;
      form.veneerBInput.value = back ? veneerDisplayName(back) : "";
      form.veneerBCutSelect.replaceChildren(new Option(back ? veneerCutLabel(back.veneerCut) : "", back?.veneerCut || ""));
      form.veneerBCutSelect.value = back?.veneerCut || "";
      form.veneerBCutField.classList.add("is-hidden");
    } else {
      form.veneerBModeSelect.value = "same";
      selectedVeneerBGroup = null;
      selectedVeneerB = null;
      form.veneerBInput.value = "";
    }
    globalFinishSidesManual = false;
    form.finishSidesSelect.value = "1 сторона";
    positionFinishState.forEach((state, rowId) => positionFinishState.set(rowId, { ...state, sides: "1 сторона", sidesManual: false }));
  }

  function defaultFinishSides() {
    if (isQuickWallPanel()) return "1 сторона";
    return Number(form.veneeredSidesSelect?.value) === 2 ? "2 стороны" : "1 сторона";
  }

  function finishSideCount(value) {
    if (String(value || "").startsWith("2")) return 2;
    if (String(value || "").startsWith("1")) return 1;
    return 0;
  }

  function availableLacquerProcesses(sides) {
    return (data?.finishParameters?.lacquerProcesses || []).filter((item) => Number.isFinite(num(item?.rates?.[sides])) && (!isQuickWallPanel() || !item.id.endsWith("_back_primer")));
  }

  function syncGlobalFinishSidesWithVeneer() {
    if (globalFinishSidesManual || !form.finishSidesSelect) return;
    const value = defaultFinishSides();
    if ([...form.finishSidesSelect.options].some((option) => option.value === value)) form.finishSidesSelect.value = value;
  }

  function syncPositionFinishSidesWithVeneer() {
    const value = defaultFinishSides();
    positionFinishState.forEach((state, rowId) => {
      if (!state?.sidesManual) positionFinishState.set(rowId, { ...state, sides: value });
    });
  }

  function normalizeFinishConfig(config, { allowInherit = false } = {}) {
    const source = config || {};
    const rawFinishId = source.finishId || "none";
    if (allowInherit && rawFinishId === "inherit") {
      return {
        ...source,
        finishId: "inherit",
        toning: "no",
        lacquerExecution: STANDARD_LACQUER_EXECUTION,
        lacquerGloss: "",
        lacquerProcess: "",
        enamelVariant: "",
        sides: "",
        isolator: "no"
      };
    }

    const finishId = ALLOWED_FINISH_IDS.includes(rawFinishId) ? rawFinishId : "none";
    const lacquer = isLacquerFinish(finishId);
    const acrylic = isAcrylicLacquer(finishId);
    const enamel = finishId === "enamel";
    const sides = finishUsesSides(finishId) ? (isQuickWallPanel() ? "1 сторона" : source.sides || defaultFinishSides()) : "";

    let lacquerExecution = lacquer ? (source.lacquerExecution || STANDARD_LACQUER_EXECUTION) : "";
    if (lacquer && !lacquerExecutionExists(lacquerExecution)) lacquerExecution = STANDARD_LACQUER_EXECUTION;
    const gloss100 = lacquer && lacquerExecution === GLOSS_100_EXECUTION;

    const glossOptions = lacquer && !gloss100 ? lacquerGlossOptions(finishId) : [];
    let lacquerGloss = lacquer && !gloss100 ? (source.lacquerGloss || "") : "";
    if (lacquerGloss && !glossOptions.includes(lacquerGloss)) lacquerGloss = "";

    const lacquerProcesses = acrylic && !gloss100 ? availableLacquerProcesses(sides) : [];
    let lacquerProcess = acrylic && !gloss100 ? (source.lacquerProcess || "") : "";
    if (lacquerProcess && !lacquerProcesses.some((item) => item.id === lacquerProcess)) lacquerProcess = "";

    const enamelVariants = data?.finishParameters?.enamelVariants || [];
    let enamelVariant = enamel ? (source.enamelVariant || "") : "";
    if (enamelVariant && !enamelVariants.includes(enamelVariant)) enamelVariant = "";

    return {
      ...source,
      finishId,
      toning: lacquer && source.toning === "yes" ? "yes" : "no",
      lacquerExecution,
      lacquerGloss,
      lacquerProcess,
      enamelVariant,
      sides,
      isolator: lacquer && source.isolator === "yes" ? "yes" : "no"
    };
  }

  function isGloss100Finish(config) {
    const normalized = normalizeFinishConfig(config);
    return isLacquerFinish(normalized.finishId) && normalized.lacquerExecution === GLOSS_100_EXECUTION;
  }

  function finishValidationState(config) {
    if (config?.finishId === "inherit") return { valid: true, issues: [], config };
    const normalized = normalizeFinishConfig(config);
    const issues = [];
    if (isLacquerFinish(normalized.finishId) && normalized.lacquerExecution !== GLOSS_100_EXECUTION) {
      if (!normalized.lacquerGloss) {
        issues.push({ field: "gloss", message: "Выберите степень блеска." });
      }
      if (isAcrylicLacquer(normalized.finishId) && !normalized.lacquerProcess) {
        issues.push({ field: "process", message: "Выберите технологическую схему лака." });
      }
    }
    if (normalized.finishId === "enamel" && !normalized.enamelVariant) {
      issues.push({ field: "enamel", message: "Выберите технологическую схему эмали." });
    }
    return { valid: issues.length === 0, issues, config: normalized };
  }

  function finishSummary(config) {
    const normalized = normalizeFinishConfig(config);
    if (normalized.finishId === "none") return "Не требуется";
    const parts = [];
    if (isGloss100Finish(normalized)) {
      parts.push("Глянец 100%");
    } else {
      const option = finishOption(normalized.finishId);
      parts.push(option?.name || "Финиш");
    }
    if (normalized.sides) parts.push(normalized.sides);
    if (isLacquerFinish(normalized.finishId)) {
      if (!isGloss100Finish(normalized) && normalized.lacquerGloss) parts.push(`${normalized.lacquerGloss}`);
      if (isAcrylicLacquer(normalized.finishId) && !isGloss100Finish(normalized)) {
        const process = data?.finishParameters?.lacquerProcesses?.find((item) => item.id === normalized.lacquerProcess);
        if (process?.name) parts.push(process.name);
      }
      if (normalized.toning === "yes") parts.push("тонировка");
      if (normalized.isolator === "yes") parts.push("изолятор");
    }
    if (normalized.finishId === "enamel" && normalized.enamelVariant) parts.push(normalized.enamelVariant);
    return parts.join(" · ");
  }

  function finishRateInfo(config) {
    const normalized = normalizeFinishConfig(config);
    if (normalized.finishId === "none") return { rate: 0, note: "" };
    if (isGloss100Finish(normalized)) return null;
    if (isAcrylicLacquer(normalized.finishId)) {
      const process = data?.finishParameters?.lacquerProcesses?.find((item) => item.id === normalized.lacquerProcess);
      const rate = num(process?.rates?.[normalized.sides]);
      if (!Number.isFinite(rate)) return null;
      return { rate, note: `${process.name} · ${normalized.sides}` };
    }
    if (isPolyurethaneLacquer(normalized.finishId)) return null;
    if (normalized.finishId === "enamel") {
      const rate = num(data?.finishRates?.enamel?.[normalized.enamelVariant]?.[normalized.sides]);
      if (!Number.isFinite(rate)) return null;
      return { rate, note: `${normalized.enamelVariant} · ${normalized.sides}` };
    }
    return null;
  }

  function currentGlobalFinishConfig() {
    return normalizeFinishConfig({
      finishId: form.finishSelect.value || "none",
      toning: form.toningSelect?.value || "no",
      lacquerExecution: form.lacquerExecutionSelect?.value || STANDARD_LACQUER_EXECUTION,
      lacquerGloss: form.lacquerGlossSelect.value || "",
      lacquerProcess: form.lacquerProcessSelect?.value || "",
      enamelVariant: form.enamelVariantSelect.value || "",
      sides: form.finishSidesSelect.value || "",
      isolator: form.isolatorSelect.value || "no"
    });
  }

  function finishConfigForPersistence(config) {
    const normalized = normalizeFinishConfig(config);
    if (isGloss100Finish(normalized)) {
      return {
        finishId: "lacquer",
        finishType: "lacquer",
        lacquerType: null,
        lacquerExecution: GLOSS_100_EXECUTION,
        lacquerGloss: "",
        lacquerProcess: "",
        enamelVariant: "",
        sides: normalized.sides || "",
        toning: normalized.toning === "yes" ? "yes" : "no",
        isolator: normalized.isolator === "yes" ? "yes" : "no"
      };
    }

    return {
      ...normalized,
      finishType: isLacquerFinish(normalized.finishId) ? "lacquer" : normalized.finishId,
      lacquerType: isLacquerFinish(normalized.finishId) ? (lacquerTypeIdForFinish(normalized.finishId) || null) : null
    };
  }

  function priceOverride(id, automaticPercent = 0) {
    const stored = priceAdjustmentOverrides.get(id);
    return Number.isFinite(stored) && stored >= 0 ? stored : automaticPercent;
  }

  function clearPriceOverrides(prefix) {
    [...priceAdjustmentOverrides.keys()].forEach((key) => {
      if (String(key).startsWith(prefix)) priceAdjustmentOverrides.delete(key);
    });
  }

  function automaticVeneerWastePercent({ layoutId, classificationId, size }) {
    const complexMinimum = num(data?.meta?.complexLayoutMinimumVeneerWastePercent);
    const minimumComplex = Number.isFinite(complexMinimum) ? complexMinimum : 100;
    if (layoutId === "diagonal45") {
      const configured = num(data?.meta?.diagonalVeneerWastePercent);
      return Math.max(minimumComplex, Number.isFinite(configured) ? configured : minimumComplex);
    }
    if (layoutId === "herringbone") {
      const configured = num(data?.meta?.herringboneVeneerWastePercent);
      return Math.max(minimumComplex, Number.isFinite(configured) ? configured : minimumComplex);
    }
    if (layoutId === "custom") {
      const configured = num(data?.meta?.customLayoutVeneerWastePercent);
      // Для «По ТЗ» фиксированный норматив не обязателен: если его нет в данных,
      // рекомендуемый расход остаётся неопределённым до ввода фактических м² менеджером.
      return Number.isFinite(configured) ? configured : null;
    }
    // Для MixMatch оплачиваемая площадь задаётся отдельным фактическим объёмом шпона.
    // Дополнительный процент отхода здесь не применяется, чтобы не задваивать расход.
    if (layoutId === "mixmatch") return 0;
    // Для полуфабриката +20 фиксированный норматив расхода шпона не подтверждён.
    // Фактические м² вводит менеджер; исключение — сложные раскладки выше, где подтверждён минимум 100%.
    if (manufacturingTypeForSize(size) === "allowance20") return null;
    if (cleanCuttingRequired(size)) {
      const configured = num(data?.meta?.exactSizeVeneerWastePercent);
      return Number.isFinite(configured) ? configured : 80;
    }
    if (["book", "straight", "turn180"].includes(layoutId)) {
      const configured = num(data?.meta?.standardLayoutVeneerWastePercent);
      return Number.isFinite(configured) ? configured : 60;
    }
    if (classificationId === "nonstandard") {
      const configured = num(data?.meta?.nonstandardVeneerWastePercent);
      return Number.isFinite(configured) ? configured : 80;
    }
    return 0;
  }

  function veneerWasteAdjustmentState({ size, classificationId, layoutId, baseAreaPerSideM2 }) {
    const recommendedWastePercent = automaticVeneerWastePercent({ layoutId, classificationId, size });
    const requiredVeneerAreaM2 = Math.max(0, Number(baseAreaPerSideM2) || 0);
    const recommendedVeneerAreaM2 = Number.isFinite(recommendedWastePercent)
      ? requiredVeneerAreaM2 * (1 + recommendedWastePercent / 100)
      : null;

    return {
      applies: requiredVeneerAreaM2 > 0,
      position: size.position,
      rowId: size.rowId,
      classificationId,
      pricingMode: classificationId === "nonstandard" ? "nonstandard" : "standard",
      layoutId,
      requiredVeneerAreaM2,
      recommendedVeneerAreaM2,
      recommendedWastePercent,
      // Legacy aliases are retained for downstream compatibility, but percentages
      // are no longer editable. Manual correction is applied later to material totals.
      netAreaM2: requiredVeneerAreaM2,
      automaticPercent: recommendedWastePercent,
      automaticAreaM2: recommendedVeneerAreaM2
    };
  }

  const MAX_FACE_VENEER_THICKNESS_MM = 4.5;

  function isReadyShirt(item) {
    return Core.isReadyShirt(item);
  }

  function selectedMaterialType() {
    return form.veneerTypeSelect?.value || "";
  }

  function selectedVeneerThickness() {
    const selectedMaterial = selectedVeneerA || selectedVeneerAGroup;
    if (isReadyShirt(selectedMaterial)) return itemThickness(selectedMaterial);
    const value = num(form.veneerThicknessSelect?.value);
    return Number.isFinite(value) && value > 0 && value <= MAX_FACE_VENEER_THICKNESS_MM ? value : null;
  }

  function isExactlyOnePointFive(value) {
    const thickness = num(value);
    return Number.isFinite(thickness) && Math.abs(thickness - 1.5) < 0.001;
  }

  function isAtLeastOnePointFive(value) {
    const thickness = num(value);
    return Number.isFinite(thickness) && thickness >= 1.5 - 0.001;
  }

  function roughBackRates() {
    return data?.meta?.roughBackVeneerRatesPerM2ByThickness || {};
  }

  function confirmedRoughBackThicknesses() {
    return Object.keys(roughBackRates())
      .map((key) => num(key))
      .filter((value) => Number.isFinite(value) && value > 0 && value <= 1.5 + 0.001)
      .sort((a, b) => a - b);
  }

  function selectedRoughBackThickness() {
    const value = num(form.veneerBRoughThicknessSelect?.value);
    return Number.isFinite(value) && value > 0 && value <= 1.5 + 0.001 ? value : null;
  }

  function twoSidedRoughBackSelected() {
    return Number(form.veneeredSidesSelect?.value) === 2 && form.veneerBModeSelect?.value === "rough";
  }

  function roughBackSelected() {
    return twoSidedRoughBackSelected() || (Number(form.veneeredSidesSelect?.value) === 1 && form.reverseSideSelect?.value === "rough");
  }

  function roughBackThicknessForCurrentSelection() {
    return twoSidedRoughBackSelected() ? selectedRoughBackThickness() : selectedVeneerThickness();
  }

  function roughBackRateForThickness(value) {
    const thickness = num(value);
    if (!Number.isFinite(thickness)) return null;
    const entry = Object.entries(roughBackRates()).find(([key]) => {
      const keyThickness = num(key);
      return Number.isFinite(keyThickness) && Math.abs(keyThickness - thickness) < 0.001;
    });
    const rate = entry ? num(entry[1]) : null;
    return Number.isFinite(rate) ? rate : null;
  }

  function setVeneerThicknessError(message = "") {
    const field = form.veneerThicknessSelect?.closest(".field");
    field?.classList.toggle("field--invalid", Boolean(message));
    form.veneerThicknessSelect?.setAttribute("aria-invalid", message ? "true" : "false");
    if (form.veneerThicknessError) form.veneerThicknessError.textContent = message;
  }

  function veneerThicknessOptionsForSelection(item = selectedVeneerAGroup) {
    if (!item) return [];
    if (isReadyShirt(item)) {
      const value = itemThickness(item);
      return Number.isFinite(value) && value > 0 && value <= MAX_FACE_VENEER_THICKNESS_MM ? [value] : [];
    }
    return [...new Set(veneerVariants(item)
      .map(itemThickness)
      .filter((value) => Number.isFinite(value) && value > 0 && value <= MAX_FACE_VENEER_THICKNESS_MM))]
      .sort((a, b) => a - b);
  }

  function validateVeneerThickness() {
    const group = selectedVeneerAGroup;
    if (!group) {
      setVeneerThicknessError("");
      return false;
    }
    if (isReadyShirt(group)) {
      setVeneerThicknessError("");
      return true;
    }
    const thickness = selectedVeneerThickness();
    const allowed = veneerThicknessOptionsForSelection(group);
    if (!Number.isFinite(thickness)) {
      setVeneerThicknessError(addAttempted ? "Выберите толщину лицевого шпона из справочника." : "");
      return false;
    }
    const valid = allowed.some((value) => Math.abs(value - thickness) < 0.001);
    const show = !valid && shouldShowError("veneerThickness", true);
    setVeneerThicknessError(show ? "Выберите доступную толщину выбранного шпона из справочника." : "");
    return valid;
  }

  function updateVeneerAInputAvailability() {
    const type = selectedMaterialType();
    const isReady = type === "ready_shirt";
    form.veneerAInput.disabled = false;
    if (form.veneerAInputLabel) form.veneerAInputLabel.textContent = isReady ? "Готовая рубашка" : (document.body.classList.contains("quick-panels-page") ? "Порода" : "Наименование шпона");
    form.veneerAInput.placeholder = isReady
      ? "Введите наименование или артикул готовой рубашки"
      : type
        ? "Введите название шпона"
        : "Введите наименование шпона";
  }

  function updateVeneerThicknessOptions({ preserve = true } = {}) {
    const group = selectedVeneerAGroup;
    const previous = preserve ? selectedVeneerThickness() : null;
    const values = veneerThicknessOptionsForSelection(group);
    const show = Boolean(group && values.length);
    form.veneerThicknessField.classList.toggle("is-hidden", !show);
    form.veneerSelectionDetailsGrid?.classList.toggle("is-hidden", !group);
    form.veneerThicknessSelect.disabled = !show || values.length === 1;
    form.veneerThicknessSelect.replaceChildren();
    if (!group) {
      form.veneerThicknessSelect.add(new Option("Сначала выберите наименование шпона", ""));
    } else if (!values.length) {
      form.veneerThicknessSelect.add(new Option("Толщина не указана в справочнике", ""));
    } else {
      form.veneerThicknessSelect.add(new Option(values.length === 1 ? "Подтверждённая толщина" : "Выберите толщину лицевого шпона", ""));
      values.forEach((value) => form.veneerThicknessSelect.add(new Option(`${String(value).replace(".", ",")} мм`, String(value))));
    }
    if (values.length === 1) {
      form.veneerThicknessSelect.value = String(values[0]);
    } else if (Number.isFinite(previous) && values.some((value) => Math.abs(value - previous) < 0.001)) {
      form.veneerThicknessSelect.value = String(previous);
    } else {
      form.veneerThicknessSelect.value = "";
    }
    setVeneerThicknessError("");
    updateVeneerAInputAvailability();
  }

  const VENEER_TYPE_ORDER = { natural: 0, design: 1, multi: 2 };

  function veneerDisplayName(item) {
    const name = String(item?.displayName || item?.name || "").trim();
    if (!isReadyShirt(item)) return name;
    const dims = Core.readyShirtDimensions(item);
    return dims ? `${name} — ${dims.lengthMm} × ${dims.widthMm} мм` : name;
  }

  function materialTypeOf(item) {
    return isReadyShirt(item) ? "ready_shirt" : (item?.type || "");
  }

  function veneerGroupKey(item) {
    if (isReadyShirt(item)) return `ready_shirt::${item?.id || veneerDisplayName(item).toLocaleLowerCase("ru")}`;
    return `${item?.type || ""}::${veneerDisplayName(item).toLocaleLowerCase("ru")}`;
  }

  function veneerVariants(item) {
    if (!item) return [];
    if (isReadyShirt(item)) return [item];
    const key = veneerGroupKey(item);
    return data.veneers.filter((x) => veneerGroupKey(x) === key);
  }

  function itemThickness(item) {
    return Core.veneerThicknessFromItem(item);
  }

  function sameConfirmedThickness(a, b) {
    const left = num(a);
    const right = num(b);
    return Number.isFinite(left) && Number.isFinite(right) && left === right;
  }

  function thicknessSourceForItem(item) {
    if (!Number.isFinite(itemThickness(item))) return "";
    return String(item?.thicknessSource || item?.source || "").trim();
  }

  function bestVeneerVariant(items) {
    return [...items].sort((a, b) => {
      const priceDiff = (num(b?.prices?.retail) || 0) - (num(a?.prices?.retail) || 0);
      if (priceDiff) return priceDiff;
      return String(a?.id || "").localeCompare(String(b?.id || ""), "ru");
    })[0] || null;
  }

  const VENEER_CUT_ORDER = { radial: 0, tangential: 1, mixed: 2 };
  const PATTERN_TYPE_TO_CUT = { "Радиальный": "radial", "Тангенциальный": "tangential" };

  function veneerCutLabel(cutId) {
    return data?.veneerCuts?.find((x) => x.id === cutId)?.name || cutId || "";
  }

  function veneerVariantsAtThickness(groupItem, thickness = selectedVeneerThickness()) {
    const variants = veneerVariants(groupItem);
    if (isReadyShirt(groupItem)) return variants;
    if (!Number.isFinite(thickness)) return [];
    return variants.filter((x) => {
      const t = itemThickness(x);
      return Number.isFinite(t) && Math.abs(t - thickness) < 0.001;
    });
  }

  function confirmedPatternTypesForItem(item) {
    if (!item || !["natural", "design"].includes(item.type)) return [];
    const fromPatternTypes = Array.isArray(item.patternTypes)
      ? item.patternTypes.map((name) => PATTERN_TYPE_TO_CUT[String(name || "").trim()]).filter(Boolean)
      : [];
    const fromExistingCut = ["radial", "tangential"].includes(item.veneerCut) ? [item.veneerCut] : [];
    return [...new Set([...fromPatternTypes, ...fromExistingCut])]
      .sort((a, b) => (VENEER_CUT_ORDER[a] ?? 99) - (VENEER_CUT_ORDER[b] ?? 99));
  }

  function confirmedPatternTypes(items) {
    return [...new Set((items || []).flatMap(confirmedPatternTypesForItem))]
      .sort((a, b) => (VENEER_CUT_ORDER[a] ?? 99) - (VENEER_CUT_ORDER[b] ?? 99));
  }

  function bestVeneerVariantForCut(items, cutId = "") {
    if (!cutId || cutId === "mixed") return bestVeneerVariant(items);
    const exact = items.filter((x) => x.veneerCut === cutId);
    if (exact.length) return bestVeneerVariant(exact);
    const confirmed = items.filter((x) => confirmedPatternTypesForItem(x).includes(cutId));
    if (confirmed.length) return bestVeneerVariant(confirmed);
    const cutNeutral = items.filter((x) => !x.veneerCut);
    return bestVeneerVariant(cutNeutral.length ? cutNeutral : items);
  }

  function clearPatternTypeError(which) {
    const field = which === "B" ? form.veneerBCutField : form.veneerCutField;
    const select = which === "B" ? form.veneerBCutSelect : form.veneerCutSelect;
    const error = which === "B" ? form.veneerBCutError : form.veneerCutError;
    field?.classList.remove("field--invalid");
    select?.setAttribute("aria-invalid", "false");
    if (error) error.textContent = "";
  }

  function patternChoiceRequired(variants, cuts) {
    if (cuts.length < 2) return false;
    if (!window.WoodstockPanelsView?.priceSensitivePatterns) return true;
    const prices = cuts.map(cut => num(bestVeneerVariantForCut(variants, cut)?.prices?.retail));
    return new Set(prices).size > 1;
  }

  function syncVeneerCutUI(preserve = true) {
    const group = selectedVeneerAGroup;
    const applies = ["natural", "design"].includes(group?.type);
    const variants = group ? veneerVariantsAtThickness(group) : [];
    const cuts = applies ? confirmedPatternTypes(variants) : [];
    const previous = preserve ? form.veneerCutSelect.value : "";
    const layout = effectiveLayoutId();

    form.veneerCutSelect.innerHTML = '<option value="">Выберите тип рисунка</option>';
    cuts.forEach((cutId) => form.veneerCutSelect.add(new Option(veneerCutLabel(cutId), cutId)));
    clearPatternTypeError("A");

    if (applies && layout === "mixmatch") {
      form.veneerCutField.classList.add("is-hidden");
      form.veneerCutSelect.add(new Option(veneerCutLabel("mixed"), "mixed"));
      form.veneerCutSelect.value = "mixed";
      selectedVeneerA = bestVeneerVariant(variants);
      return;
    }

    if (!applies || !patternChoiceRequired(variants, cuts)) {
      form.veneerCutField.classList.add("is-hidden");
      const onlyCut = cuts.length === 1 ? cuts[0] : "";
      form.veneerCutSelect.value = onlyCut;
      selectedVeneerA = onlyCut ? bestVeneerVariantForCut(variants, onlyCut) : bestVeneerVariant(variants);
      return;
    }

    form.veneerCutField.classList.remove("is-hidden");
    const next = cuts.includes(previous) ? previous : "";
    form.veneerCutSelect.value = next;
    selectedVeneerA = next ? bestVeneerVariantForCut(variants, next) : bestVeneerVariant(variants);
  }

  function onVeneerCutChanged() {
    const variants = veneerVariantsAtThickness(selectedVeneerAGroup);
    selectedVeneerA = bestVeneerVariantForCut(variants, form.veneerCutSelect.value);
    clearPatternTypeError("A");
    updateVeneerBModeLabel();
    syncEdgeVeneerDefaults();
    renderStandardSizes();
    recalc();
  }

  function syncVeneerBCutUI(preserve = true) {
    const group = selectedVeneerBGroup;
    const applies = ["natural", "design"].includes(group?.type);
    const variants = group ? veneerVariantsAtThickness(group, selectedVeneerThickness()) : [];
    const cuts = applies ? confirmedPatternTypes(variants) : [];
    const previous = preserve ? form.veneerBCutSelect.value : "";
    const mixMatch = effectiveLayoutBId() === "mixmatch";

    form.veneerBCutSelect.innerHTML = '<option value="">Выберите тип рисунка</option>';
    cuts.forEach((cutId) => form.veneerBCutSelect.add(new Option(veneerCutLabel(cutId), cutId)));
    clearPatternTypeError("B");

    if (!group) {
      form.veneerBCutField.classList.add("is-hidden");
      form.veneerBCutSelect.value = "";
      selectedVeneerB = null;
      return;
    }

    if (applies && mixMatch) {
      form.veneerBCutField.classList.add("is-hidden");
      form.veneerBCutSelect.add(new Option(veneerCutLabel("mixed"), "mixed"));
      form.veneerBCutSelect.value = "mixed";
      selectedVeneerB = bestVeneerVariant(variants);
      return;
    }

    if (!applies || !patternChoiceRequired(variants, cuts)) {
      form.veneerBCutField.classList.add("is-hidden");
      const onlyCut = cuts.length === 1 ? cuts[0] : "";
      form.veneerBCutSelect.value = onlyCut;
      selectedVeneerB = onlyCut ? bestVeneerVariantForCut(variants, onlyCut) : bestVeneerVariant(variants);
      return;
    }

    form.veneerBCutField.classList.remove("is-hidden");
    const next = cuts.includes(previous) ? previous : "";
    form.veneerBCutSelect.value = next;
    selectedVeneerB = next ? bestVeneerVariantForCut(variants, next) : bestVeneerVariant(variants);
  }

  function onVeneerBCutChanged() {
    const variants = veneerVariantsAtThickness(selectedVeneerBGroup, selectedVeneerThickness());
    selectedVeneerB = bestVeneerVariantForCut(variants, form.veneerBCutSelect.value);
    clearPatternTypeError("B");
    veneerBPriceAuto = true;
    veneerConditionChoices.B = "";
    clearPriceOverrides("veneer:B:");
    recalc();
  }

  function normalizeVeneerCategoryText(item) {
    const text = typeof item === "string"
      ? item
      : `${item?.sourceRawName || ""} ${item?.name || ""}`;
    return String(text)
      .normalize("NFKC")
      .replace(/(^|[^A-Za-zА-Яа-яЁё])([AАaа]{2})(?=$|[^A-Za-zА-Яа-яЁё])/g, (match, prefix, category) =>
        `${prefix}${category.replace(/[Аа]/g, (char) => char === "А" ? "A" : "a")}`
      );
  }

  function isFaceOnlyExtraVeneer(item) {
    const text = normalizeVeneerCategoryText(item);
    return /(?:\bAA\b|extra|экстра)/i.test(text);
  }

  function updateVeneerBModeLabel() {
    const sameOption = form.veneerBModeSelect?.querySelector('option[value="same"]');
    if (!sameOption) return;
    sameOption.textContent = isFaceOnlyExtraVeneer(selectedVeneerA || selectedVeneerAGroup)
      ? "Та же порода, категория B"
      : "Такой же, как сторона А";
  }

  function backsideBVariantFor(item) {
    if (!item || !selectedVeneerAGroup) return null;
    const thickness = itemThickness(item) ?? selectedVeneerThickness();
    const variants = veneerVariantsAtThickness(selectedVeneerAGroup, thickness);
    const bGrade = variants.filter((variant) => {
      const text = String(variant?.sourceRawName || variant?.name || "");
      return /(?:^|[\s/,;])[BВ](?=$|[\s/,;])/i.test(text) && !/(?:^|[\s/,;])[AА][BВ](?=$|[\s/,;])/i.test(text);
    });
    const preferredCut = form.veneerCutSelect?.value;
    const confirmedCuts = confirmedPatternTypes(bGrade);
    if (["radial", "tangential"].includes(preferredCut) && confirmedCuts.includes(preferredCut)) return bestVeneerVariantForCut(bGrade, preferredCut);
    if (confirmedCuts.length === 1) return bestVeneerVariantForCut(bGrade, confirmedCuts[0]);
    return bestVeneerVariant(bGrade);
  }

  function availableVeneers(which = "A") {
    const aThickness = selectedVeneerThickness();
    const typeFilter = which === "A" ? selectedMaterialType() : "";
    const grouped = new Map();
    let candidates = [];

    if (which === "A") {
      if (typeFilter) candidates = (data.veneers || []).filter((item) => item.type === typeFilter);
      else candidates = [...(data.veneers || [])];
    } else {
      if (!Number.isFinite(aThickness)) return [];
      candidates = [...(data.veneers || [])];
    }

    candidates.forEach((item) => {
      if (which === "B") {
        const t = itemThickness(item);
        if (!sameConfirmedThickness(t, aThickness)) return;
      }
      const key = veneerGroupKey(item);
      const current = grouped.get(key);
      if (!current) grouped.set(key, item);
      else grouped.set(key, bestVeneerVariant([current, item]));
    });

    return [...grouped.values()].sort((a, b) => {
      const typeDiff = (VENEER_TYPE_ORDER[materialTypeOf(a)] ?? 99) - (VENEER_TYPE_ORDER[materialTypeOf(b)] ?? 99);
      if (typeDiff) return typeDiff;
      return veneerDisplayName(a).localeCompare(veneerDisplayName(b), "ru", { sensitivity: "base" });
    });
  }

  function normalizeVeneerLookup(value) {
    return String(value || "").trim().toLocaleLowerCase("ru-RU");
  }

  function exactVeneerMatch(items, value) {
    const normalized = normalizeVeneerLookup(value);
    if (!normalized) return null;
    return items.find((item) => normalizeVeneerLookup(veneerDisplayName(item)) === normalized) || null;
  }

  function setAutocompleteError(input, error, message = "") {
    const field = input.closest(".field");
    field?.classList.toggle("field--invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  function setupAutocomplete({ input, menu, clear, error, getItems, getSelected, onSelect, onClear, onInput, validationKey = "" }) {
    const render = () => {
      const q = normalizeVeneerLookup(input.value);
      const items = getItems().filter((x) => !q || normalizeVeneerLookup(veneerDisplayName(x)).includes(q));
      menu.innerHTML = items.length
        ? items.map((item) => `<button class="autocomplete-option" type="button" data-id="${esc(item.id)}" role="option">${esc(veneerDisplayName(item))}</button>`).join("")
        : '<div class="autocomplete-empty">Ничего не найдено</div>';
      menu.classList.remove("is-hidden");
      input.setAttribute("aria-expanded", "true");
    };

    const commitExactMatch = () => {
      const items = getItems();
      const exact = exactVeneerMatch(items, input.value);
      if (!exact) return false;
      const selected = getSelected ? getSelected() : null;
      const selectedName = normalizeVeneerLookup(veneerDisplayName(selected));
      const exactName = normalizeVeneerLookup(veneerDisplayName(exact));
      input.value = veneerDisplayName(exact);
      clear.classList.remove("is-hidden");
      setAutocompleteError(input, error, "");
      if (!selected || selectedName !== exactName) onSelect(exact);
      return true;
    };

    const validateExact = () => {
      const raw = input.value.trim();
      if (!raw) {
        setAutocompleteError(input, error, "");
        return true;
      }
      if (commitExactMatch()) return true;
      setAutocompleteError(input, error, "Выберите точное наименование из справочника.");
      return false;
    };

    input.addEventListener("focus", render);
    input.addEventListener("input", () => {
      clear.classList.toggle("is-hidden", !input.value);
      if (onInput) onInput(input.value);
      setAutocompleteError(input, error, "");
      if (commitExactMatch()) {
        menu.classList.add("is-hidden");
        input.setAttribute("aria-expanded", "false");
      } else {
        render();
      }
    });
    menu.addEventListener("mousedown", (e) => e.preventDefault());
    menu.addEventListener("click", (e) => {
      const button = e.target.closest("[data-id]");
      if (!button) return;
      const item = getItems().find((x) => x.id === button.dataset.id);
      if (!item) return;
      input.value = veneerDisplayName(item);
      clear.classList.remove("is-hidden");
      menu.classList.add("is-hidden");
      input.setAttribute("aria-expanded", "false");
      setAutocompleteError(input, error, "");
      onSelect(item);
    });
    clear.addEventListener("click", () => {
      input.value = "";
      clearTouchedFields(validationKey);
      clear.classList.add("is-hidden");
      menu.classList.add("is-hidden");
      setAutocompleteError(input, error, "");
      onClear();
      input.focus();
    });
    input.addEventListener("blur", () => setTimeout(() => {
      menu.classList.add("is-hidden");
      input.setAttribute("aria-expanded", "false");
      if (input.value.trim()) markFieldTouched(validationKey);
      validateExact();
    }, 120));
  }

  function edgeDefaultVeneer() {
    const material = selectedVeneerA || selectedVeneerAGroup || null;
    // Готовая рубашка не является справочной позицией кромки: не подставляем
    // её название как заказную кромку без отдельного подтверждённого правила.
    return isReadyShirt(material) ? null : material;
  }

  function normalizeEdgeLookup(value) {
    return String(value || "")
      .normalize("NFKC")
      .trim()
      .toLocaleLowerCase("ru-RU")
      .replace(/ё/g, "е")
      .replace(/\s+/g, " ");
  }

  function edgeLookupTokens(value) {
    return normalizeEdgeLookup(value)
      .replace(/[^a-zа-я0-9]+/giu, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function edgeGroupMatchScore(groupName, sourceName) {
    const group = normalizeEdgeLookup(groupName);
    const source = normalizeEdgeLookup(sourceName);
    if (!group || !source) return 0;
    if (group === source) return 10000 + group.length;

    const groupTokens = edgeLookupTokens(group);
    const sourceTokens = new Set(edgeLookupTokens(source));
    if (!groupTokens.length || !groupTokens.every((token) => sourceTokens.has(token))) return 0;

    // Прайс кромки хранит часть пород укрупнённо (например, «Дуб», «Орех»),
    // а шпон — с уточнением породы/декора («Дуб белый», «Орех американский»).
    // Считаем такую позицию тем же прайсовым семейством, но не подменяем
    // более специфичную группу: «Ясень Белый» должен выигрывать у гипотетического «Ясень».
    return groupTokens.length * 100 + group.length;
  }

  function findEdgeNameGroup(typeId, value) {
    if (!typeId || !String(value || "").trim()) return null;
    return edgeNameGroups(typeId)
      .map((item) => ({ item, score: edgeGroupMatchScore(item.displayName, value) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || b.item.displayName.length - a.item.displayName.length)[0]?.item || null;
  }

  function edgeTypeById(typeId) {
    return (data?.edgeTypes || []).find((item) => item.id === typeId) || null;
  }

  function edgeControls(which = "attached") {
    if (which === "separate") {
      return {
        typeSelect: form.separateEdgeTypeSelect,
        materialInput: form.separateEdgeMaterialInput,
        materialSuggestions: form.separateEdgeMaterialSuggestions,
        materialClear: form.separateEdgeMaterialClear,
        materialError: form.separateEdgeMaterialError,
        thicknessField: form.separateEdgeThicknessField,
        thicknessSelect: form.separateEdgeThicknessSelect,
        widthField: form.separateEdgeWidthField,
        widthSelect: form.separateEdgeWidthSelect,
        orderWidthField: form.separateEdgeOrderWidthField,
        orderWidthInput: form.separateEdgeOrderWidthInput,
        orderPriceField: form.separateEdgeOrderPriceField,
        orderPriceInput: form.separateEdgeOrderPriceInput
      };
    }
    return {
      typeSelect: form.edgeTypeSelect,
      materialInput: form.edgeMaterialInput,
      materialSuggestions: form.edgeMaterialSuggestions,
      materialClear: form.edgeMaterialClear,
      materialError: form.edgeMaterialError,
      thicknessField: form.edgeThicknessField,
      thicknessSelect: form.edgeThicknessSelect,
      widthField: form.edgeWidthField,
      widthSelect: form.edgeWidthSelect,
      orderWidthField: form.edgeOrderWidthField,
      orderWidthInput: form.edgeOrderWidthInput,
      orderPriceField: form.edgeOrderPriceField,
      orderPriceInput: form.edgeOrderPriceInput
    };
  }

  function edgeCatalogItems(typeId = "") {
    return (data?.edgeCatalog || []).filter((item) => !typeId || item.typeId === typeId);
  }

  function edgeNameGroups(typeId) {
    const grouped = new Map();
    edgeCatalogItems(typeId).forEach((item) => {
      const label = String(item?.displayName || item?.veneerName || item?.name || "").trim();
      const key = normalizeEdgeLookup(label);
      if (!key || grouped.has(key)) return;
      grouped.set(key, {
        id: `edge_name:${typeId}:${key}`,
        displayName: label,
        veneerName: item.veneerName || label,
        typeId
      });
    });
    return [...grouped.values()].sort((a, b) => a.displayName.localeCompare(b.displayName, "ru", { sensitivity: "base" }));
  }

  function clearEdgeCatalogBinding(which = "attached") {
    const controls = edgeControls(which);
    if (!controls?.materialInput) return;
    delete controls.materialInput.dataset.edgeGroupId;
    delete controls.materialInput.dataset.catalogItemId;
  }

  function edgeNameGroupForInput(which = "attached") {
    const controls = edgeControls(which);
    const typeId = controls.typeSelect?.value || "";
    const groupId = controls.materialInput?.dataset?.edgeGroupId || "";
    if (!typeId) return null;
    // Точное название из прайса распознаётся и при ручном вводе.
    return edgeNameGroups(typeId).find((item) => item.id === groupId)
      || edgeNameGroups(typeId).find((item) => normalizeEdgeLookup(item.displayName) === normalizeEdgeLookup(controls.materialInput.value)) || null;
  }

  function edgeFaceMatch(typeId) {
    return findEdgeNameGroup(typeId, veneerDisplayName(edgeDefaultVeneer()));
  }

  function currentEdgeThickness(which = "attached") {
    const controls = edgeControls(which);
    const type = edgeTypeById(controls.typeSelect?.value);
    if (isQuickWallPanel() && which === "attached") {
      const value = num(controls.thicknessSelect?.value);
      return [0.6, 1, 1.5, 2].includes(value) ? value : null;
    }
    if (!type || type.thicknessMode === "none") return null;
    const value = num(controls.thicknessSelect?.value);
    return Number.isFinite(value) ? value : null;
  }

  function resolveEdgeCatalogItem(which = "attached", options = {}) {
    const controls = edgeControls(which);
    const type = edgeTypeById(controls.typeSelect?.value);
    const group = edgeNameGroupForInput(which);
    if (!type || !group) return null;
    const candidates = edgeCatalogItems(type.id).filter((item) => normalizeEdgeLookup(item.veneerName || item.displayName) === normalizeEdgeLookup(group.displayName));
    const boundId = controls.materialInput?.dataset?.catalogItemId || "";
    const bound = boundId ? candidates.find((item) => item.id === boundId) : null;
    if (type.thicknessMode === "none") return bound || candidates[0] || null;
    const hasOverride = Object.prototype.hasOwnProperty.call(options, "thicknessMm");
    const thickness = hasOverride ? num(options.thicknessMm) : currentEdgeThickness(which);
    if (!Number.isFinite(thickness)) return null;
    if (bound && Number.isFinite(num(bound.thicknessMm)) && Math.abs(num(bound.thicknessMm) - thickness) < 0.001) return bound;
    return candidates.find((item) => Number.isFinite(num(item.thicknessMm)) && Math.abs(num(item.thicknessMm) - thickness) < 0.001) || null;
  }

  function syncEdgeThicknessOptions(which = "attached", { preserve = true } = {}) {
    const controls = edgeControls(which);
    const type = edgeTypeById(controls.typeSelect?.value);
    const previous = preserve ? currentEdgeThickness(which) : null;
    if (isQuickWallPanel() && which === "attached") {
      controls.thicknessSelect.replaceChildren(new Option("Выберите толщину кромки", ""));
      [0.6, 1, 1.5, 2].forEach(value => controls.thicknessSelect.add(new Option(String(value).replace(".", ","), String(value))));
      controls.thicknessField.classList.remove("is-hidden");
      controls.thicknessSelect.disabled = false;
      controls.thicknessSelect.value = [0.6, 1, 1.5, 2].includes(previous) ? String(previous) : "";
      return;
    }
    controls.thicknessSelect.replaceChildren();
    controls.thicknessSelect.add(new Option("Выберите толщину кромки", ""));

    if (!type || type.thicknessMode === "none") {
      controls.thicknessField.classList.add("is-hidden");
      controls.thicknessSelect.disabled = true;
      controls.thicknessSelect.value = "";
      return;
    }

    controls.thicknessField.classList.remove("is-hidden");
    const values = Array.isArray(type.thicknesses) ? type.thicknesses : [];
    values.forEach((value) => controls.thicknessSelect.add(new Option(String(value).replace(".", ","), String(value))));
    if (type.thicknessMode === "fixed" && values.length === 1) {
      controls.thicknessSelect.value = String(values[0]);
      controls.thicknessSelect.disabled = true;
      return;
    }

    controls.thicknessSelect.disabled = false;
    if (Number.isFinite(previous) && values.some((value) => Math.abs(Number(value) - previous) < 0.001)) {
      controls.thicknessSelect.value = String(previous);
    }
  }

  function syncEdgeDefaultForKind(which = "attached") {
    const controls = edgeControls(which);
    const typeId = controls.typeSelect?.value || "";
    const auto = which === "attached" ? attachedEdgeMaterialAuto : separateEdgeMaterialAuto;
    controls.materialInput.disabled = !typeId;
    controls.materialInput.placeholder = typeId ? "Введите наименование кромки" : "Сначала выберите тип кромки";
    if (!typeId) {
      clearEdgeCatalogBinding(which);
      if (auto) {
        controls.materialInput.value = "";
        controls.materialClear.classList.add("is-hidden");
      }
      return;
    }
    if (!auto) return;

    const faceName = veneerDisplayName(edgeDefaultVeneer());
    const match = edgeFaceMatch(typeId);
    const value = match?.displayName || faceName || "";
    controls.materialInput.value = value;
    if (match) controls.materialInput.dataset.edgeGroupId = match.id;
    else clearEdgeCatalogBinding(which);
    controls.materialClear.classList.toggle("is-hidden", !value);
  }

  function syncEdgeWidthOptions(which = "attached", { preserve = true } = {}) {
    const controls = edgeControls(which);
    const type = edgeTypeById(controls.typeSelect?.value);
    const rawName = controls.materialInput.value.trim();
    const group = edgeNameGroupForInput(which);
    const item = resolveEdgeCatalogItem(which);
    const previous = preserve ? num(controls.widthSelect.value) : null;

    controls.widthSelect.replaceChildren();
    if (!type) {
      controls.widthSelect.add(new Option("Сначала выберите тип кромки", ""));
      controls.widthSelect.disabled = true;
      controls.widthField.classList.remove("is-hidden");
      controls.orderWidthField.classList.add("is-hidden");
      controls.orderPriceField?.classList.add("is-hidden");
      clearEdgeCatalogBinding(which);
      return;
    }

    const selectedThickness = currentEdgeThickness(which);
    const knownMaterialWithoutStockItem = Boolean(rawName && group && type.thicknessMode !== "none" && Number.isFinite(selectedThickness) && !item);
    if (rawName && (!group || knownMaterialWithoutStockItem)) {
      controls.widthField.classList.add("is-hidden");
      controls.orderWidthField.classList.remove("is-hidden");
      controls.orderPriceField?.classList.add("is-hidden");
      delete controls.materialInput.dataset.catalogItemId;
      if (edgeWidthAutomatic[which]) {
        const widths = [...new Set((data?.edgeCatalog || []).flatMap((entry) => entry.availableWidths || []))].sort((a, b) => a - b);
        const width = widths.find((value) => edgeWidthFitsProduct(value));
        controls.orderWidthInput.value = width ? String(width) : "";
      }
      return;
    }

    controls.orderWidthField.classList.add("is-hidden");
    controls.orderPriceField?.classList.add("is-hidden");
    controls.widthField.classList.remove("is-hidden");
    if (!rawName) {
      controls.widthSelect.add(new Option("Сначала выберите кромку", ""));
      controls.widthSelect.disabled = true;
      return;
    }
    if (!item) {
      delete controls.materialInput.dataset.catalogItemId;
      controls.widthSelect.add(new Option("Сначала выберите толщину кромки", ""));
      controls.widthSelect.disabled = true;
      return;
    }

    controls.materialInput.dataset.catalogItemId = item.id;
    controls.widthSelect.add(new Option("Выберите ширину кромки", ""));
    const widths = (item.availableWidths || []).filter((width) => edgeWidthFitsProduct(width)).sort((a, b) => a - b);
    widths.forEach((width) => controls.widthSelect.add(new Option(`${width} мм`, String(width))));
    controls.widthSelect.disabled = false;
    if (!edgeWidthAutomatic[which] && Number.isFinite(previous) && widths.includes(previous)) {
      controls.widthSelect.value = String(previous);
    } else if (widths.length) {
      controls.widthSelect.value = String(widths[0]);
      edgeWidthAutomatic[which] = true;
    }
  }

  function syncEdgeVeneerDefaults() {
    syncEdgeDefaultForKind("attached");
    syncEdgeDefaultForKind("separate");
    syncEdgeWidthOptions("attached", { preserve: true });
    syncEdgeWidthOptions("separate", { preserve: true });
  }

  function quickPanelFinishedThicknessMm() {
    if (!isQuickWallPanel() && !isQuickStandardPanel()) return null;
    const base = parseThicknessComposition(currentBaseThicknessRaw()).total;
    const face = selectedVeneerThickness();
    if (!Number.isFinite(base) || base <= 0 || !Number.isFinite(face)) return null;
    const two = Number(form.veneeredSidesSelect.value) === 2;
    const back = two ? calibrationSideBThicknessMm()
      : form.reverseSideSelect.value === "rough" ? roughBackThicknessForCurrentSelection() : null;
    return Number.isFinite(back) ? base + face + back : null;
  }

  function edgeWidthFitsProduct(width) {
    const value = num(width);
    if (!Number.isFinite(value)) return false;
    const finished = quickPanelFinishedThicknessMm();
    return Number.isFinite(finished) ? value + 1e-9 >= finished + 4 : value > minimumAttachedEdgeWidth();
  }

  function minimumAttachedEdgeWidth() {
    const finished = quickPanelFinishedThicknessMm();
    if (Number.isFinite(finished)) return finished;
    const state = calibrationState();
    if (Number.isFinite(state.finishedProductThicknessMm)) return state.finishedProductThicknessMm;
    return state.enabled && state.valid && Number.isFinite(state.baseThicknessAfterCalibrationMm)
      ? state.baseThicknessAfterCalibrationMm
      : (parseThicknessComposition(currentBaseThicknessRaw()).total || 0);
  }

  function edgeSelectionState(which = "attached", options = {}) {
    const controls = edgeControls(which);
    const type = edgeTypeById(controls.typeSelect?.value);
    const rawName = controls.materialInput.value.trim();
    const group = edgeNameGroupForInput(which);
    const hasThicknessOverride = Object.prototype.hasOwnProperty.call(options, "thicknessMm");
    const thickness = hasThicknessOverride ? num(options.thicknessMm) : currentEdgeThickness(which);
    const item = resolveEdgeCatalogItem(which, { thicknessMm: thickness });
    const thicknessRequired = Boolean(type && (type.thicknessMode !== "none" || isQuickWallPanel() && which === "attached"));
    const customOrder = Boolean(type && rawName && (!group || (group && thicknessRequired && Number.isFinite(thickness) && !item)));
    const selectedStockWidth = Object.prototype.hasOwnProperty.call(options, "widthMm") ? num(options.widthMm) : num(controls.widthSelect.value);
    const requestedOrderWidth = Object.prototype.hasOwnProperty.call(options, "widthMm") ? num(options.widthMm) : num(controls.orderWidthInput.value);
    const width = item
      ? selectedStockWidth
      : customOrder
        ? (Number.isFinite(requestedOrderWidth) ? requestedOrderWidth : selectedStockWidth)
        : null;
    const stockProgram = Boolean(item && Number.isFinite(width) && (item.availableWidths || []).some((value) => Number(value) === width));
    const selectedClientConditionId = form.clientConditionSelect.value || "retail";
    const priceRow = stockProgram ? item?.pricesPerRunningM?.[String(width)] : null;
    const orderRunningM = Number.isFinite(num(options.orderRunningM)) ? num(options.orderRunningM) : null;
    const automaticPrice = stockProgram ? automaticEdgePrice(priceRow, selectedClientConditionId, orderRunningM) : null;
    const manualOrderPricePerM2 = customOrder ? num(controls.orderPriceInput?.value) : null;
    const manualOrderPricePerRunningM = customOrder && Number.isFinite(manualOrderPricePerM2) && Number.isFinite(width)
      ? manualOrderPricePerM2 * width / 1000
      : null;
    const conditionId = customOrder ? "manual_order_price" : (automaticPrice?.id || selectedClientConditionId || "retail");
    const conditionName = customOrder ? "Цена заказной кромки по согласованию" : (automaticPrice?.name || clientConditionUiName(selectedClientConditionId));
    const conditionSource = customOrder ? "manual_order_price" : (automaticPrice?.source || "missing_price");
    const pricePerRunningM = customOrder ? manualOrderPricePerRunningM : num(automaticPrice?.price);
    const retailPricePerRunningM = customOrder ? manualOrderPricePerRunningM : num(priceRow?.retail);
    const volumePriceLevels = stockProgram ? {
      volume1000_2999: Number.isFinite(num(priceRow?.volume1000_2999)) ? num(priceRow.volume1000_2999) : null,
      volume2999_4999: Number.isFinite(num(priceRow?.volume2999_4999)) ? num(priceRow.volume2999_4999) : null,
      volume5000_plus: Number.isFinite(num(priceRow?.volume5000_plus)) ? num(priceRow.volume5000_plus) : null
    } : null;

    let operationRateClass = type?.operationRateClass || null;
    if (operationRateClass === "by_thickness") {
      operationRateClass = Number.isFinite(thickness) && thickness <= 1 ? "thin"
        : Number.isFinite(thickness) && thickness >= 1.5 ? "thick"
          : null;
    }

    let validationError = "";
    if (!type) validationError = "Выберите тип кромки.";
    else if (!rawName) validationError = "Выберите или укажите шпон / наименование кромки.";
    else if (thicknessRequired && !Number.isFinite(thickness)) validationError = "Выберите толщину кромки.";
    else if (!Number.isFinite(width) || width <= 0) validationError = "Выберите или укажите ширину кромки.";

    if (!validationError && customOrder && Number.isFinite(manualOrderPricePerM2) && manualOrderPricePerM2 < 0) validationError = "Цена заказной кромки не может быть отрицательной.";
    if (!validationError && (which === "attached" || isQuickStandardPanel() && which === "separate") && Number.isFinite(width) && !edgeWidthFitsProduct(width)) validationError = Number.isFinite(quickPanelFinishedThicknessMm())
      ? "Ширина кромки должна быть больше итоговой толщины изделия минимум на 4 мм."
      : "Ширина кромки должна превышать толщину детали.";

    return {
      which,
      typeId: type?.id || "",
      typeName: type?.name || "",
      name: item?.name || rawName,
      displayName: item?.displayName || rawName,
      veneerName: item?.veneerName || rawName,
      thicknessMm: Number.isFinite(thickness) ? thickness : null,
      thicknessApplicable: thicknessRequired,
      widthMm: Number.isFinite(width) ? width : null,
      hasGlue: isQuickWallPanel() && which === "attached" ? false : item?.hasGlue ?? type?.hasGlue ?? null,
      hasFleece: item?.hasFleece ?? type?.hasFleece ?? null,
      catalogItem: item,
      catalogItemId: item?.id || null,
      stockProgram,
      orderPosition: Boolean(customOrder || (rawName && !stockProgram)),
      customOrder,
      conditionId,
      conditionName,
      conditionSource,
      selectedClientConditionId,
      orderRunningM: Number.isFinite(orderRunningM) ? orderRunningM : null,
      retailPricePerRunningM: Number.isFinite(retailPricePerRunningM) ? retailPricePerRunningM : null,
      pricePerRunningM: Number.isFinite(pricePerRunningM) ? pricePerRunningM : null,
      manualOrderPricePerM2: Number.isFinite(manualOrderPricePerM2) ? manualOrderPricePerM2 : null,
      conditionUnresolved: Boolean(automaticPrice?.conditionUnresolved),
      volumePricingDeferred: Boolean(stockProgram && automaticPrice?.volumePricingDeferred),
      volumePriceLevels,
      volumePriceRanges: stockProgram ? (data.edgePriceLevels || []).filter(level => level.scope === "order_volume").map(level => ({ ...level })) : null,
      operationRateClass,
      valid: !validationError,
      validationError
    };
  }

  function setupEdgeAutocomplete(which = "attached") {
    const controls = edgeControls(which);
    const render = () => {
      const typeId = controls.typeSelect.value;
      const q = normalizeEdgeLookup(controls.materialInput.value);
      const items = edgeNameGroups(typeId).filter((item) => !q || normalizeEdgeLookup(item.displayName).includes(q));
      controls.materialSuggestions.innerHTML = items.length
        ? items.map((item) => `<button class="autocomplete-option" type="button" data-id="${esc(item.id)}" role="option">${esc(item.displayName)}</button>`).join("")
        : '<div class="autocomplete-empty">Нет складской позиции. Можно указать заказную кромку.</div>';
      controls.materialSuggestions.classList.remove("is-hidden");
      controls.materialInput.setAttribute("aria-expanded", "true");
    };

    controls.materialInput.addEventListener("focus", () => {
      if (!controls.materialInput.disabled) render();
    });
    controls.materialInput.addEventListener("input", () => {
      edgeWidthAutomatic[which] = true;
      if (which === "attached") attachedEdgeMaterialAuto = false;
      else separateEdgeMaterialAuto = false;
      clearEdgeCatalogBinding(which);
      controls.materialClear.classList.toggle("is-hidden", !controls.materialInput.value);
      setAutocompleteError(controls.materialInput, controls.materialError, "");
      syncEdgeWidthOptions(which, { preserve: false });
      render();
      recalc();
    });
    controls.materialSuggestions.addEventListener("mousedown", (event) => event.preventDefault());
    controls.materialSuggestions.addEventListener("click", (event) => {
      const button = event.target.closest("[data-id]");
      if (!button) return;
      const item = edgeNameGroups(controls.typeSelect.value).find((candidate) => candidate.id === button.dataset.id);
      if (!item) return;
      edgeWidthAutomatic[which] = true;
      controls.materialInput.value = item.displayName;
      controls.materialInput.dataset.edgeGroupId = item.id;
      delete controls.materialInput.dataset.catalogItemId;
      controls.materialClear.classList.remove("is-hidden");
      controls.materialSuggestions.classList.add("is-hidden");
      controls.materialInput.setAttribute("aria-expanded", "false");
      if (which === "attached") attachedEdgeMaterialAuto = false;
      else separateEdgeMaterialAuto = false;
      syncEdgeWidthOptions(which, { preserve: false });
      recalc();
    });
    controls.materialClear.addEventListener("click", () => {
      controls.materialInput.value = "";
      clearEdgeCatalogBinding(which);
      controls.materialClear.classList.add("is-hidden");
      controls.materialSuggestions.classList.add("is-hidden");
      if (which === "attached") attachedEdgeMaterialAuto = false;
      else separateEdgeMaterialAuto = false;
      syncEdgeWidthOptions(which, { preserve: false });
      recalc();
      controls.materialInput.focus();
    });
    controls.materialInput.addEventListener("blur", () => setTimeout(() => {
      controls.materialSuggestions.classList.add("is-hidden");
      controls.materialInput.setAttribute("aria-expanded", "false");
    }, 120));
  }

  function onEdgeTypeChanged(which = "attached") {
    edgeWidthAutomatic[which] = true;
    if (which === "attached") attachedEdgeMaterialAuto = true;
    else separateEdgeMaterialAuto = true;
    const controls = edgeControls(which);
    clearEdgeCatalogBinding(which);
    controls.orderWidthInput.value = "";
    if (controls.orderPriceInput) controls.orderPriceInput.value = "";
    syncEdgeThicknessOptions(which, { preserve: false });
    syncEdgeDefaultForKind(which);
    syncEdgeWidthOptions(which, { preserve: false });
    recalc();
  }

  function setSeparateEdgeMetersError(message = "") {
    const field = form.separateEdgeMetersInput?.closest(".field");
    field?.classList.toggle("field--invalid", Boolean(message));
    if (form.separateEdgeMetersError) form.separateEdgeMetersError.textContent = message;
  }

  function setSeparateEdgeMetersWarning(message = "") {
    if (form.separateEdgeMetersWarning) {
      form.separateEdgeMetersWarning.textContent = message;
      form.separateEdgeMetersWarning.classList.toggle("is-hidden", !message);
    }
  }

  function validateSeparateEdgeMetersOnBlur() {
    if (form.edgeModeSelect.value !== "separate") return true;
    const raw = form.separateEdgeMetersInput.value.trim();
    if (isQuickStandardPanel()) {
      separateEdgeMetersManual = true;
      markFieldTouched("separateEdgeMeters");
      const value = num(raw);
      const valid = Number.isFinite(value) && value >= 50;
      recalc();
      setSeparateEdgeMetersError(valid ? "" : "Минимальный заказ кромки 50 пог. м");
      setSeparateEdgeMetersWarning("");
      return valid;
    }
    if (raw) markFieldTouched("separateEdgeMeters");
    if (!raw) {
      separateEdgeMetersManual = false;
      setSeparateEdgeMetersError("");
      setSeparateEdgeMetersWarning("");
      recalc();
      return true;
    }

    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
      setSeparateEdgeMetersWarning("");
      recalc();
      setSeparateEdgeMetersError("Введите положительное числовое значение.");
      return false;
    }

    setSeparateEdgeMetersError("");
    if (value < data.meta.edgeSeparateMinimumRunningM) {
      setSeparateEdgeMetersWarning(`Менее ${data.meta.edgeSeparateMinimumRunningM} пог. м: минимум пока не подтверждён на уровне одной позиции. Проверьте общий метраж заявки.`);
    } else {
      setSeparateEdgeMetersWarning("");
    }
    recalc();
    return true;
  }

  function sizeRowSupportsAttachedEdge(row) {
    return manufacturingTypeForRow(row) === "exact";
  }

  function sizeSupportsAttachedEdge(size) {
    return Boolean(size && isExactFinishedDetail(size));
  }

  function updateAttachedEdgeAvailability() {
    const previousMode = form.edgeModeSelect.value;
    const thickness = physicalBaseThicknessMm();
    const option = form.edgeModeSelect.querySelector('option[value="attached"]');
    const minThickness = num(data?.meta?.edgeMinBaseThicknessMm);
    const maxThickness = num(data?.meta?.edgeMaxBaseThicknessMm);
    const thicknessUnavailable = !Number.isFinite(thickness) ||
      (Number.isFinite(minThickness) && thickness < minThickness) ||
      (Number.isFinite(maxThickness) && thickness > maxThickness);
    const hasEligiblePosition = $$('[data-size-row]', form.sizeRows).some(sizeRowSupportsAttachedEdge);
    const unavailable = thicknessUnavailable || !hasEligiblePosition;
    if (option) option.disabled = unavailable;
    if (unavailable && form.edgeModeSelect.value === "attached") {
      form.edgeModeSelect.value = "none";
      positionEdgeState.clear();
      positionEdgeOverridesEnabled = false;
      if (form.positionEdgeToggle) {
        form.positionEdgeToggle.setAttribute("aria-expanded", "false");
        form.positionEdgeToggle.textContent = "Настроить кромку по позициям";
      }
      form.positionEdgeOverrides?.classList.add("is-hidden");
    }
    return previousMode !== form.edgeModeSelect.value;
  }

  function resetVeneerASelection({ clearInput = true } = {}) {
    selectedVeneerAGroup = null;
    selectedVeneerA = null;
    selectedVeneerBGroup = null;
    selectedVeneerB = null;
    clearPriceOverrides("veneer:A:");
    clearPriceOverrides("veneer:B:");
    clearPriceOverrides("mixmatch:");
    clearPriceOverrides("veneer-actual:");
    veneerAPriceAuto = true;
    veneerBPriceAuto = true;
    veneerConditionChoices.A = "";
    veneerConditionChoices.B = "";
    layoutFieldInteracted = false;
    layoutValidationAttempted = false;
    clearTouchedFields("veneerA", "veneerThickness", "veneeredSides", "veneerB", "veneerBMode", "veneerBRoughThickness", "layout", "layoutTz", "veneerAPrice", "veneerBPrice", "veneerACondition", "veneerBCondition");
    clearTouchedPrefix("veneerActual:");
    if (clearInput) form.veneerAInput.value = "";
    form.veneerAClear.classList.toggle("is-hidden", !form.veneerAInput.value);
    form.veneerAError.textContent = "";
    form.veneerBInput.value = "";
    form.veneerBError.textContent = "";
    form.layoutSelect.value = ["design", "multi"].includes(selectedMaterialType()) ? "straight" : "";
    updateVeneerThicknessOptions({ preserve: false });
    updateVeneerBModeLabel();
    syncEdgeVeneerDefaults();
    syncVeneerCutUI(false);
    syncVeneerBCutUI(false);
    applyVeneerThicknessRules();
    syncMaterialSpecificUI();
  }

  function onVeneerThicknessChanged() {
    markFieldTouched("veneerThickness");
    clearTouchedFields("veneeredSides", "veneerB", "veneerBMode", "veneerBRoughThickness", "layout", "layoutTz");
    clearTouchedPrefix("veneerActual:");
    validateVeneerThickness();
    const thickness = selectedVeneerThickness();

    if (selectedVeneerAGroup) {
      const matches = veneerVariantsAtThickness(selectedVeneerAGroup, thickness).length > 0;
      if (!matches) {
        selectedVeneerA = null;
        selectedVeneerBGroup = null;
        selectedVeneerB = null;
        form.veneerBInput.value = "";
        syncVeneerBCutUI(false);
      }
      syncVeneerCutUI(false);
      updateVeneerBModeLabel();
      syncEdgeVeneerDefaults();
    }

    if (selectedVeneerBGroup) {
      const bMatches = Number.isFinite(thickness) && veneerVariantsAtThickness(selectedVeneerBGroup, thickness).length > 0;
      if (!bMatches) {
        selectedVeneerBGroup = null;
        selectedVeneerB = null;
        form.veneerBInput.value = "";
        form.veneerBError.textContent = "";
        clearTouchedFields("veneerB", "veneerBCut");
        syncVeneerBCutUI(false);
      } else {
        syncVeneerBCutUI(false);
      }
    }

    layoutFieldInteracted = false;
    layoutValidationAttempted = false;
    applyVeneerThicknessRules();
    syncMaterialSpecificUI();
    renderStandardSizes();
    recalc();
  }

  function veneerSheetAreaM2(item) {
    if (item?.priceUnit !== "sheet") return null;
    const dim = item?.sheetDimensionsMm;
    if (!dim || dim.range) return null;
    const width = num(dim.width ?? dim.widthMin);
    const length = num(dim.length);
    if (!Number.isFinite(width) || !Number.isFinite(length) || width <= 0 || length <= 0) return null;
    return width * length / 1_000_000;
  }

  function veneerPricePerM2(item, sourcePrice) {
    const price = num(sourcePrice);
    if (!Number.isFinite(price)) return null;
    if (item?.priceUnit !== "sheet") return price;
    const area = veneerSheetAreaM2(item);
    return Number.isFinite(area) && area > 0 ? price / area : null;
  }

  function veneerPriceFromPerM2(item, pricePerM2) {
    const price = num(pricePerM2);
    if (!Number.isFinite(price) || price <= 0) return null;
    if (item?.priceUnit !== "sheet") return price;
    const area = veneerSheetAreaM2(item);
    return Number.isFinite(area) && area > 0 ? price * area : null;
  }

  function veneerConditionCandidates(item, basis, pricingMode = "standard") {
    if (!item) return [];
    const candidates = [];
    const condition = form.clientConditionSelect.value || "retail";
    if (condition !== "retail") {
      const clientPrice = num(item.prices?.[clientConditionPriceKey(condition)]);
      if (Number.isFinite(clientPrice)) {
        candidates.push({
          id: `client:${condition}`,
          source: "client",
          levelId: condition,
          levelName: clientConditionById(condition)?.name || condition,
          targetPrice: clientPrice
        });
      }
    }

    // Объёмная логика шпона остаётся отдельной подтверждённой механикой.
    // Для нестандарта здесь меняется только применение общего условия клиента.
    if (pricingMode !== "nonstandard") {
      const volumeLevel = Core.automaticVeneerLevel(item, basis.area, basis.sheets);
      if (volumeLevel?.id && volumeLevel.id !== "retail" && Number.isFinite(volumeLevel.price)) {
        candidates.push({
          id: `volume:${volumeLevel.id}`,
          source: "volume",
          levelId: volumeLevel.id,
          levelName: volumeLevel.name,
          targetPrice: volumeLevel.price
        });
      }
    }
    return candidates;
  }

  function automaticVeneerPricing(item, requiredArea, which, pricingMode = "standard", basisOverride = null) {
    if (!item || !Number.isFinite(requiredArea) || requiredArea <= 0) return null;
    const basis = basisOverride && Number.isFinite(num(basisOverride.area))
      ? { area: num(basisOverride.area), sheets: Number.isFinite(num(basisOverride.sheets)) ? num(basisOverride.sheets) : null, exact: basisOverride.exact !== false }
      : Core.veneerVolumeBasis(item, requiredArea);
    const retailPrice = num(item.prices?.retail);
    const retailPricePerM2 = veneerPricePerM2(item, retailPrice);
    const requestedCondition = form.clientConditionSelect.value || "retail";
    const applicable = veneerConditionCandidates(item, basis, pricingMode);

    let selectedCondition = null;
    let conditionUnresolved = false;
    if (requestedCondition !== "retail") {
      selectedCondition = applicable.find((candidate) => candidate.source === "client" && candidate.levelId === requestedCondition) || null;
      conditionUnresolved = !selectedCondition;
    } else {
      const retailCandidate = Number.isFinite(retailPrice)
        ? { id: "retail", source: "retail", levelId: "retail", levelName: "Розничная цена", targetPrice: retailPrice }
        : null;
      const volumeCandidates = applicable.filter((candidate) => candidate.source === "volume" && Number.isFinite(num(candidate.targetPrice)));
      selectedCondition = [retailCandidate, ...volumeCandidates]
        .filter(Boolean)
        .sort((a, b) => num(a.targetPrice) - num(b.targetPrice))[0] || null;
    }

    const levelId = selectedCondition?.levelId || requestedCondition;
    const levelName = selectedCondition?.levelName || clientConditionUiName(requestedCondition);
    const conditionSource = selectedCondition?.source || "missing_client_condition";
    const targetPrice = selectedCondition?.targetPrice;
    const directPriceListLevel = isReadyShirt(item);
    const automaticDiscountPercent = directPriceListLevel
      ? 0
      : Number.isFinite(retailPrice) && retailPrice > 0 && Number.isFinite(targetPrice)
        ? Math.max((1 - targetPrice / retailPrice) * 100, 0)
        : 0;
    const adjustmentId = `veneer:${which}:${item.id || veneerDisplayName(item)}:${levelId}:discount`;
    const requiresPriceAgreement = item.type === "multi" && Number.isFinite(basis.area) && basis.area > 5000;
    const priceAgreementReason = requiresPriceAgreement
      ? `Закупка мультишпона ${round(basis.area, 3)} м² превышает 5000 м²; цена материала согласовывается отдельно.`
      : "";
    if (requiresPriceAgreement) conditionUnresolved = true;
    const finalPrice = !requiresPriceAgreement && Number.isFinite(targetPrice) ? targetPrice : null;
    const finalPricePerM2 = veneerPricePerM2(item, finalPrice);

    return {
      item, requiredArea, basis,
      retailPrice, retailPricePerM2,
      priceSource: "price_list",
      basePricePerM2: retailPricePerM2,
      automaticPrice: finalPrice, finalPrice, finalPricePerM2,
      levelId, levelName, conditionSource, conditionCandidates: applicable, conditionUnresolved, requiresPriceAgreement, priceAgreementReason,
      selectedConditionId: selectedCondition?.id || null, requestedConditionId: requestedCondition,
      adjustmentId, automaticDiscountPercent, discountPercent: automaticDiscountPercent
    };
  }

  function effectiveVeneerPricePerM2(pricing) {
    const conditioned = num(pricing?.finalPricePerM2);
    return Number.isFinite(conditioned) && conditioned > 0 ? conditioned : null;
  }

  function onVeneerASelected(item) {
    if (!item) return;
    const inferredType = materialTypeOf(item);
    if (!inferredType) {
      resetVeneerASelection();
      form.veneerAError.textContent = "Не удалось определить тип выбранного материала.";
      recalc();
      return;
    }

    const typeChanged = form.veneerTypeSelect.value !== inferredType;
    form.veneerTypeSelect.value = inferredType;
    syncLayoutOptions({ preserve: !typeChanged });
    if (["design", "multi"].includes(inferredType)) form.layoutSelect.value = "straight";
    else if (typeChanged) form.layoutSelect.value = "";

    selectedVeneerAGroup = item;
    selectedVeneerA = null;
    selectedVeneerBGroup = null;
    selectedVeneerB = null;
    clearPriceOverrides("veneer:A:");
    clearPriceOverrides("veneer:B:");
    clearPriceOverrides("mixmatch:");
    clearPriceOverrides("veneer-actual:");
    veneerAPriceAuto = true;
    veneerBPriceAuto = true;
    veneerConditionChoices.A = "";
    veneerConditionChoices.B = "";
    layoutFieldInteracted = false;
    layoutValidationAttempted = false;
    clearTouchedFields("veneerThickness", "veneeredSides", "veneerB", "veneerBMode", "veneerBRoughThickness", "layout", "layoutTz", "veneerAPrice", "veneerBPrice", "veneerACondition", "veneerBCondition");
    clearTouchedPrefix("veneerActual:");
    form.veneerBInput.value = "";
    form.veneerBError.textContent = "";
    updateVeneerThicknessOptions({ preserve: false });
    syncVeneerBCutUI(false);
    syncVeneerCutUI(false);
    updateVeneerBModeLabel();
    syncEdgeVeneerDefaults();
    applyVeneerThicknessRules();
    syncMaterialSpecificUI();
    renderStandardSizes();
    recalc();
  }

  function onVeneerBSelected(item) {
    const aThickness = selectedVeneerThickness();
    const bThickness = itemThickness(item);
    if (!Number.isFinite(aThickness)) {
      selectedVeneerBGroup = null;
      selectedVeneerB = null;
      form.veneerBInput.value = "";
      form.veneerBError.textContent = isReadyShirt(selectedVeneerA || selectedVeneerAGroup)
        ? "Для выбора другого материала необходимо указать подтверждённую толщину готовой рубашки"
        : "Для выбора другого материала необходимо указать подтверждённую толщину стороны А.";
      syncVeneerBCutUI(false);
      recalc();
      return;
    }
    if (!sameConfirmedThickness(aThickness, bThickness)) {
      selectedVeneerBGroup = null;
      selectedVeneerB = null;
      form.veneerBInput.value = "";
      form.veneerBError.textContent = "Для второй стороны выберите материал той же толщины";
      syncVeneerBCutUI(false);
      recalc();
      return;
    }
    selectedVeneerBGroup = item;
    veneerBPriceAuto = true;
    veneerConditionChoices.B = "";
    form.veneerBError.textContent = "";
    syncVeneerBCutUI(false);
    syncMaterialSpecificUI();
    recalc();
  }

  function calibrationConfigForBase(base = selectedBase()) {
    return base?.calibration || null;
  }

  function calibrationAvailableForBase(base = selectedBase()) {
    return calibrationConfigForBase(base)?.available === true;
  }

  function calibrationRequiredForBase(base = selectedBase()) {
    return calibrationConfigForBase(base)?.required === true;
  }

  function calibrationRatePerM2PerMm() {
    const rate = num(data?.meta?.calibrationRatePerM2For1Mm);
    return Number.isFinite(rate) && rate > 0 ? rate : null;
  }

  function calibrationSourceBaseThicknessMm() {
    const raw = currentBaseThicknessRaw();
    const sourceOverrides = calibrationConfigForBase()?.sourceThicknessByNominalMm || {};
    const confirmedSource = num(sourceOverrides[normalizeThicknessKey(raw)]);
    const thickness = Number.isFinite(confirmedSource) ? confirmedSource : parseThicknessComposition(raw).total;
    return Number.isFinite(thickness) && thickness > 0 ? thickness : null;
  }

  function calibrationBaseThicknessAfterMm() {
    const value = num(form.calibrationTargetInput?.value);
    return Number.isFinite(value) ? value : null;
  }

  function calibrationDepthFromThicknesses(sourceThicknessMm = calibrationSourceBaseThicknessMm(), baseThicknessAfterMm = calibrationBaseThicknessAfterMm()) {
    if (!Number.isFinite(sourceThicknessMm) || !Number.isFinite(baseThicknessAfterMm)) return null;
    return sourceThicknessMm - baseThicknessAfterMm;
  }

  function syncCalibrationDepthInput() {
    if (!form.calibrationDepthInput) return;
    const depth = calibrationDepthFromThicknesses();
    form.calibrationDepthInput.value = Number.isFinite(depth) ? String(round(depth, 2)) : "";
  }

  function calibrationSideBThicknessMm() {
    if (Number(form.veneeredSidesSelect?.value) !== 2) return null;
    const mode = form.veneerBModeSelect?.value || "same";
    if (mode === "same") return selectedVeneerThickness();
    if (mode === "other") return itemThickness(selectedVeneerB || selectedVeneerBGroup);
    if (mode === "rough") return selectedRoughBackThickness();
    return null;
  }

  function confirmedFinishedThicknessAfterCalibrationMm(baseThicknessAfterMm) {
    if (!Number.isFinite(baseThicknessAfterMm) || Number(form.veneeredSidesSelect?.value) !== 2) return null;
    const sideA = selectedVeneerThickness();
    const sideB = calibrationSideBThicknessMm();
    if (!Number.isFinite(sideA) || !Number.isFinite(sideB)) return null;

    const rules = data?.meta?.calibrationFinishedProductThicknessRules || {};
    const thin = rules.twoSidesThinVeneer || {};
    const thinMin = num(thin.minVeneerThicknessMm);
    const thinMax = num(thin.maxVeneerThicknessMm);
    const thinAddition = num(thin.additionMm);
    const sideAThin = Number.isFinite(thinMin) && Number.isFinite(thinMax) && sideA >= thinMin - 0.001 && sideA <= thinMax + 0.001;
    const sideBThin = Number.isFinite(thinMin) && Number.isFinite(thinMax) && sideB >= thinMin - 0.001 && sideB <= thinMax + 0.001;
    if (sideAThin && sideBThin && Number.isFinite(thinAddition)) return baseThicknessAfterMm + thinAddition;

    const thick = rules.twoSidesThickVeneer || {};
    const thickValue = num(thick.veneerThicknessMm);
    const thickAddition = num(thick.additionMm);
    if (Number.isFinite(thickValue) && Number.isFinite(thickAddition) && Math.abs(sideA - thickValue) < 0.001 && Math.abs(sideB - thickValue) < 0.001) {
      return baseThicknessAfterMm + thickAddition;
    }
    return null;
  }

  function calibrationState(base = selectedBase()) {
    const enabled = window.WoodstockPanelsView?.automaticOperations ? calibrationRequiredForBase(base) : calibrationAvailableForBase(base) && form.calibrationSelect?.value === "yes";
    const sourceBaseThicknessMm = calibrationSourceBaseThicknessMm();
    const baseThicknessAfterCalibrationMm = window.WoodstockPanelsView?.automaticOperations ? null : calibrationBaseThicknessAfterMm();
    const depthMm = calibrationDepthFromThicknesses(sourceBaseThicknessMm, baseThicknessAfterCalibrationMm);
    const valid = !enabled || (
      Number.isFinite(sourceBaseThicknessMm) && sourceBaseThicknessMm > 0 &&
      Number.isFinite(baseThicknessAfterCalibrationMm) && baseThicknessAfterCalibrationMm > 0 &&
      baseThicknessAfterCalibrationMm < sourceBaseThicknessMm &&
      Number.isFinite(depthMm) && depthMm > 0
    );
    return {
      enabled,
      sourceBaseThicknessMm,
      baseThicknessAfterCalibrationMm,
      depthMm,
      valid,
      ratePerM2PerMm: calibrationRatePerM2PerMm(),
      finishedProductThicknessMm: enabled && valid ? confirmedFinishedThicknessAfterCalibrationMm(baseThicknessAfterCalibrationMm) : null
    };
  }

  function operationPriceComesFromProduction(base = selectedBase()) {
    if (!base) return false;
    const automaticBases = Array.isArray(data?.meta?.automaticOperationRateBaseIds)
      ? data.meta.automaticOperationRateBaseIds
      : ["mdf", "dsp"];
    return !automaticBases.includes(base.id);
  }

  function updateCalibrationUI() {
    const base = selectedBase();
    const available = calibrationAvailableForBase(base);
    const required = calibrationRequiredForBase(base);
    form.calibrationFields?.classList.toggle("is-hidden", !available);

    if (!available) {
      form.calibrationSelect.disabled = false;
      form.calibrationSelect.value = "no";
      form.calibrationTargetInput.value = "";
      if (form.calibrationDepthInput) form.calibrationDepthInput.value = "";
      calibrationForcedRequiredBaseId = "";
    } else if (required) {
      if (calibrationForcedRequiredBaseId !== base?.id) {
        form.calibrationTargetInput.value = "";
        if (form.calibrationDepthInput) form.calibrationDepthInput.value = "";
      }
      form.calibrationSelect.value = "yes";
      form.calibrationSelect.disabled = true;
      calibrationForcedRequiredBaseId = base?.id || "";
    } else {
      if (calibrationForcedRequiredBaseId) {
        form.calibrationSelect.value = "no";
        form.calibrationTargetInput.value = "";
        if (form.calibrationDepthInput) form.calibrationDepthInput.value = "";
      }
      form.calibrationSelect.disabled = false;
      calibrationForcedRequiredBaseId = "";
    }

    const active = available && form.calibrationSelect.value === "yes";
    form.calibrationRequiredNote?.classList.toggle("is-hidden", !required);
    form.calibrationTargetField.classList.toggle("is-hidden", !active);
    form.calibrationDepthField?.classList.toggle("is-hidden", !active);
    if (!active) {
      clearValidationFor(form.calibrationTargetInput, "calibrationTarget", form.calibrationTargetError);
    } else syncCalibrationDepthInput();

    if (form.calibrationDepthNote) {
      const rate = calibrationRatePerM2PerMm();
      form.calibrationDepthNote.textContent = Number.isFinite(rate)
        ? `Рассчитывается автоматически: исходная толщина основы − толщина после калибровки. Тариф ${money(rate)}/м² за каждый 1 мм съёма.`
        : "Рассчитывается автоматически: исходная толщина основы − толщина после калибровки.";
    }
  }

  function updateBaseUI() {
    const base = selectedBase();
    const options = baseThicknessOptions(base);

    form.baseThicknessSelect.innerHTML = "";

    if (!base) {
      form.baseThicknessSelect.disabled = true;
      form.baseThicknessSelect.innerHTML = '<option value="">Сначала выберите основу</option>';
    } else {
      form.baseThicknessSelect.disabled = false;
      form.baseThicknessSelect.innerHTML = '<option value="">Выберите толщину</option>' + options.map((value) => {
        const raw = String(value);
        const parsed = parseThicknessComposition(raw);
        const label = parsed.composite && Number.isFinite(parsed.total) ? `${parsed.total} мм (${raw})` : `${raw} мм`;
        return `<option value="${esc(raw)}">${esc(label)}</option>`;
      }).join("");
      if (options.length === 1) form.baseThicknessSelect.value = String(options[0]);
    }

    updateBaseProductionCostHint(); updateThicknessWarnings(); updateEdgeUI(); updateCalibrationUI(); renderStandardSizes(); revalidateCustomSizeRows(); recalc();
  }

  function updateBaseProductionCostHint() {
    const base = selectedBase();
    const thicknessKey = normalizeThicknessKey(currentBaseThicknessRaw());
    const priceMode = base && thicknessKey
      ? data?.baseThicknessPriceModes?.[base.id]?.[thicknessKey]
      : null;
    const scenarios = data?.baseThicknessScenarioPriceModes?.[base?.id]?.[thicknessKey];
    if (scenarios) {
      const sizes = readSizeRows().filter((size) => size.mode && size.length > 0 && size.width > 0);
      const needsProduction = sizes.some((size) => selectedBasePriceMode(size) === "production");
      form.baseProductionCostHint.classList.toggle("is-hidden", sizes.length > 0 && !needsProduction);
      form.baseProductionCostHint.textContent = sizes.length
        ? "Для части выбранных сценариев нет подтверждённой автоматической ставки основы и работы. Их стоимость необходимо получить у производства и добавить на общей странице спецификации. Сценарии с подтверждённой ставкой рассчитываются автоматически."
        : "Для выбранной толщины автоматическая цена подтверждена только для отдельных сценариев изготовления. Источник цены определяется после выбора размера и параметров фанеровки.";
      return;
    }
    const show = priceMode === "production";
    form.baseProductionCostHint.classList.toggle("is-hidden", !show);
    form.baseProductionCostHint.textContent = show
      ? "Для выбранной основы автоматический расчёт производственной стоимости недоступен. Стоимость необходимо уточнить у производства. После получения сумма добавляется на странице общей спецификации и учитывается в итоговой стоимости заказа."
      : "";
  }

  function updateThicknessWarnings() {
    const thickness = parseThicknessComposition(currentBaseThicknessRaw());
    const warningFromKg = Number(data?.meta?.heavyPlateTargetKgMin);
    const composite = Boolean(thickness.composite) &&
      Number.isFinite(thickness.total) &&
      thickness.total >= Number(data?.meta?.thickPlateSplitFromMm);

    const heavy = composite && Number.isFinite(warningFromKg) && $$('[data-size-row]', form.sizeRows).some((row) => {
      const length = num($('[data-size-length]', row)?.value);
      const width = num($('[data-size-width]', row)?.value);
      if (!(length > 0) || !(width > 0)) return false;
      const allowance = customSizeAllowance(row);
      const kg = detailWeightKg(length + allowance, width + allowance);
      return Number.isFinite(kg) && kg >= warningFromKg;
    });

    form.heavyPlateWarning.classList.toggle("is-hidden", !heavy);
    form.heavyPlateWarning.textContent = heavy
      ? "Составная плита имеет большой расчётный вес. Возможность изготовления и формат необходимо подтвердить у производства."
      : "";
  }

  function faceMaterialSelectionReady() {
    if (!selectedVeneerAGroup) return false;
    if (isReadyShirt(selectedVeneerAGroup)) return true;
    return Number.isFinite(selectedVeneerThickness());
  }

  function syncVeneerInfoMessagesVisibility() {
    const visible = [form.readyShirtThicknessWarning, form.mixMatchWarning, form.designLayoutWarning]
      .some((node) => node && !node.classList.contains("is-hidden"));
    form.veneerInfoMessages?.classList.toggle("is-hidden", !visible);
  }

  function applyVeneerThicknessRules() {
    const thickness = selectedVeneerThickness();
    const sideAMaterial = selectedVeneerA || selectedVeneerAGroup;
    const readyShirtWithoutThickness = isReadyShirt(sideAMaterial) && !Number.isFinite(thickness);
    const roughBackAllowed = selectedMaterialType() !== "ready_shirt" && isExactlyOnePointFive(thickness);
    form.reverseSideHint.textContent = "";

    form.readyShirtThicknessWarning.classList.toggle("is-hidden", !readyShirtWithoutThickness);
    form.readyShirtThicknessWarning.textContent = readyShirtWithoutThickness
      ? "Толщина готовой рубашки не указана в справочнике. Количество фанерованных сторон и возможность выбора другого материала для стороны Б требуют уточнения."
      : "";
    syncVeneerInfoMessagesVisibility();

    const otherOption = form.veneerBModeSelect?.querySelector('option[value="other"]');
    if (otherOption) {
      otherOption.disabled = readyShirtWithoutThickness;
      otherOption.textContent = readyShirtWithoutThickness
        ? "Другой материал — нужна подтверждённая толщина"
        : "Другой материал";
    }
    const roughOption = form.veneerBModeSelect?.querySelector('option[value="rough"]');
    if (roughOption) {
      roughOption.hidden = !roughBackAllowed;
      roughOption.disabled = !roughBackAllowed;
    }
    if (!roughBackAllowed && form.veneerBModeSelect.value === "rough") form.veneerBModeSelect.value = "same";

    const roughThicknesses = confirmedRoughBackThicknesses();
    const previousRoughThickness = selectedRoughBackThickness();
    if (form.veneerBRoughThicknessSelect) {
      form.veneerBRoughThicknessSelect.innerHTML = '<option value="">Выберите толщину</option>'
        + roughThicknesses.map((value) => `<option value="${esc(value)}">${esc(String(value).replace(".", ","))} мм</option>`).join("");
      if (Number.isFinite(previousRoughThickness) && roughThicknesses.some((value) => Math.abs(value - previousRoughThickness) < 0.001)) {
        form.veneerBRoughThicknessSelect.value = String(previousRoughThickness);
      }
    }

    if (form.veneerBModeHint) form.veneerBModeHint.textContent = "";
    if (readyShirtWithoutThickness && form.veneerBModeSelect.value === "other") form.veneerBModeSelect.value = "same";

    if (requiresTwoFaceSides(thickness)) {
      form.veneeredSidesSelect.value = "2";
      form.veneeredSidesSelect.disabled = true;
    } else {
      form.veneeredSidesSelect.disabled = false;
    }
    form.veneerBModeSelect.disabled = false;

    const previousReverseSide = form.reverseSideSelect.value;
    form.reverseSideSelect.innerHTML = "";
    form.reverseSideSelect.add(new Option("Черновой шпон", "rough"));
    form.reverseSideSelect.add(new Option("Бумага", "paper"));
    if (["rough", "paper"].includes(previousReverseSide)) form.reverseSideSelect.value = previousReverseSide;
    updateSidesUI();
  }

  function needsLayoutSelection() {
    if (!faceMaterialSelectionReady()) return false;
    const aReady = selectedMaterialType() === "ready_shirt";
    const twoSides = Number(form.veneeredSidesSelect.value) === 2;
    const otherB = twoSides && form.veneerBModeSelect.value === "other";
    const bNeedsLayout = otherB && selectedVeneerBGroup && !isReadyShirt(selectedVeneerBGroup);
    return !aReady || Boolean(bNeedsLayout);
  }

  function syncMaterialSpecificUI() {
    const faceReady = faceMaterialSelectionReady();
    syncLayoutBUI();
    const anySideNeedsTz = layoutNeedsTz(effectiveLayoutId()) || layoutNeedsTz(effectiveLayoutBId());
    form.layoutTzFields.classList.toggle("is-hidden", !anySideNeedsTz);
    if (!anySideNeedsTz) {
      form.layoutTzComment.value = "";
      form.layoutTzFiles.value = "";
      setUploadedFiles(form.layoutTzFiles, []);
      form.layoutTzFileNames.textContent = "Файлы не выбраны";
      form.layoutTzFileNames.classList.add("is-hidden");
      setLayoutTzError(false);
    }
    const layoutNeeded = faceReady && needsLayoutSelection();
    form.layoutField?.classList.toggle("is-hidden", !layoutNeeded);
    if (form.veneerBInputLabel) form.veneerBInputLabel.textContent = "Другой материал — сторона Б";
    if (!layoutNeeded) {
      form.layoutTzFields.classList.add("is-hidden");
      form.mixMatchWarning.classList.add("is-hidden");
      form.designLayoutWarning.classList.add("is-hidden");
      form.veneerCutField.classList.add("is-hidden");
      clearTouchedFields("layout", "layoutTz");
      setLayoutTzError(false);
      if (form.layoutError) form.layoutError.textContent = "";
      form.layoutField?.classList.remove("field--invalid");
    }
    const layoutGridVisible = !form.layoutField?.classList.contains("is-hidden") || !form.veneerCutField?.classList.contains("is-hidden");
    form.veneerLayoutGrid?.classList.toggle("is-hidden", !layoutGridVisible);
    syncVeneerInfoMessagesVisibility();
  }

  function updateSidesUI() {
    syncQuickWallBack();
    updateVeneerBModeLabel();
    const faceReady = faceMaterialSelectionReady();
    form.veneeredSidesField?.classList.toggle("is-hidden", !faceReady);
    const two = faceReady && Number(form.veneeredSidesSelect.value) === 2;
    form.reverseSideField.classList.toggle("is-hidden", !faceReady || two);
    form.veneerBFields.classList.toggle("is-hidden", !two);
    const other = two && form.veneerBModeSelect.value === "other";
    const rough = two && form.veneerBModeSelect.value === "rough";
    form.veneerBSearchField.classList.toggle("is-hidden", !other);
    form.veneerBRoughThicknessField?.classList.toggle("is-hidden", !rough);
    form.veneerSideBGrid?.classList.toggle("is-hidden", !faceReady || two);
    syncQuickWallBack();
    syncQuickPaperBack();
    if (!other) {
      clearTouchedFields("veneerB", "veneerBCut", "veneerBPrice", "veneerBCondition");
      selectedVeneerBGroup = null;
      selectedVeneerB = null;
      form.veneerBInput.value = "";
      form.veneerBError.textContent = "";
      veneerBPriceAuto = true;
      veneerConditionChoices.B = "";
      syncVeneerBCutUI(false);
    }
    if (!rough && form.veneerBRoughThicknessSelect) {
      form.veneerBRoughThicknessSelect.value = "";
      clearTouchedFields("veneerBRoughThickness");
    }
    if (positionFinishOverridesEnabled) capturePositionFinishStateFromDom();
    syncGlobalFinishSidesWithVeneer();
    syncPositionFinishSidesWithVeneer();
    if (positionFinishOverridesEnabled) renderPositionFinishOverrides(false);
    updateLacquerProcessOptions();
    syncMaterialSpecificUI();
    renderStandardSizes();
    recalc();
  }

  function layoutNeedsTz(layoutId) {
    const layout = data?.layouts?.find((item) => item.id === layoutId);
    return Boolean(layout?.requiresTz);
  }

  function layoutHasDescriptionOrFile() {
    return Boolean(form.layoutTzComment.value.trim() || getUploadedFiles(form.layoutTzFiles).length);
  }

  function setLayoutTzError(show) {
    if (!form.layoutTzError) return;
    form.layoutTzError.textContent = show ? "Добавьте описание раскладки или приложите файл." : "";
    form.layoutTzError.classList.toggle("is-hidden", !show);
  }

  function diagonalSizeFits(length, width) {
    const maxLength = num(data?.meta?.diagonal45MaxLengthMm) || 2800;
    const maxWidth = num(data?.meta?.diagonal45MaxWidthMm) || 2070;
    return (length <= maxLength && width <= maxWidth) || (length <= maxWidth && width <= maxLength);
  }

  function updateLayoutUI() {
    const layout = effectiveLayoutId();
    const layoutNeeded = needsLayoutSelection();
    if (layout !== "mixmatch") clearPriceOverrides("mixmatch:");
    clearPriceOverrides("veneer-actual:");
    syncVeneerCutUI(true);
    syncVeneerBCutUI(true);
    syncMaterialSpecificUI();

    const needsTz = (layoutNeeded && layoutNeedsTz(layout)) || layoutNeedsTz(effectiveLayoutBId());
    form.layoutTzFields.classList.toggle("is-hidden", !needsTz);
    if (!needsTz) {
      form.layoutTzComment.value = "";
      form.layoutTzFiles.value = "";
      setUploadedFiles(form.layoutTzFiles, []);
      form.layoutTzFileNames.textContent = "Файлы не выбраны";
      form.layoutTzFileNames.classList.add("is-hidden");
      setLayoutTzError(false);
    }

    renderStandardSizes();
    recalc();
  }

  function updateVeneerLayoutWarnings(result = lastCalculation) {
    const layout = effectiveLayoutId();
    const designContrast = selectedMaterialType() === "design" && ["book", "turn180"].includes(layout);
    form.designLayoutWarning.classList.toggle("is-hidden", !designContrast);
    form.designLayoutWarning.textContent = designContrast
      ? "Для дизайн-шпона рекомендуется прямая раскладка. При перевороте ламелей может появиться выраженный контраст по цвету и рисунку."
      : "";

    const mixMatch = result?.mixMatchVeneerPricing;
    const showMixMatch = layout === "mixmatch" && Boolean(mixMatch?.applies) && Number.isFinite(mixMatch?.actualVeneerAreaM2);
    form.mixMatchWarning.classList.toggle("is-hidden", !showMixMatch);
    form.mixMatchWarning.textContent = showMixMatch
      ? `Для MixMatch заложено: ${round(mixMatch.actualVeneerAreaM2, 2)} м² шпона. Ориентир — минимум ${mixMatch.minimumPacks || 3} пачки; фактический объём можно скорректировать в блоке расчётных условий.`
      : "";
    syncVeneerInfoMessagesVisibility();
  }

  function rawStandardSizesForBase() {
    const base = selectedBase();
    if (!base) return [];
    const rawThickness = currentBaseThicknessRaw();
    const thickness = parseThicknessComposition(rawThickness);
    const byThickness = data?.standardSizesByBaseThickness?.[base.id];
    if (byThickness) {
      if (!Number.isFinite(thickness.total)) return [];
      const normalizedRaw = String(rawThickness ?? "").trim().replace(/\s+/g, "").replace(/,/g, ".");
      // Здесь храним физически ранее подтверждённые форматы для проверки, можно ли изготовить свой размер.
      // Новая таблица стандартов ограничивает статус «стандарт», но отсутствие формата в её списке само по себе
      // не является подтверждённым запретом на изготовление нестандарта.
      const productionFormats = Array.isArray(byThickness[normalizedRaw]) ? byThickness[normalizedRaw] : [];
      const warehouseFormats = base.id === "mdf" && !thickness.composite
        ? data?.warehouseFormatsByThickness?.[String(thickness.total)]
        : null;
      const combined = [
        ...productionFormats,
        ...(Array.isArray(warehouseFormats) ? warehouseFormats : [])
      ];
      const seen = new Set();
      return combined.filter((item) => {
        const key = `${Number(item.length)}x${Number(item.width)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    return Array.isArray(data?.standardSizesByBase?.[base.id]) ? data.standardSizesByBase[base.id] : [];
  }

  function legacyStandardSizesForBase() {
    const base = selectedBase();
    if (!base) return [];
    const rawThickness = currentBaseThicknessRaw();
    const thickness = parseThicknessComposition(rawThickness);
    const normalizedRaw = String(rawThickness ?? "").trim().replace(/\s+/g, "").replace(/,/g, ".");
    const byThickness = data?.standardSizesByBaseThickness?.[base.id];
    const thicknessFormats = byThickness && Array.isArray(byThickness[normalizedRaw])
      ? byThickness[normalizedRaw]
      : [];
    if (thicknessFormats.length) return rawStandardSizesForBase();

    const baseFormats = Array.isArray(data?.standardSizesByBase?.[base.id])
      ? data.standardSizesByBase[base.id]
      : [];
    const warehouseFormats = base.id === "mdf" && Number.isFinite(thickness.total) && !thickness.composite
      ? data?.warehouseFormatsByThickness?.[String(thickness.total)]
      : null;
    const combined = [
      ...baseFormats,
      ...(Array.isArray(warehouseFormats) ? warehouseFormats : [])
    ];
    const seen = new Set();
    return combined.filter((item) => {
      const key = `${Number(item.length)}x${Number(item.width)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function detailWeightKg(length, width) {
    const base = selectedBase();
    const thickness = parseThicknessComposition(currentBaseThicknessRaw());
    const density = base?.weightDensityKgM3?.max;
    if (!Number.isFinite(density) || !Number.isFinite(thickness.total)) return null;
    return (Number(length) / 1000) * (Number(width) / 1000) * (thickness.total / 1000) * density;
  }

  function standardSizesForBase() {
    const base = selectedBase();
    if (!base) return [];

    const rawThickness = currentBaseThicknessRaw();
    const thickness = parseThicknessComposition(rawThickness);
    const normalizedRaw = String(rawThickness ?? "").trim().replace(/\s+/g, "").replace(/,/g, ".");
    const authoritative = data?.authoritativeStandardFormatsByBaseThickness?.[base.id];
    const byThickness = data?.standardSizesByBaseThickness?.[base.id];
    const authoritativeSizes = authoritative && Array.isArray(authoritative[normalizedRaw])
      ? authoritative[normalizedRaw]
      : [];
    const confirmedThicknessSizes = byThickness && Array.isArray(byThickness[normalizedRaw])
      ? byThickness[normalizedRaw]
      : [];
    const warehouseFormats = base.id === "mdf" && Number.isFinite(thickness.total) && !thickness.composite
      ? data?.warehouseFormatsByThickness?.[String(thickness.total)]
      : null;

    // Стандартность определяется объединением подтверждённых данных конкретной пары
    // «основа + толщина». Узкая authoritative-матрица не должна отбрасывать уже
    // подтверждённые стандартные деления из основного справочника.
    const hasPairSpecificData = Boolean(
      (authoritative && Object.prototype.hasOwnProperty.call(authoritative, normalizedRaw)) ||
      (byThickness && Object.prototype.hasOwnProperty.call(byThickness, normalizedRaw)) ||
      Array.isArray(warehouseFormats)
    );
    if (hasPairSpecificData) {
      const seen = new Set();
      return [
        ...authoritativeSizes,
        ...confirmedThicknessSizes,
        ...(Array.isArray(warehouseFormats) ? warehouseFormats : [])
      ].filter((item) => {
        const key = `${Number(item.length)}x${Number(item.width)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    return legacyStandardSizesForBase();
  }

  function physicalStandardSizes() {
    const seen = new Set();
    return standardSizesForBase().filter((size) => {
      const key = `${Number(size.length)}x${Number(size.width)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function sameSizePair(aLength, aWidth, bLength, bWidth) {
    const aL = Number(aLength), aW = Number(aWidth), bL = Number(bLength), bW = Number(bWidth);
    if (![aL, aW, bL, bW].every(Number.isFinite)) return false;
    return (aL === bL && aW === bW) || (aL === bW && aW === bL);
  }

  // Длина — направление волокон. Значения пользователя не переставляем автоматически:
  // для каждой подтверждённой стандартной пары лишь предлагаем обе ориентации.
  function orientedStandardSizes() {
    const seen = new Set();
    const result = [];
    physicalStandardSizes().forEach((size) => {
      const length = Number(size.length);
      const width = Number(size.width);
      if (!Number.isFinite(length) || !Number.isFinite(width)) return;
      const orientations = length === width
        ? [[length, width]]
        : [[length, width], [width, length]];
      orientations.forEach(([orientedLength, orientedWidth]) => {
        const key = `${orientedLength}x${orientedWidth}`;
        if (seen.has(key)) return;
        seen.add(key);
        result.push({ ...size, length: orientedLength, width: orientedWidth });
      });
    });
    return result;
  }

  function orientedProductionFormats(formats = []) {
    return formats.flatMap((format) => [format, { ...format, length: format.width, width: format.length }]);
  }

  function strictSizeFitsFormats(length, width, formats, allowanceMm = 0) {
    const requiredLength = Number(length) + Number(allowanceMm || 0);
    const requiredWidth = Number(width) + Number(allowanceMm || 0);
    if (!Number.isFinite(requiredLength) || !Number.isFinite(requiredWidth)) return false;
    return orientedProductionFormats(formats).some((format) =>
      requiredLength <= Number(format.length) && requiredWidth <= Number(format.width)
    );
  }

  function strictMaxDimensionForFormats(formats, key, allowanceMm = 0) {
    if (!formats.length) return null;
    const max = Math.max(...orientedProductionFormats(formats).map((format) => Number(format[key])).filter(Number.isFinite));
    return Number.isFinite(max) ? Math.max(max - Number(allowanceMm || 0), 0) : null;
  }

  function strictMaxCompanionDimension(otherValue, formats, key, allowanceMm = 0) {
    const otherKey = key === "length" ? "width" : "length";
    const requiredOther = Number(otherValue) + Number(allowanceMm || 0);
    const compatible = orientedProductionFormats(formats).filter((format) => requiredOther <= Number(format[otherKey]));
    if (!compatible.length) return null;
    const max = Math.max(...compatible.map((format) => Number(format[key])).filter(Number.isFinite));
    return Number.isFinite(max) ? Math.max(max - Number(allowanceMm || 0), 0) : null;
  }

  function uniquePhysicalFormats(formats = []) {
    const seen = new Set();
    return (formats || []).filter((format) => {
      const length = Number(format?.length);
      const width = Number(format?.width);
      if (!Number.isFinite(length) || !Number.isFinite(width)) return false;
      const key = `${length}x${width}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function rawFormatsForBaseThicknessKey(baseId, thicknessKey) {
    const normalizedKey = normalizeThicknessKey(thicknessKey);
    const byThickness = data?.standardSizesByBaseThickness?.[baseId];
    const productionFormats = byThickness && Array.isArray(byThickness[normalizedKey]) ? byThickness[normalizedKey] : [];
    const warehouseFormats = baseId === "mdf" && !normalizedKey.includes("+")
      ? data?.warehouseFormatsByThickness?.[String(Number(normalizedKey))]
      : null;
    const combined = [
      ...productionFormats,
      ...(Array.isArray(warehouseFormats) ? warehouseFormats : [])
    ];
    if (combined.length) return uniquePhysicalFormats(combined);
    return uniquePhysicalFormats(data?.standardSizesByBase?.[baseId] || []);
  }

  function isDerivedHalfOrThirdFormat(format, formats) {
    const length = Number(format?.length);
    const width = Number(format?.width);
    if (!Number.isFinite(length) || !Number.isFinite(width)) return false;
    const targetOrientations = [[length, width], [width, length]];
    return (formats || []).some((source) => {
      const sourceLength = Number(source?.length);
      const sourceWidth = Number(source?.width);
      if (!Number.isFinite(sourceLength) || !Number.isFinite(sourceWidth)) return false;
      if (sourceLength === length && sourceWidth === width) return false;
      const sourceOrientations = [[sourceLength, sourceWidth], [sourceWidth, sourceLength]];
      return targetOrientations.some(([targetLong, targetShort]) => sourceOrientations.some(([sourceLong, sourceShort]) => {
        if (Math.abs(targetLong - sourceLong) > 0.001 || sourceShort <= targetShort) return false;
        return [2, 3].some((divider) => Math.abs(sourceShort / divider - targetShort) <= 10);
      }));
    });
  }

  function fullSourceFormatsForThicknessKey(baseId, thicknessKey) {
    const formats = rawFormatsForBaseThicknessKey(baseId, thicknessKey);
    const full = formats.filter((format) => !isDerivedHalfOrThirdFormat(format, formats));
    return full.length ? full : formats;
  }

  function productionSourceFormatsForBase() {
    const base = selectedBase();
    const thickness = parseThicknessComposition(currentBaseThicknessRaw());
    if (!base) return [];

    const explicitFormats = fullSourceFormatsForThicknessKey(base.id, normalizeThicknessKey(currentBaseThicknessRaw()));
    if (explicitFormats.length) return explicitFormats;

    if (thickness.composite && thickness.parts.length) {
      const partKeys = [...new Set(thickness.parts.map((part) => normalizeThicknessKey(part)))];
      const sourceLists = partKeys.map((key) => fullSourceFormatsForThicknessKey(base.id, key));
      if (sourceLists.length && sourceLists.every((list) => list.length)) {
        const common = sourceLists[0].filter((format) => sourceLists.slice(1).every((list) =>
          list.some((candidate) => sameSizePair(format.length, format.width, candidate.length, candidate.width))
        ));
        if (common.length) return uniquePhysicalFormats(common);
      }
    }

    const normalizedRaw = normalizeThicknessKey(currentBaseThicknessRaw());
    const direct = fullSourceFormatsForThicknessKey(base.id, normalizedRaw);
    return direct.length ? direct : uniquePhysicalFormats(rawStandardSizesForBase());
  }

  function sizeFitsProduction(length, width, allowanceMm = 0) {
    const formats = productionSourceFormatsForBase();
    return !formats.length || strictSizeFitsFormats(length, width, formats, allowanceMm);
  }

  function legacyManufacturingType({ mode, resultMode, standardOrderType } = {}) {
    if (resultMode === "allowance20") return "allowance20";
    if (mode === "standard" && standardOrderType !== "exact_detail") return "standard";
    if (mode === "custom" || standardOrderType === "exact_detail" || resultMode === "exact") return "exact";
    return "";
  }

  function manufacturingTypeForRow(row) {
    if (!row) return "";
    const explicit = $('[data-size-manufacturing-type]', row)?.value || "";
    if (["standard", "exact", "allowance20"].includes(explicit)) return explicit;
    const mode = row.dataset.sizeMode || "";
    return legacyManufacturingType({
      mode,
      resultMode: $('[data-size-result]', row)?.value || "",
      standardOrderType: mode === "standard" ? ($('[data-size-standard-order]', row)?.value || "") : null
    });
  }

  function syncLegacySizeFields(row) {
    if (!row) return;
    const mode = row.dataset.sizeMode || "";
    const manufacturingType = manufacturingTypeForRow(row);
    const result = $('[data-size-result]', row);
    const standardOrder = $('[data-size-standard-order]', row);
    if (result) result.value = manufacturingType === "allowance20" ? "allowance20" : "exact";
    if (standardOrder) standardOrder.value = mode === "standard" && manufacturingType === "exact" ? "exact_detail" : "standard_panel";
  }

  function isDetailedPanelCalculation() {
    return !document.body.classList.contains("quick-panels-page");
  }

  function productionFitAllowanceMm(manufacturingType) {
    // Любая готовая деталь и полуфабрикат +20 проверяются по исходному листу
    // с технологическим запасом +20 мм.
    return ["exact", "allowance20"].includes(manufacturingType) ? 20 : 0;
  }

  function finishedDetailTechnologicalLimit(size) {
    if (!size || manufacturingTypeForSize(size) !== "exact") return null;
    if (classifySize(size).id !== "nonstandard") return null;
    if (form.edgeModeSelect.value !== "attached") return null;

    const finish = effectiveFinishForSize(size);
    if (!isLacquerFinish(finish?.finishId)) return null;

    const thickness = parseThicknessComposition(currentBaseThicknessRaw()).total;
    if (!Number.isFinite(thickness)) return null;

    const limits = Array.isArray(data?.meta?.finishedDetailLimits) ? data.meta.finishedDetailLimits : [];
    return limits.find((limit) => (
      thickness >= num(limit?.minThicknessMm) &&
      thickness <= num(limit?.maxThicknessMm)
    )) || null;
  }

  function finishedDetailTechnologicalSizeState(size) {
    const limit = finishedDetailTechnologicalLimit(size);
    if (!limit) return { valid: true, limit: null };

    const biggerSide = Math.max(Number(size.length) || 0, Number(size.width) || 0);
    const smallerSide = Math.min(Number(size.length) || 0, Number(size.width) || 0);
    const maxLength = num(limit.maxLengthMm);
    const maxWidth = num(limit.maxWidthMm);
    const valid = (!Number.isFinite(maxLength) || biggerSide <= maxLength) &&
      (!Number.isFinite(maxWidth) || smallerSide <= maxWidth);
    return { valid, limit };
  }

  function productionCostField() {
    return `<label class="field is-hidden" data-production-cost-field>
      <span class="field__label">Стоимость от производства, ₽ с НДС за позицию</span>
      <input data-size-production-price type="text" inputmode="decimal" autocomplete="off" value="" />
      <span class="field__note" data-production-cost-note>Сумма за всё количество в строке. Только нерассчитанные основа и работы. Уже учтённые материалы и операции в эту сумму не включаются.</span>
      <span class="field__error" data-production-cost-error></span>
    </label>`;
  }
  function parseProductionCost(value) {
    const raw=String(value||'').replace(/\s/g,'');
    if(!/^\d+(?:[.,]\d{1,2})?$/.test(raw))return null;
    const amount=Number(raw.replace(',','.'));
    return Number.isFinite(amount)&&amount>0&&Number.isSafeInteger(Math.round(amount*100))?amount:null;
  }
  function productionCostSignature(item,finish,edge,scope) {
    const rowEdge=edge?.positionSettings?.find(entry=>entry.rowId===item.rowId);
    return JSON.stringify({scope,base:selectedBase()?.id,thickness:normalizeThicknessKey(currentBaseThicknessRaw()),
      veneerA:selectedVeneerA?.id,veneerB:selectedVeneerB?.id,veneerThickness:selectedVeneerThickness(),
      sides:form.veneeredSidesSelect.value,reverse:form.reverseSideSelect.value,backMode:form.veneerBModeSelect.value,
      roughBack:form.veneerBRoughThicknessSelect.value,cut:form.veneerCutSelect.value,backCut:form.veneerBCutSelect.value,
      layout:effectiveLayoutId(),backLayout:effectiveLayoutBId(),layoutComment:form.layoutTzComment.value,layoutFiles:uploadedFileNames(form.layoutTzFiles),
      sanding:sandingEnabled(),calibration:form.calibrationSelect.value,target:num(form.calibrationTargetInput.value),depth:num(form.calibrationDepthInput.value),
      length:item.length,width:item.width,quantity:item.quantity,manufacturing:item.manufacturingType,transition:item.transition,
      comment:item.comment,files:item.files,finish:finish?.config,
      edge:{mode:edge?.mode,type:edge?.typeId,name:edge?.veneerName||edge?.name,sides:rowEdge?.sidesId||edge?.sidesId,
        thickness:rowEdge?.thicknessMm??edge?.thicknessMm,width:rowEdge?.widthMm??edge?.widthMm,bevel:edge?.bevel}
    });
  }

  function sizeRowTemplate(values = {}) {
    const id = `size_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    return `<div class="size-row" data-size-row data-row-id="${id}" data-size-mode="">
      <div class="size-row__header">
        <strong data-size-title>Позиция</strong>
        <span>
          <button class="size-row__remove" data-duplicate-size-row type="button">Дублировать</button>
          <button class="size-row__remove" data-remove-size-row type="button">Удалить</button>
        </span>
      </div>

      <div class="standard-size-list standard-size-list--row">
        <span class="field__label">Стандартные размеры</span>
        <div class="standard-size-values" data-standard-size-values></div>
        <button class="field-action size-row__custom-toggle" data-custom-size-toggle type="button">Указать свой размер</button>
      </div>

      <label class="field is-hidden" data-size-manufacturing-field>
        <span class="field__label">Тип изготовления</span>
        <select data-size-manufacturing-type></select>
        <span class="field__note is-hidden" data-size-allowance-note>Размер изготовления будет увеличен на 20 мм по длине и ширине — по 10 мм с каждой стороны. Чистовой пил выполняет клиент.</span>
      </label>

      <select data-size-standard-order hidden aria-hidden="true">
        <option value="standard_panel">standard_panel</option>
        <option value="exact_detail">exact_detail</option>
      </select>
      <select data-size-result hidden aria-hidden="true">
        <option value="exact">exact</option>
        <option value="allowance20">allowance20</option>
      </select>

      <div class="field-grid field-grid--size-row is-hidden" data-size-fields>
        <label class="field">
          <span class="field__label">Длина, мм — направление волокон</span>
          <input data-size-length type="number" min="1" step="1" value="${esc(values.length || "")}" />
          <span class="field__error" data-size-length-error></span>
        </label>
        <label class="field">
          <span class="field__label">Ширина, мм</span>
          <input data-size-width type="number" min="1" step="1" value="${esc(values.width || "")}" />
          <span class="field__error" data-size-width-error></span>
        </label>
        <label class="field">
          <span class="field__label">Количество, шт.</span>
          <input data-size-quantity type="number" min="1" step="1" inputmode="numeric" value="${esc(values.quantity || "")}" />
          <span class="field__error" data-size-quantity-error></span>
        </label>
      </div>

      <div class="size-row__extra" data-size-extra>
        <label class="toggle-line">
          <input data-size-transition type="checkbox" ${isQuickWallPanel() || isQuickStandardPanel() ? "disabled" : ""} />
          <span>${isQuickWallPanel() ? "Нужен переход рисунка на панелях?" : document.body.classList.contains("quick-panels-page") && document.body.dataset.panelScenario === "details" ? "Нужен переход рисунка на деталях?" : "Переход рисунка"}</span>
        </label>
        <p class="field__error" data-size-transition-quantity-error></p>

        <div class="size-row__details" data-size-details>
          <label class="field">
            <span class="field__label">Комментарий</span>
            <textarea data-size-comment rows="2" placeholder="Комментарий к этой позиции"></textarea>
          </label>
          <label class="field file-upload-box">
            <span class="field__label">Файлы</span>
            <input data-size-files type="file" multiple accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx" />
            <div class="uploaded-files is-hidden" data-size-file-names>Файлы не выбраны</div>
          </label>
          <p class="field__error" data-size-transition-details-error></p>
        </div>
      </div>
      ${productionCostField()}
    </div>`;
  }

  function updateSizeRowIndexes() {
    $$('[data-size-row]', form.sizeRows).forEach((row, index) => {
      const title = $('[data-size-title]', row);
      if (title) title.textContent = `Позиция ${index + 1}`;
      row.dataset.position = String(index + 1);
    });
    updatePositionFinishLabels();
  }

  function updateSizeRemoveButtons() {
    const rows = $$('[data-size-row]', form.sizeRows);
    rows.forEach((row) => {
      const button = $('[data-remove-size-row]', row);
      if (button) button.disabled = rows.length === 1;
    });
    updateSizeRowIndexes();
  }

  function setActiveSizeRow(row) {
    if (!row) return;
    activeSizeRow = row;
    $$('[data-size-row]', form.sizeRows).forEach((x) => x.classList.toggle("is-active", x === row));
  }

  function quantityValueState(row) {
    const input = $('[data-size-quantity]', row);
    const raw = String(input?.value || "").trim();
    const valid = /^\d+$/.test(raw) && Number(raw) >= 1 && Number.isInteger(Number(raw));
    return { raw, value: valid ? Number(raw) : num(raw), valid };
  }

  function setSizeQuantityError(row, message = "") {
    const input = $('[data-size-quantity]', row);
    const field = input?.closest(".field");
    const error = $('[data-size-quantity-error]', row);
    field?.classList.toggle("field--invalid", Boolean(message));
    if (error) error.textContent = message;
  }

  function validateSizeQuantity(row, required = false) {
    const { raw, valid } = quantityValueState(row);
    const key = `sizeQuantity:${row?.dataset?.rowId || ""}`;
    const invalid = (required || raw !== "") && !valid;
    const show = invalid && (addAttempted || (raw !== "" && touchedFields.has(key)));
    setSizeQuantityError(row, show ? "Введите количество целым числом от 1." : "");
    return !invalid;
  }


  function shortTransitionState() {
    const rows = $$('[data-size-row]', form.sizeRows).filter(row => $('[data-size-transition]', row)?.checked);
    const pieces = rows.reduce((sum,row) => {
      const q = quantityValueState(row);
      return sum + (q.valid && num($('[data-size-length]',row)?.value)>0 && num($('[data-size-width]',row)?.value)>0 ? q.value : 0);
    }, 0);
    const described = Boolean(form.commentInput?.value.trim()) || uploadedFileNames(form.filesInput).length > 0 || rows.some(row => Boolean($('[data-size-comment]',row)?.value.trim()) || uploadedFileNames($('[data-size-files]',row)).length > 0);
    return {pieces,described};
  }
  function transitionQuantityMessage() {
    return window.WoodstockPanelsView?.transitionMinimumPieces
      ? "Для перехода рисунка добавьте минимум две детали."
      : "Для перехода рисунка каждая деталь должна быть отдельной позицией. Укажите 1 шт. и добавьте отдельные позиции для остальных деталей.";
  }

  function updateSizeTransitionUI(row) {
    const transition = !isQuickWallPanel() && !isQuickDetailsPanel() && !isQuickStandardPanel() && Boolean($('[data-size-transition]', row)?.checked);
    const quantityState = quantityValueState(row);
    const quantity = quantityState.value;
    const hasDescription = Boolean($('[data-size-comment]', row)?.value.trim()) || uploadedFileNames($('[data-size-files]', row)).length > 0;
    const rowId = row?.dataset?.rowId || "";
    const transitionKey = `sizeTransition:${rowId}`;
    const detailsKey = `sizeTransitionDetails:${rowId}`;
    const quantityError = $('[data-size-transition-quantity-error]', row);
    const detailsError = $('[data-size-transition-details-error]', row);
    const quantityInvalid = transition && (window.WoodstockPanelsView?.transitionMinimumPieces ? shortTransitionState().pieces < window.WoodstockPanelsView.transitionMinimumPieces : quantityState.valid && Number.isFinite(quantity) && quantity > 1);
    const detailsInvalid = !isQuickWallPanel() && transition && !(window.WoodstockPanelsView?.transitionMinimumPieces ? shortTransitionState().described : hasDescription);
    if (quantityError) quantityError.textContent = quantityInvalid && (addAttempted || touchedFields.has(transitionKey))
      ? transitionQuantityMessage()
      : "";
    if (detailsError) detailsError.textContent = detailsInvalid && (addAttempted || touchedFields.has(detailsKey))
      ? "Добавьте описание перехода рисунка или приложите файл."
      : "";
  }

  function updateManufacturingTypeOptions(row, preferred = "") {
    if (!row) return;
    const mode = row.dataset.sizeMode || "";
    const select = $('[data-size-manufacturing-type]', row);
    if (!select) return;

    const current = preferred || select.value || manufacturingTypeForRow(row);
    const options = mode === "standard"
      ? [
          { id: "standard", name: "Стандартная панель (полуфабрикат без чистового пила)" },
          { id: "exact", name: "Готовая деталь (в точный размер)" }
        ]
      : mode === "custom"
        ? [
            { id: "exact", name: "Готовая деталь (в точный размер)" },
            { id: "allowance20", name: "С припуском +20 мм (полуфабрикат без чистового пила)" }
          ]
        : [];

    select.innerHTML = options.map((option) => `<option value="${option.id}">${option.name}</option>`).join("");
    const allowed = new Set(options.map((option) => option.id));
    const fallback = mode === "standard" ? "standard" : mode === "custom" ? "exact" : "";
    select.value = allowed.has(current) ? current : fallback;
    syncLegacySizeFields(row);
  }

  function updateSizeRowAvailability(row) {
    const mode = row.dataset.sizeMode || "";
    const fields = $('[data-size-fields]', row);
    const manufacturingField = $('[data-size-manufacturing-field]', row);
    const allowanceNote = $('[data-size-allowance-note]', row);
    if (mode) updateManufacturingTypeOptions(row);
    const manufacturingType = manufacturingTypeForRow(row);
    fields?.classList.toggle("is-hidden", !mode);
    manufacturingField?.classList.toggle("is-hidden", !mode);
    allowanceNote?.classList.toggle("is-hidden", manufacturingType !== "allowance20");
    updateSizeTransitionUI(row);
  }

  function addSizeRow(values = {}) {
    const wrap = document.createElement("div");
    wrap.innerHTML = sizeRowTemplate(values).trim();
    const row = wrap.firstElementChild;
    form.sizeRows.append(row);
    activeSizeRow = row;
    updateSizeRemoveButtons();
    renderStandardSizesForRow(row);

    const fileInput = $('[data-size-files]', row);
    const fileOutput = $('[data-size-file-names]', row);
    if (fileInput && fileOutput) {
      bindFileInput(fileInput, fileOutput, true);
      fileInput.addEventListener("change", () => {
        markFieldTouched(`sizeTransitionDetails:${row.dataset.rowId || ""}`);
        updateSizeTransitionUI(row);
      });
    }

    if (values.length && values.width) {
      row.dataset.sizeMode = values.sizeInputMode || values.mode || "custom";
      $('[data-size-length]', row).value = values.length;
      $('[data-size-width]', row).value = values.width;
      $('[data-size-quantity]', row).value = values.quantity || "";
      const standardMode = row.dataset.sizeMode === "standard";
      const restoredManufacturingType = values.manufacturingType || legacyManufacturingType({
        mode: row.dataset.sizeMode,
        resultMode: values.resultMode || "exact",
        standardOrderType: values.standardOrderType || "standard_panel"
      });
      updateManufacturingTypeOptions(row, restoredManufacturingType);
      if (standardMode) {
        row.dataset.sourceStandardLength = String(values.sourceStandardLength || values.length);
        row.dataset.sourceStandardWidth = String(values.sourceStandardWidth || values.width);
        const standardExact = manufacturingTypeForRow(row) === "exact";
        $('[data-size-length]', row).readOnly = !standardExact;
        $('[data-size-width]', row).readOnly = !standardExact;
      } else {
        $('[data-size-length]', row).readOnly = false;
        $('[data-size-width]', row).readOnly = false;
      }
    }
    updateSizeRowAvailability(row);
    if (positionFinishOverridesEnabled) renderPositionFinishOverrides();
    recalc();
    return row;
  }

  function duplicateSizeRow(sourceRow) {
    if (!sourceRow) return null;
    capturePositionFinishStateFromDom();
    capturePositionEdgeStateFromDom();
    const values = {
      mode: sourceRow.dataset.sizeMode || "custom",
      sizeInputMode: sourceRow.dataset.sizeMode || "custom",
      manufacturingType: manufacturingTypeForRow(sourceRow),
      length: num($('[data-size-length]', sourceRow)?.value),
      width: num($('[data-size-width]', sourceRow)?.value),
      quantity: num($('[data-size-quantity]', sourceRow)?.value),
      resultMode: $('[data-size-result]', sourceRow)?.value || "exact",
      standardOrderType: $('[data-size-standard-order]', sourceRow)?.value || "standard_panel",
      sourceStandardLength: num(sourceRow.dataset.sourceStandardLength),
      sourceStandardWidth: num(sourceRow.dataset.sourceStandardWidth)
    };
    const sourceFinish = positionFinishState.get(sourceRow.dataset.rowId);
    const sourceEdge = positionEdgeState.get(sourceRow.dataset.rowId);
    const targetRow = addSizeRow(values);
    $('[data-size-transition]', targetRow).checked = Boolean($('[data-size-transition]', sourceRow)?.checked);
    $('[data-size-comment]', targetRow).value = $('[data-size-comment]', sourceRow)?.value || "";

    const sourceFiles = getUploadedFiles($('[data-size-files]', sourceRow));
    const targetFiles = $('[data-size-files]', targetRow);
    const targetFileNames = $('[data-size-file-names]', targetRow);
    if (targetFiles && sourceFiles.length) {
      setUploadedFiles(targetFiles, sourceFiles);
      if (targetFileNames) renderUploadedFiles(targetFiles, targetFileNames, true);
    }

    if (sourceFinish) {
      positionFinishState.set(targetRow.dataset.rowId, {
        ...sourceFinish,
        files: [...(sourceFinish.files || [])]
      });
    }
    if (sourceEdge) positionEdgeState.set(targetRow.dataset.rowId, { ...sourceEdge });

    const productionInput=$('[data-size-production-price]',targetRow);
    if(productionInput){productionInput.value=$('[data-size-production-price]',sourceRow)?.value||'';targetRow.dataset.productionSignature=sourceRow.dataset.productionSignature||'';}
    updateSizeRowAvailability(targetRow);
    updateSizeTransitionUI(targetRow);
    // The new DOM cards still contain defaults. Render the copied state before
    // recalculation captures their values back into the position maps.
    if (positionFinishOverridesEnabled) renderPositionFinishOverrides(false);
    if (positionEdgeOverridesEnabled) renderPositionEdgeOverrides(false);
    recalc();
    return targetRow;
  }

  function readSizeRows() {
    return $$('[data-size-row]', form.sizeRows).map((row, index) => {
      const length = num($('[data-size-length]', row)?.value);
      const width = num($('[data-size-width]', row)?.value);
      const quantityState = quantityValueState(row);
      const quantity = quantityState.value;
      const mode = row.dataset.sizeMode || "";
      const manufacturingType = manufacturingTypeForRow(row);
      const resultMode = manufacturingType === "allowance20" ? "allowance20" : "exact";
      const standardOrderType = mode === "standard" ? (manufacturingType === "exact" ? "exact_detail" : "standard_panel") : null;
      const allowance = manufacturingType === "allowance20" ? 20 : 0;
      const calcLength = allowance && length ? length + allowance : length;
      const calcWidth = allowance && width ? width + allowance : width;
      const productionAllowance = productionFitAllowanceMm(manufacturingType);
      const needsProductionFitCheck = ["exact", "allowance20"].includes(manufacturingType);
      const fitKnown = needsProductionFitCheck && length > 0 && width > 0;
      const productionFitUnconfirmed = isDetailedPanelCalculation() && fitKnown &&
        (!productionSourceFormatsForBase().length || !sizeFitsProduction(length, width, productionAllowance));
      const physicalSizeValid = productionFitUnconfirmed || !needsProductionFitCheck ||
        !(length > 0 && width > 0) || sizeFitsProduction(length, width, productionAllowance);
      const size = {
        row,
        rowId: row.dataset.rowId || "",
        index,
        position: index + 1,
        mode,
        sizeInputMode: mode,
        manufacturingType,
        standardOrderType,
        length,
        width,
        quantity,
        quantityValid: quantityState.valid,
        quantityRaw: quantityState.raw,
        resultMode,
        physicalSizeValid,
        productionFitUnconfirmed,
        calcLength,
        calcWidth,
        transition: !isQuickWallPanel() && !isQuickDetailsPanel() && !isQuickStandardPanel() && Boolean($('[data-size-transition]', row)?.checked),
        comment: $('[data-size-comment]', row)?.value.trim() || "",
        files: uploadedFileNames($('[data-size-files]', row))
      };
      const technologicalState = physicalSizeValid && length > 0 && width > 0
        ? finishedDetailTechnologicalSizeState(size)
        : { valid: true, limit: null };
      size.technologicalSizeValid = technologicalState.valid;
      size.technologicalSizeLimit = technologicalState.limit;
      size.minimumSizeValid = manufacturingType !== "exact" || !(length > 0 && width > 0) || (length >= 50 && width >= 50);
      size.sizeValid = physicalSizeValid && technologicalState.valid && size.minimumSizeValid;
      size.area = length && width && quantity && size.sizeValid ? length * width * quantity / 1_000_000 : 0;
      size.calcArea = calcLength && calcWidth && quantity && size.sizeValid ? calcLength * calcWidth * quantity / 1_000_000 : 0;
      return size;
    });
  }

  function isKnownStandardSize(size) {
    if (!size || !size.length || !size.width) return false;
    return standardSizesForBase().some((item) => (
      sameSizePair(size.length, size.width, item.length, item.width)
    ));
  }

  function isExactFinishedDetail(size) {
    return manufacturingTypeForSize(size) === "exact";
  }

  function cleanCuttingRequired(size) {
    return isExactFinishedDetail(size);
  }

  function transitionPricingState(size) {
    const enabled = !isQuickWallPanel() && !isQuickDetailsPanel() && !isQuickStandardPanel() && Boolean(size?.transition);
    const applies = enabled && isExactFinishedDetail(size);
    const coefficient = applies ? (num(data?.meta?.transitionMarkupCoefficient) || 2.53) : null;
    return { enabled, applies, coefficient };
  }

  function standardCandidateRows() {
    const base = selectedBase(), t = parseThicknessComposition(currentBaseThicknessRaw());
    if (!base || base.id !== "mdf" || !Number.isFinite(t.total) || t.composite || !selectedVeneerA || !sandingEnabled()) return [];
    const sides = Number(form.veneeredSidesSelect.value), layout = effectiveLayoutId(), cut = layout === "mixmatch" ? "mixed" : form.veneerCutSelect.value;
    if (!["book", "mixmatch"].includes(layout)) return [];
    if (sides === 1 && form.reverseSideSelect.value !== "rough") return [];
    if (sides === 2 && form.veneerBModeSelect.value !== "same") return [];
    if (layoutNeedsTz(layout)) return [];
    const sourceNames = new Set(veneerVariants(selectedVeneerA).map((x) => String(x.name || "").toLocaleLowerCase("ru")));
    const warehouseFormats = data?.warehouseFormatsByThickness?.[String(t.total)];
    const allowedWarehouse = (row) => !Array.isArray(warehouseFormats) || warehouseFormats.some((fmt) => (
      sameSizePair(row.lengthMm, row.widthMm, fmt.length, fmt.width)
    ));
    return data.standardMdfItems.filter((x) => x.thicknessMm === t.total && allowedWarehouse(x) && sourceNames.has(String(x.veneerFamily || "").toLocaleLowerCase("ru")) && x.sides === sides && x.layout === layout && (sides !== 2 || x.layoutB === effectiveLayoutBId()) && (layout !== "book" || x.veneerCut === cut));
  }

  function findStandardItem(size) {
    if (manufacturingTypeForSize(size) !== "standard" || !isKnownStandardSize(size)) return null;
    return standardCandidateRows().find((x) => sameSizePair(size.length, size.width, x.lengthMm, x.widthMm)) || null;
  }

  function classifySize(size) {
    const manufacturingType = manufacturingTypeForSize(size);
    if (manufacturingType === "exact") {
      return { id: "nonstandard", name: "Расчёт точного нестандарта", warehouse: null, priceSource: "exact" };
    }
    if (manufacturingType === "allowance20") {
      return { id: "nonstandard", name: "Стоимость производства", warehouse: null, priceSource: "production" };
    }
    if (manufacturingType !== "standard") {
      return { id: "nonstandard", name: "Не определено", warehouse: null, priceSource: "" };
    }

    const warehouse = findStandardItem(size);
    const calibrationMakesToOrder = calibrationAvailableForBase() && form.calibrationSelect?.value === "yes";
    if (warehouse && !calibrationMakesToOrder) {
      return { id: "warehouse_standard", name: "Складская программа", warehouse, priceSource: "warehouse" };
    }

    // Отсутствие складского SKU не меняет тип изготовления:
    // стандартная панель остаётся стандартной и считается как стандарт по запросу.
    return { id: "standard_request", name: "Стандарт по запросу", warehouse: null, priceSource: "standard_request" };
  }

  function renderStandardSizesForRow(row) {
    if (!row) return;
    const target = $('[data-standard-size-values]', row);
    if (!target) return;
    const base = selectedBase();
    const pairs = orientedStandardSizes();
    const sizes = pairs;

    if (!base) {
      target.innerHTML = "<span>Сначала выберите основу</span>";
      return;
    }

    const hasThicknessMap = Boolean(data?.standardSizesByBaseThickness?.[base.id]);
    const thickness = parseThicknessComposition(currentBaseThicknessRaw());
    if (hasThicknessMap && !Number.isFinite(thickness.total)) {
      target.innerHTML = "<span>Сначала выберите толщину основы</span>";
      return;
    }

    if (!pairs.length) {
      target.innerHTML = "<span>Для выбранной толщины стандартные размеры не найдены</span>";
      return;
    }

    const currentLength = num($('[data-size-length]', row)?.value);
    const currentWidth = num($('[data-size-width]', row)?.value);
    const sourceLength = num(row.dataset.sourceStandardLength);
    const sourceWidth = num(row.dataset.sourceStandardWidth);
    const manufacturingType = manufacturingTypeForRow(row);
    const comparisonLength = row.dataset.sizeMode === "standard" && manufacturingType === "exact" && Number.isFinite(sourceLength) ? sourceLength : currentLength;
    const comparisonWidth = row.dataset.sizeMode === "standard" && manufacturingType === "exact" && Number.isFinite(sourceWidth) ? sourceWidth : currentWidth;
    const stillStandard = sizes.some((size) => size.length === comparisonLength && size.width === comparisonWidth);

    if (row.dataset.sizeMode === "standard" && !stillStandard) {
      row.dataset.sizeMode = "custom";
      delete row.dataset.sourceStandardLength;
      delete row.dataset.sourceStandardWidth;
      $('[data-size-length]', row).readOnly = false;
      $('[data-size-width]', row).readOnly = false;
      updateManufacturingTypeOptions(row, "exact");
      updateSizeRowAvailability(row);
    }

    target.innerHTML = pairs.map((size) => {
      const active = row.dataset.sizeMode === "standard" &&
        comparisonLength === size.length &&
        comparisonWidth === size.width;
      return `<div class="standard-size-pair standard-size-pair--single"><button class="standard-size-choice${active ? " is-selected" : ""}" type="button" data-standard-size data-length="${size.length}" data-width="${size.width}">${size.length} × ${size.width}</button></div>`;
    }).join("");
  }

  function renderStandardSizes() {
    $$('[data-size-row]', form.sizeRows).forEach(renderStandardSizesForRow);
  }

  function standardSourceDimensions(row) {
    const sourceLength = num(row?.dataset?.sourceStandardLength);
    const sourceWidth = num(row?.dataset?.sourceStandardWidth);
    return Number.isFinite(sourceLength) && Number.isFinite(sourceWidth) ? { length: sourceLength, width: sourceWidth } : null;
  }

  function syncStandardManufacturingMode(row, { resetExact = true } = {}) {
    if (!row || row.dataset.sizeMode !== "standard") return;
    const lengthInput = $('[data-size-length]', row);
    const widthInput = $('[data-size-width]', row);
    const manufacturingType = manufacturingTypeForRow(row);
    let source = standardSourceDimensions(row);
    if (!source) {
      const length = num(lengthInput?.value);
      const width = num(widthInput?.value);
      if (Number.isFinite(length) && Number.isFinite(width)) {
        source = { length, width };
        row.dataset.sourceStandardLength = String(length);
        row.dataset.sourceStandardWidth = String(width);
      }
    }
    if (!source) return;

    if (manufacturingType === "exact") {
      lengthInput.readOnly = false;
      widthInput.readOnly = false;
      if (resetExact) {
        lengthInput.value = Math.max(source.length - 20, 1);
        widthInput.value = Math.max(source.width - 20, 1);
      }
    } else {
      lengthInput.value = source.length;
      widthInput.value = source.width;
      lengthInput.readOnly = true;
      widthInput.readOnly = true;
    }
    clearSizeErrors(row);
    renderStandardSizesForRow(row);
    updateSizeRowAvailability(row);
    updatePositionFinishLabels();
  }

  function applyStandardSize(row, length, width) {
    if (!row) return;
    row.dataset.sizeMode = "standard";
    row.dataset.sourceStandardLength = String(length);
    row.dataset.sourceStandardWidth = String(width);
    const lengthInput = $('[data-size-length]', row);
    const widthInput = $('[data-size-width]', row);
    lengthInput.value = length;
    widthInput.value = width;
    lengthInput.readOnly = true;
    widthInput.readOnly = true;
    updateManufacturingTypeOptions(row, "standard");
    clearSizeErrors(row);
    renderStandardSizesForRow(row);
    updateSizeRowAvailability(row);
    updatePositionFinishLabels();
    recalc();
  }

  function setCustomSizeMode(row, { focus = true } = {}) {
    if (!row) return;
    row.dataset.sizeMode = "custom";
    delete row.dataset.sourceStandardLength;
    delete row.dataset.sourceStandardWidth;
    const lengthInput = $('[data-size-length]', row);
    const widthInput = $('[data-size-width]', row);
    lengthInput.readOnly = false;
    widthInput.readOnly = false;
    lengthInput.value = "";
    widthInput.value = "";
    updateManufacturingTypeOptions(row, "exact");
    clearSizeErrors(row);
    renderStandardSizesForRow(row);
    updateSizeRowAvailability(row);
    updatePositionFinishLabels();
    if (focus) lengthInput.focus();
    recalc();
  }

  function setSizeFieldError(row, key, message = "") {
    const input = $(`[data-size-${key}]`, row);
    const field = input?.closest(".field");
    const error = $(`[data-size-${key}-error]`, row);

    field?.classList.toggle("field--invalid", Boolean(message));
    if (error) error.textContent = message;
  }

  function clearSizeErrors(row) {
    setSizeFieldError(row, "length", "");
    setSizeFieldError(row, "width", "");
  }

  function customSizeAllowance(row) {
    return manufacturingTypeForRow(row) === "allowance20" ? 20 : 0;
  }

  function sizeRowProductionAllowance(row) {
    return productionFitAllowanceMm(manufacturingTypeForRow(row));
  }

  function validateCustomSizeOnBlur(input, row, key, label) {
    if (!row || !input) return true;
    const mode = row.dataset.sizeMode || "";
    const standardExact = mode === "standard" && manufacturingTypeForRow(row) === "exact";
    if (mode !== "custom" && !standardExact) return true;

    const raw = input.value.trim();
    if (!raw) {
      setSizeFieldError(row, key, "");
      recalc();
      return true;
    }

    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
      input.value = "";
      updateSizeRowAvailability(row);
      recalc();
      setSizeFieldError(row, key, `${label}: введите числовое значение.`);
      return false;
    }

    if (manufacturingTypeForRow(row) === "exact" && value < 50) {
      setSizeFieldError(row,key,"Минимальный размер готовой детали — 50 мм по каждой стороне.");recalc();return false;
    }
    const formats = productionSourceFormatsForBase();
    if (!formats.length) {
      setSizeFieldError(row, key, "");
      recalc();
      return true;
    }

    const otherKey = key === "length" ? "width" : "length";
    const otherInput = $(`[data-size-${otherKey}]`, row);
    const otherValue = Number(otherInput?.value);
    const productionAllowance = sizeRowProductionAllowance(row);
    let max = null;
    let valid = true;

    if (Number.isFinite(otherValue) && otherValue > 0) {
      max = formats.length ? strictMaxCompanionDimension(otherValue, formats, key, productionAllowance) : null;
      const length = key === "length" ? value : otherValue;
      const width = key === "width" ? value : otherValue;
      valid = !formats.length || strictSizeFitsFormats(length, width, formats, productionAllowance);
    } else {
      max = formats.length ? strictMaxDimensionForFormats(formats, key, productionAllowance) : null;
      valid = Number.isFinite(max) ? value <= max : true;
    }

    if (!valid && isDetailedPanelCalculation()) {
      // Missing catalogue coverage is not proof that manufacture is impossible.
      // Keep the requested dimensions and save an explicit unresolved status.
      setSizeFieldError(row, key, "");
      recalc();
      return true;
    }
    if (!valid) {
      input.value = "";
      updateSizeRowAvailability(row);
      recalc();
      const fallbackMax = formats.length ? strictMaxDimensionForFormats(formats, key, productionAllowance) : null;
      setSizeFieldError(
        row,
        key,
        Number.isFinite(max ?? fallbackMax) ? `${label}: допустимо от 1 до ${Math.floor(max ?? fallbackMax)}.` : `${label}: размер не помещается в подтверждённый формат основы.`
      );
      return false;
    }

    setSizeFieldError(row, key, "");
    recalc();
    return true;
  }

  function revalidateCustomSizeRows() {
    $$('[data-size-row]', form.sizeRows).forEach((row) => {
      clearSizeErrors(row);
      const rowId = row.dataset.rowId || "";
      clearTouchedFields(`sizeLength:${rowId}`, `sizeWidth:${rowId}`, `sizeQuantity:${rowId}`, `sizeTransition:${rowId}`, `sizeTransitionDetails:${rowId}`);
      setSizeQuantityError(row, "");
      updateSizeTransitionUI(row);
    });
  }

  function syncEdgeModeFields() {
    const mode = form.edgeModeSelect.value;
    const showWallEdgeFields = isQuickWallPanel() && selectedBase()?.id !== "gsp";
    form.attachedEdgeFields.classList.toggle("is-hidden", mode !== "attached" && !showWallEdgeFields);
    form.separateEdgeFields.classList.toggle("is-hidden", mode !== "separate");
    form.edgeCommentField.classList.toggle("is-hidden", mode === "none" && !showWallEdgeFields);
    if (mode !== "separate") {
      clearTouchedFields("separateEdgeType", "separateEdgeMaterial", "separateEdgeThickness", "separateEdgeWidth", "separateEdgeMeters");
      setSeparateEdgeMetersError("");
      setSeparateEdgeMetersWarning("");
      setAutocompleteError(form.separateEdgeMaterialInput, form.separateEdgeMaterialError, "");
    }
    if (mode !== "attached") {
      clearTouchedFields("edgeSides", "attachedEdgeType", "attachedEdgeMaterial", "attachedEdgeThickness", "attachedEdgeWidth");
      clearTouchedPrefix("positionEdge:");
      setAutocompleteError(form.edgeMaterialInput, form.edgeMaterialError, "");
      form.positionEdgeOverrides?.classList.add("is-hidden");
    } else if (positionEdgeOverridesEnabled) {
      form.positionEdgeOverrides?.classList.remove("is-hidden");
    }
  }

  function updateEdgeUI() {
    updateAttachedEdgeAvailability();
    syncEdgeModeFields();
    syncEdgeVeneerDefaults();
    if (form.edgeModeSelect.value === "attached" && positionEdgeOverridesEnabled) renderPositionEdgeOverrides();
    recalc();
  }

  function availableAttachedEdgeSides() {
    if (!isQuickWallPanel()) return data?.edgeSides || [];
    const labels = { perimeter: "По периметру", two_lengths: "По длинным сторонам", two_widths: "По коротким сторонам" };
    return (data?.edgeSides || []).filter(item => Object.prototype.hasOwnProperty.call(labels, item.id))
      .map(item => ({ ...item, name: labels[item.id] }));
  }

  function edgeRuleById(id) {
    return (isQuickWallPanel() ? availableAttachedEdgeSides() : data?.edgeSides || []).find((item) => item.id === id) || null;
  }

  function edgeMetersForSize(size, sidesId = form.edgeSidesSelect.value) {
    // Производственные таблицы 07.11.2025 и 10.11.2025, «КРОМИРОВАНИЕ ДЕТАЛЕЙ»: метраж × 1.2.
    return geometricEdgeMetersForSize(size, sidesId) * 1.2;
  }

  function separateEdgeMinimumMeters() {
    return isQuickStandardPanel() ? 50 : num(data?.meta?.edgeSeparateMinimumRunningM);
  }

  function separateEdgeAutomaticMeters() {
    if (isQuickStandardPanel()) return 0;
    const sides = form.separateEdgeSidesSelect?.value || "perimeter";
    return readSizeRows().filter((size) => size.mode && size.quantityValid && size.physicalSizeValid && size.length > 0 && size.width > 0 && size.quantity > 0)
      .reduce((sum, size) => sum + geometricEdgeMetersForSize(size, sides), 0);
  }

  function syncSeparateEdgeMeters() {
    if (!form.separateEdgeMetersInput) return;
    if (isQuickStandardPanel()) {
      separateEdgeMetersManual = true;
      form.separateEdgeMetersReset?.classList.add("is-hidden");
      if (form.separateEdgeMetersSummary) form.separateEdgeMetersSummary.textContent = "Минимальный заказ кромки 50 пог. м";
      setSeparateEdgeMetersWarning("");
      return;
    }
    const meters = separateEdgeAutomaticMeters();
    if (!separateEdgeMetersManual) form.separateEdgeMetersInput.value = meters > 0 ? String(round(meters, 6)) : "";
    form.separateEdgeMetersReset?.classList.toggle("is-hidden", !separateEdgeMetersManual);
    if (form.separateEdgeMetersSummary) form.separateEdgeMetersSummary.textContent =
      `${separateEdgeMetersManual ? "Ручная корректировка. " : ""}По размерам и выбранным торцам: ${round(meters, 2)} пог. м. Запас не добавлен.`;
    const selected = num(form.separateEdgeMetersInput.value);
    const minimum = separateEdgeMinimumMeters();
    setSeparateEdgeMetersWarning(Number.isFinite(selected) && selected > 0 && selected < minimum
      ? `Менее ${minimum} пог. м: проверьте общий метраж заявки.` : "");
  }

  function geometricEdgeMetersForSize(size, sidesId = form.edgeSidesSelect.value) {
    const rule = edgeRuleById(sidesId);
    if (!rule || !size?.length || !size?.width || !size?.quantity) return 0;
    const length = isQuickWallPanel() ? Math.max(size.length, size.width) : size.length;
    const width = isQuickWallPanel() ? Math.min(size.length, size.width) : size.width;
    return ((Number(rule.lengthCount || 0) * length + Number(rule.widthCount || 0) * width) / 1000) * size.quantity;
  }

  function defaultPositionEdgeState() {
    return { mode: "inherit", sidesId: form.edgeSidesSelect.value || "", thicknessMm: currentEdgeThickness("attached"), widthMm: num(form.edgeWidthSelect.value) || num(form.edgeOrderWidthInput.value) };
  }

  function normalizePositionEdgeState(state = {}) {
    const mode = ["inherit", "custom", "none"].includes(state.mode) ? state.mode : "inherit";
    const validSideIds = new Set((data?.edgeSides || []).map((item) => item.id));
    const sidesId = validSideIds.has(state.sidesId) ? state.sidesId : (form.edgeSidesSelect.value || "");
    const type = edgeTypeById(form.edgeTypeSelect.value);
    let thicknessMm = num(state.thicknessMm);
    if (!type || type.thicknessMode === "none") thicknessMm = null;
    else {
      const allowed = Array.isArray(type.thicknesses) ? type.thicknesses.map(Number).filter(Number.isFinite) : [];
      if (!Number.isFinite(thicknessMm) || !allowed.some((value) => Math.abs(value - thicknessMm) < 0.001)) {
        const common = currentEdgeThickness("attached");
        thicknessMm = Number.isFinite(common) && allowed.some((value) => Math.abs(value - common) < 0.001) ? common : (allowed.length === 1 ? allowed[0] : null);
      }
    }
    return { mode, sidesId, thicknessMm, widthMm: num(state.widthMm) };
  }

  function capturePositionEdgeStateFromDom() {
    if (!form.positionEdgeOverrides) return;
    $$('[data-position-edge-row]', form.positionEdgeOverrides).forEach((card) => {
      const rowId = card.dataset.positionEdgeRow;
      const previous = normalizePositionEdgeState(positionEdgeState.get(rowId) || defaultPositionEdgeState());
      positionEdgeState.set(rowId, normalizePositionEdgeState({
        ...previous,
        mode: $('[data-position-edge-mode]', card)?.value || previous.mode,
        sidesId: $('[data-position-edge-sides]', card)?.value || previous.sidesId,
        widthMm: $('[data-position-edge-width]', card) ? num($('[data-position-edge-width]', card).value) : previous.widthMm,
        thicknessMm: $('[data-position-edge-thickness]', card) ? num($('[data-position-edge-thickness]', card).value) : previous.thicknessMm
      }));
    });
  }

  function positionEdgeLabel(row, index) {
    const length = num($('[data-size-length]', row)?.value);
    const width = num($('[data-size-width]', row)?.value);
    const quantity = num($('[data-size-quantity]', row)?.value);
    const parts = [`Позиция ${index + 1}`];
    if (length > 0 && width > 0) parts.push(`${length} × ${width} мм`);
    if (quantity > 0) parts.push(`${quantity} шт.`);
    return parts.join(" · ");
  }

  function positionEdgeSummary(state) {
    if (state.mode === "none") return "Без кромления";
    const effectiveSides = state.mode === "custom" ? state.sidesId : form.edgeSidesSelect.value;
    const effectiveThickness = state.mode === "custom" ? state.thicknessMm : currentEdgeThickness("attached");
    const sideName = edgeRuleById(effectiveSides)?.name || "Стороны не выбраны";
    const thicknessText = Number.isFinite(effectiveThickness) ? `${String(effectiveThickness).replace(".", ",")} мм` : "";
    return [sideName, thicknessText, state.mode === "custom" ? "Индивидуальные настройки" : "Общие настройки"].filter(Boolean).join(" · ");
  }

  function positionEdgeThicknessOptionsHtml(selectedValue) {
    const type = edgeTypeById(form.edgeTypeSelect.value);
    if (!type || type.thicknessMode === "none") return "";
    return [`<option value="">Выберите толщину кромки</option>`, ...(type.thicknesses || []).map((value) => `<option value="${esc(value)}"${Number(selectedValue) === Number(value) ? " selected" : ""}>${esc(String(value).replace(".", ","))}</option>`)].join("");
  }

  function positionEdgeWidthControl(state) {
    const item = resolveEdgeCatalogItem("attached", { thicknessMm: state.thicknessMm });
    const widths = (item?.availableWidths || []).filter((width) => edgeWidthFitsProduct(width));
    return item
      ? `<select data-position-edge-width><option value="">Выберите ширину</option>${widths.map((width) => `<option value="${esc(width)}"${Number(state.widthMm) === Number(width) ? " selected" : ""}>${width} мм</option>`).join("")}</select>`
      : `<input data-position-edge-width type="number" min="1" value="${esc(state.widthMm || "")}" />`;
  }

  function renderPositionEdgeOverrides(capture = true) {
    if (!form.positionEdgeOverrides) return;
    if (capture) capturePositionEdgeStateFromDom();
    const allRows = $$('[data-size-row]', form.sizeRows);
    const eligibleRows = allRows.filter(sizeRowSupportsAttachedEdge);
    const eligibleIds = new Set(eligibleRows.map((row) => row.dataset.rowId));
    [...positionEdgeState.keys()].forEach((rowId) => { if (!eligibleIds.has(rowId)) positionEdgeState.delete(rowId); });
    form.positionEdgeOverrides.innerHTML = eligibleRows.map((row) => {
      const index = allRows.indexOf(row);
      const rowId = row.dataset.rowId;
      const state = normalizePositionEdgeState(positionEdgeState.get(rowId) || defaultPositionEdgeState());
      positionEdgeState.set(rowId, state);
      const custom = state.mode === "custom";
      const type = edgeTypeById(form.edgeTypeSelect.value);
      const sideOptions = [`<option value="">Выберите стороны кромления</option>`, ...(data?.edgeSides || []).map((item) => `<option value="${esc(item.id)}"${state.sidesId === item.id ? " selected" : ""}>${esc(item.name)}</option>`)].join("");
      return `<div class="finish-position-card" data-position-edge-row="${esc(rowId)}">
        <div class="finish-position-card__head"><strong data-position-edge-title>${esc(positionEdgeLabel(row, index))}</strong><div class="field__note" data-position-edge-summary>${esc(positionEdgeSummary(state))}</div></div>
        <label class="field"><span class="field__label">Настройка кромления</span><select data-position-edge-mode><option value="inherit"${state.mode === "inherit" ? " selected" : ""}>Общие настройки</option><option value="custom"${custom ? " selected" : ""}>Индивидуальные настройки</option><option value="none"${state.mode === "none" ? " selected" : ""}>Без кромления</option></select></label>
        ${custom ? `<div class="finish-position-details"><label class="field"><span class="field__label">Стороны кромления</span><select data-position-edge-sides>${sideOptions}</select><span class="field__error" data-position-edge-sides-error></span></label>${type && type.thicknessMode !== "none" ? `<label class="field"><span class="field__label">Толщина кромки, мм</span><select data-position-edge-thickness>${positionEdgeThicknessOptionsHtml(state.thicknessMm)}</select><span class="field__error" data-position-edge-thickness-error></span></label>` : ""}<label class="field"><span class="field__label">Ширина кромки, мм</span>${positionEdgeWidthControl(state)}</label></div>` : ""}
      </div>`;
    }).join("");
  }

  function syncPositionEdgeStateWithRows() {
    const eligibleIds = new Set($$('[data-size-row]', form.sizeRows).filter(sizeRowSupportsAttachedEdge).map((row) => row.dataset.rowId));
    [...positionEdgeState.keys()].forEach((rowId) => {
      if (!eligibleIds.has(rowId)) {
        positionEdgeState.delete(rowId);
        clearTouchedPrefix(`positionEdge:${rowId}:`);
      }
    });
  }

  function effectiveEdgeForSize(size) {
    if (!sizeSupportsAttachedEdge(size)) return { applies: false, mode: "none", sidesId: "", thicknessMm: null };
    const state = normalizePositionEdgeState(positionEdgeState.get(size.rowId) || defaultPositionEdgeState());
    if (state.mode === "none") return { applies: false, ...state };
    if (state.mode === "custom") return { applies: true, ...state };
    return { applies: true, mode: "inherit", sidesId: form.edgeSidesSelect.value || "", thicknessMm: currentEdgeThickness("attached"), widthMm: num(form.edgeWidthSelect.value) || num(form.edgeOrderWidthInput.value) };
  }
  function nonstandardRateRowFor(thicknessRaw, sides, baseId = selectedBase()?.id || "mdf") {
    const key = normalizeThicknessKey(thicknessRaw);
    return (data?.nonstandardRates || []).find((item) => (
      item.baseId === baseId &&
      normalizeThicknessKey(item.thickness) === key &&
      Number(item.sides) === Number(sides)
    )) || null;
  }

  function nonstandardRateFor(thicknessRaw, sides, baseId = selectedBase()?.id || "mdf") {
    const row = nonstandardRateRowFor(thicknessRaw, sides, baseId);
    const rate = num(row?.ratePerM2);
    return Number.isFinite(rate) ? rate : null;
  }

  function automaticBaseRateFor(thicknessRaw, sides, baseId = selectedBase()?.id || "mdf") {
    const row = nonstandardRateRowFor(thicknessRaw, sides, baseId);
    const rate = num(row?.baseRatePerM2);
    return Number.isFinite(rate) ? rate : null;
  }

  function standardProductionRateRowFor(thicknessRaw, sides, veneerThickness = selectedVeneerThickness(), baseId = selectedBase()?.id || "mdf") {
    const key = normalizeThicknessKey(thicknessRaw);
    const thicknessClass = Number.isFinite(veneerThickness) && veneerThickness >= 1.5 ? "1.5+" : "0.6";
    return (data?.standardProductionRates || []).find((item) => (
      item.baseId === baseId &&
      normalizeThicknessKey(item.thickness) === key &&
      Number(item.sides) === Number(sides) &&
      item.veneerThicknessClass === thicknessClass
    )) || null;
  }

  function standardProductionRateFor(thicknessRaw, sides, veneerThickness = selectedVeneerThickness(), baseId = selectedBase()?.id || "mdf") {
    const row = standardProductionRateRowFor(thicknessRaw, sides, veneerThickness, baseId);
    const rate = num(row?.ratePerM2);
    return Number.isFinite(rate) && rate > 0 ? rate : null;
  }

  function priceListRateConditionState({ row, defaultRate, conditionId, adjustmentId, componentLabel }) {
    const rate = num(defaultRate);
    const requestedCondition = conditionId || "retail";
    const requestedKey = clientConditionPriceKey(requestedCondition);
    const prices = row?.pricesPerM2 && typeof row.pricesPerM2 === "object" ? row.pricesPerM2 : null;
    const discounts = row?.discountsPercent && typeof row.discountsPercent === "object" ? row.discountsPercent : null;
    const explicitRetail = num(prices?.[clientConditionPriceKey("retail")]);
    const retailRate = Number.isFinite(explicitRetail) ? explicitRetail : rate;
    let selected = null;

    if (requestedCondition === "retail") {
      if (Number.isFinite(retailRate)) selected = { id: "retail", name: "Розничная цена", sourceMode: Number.isFinite(explicitRetail) ? "direct_price" : "default_rate", price: retailRate };
    } else if (Number.isFinite(retailRate) && retailRate > 0) {
      const directTarget = num(prices?.[requestedKey]);
      const explicitDiscount = num(discounts?.[requestedKey]);
      if (Number.isFinite(directTarget)) {
        selected = { id: requestedCondition, name: clientConditionUiName(requestedCondition), sourceMode: "direct_price", price: directTarget };
      } else if (Number.isFinite(explicitDiscount)) {
        selected = { id: requestedCondition, name: clientConditionUiName(requestedCondition), sourceMode: "discount_percent", price: retailRate * (1 - Math.max(explicitDiscount, 0) / 100) };
      }
    }

    const conditionUnresolved = requestedCondition !== "retail" && !selected;
    const finalRate = Number.isFinite(num(selected?.price)) ? num(selected.price) : null;
    const actualConditionId = selected?.id || requestedCondition;
    const automaticDiscountPercent = Number.isFinite(retailRate) && retailRate > 0 && Number.isFinite(finalRate)
      ? Math.max((1 - finalRate / retailRate) * 100, 0)
      : 0;

    return {
      componentLabel, adjustmentId, conditionId: actualConditionId,
      requestedConditionId: requestedCondition,
      conditionPriceKey: clientConditionPriceKey(actualConditionId),
      conditionName: requestedCondition === "retail" ? "Розничная цена" : clientConditionUiName(requestedCondition),
      source: requestedCondition === "retail" ? null : "price_list",
      sourceMode: selected?.sourceMode || null,
      conditionFound: requestedCondition === "retail" ? true : Boolean(selected),
      conditionUnresolved,
      retailRatePerM2: Number.isFinite(retailRate) ? retailRate : null,
      automaticRatePerM2: Number.isFinite(finalRate) ? finalRate : null,
      finalRatePerM2: Number.isFinite(finalRate) ? finalRate : null,
      automaticDiscountPercent,
      actualDiscountPercent: automaticDiscountPercent,
      changedManually: false
    };
  }

  function standardProductionRateForClass(thicknessRaw, sides, veneerThicknessClass, baseId = selectedBase()?.id || "mdf") {
    const key = normalizeThicknessKey(thicknessRaw);
    const row = (data?.standardProductionRates || []).find((item) => (
      item.baseId === baseId &&
      normalizeThicknessKey(item.thickness) === key &&
      Number(item.sides) === Number(sides) &&
      item.veneerThicknessClass === veneerThicknessClass
    ));
    const rate = num(row?.ratePerM2);
    return Number.isFinite(rate) && rate > 0 ? rate : null;
  }

  function thickVeneerWorkAdjustmentState({ baseId, thicknessRaw, sides, veneerThickness, exactSizeRequired }) {
    const config = data?.meta?.thickFaceVeneerWorkAdjustment || {};
    const thresholdMm = num(config.thresholdMm) || 1.5;
    const baselineClass = config.baselineClass || "0.6";
    const thickClass = config.thickClass || "1.5+";
    const applies = Boolean(exactSizeRequired && Number.isFinite(veneerThickness) && veneerThickness >= thresholdMm);
    const id = `thick-veneer-work:${baseId || "none"}:${normalizeThicknessKey(thicknessRaw)}:${Number(sides) || 0}`;

    if (!applies) {
      return {
        applies: false, id, thresholdMm, baselineClass, thickClass,
        automaticCoefficient: null, actualCoefficient: null, changedManually: false,
        baselineRatePerM2: null, thickRatePerM2: null, manualRequired: false
      };
    }

    const baselineRatePerM2 = standardProductionRateForClass(thicknessRaw, sides, baselineClass, baseId);
    const thickRatePerM2 = standardProductionRateForClass(thicknessRaw, sides, thickClass, baseId);
    const automaticCoefficient = Number.isFinite(baselineRatePerM2) && baselineRatePerM2 > 0 && Number.isFinite(thickRatePerM2) && thickRatePerM2 > 0
      ? thickRatePerM2 / baselineRatePerM2
      : null;
    const manualValue = num(priceAdjustmentOverrides.get(id));
    const changedManually = Number.isFinite(manualValue) && manualValue > 0;
    const actualCoefficient = changedManually ? manualValue : automaticCoefficient;

    return {
      applies: true, id, thresholdMm, baselineClass, thickClass,
      automaticCoefficient, actualCoefficient, changedManually,
      baselineRatePerM2, thickRatePerM2,
      manualRequired: !Number.isFinite(automaticCoefficient)
    };
  }
  function cuttingRateFor(thicknessRaw, baseId = selectedBase()?.id || "mdf") {
    return Core.cuttingRateFor(data, baseId, thicknessRaw);
  }
  function attachedEdgeRateFor(thicknessRaw, edgeState, runningM, baseId = selectedBase()?.id || "mdf") {
    if (!edgeState?.operationRateClass) return null;
    // Для VL/S и SK/S числовая толщина в прайсе отсутствует. Для выбора
    // существующего тарифа операции используется только подтверждённый класс
    // «тонкая», без записи фиктивной толщины в справочник или спецификацию.
    const tariffClassThickness = edgeState.operationRateClass === "thin" ? 1
      : edgeState.operationRateClass === "thick" ? 1.5
        : null;
    if (!Number.isFinite(tariffClassThickness)) return null;
    return Core.edgeRateFor(data, baseId, thicknessRaw, tariffClassThickness, runningM);
  }

  function standardSheetPrices(standard, condition, warnings = []) {
    const retail = num(standard?.pricesPerSheet?.retail);
    if (!Number.isFinite(retail)) {
      return { retailSheet: null, finalSheet: null, partial: true, conditionUnresolved: true, note: "Нет розничной цены в строке прайса." };
    }

    const selectedConditionId = condition || "retail";
    const selectedKey = clientConditionPriceKey(selectedConditionId);
    const selectedPrice = selectedConditionId === "retail" ? retail : num(standard?.pricesPerSheet?.[selectedKey]);
    const unresolved = selectedConditionId !== "retail" && !Number.isFinite(selectedPrice);
    if (unresolved) {
      warnings.push(`Для условия «${clientConditionUiName(selectedConditionId)}» в строке МДФ ${standard.lengthMm}×${standard.widthMm} нет подтверждённой цены; розничная цена автоматически не подставляется.`);
    }
    const finalSheet = unresolved ? null : selectedPrice;
    const automaticDiscountPercent = retail > 0 && Number.isFinite(finalSheet)
      ? Math.max((1 - finalSheet / retail) * 100, 0)
      : 0;

    return {
      retailSheet: retail,
      finalSheet,
      partial: unresolved,
      conditionUnresolved: unresolved,
      note: unresolved ? "Цена выбранного условия отсутствует." : "",
      conditionId: selectedConditionId,
      conditionKey: selectedKey,
      conditionFound: selectedConditionId === "retail" || Number.isFinite(selectedPrice),
      conditionSource: unresolved ? "missing_client_condition" : (selectedConditionId === "retail" ? "retail" : "client"),
      sourceMode: unresolved ? null : (selectedConditionId === "retail" ? "retail" : "direct_price"),
      automaticConditionPrice: finalSheet,
      actualConditionPrice: finalSheet,
      automaticDiscountPercent,
      discountPercent: automaticDiscountPercent,
      automaticMarkupPercent: 0,
      markupPercent: 0,
      requestedClientConditionId: selectedConditionId
    };
  }

  function physicalBaseThicknessMm() {
    const state = calibrationState(selectedBase());
    return state.enabled && state.valid ? state.baseThicknessAfterCalibrationMm : state.sourceBaseThicknessMm;
  }

  function manufacturingCostFromProduction(size) {
    return selectedBasePriceMode(size) === "production" || manufacturingTypeForSize(size) === "allowance20" ||
      (needsLayoutSelection() && selectedLayout()?.requiresProductionCost) || backLayoutRequiresProduction() || isReadyShirt(selectedVeneerA) ||
      (Number(form.veneeredSidesSelect.value) === 2 && isReadyShirt(form.veneerBModeSelect.value === "same" ? selectedVeneerA : form.veneerBModeSelect.value === "other" ? selectedVeneerB : null));
  }

  const weightForSize = (size, base, thickness) => Core.weightForSize(size, base, { ...thickness, total: physicalBaseThicknessMm() });
  const weightText = Core.weightText;

  function levelValidation(item, level, purchase, warnings, label) {
    Core.validateVeneerPriceLevel(
      item,
      level,
      purchase,
      warnings,
      label,
      itemThickness(item)
    );
  }

  const veneerPurchase = Core.veneerPurchase;

  function calculate() {
    if (!data) return null;
    capturePositionFinishStateFromDom();
    const warnings = [], breakdown = [], sizes = readSizeRows();
    sizes.forEach((size) => {
      validateSizeQuantity(size.row, Boolean(size.mode && size.length > 0 && size.width > 0));
      updateSizeTransitionUI(size.row);
    });
    const incompleteSizeRows = sizes.filter((size) => {
      const started = size.mode && (size.length !== null || size.width !== null || size.quantityRaw !== "" || size.transition || size.comment || size.files.length);
      return started && !(size.length > 0 && size.width > 0 && size.quantityValid);
    });
    const quantityInvalidRows = sizes.filter((size) => size.mode && size.length > 0 && size.width > 0 && !size.quantityValid);
    const transitionQuantityInvalidRows = sizes.filter((size) => !isQuickWallPanel() && size.transition && (window.WoodstockPanelsView?.transitionMinimumPieces ? shortTransitionState().pieces < window.WoodstockPanelsView.transitionMinimumPieces : size.quantityValid && Number.isFinite(size.quantity) && size.quantity > 1));
    const transitionDescriptionInvalidRows = sizes.filter((size) => !isQuickWallPanel() && size.transition && !(window.WoodstockPanelsView?.transitionMinimumPieces ? shortTransitionState().described : size.comment || size.files.length));
    const minimumSizeInvalidRows = sizes.filter(size => size.minimumSizeValid === false);
    const physicalSizeInvalidRows = sizes.filter((size) => size.physicalSizeValid === false);
    const technologicalSizeInvalidRows = sizes.filter((size) => size.physicalSizeValid !== false && size.technologicalSizeValid === false);
    const sizeValidation = {
      valid: minimumSizeInvalidRows.length === 0 && incompleteSizeRows.length === 0 && quantityInvalidRows.length === 0 && transitionQuantityInvalidRows.length === 0 && transitionDescriptionInvalidRows.length === 0 && physicalSizeInvalidRows.length === 0 && technologicalSizeInvalidRows.length === 0,
      incompleteSizePositions: incompleteSizeRows.map((size) => size.position),
      quantityInvalidPositions: quantityInvalidRows.map((size) => size.position),
      transitionQuantityInvalidPositions: transitionQuantityInvalidRows.map((size) => size.position),
      transitionDescriptionInvalidPositions: transitionDescriptionInvalidRows.map((size) => size.position),
      physicalSizeInvalidPositions: physicalSizeInvalidRows.map((size) => size.position),
      technologicalSizeInvalidPositions: technologicalSizeInvalidRows.map((size) => size.position),
      error: minimumSizeInvalidRows.length ? "Минимальный размер готовой детали — 50 мм по каждой стороне." : incompleteSizeRows.length
        ? `Заполните длину, ширину и количество в позициях ${incompleteSizeRows.map((size) => size.position).join(", ")} или удалите эти позиции.`
        : quantityInvalidRows.length
        ? "Введите количество целым числом от 1."
        : transitionQuantityInvalidRows.length
          ? transitionQuantityMessage()
          : transitionDescriptionInvalidRows.length
            ? "Добавьте описание перехода рисунка или приложите файл."
            : physicalSizeInvalidRows.length
              ? "Размер с технологическим запасом +20 мм не помещается в подтверждённый производственный формат основы."
              : technologicalSizeInvalidRows.length
              ? (() => {
                  const limit = technologicalSizeInvalidRows[0].technologicalSizeLimit;
                  return `Для нестандартной готовой детали со шлифовкой, лаком и кромкой при этой толщине максимум ${limit?.maxLengthMm || "—"} × ${limit?.maxWidthMm || "—"} мм.`;
                })()
              : ""
    };
    if (incompleteSizeRows.length) warnings.push(sizeValidation.error);
    if (quantityInvalidRows.length) warnings.push("Введите количество целым числом от 1.");
    if (transitionQuantityInvalidRows.length) warnings.push(transitionQuantityMessage());
    if (transitionDescriptionInvalidRows.length) warnings.push("Добавьте описание перехода рисунка или приложите файл.");
    technologicalSizeInvalidRows.forEach((size) => {
      const limit = size.technologicalSizeLimit;
      warnings.push(`Позиция ${size.position}: нестандартная готовая деталь со шлифовкой, лаком и кромкой при толщине ${String(parseThicknessComposition(currentBaseThicknessRaw()).total).replace(".", ",")} мм — максимум ${limit?.maxLengthMm || "—"} × ${limit?.maxWidthMm || "—"} мм.`);
    });
    const validSizes = sizes.filter((x) => x.sizeValid && x.length > 0 && x.width > 0 && x.quantityValid);
    const layoutSelectionRequired = needsLayoutSelection();
    const rawLayout = layoutSelectionRequired ? form.layoutSelect.value : "";
    const layoutAllowed = !layoutSelectionRequired || !rawLayout || isLayoutAllowedForType(rawLayout);
    const layout = layoutSelectionRequired && layoutAllowed ? rawLayout : "";
    const base = selectedBase(), thickness = parseThicknessComposition(currentBaseThicknessRaw()), sides = Number(form.veneeredSidesSelect.value), condition = form.clientConditionSelect.value || "retail", mdfVolumeId = null, herringbone = layout === "herringbone", customLayout = layout === "custom";
    const layoutB = effectiveLayoutBId();
    const readyShirtOnA = isReadyShirt(selectedVeneerA);
    const selectedBackMaterialForCost = sides === 2
      ? (form.veneerBModeSelect.value === "same" ? selectedVeneerA : form.veneerBModeSelect.value === "other" ? selectedVeneerB : null)
      : null;
    const readyShirtOnB = isReadyShirt(selectedBackMaterialForCost);
    const usesReadyShirt = readyShirtOnA || readyShirtOnB;
    const requiresReadyShirtProductionCost = usesReadyShirt;
    const requiresBaseProductionCost = Boolean(base && (validSizes.length
      ? validSizes.some((size) => selectedBasePriceMode(size) === "production")
      : selectedBasePriceMode() === "production"));
    const requiresLayoutProductionCost = Boolean((needsLayoutSelection() && selectedLayout()?.requiresProductionCost) || backLayoutRequiresProduction());
    const requiresAllowanceProductionCost = Boolean(
      data?.meta?.allowance20RequiresProductionCost && validSizes.some((size) => manufacturingTypeForSize(size) === "allowance20")
    );
    let requiresOperationProductionCost = requiresReadyShirtProductionCost;
    let requiresFinishProductionCost = false;
    let requiresProductionCost = requiresBaseProductionCost || requiresLayoutProductionCost || requiresAllowanceProductionCost || requiresReadyShirtProductionCost;
    const classifiedSizes = validSizes.map((size) => ({ size, classification: classifySize(size) }));
    let retailTotal = 0, finalTotal = 0, totalArea = 0, totalProductionArea = 0, totalPieces = 0, hasPartialPrice = false, allStandard = validSizes.length > 0;
    let standardFinalSubtotal = 0, standardRequestFinalSubtotal = 0, nonstandardFinalSubtotal = 0;
    let orderLevelUnallocatedCost = 0;
    let veneerRequiredStandardA = 0, veneerRequiredStandardB = 0, veneerRequiredNonstandardA = 0, veneerRequiredNonstandardB = 0;
    let cuttingMetersTotal = 0, cuttingCostTotal = 0, sandingCostTotal = 0;
    let sandingCalculatedArea = 0, sandingIncludedArea = 0, sandingProductionArea = 0;
    let roughBackCostTotal = 0, roughBackRatePerM2 = null, roughBackThicknessMm = null, roughBackPricingStatus = "not_required";
    let cuttingPricingStatus = "not_required", cuttingRequiresProductionCost = false;
    const itemResults = [], veneerPricings = [], readyShirtPricings = [], mdfPricings = [], baseRatePricings = [], veneerWasteAdjustments = [];
    const positionCostByRowId = new Map();
    // Completeness follows the same component scopes as the existing cost ledger.
    const positionPendingCosts = new Map();
    const markPositionPending = (items, reason) => {
      if (!window.WoodstockPanelsView?.positionPricing) return;
      (Array.isArray(items) ? items : [items]).forEach(item => {
        const rowId = item?.rowId;
        if (!rowId) return;
        if (!positionPendingCosts.has(rowId)) positionPendingCosts.set(rowId, new Set());
        positionPendingCosts.get(rowId).add(reason);
      });
    };
    const addPositionCost = (sizeOrRowId, value) => {
      const rowId = typeof sizeOrRowId === "string" ? sizeOrRowId : sizeOrRowId?.rowId;
      const cost = Number(value);
      if (!rowId || !Number.isFinite(cost) || Math.abs(cost) < 0.000001) return;
      positionCostByRowId.set(rowId, (positionCostByRowId.get(rowId) || 0) + cost);
    };
    const allocatePositionCost = (items, totalCost, weightForItem) => {
      const cost = Number(totalCost);
      if (!Number.isFinite(cost) || Math.abs(cost) < 0.000001 || !items?.length) return;
      const weighted = items
        .map((item) => ({ item, weight: Math.max(0, Number(weightForItem(item)) || 0) }))
        .filter((row) => row.weight > 0);
      const totalWeight = weighted.reduce((sum, row) => sum + row.weight, 0);
      if (!(totalWeight > 0)) return;
      weighted.forEach(({ item, weight }) => addPositionCost(item, cost * weight / totalWeight));
    };
    const standardRequestWarnings = new Set();
    const exactNonstandardRequired = classifiedSizes.some(({ size, classification }) => (
      classification.id === "nonstandard" && manufacturingTypeForSize(size) === "exact"
    ));
    const thickVeneerWorkAdjustment = usesReadyShirt ? { applies: false } : thickVeneerWorkAdjustmentState({
      baseId: base?.id || "",
      thicknessRaw: thickness.raw,
      sides,
      veneerThickness: selectedVeneerThickness(),
      exactSizeRequired: exactNonstandardRequired
    });
    if (thickVeneerWorkAdjustment.applies && !Number.isFinite(thickVeneerWorkAdjustment.actualCoefficient)) {
      warnings.push("Для точного размера со шпоном от 1,5 мм не хватает пары стандартных ставок 0,6 мм / 1,5 мм+. Укажите коэффициент работы с толстым шпоном вручную в блоке корректировок цены.");
      hasPartialPrice = true;
    }

    if (!base) warnings.push("Не выбрана основа.");
    if (!Number.isFinite(thickness.total)) warnings.push("Не задана корректная толщина основы.");
    if (!form.veneerTypeSelect.value) warnings.push("Не выбран тип материала.");
    if (form.veneerTypeSelect.value && form.veneerTypeSelect.value !== "ready_shirt" && !validateVeneerThickness()) warnings.push("Не выбрана доступная толщина лицевого шпона.");
    if (!selectedVeneerAGroup) warnings.push(form.veneerAInput.value.trim()
      ? (selectedMaterialType() === "ready_shirt" ? "Выберите точную готовую рубашку из справочника." : "Выберите точное наименование шпона стороны А из отфильтрованного справочника.")
      : (selectedMaterialType() === "ready_shirt" ? "Не выбрана готовая рубашка." : "Не выбран шпон стороны А."));
    clearPatternTypeError("A");
    clearPatternTypeError("B");
    if (layoutSelectionRequired && rawLayout && !layoutAllowed) warnings.push("Выбранная раскладка недоступна для мультишпона.");
    else if (layoutSelectionRequired && !rawLayout && (layoutFieldInteracted || layoutValidationAttempted)) warnings.push("Выберите раскладку шпона.");
    const layoutDescriptionValid = ((!layoutSelectionRequired || !layoutNeedsTz(layout)) && !layoutNeedsTz(layoutB)) || layoutHasDescriptionOrFile();
    if (!layoutDescriptionValid) warnings.push("Добавьте описание раскладки или приложите файл.");
    setLayoutTzError((layoutNeedsTz(layout) || layoutNeedsTz(layoutB)) && !layoutDescriptionValid && (addAttempted || touchedFields.has("layoutTz")));
    if (usesReadyShirt) {
      warnings.push("Готовая рубашка: стоимость приклеивания / прессования не рассчитывается автоматически и должна быть определена производством. Стоимость материала рубашки считается отдельно.");
    }

    const faceVeneerOnBackRequested = sides === 2 && form.veneerBModeSelect.value !== "rough";
    const sameFaceSelectionOnBack = sides === 2 && form.veneerBModeSelect.value === "same";
    const faceVeneerBItem = !faceVeneerOnBackRequested
      ? null
      : sameFaceSelectionOnBack
        ? (isFaceOnlyExtraVeneer(selectedVeneerA) ? backsideBVariantFor(selectedVeneerA) : selectedVeneerA)
        : selectedVeneerB;

    if (sameFaceSelectionOnBack && isFaceOnlyExtraVeneer(selectedVeneerA) && !faceVeneerBItem &&
        validSizes.some((size) => classifySize(size).id !== "warehouse_standard")) {
      hasPartialPrice = true;
      warnings.push("Сторона Б: цена категории B выбранной породы и толщины не найдена. Расчёт неполный; требуется подтверждение материала и цены оборота.");
    }

    validSizes.forEach((size) => {
      totalArea += size.area; totalProductionArea += size.calcArea || size.area; totalPieces += size.quantity;
      const weight = weightForSize(size, base, thickness);
      const rawClassification = classifySize(size);
      const classification = usesReadyShirt && rawClassification.id === "warehouse_standard"
        ? { ...rawClassification, id: "standard_request", name: "Стандарт по запросу", warehouse: null }
        : rawClassification;
      const standard = classification.warehouse;

      if (standard) {
        sandingIncludedArea += size.calcArea || size.area;
        const discountKey = `mdf:${standard.id}:${condition}:discount`;
        const p = standardSheetPrices(standard, condition, warnings);
        let retailCost = Number.isFinite(p.retailSheet) ? p.retailSheet * size.quantity : 0;
        let finalCost = Number.isFinite(p.finalSheet) ? p.finalSheet * size.quantity : 0;
        if (cleanCuttingRequired(size)) {
          const meters = ((size.length + size.width) * 2 / 1000) * size.quantity;
          const rate = manufacturingCostFromProduction(size) ? null : cuttingRateFor(thickness.raw, base?.id);
          cuttingMetersTotal += meters;
          if (Number.isFinite(rate)) {
            const cuttingCost = meters * rate;
            cuttingCostTotal += cuttingCost;
            if (cuttingPricingStatus !== "pending_production" && cuttingPricingStatus !== "missing_tariff") cuttingPricingStatus = "calculated";
            retailCost += cuttingCost;
            finalCost += cuttingCost;
            breakdown.push({ label: "Чистовой припил", value: cuttingCost, note: `${round(meters, 2)} пог. м × ${money(rate)}/пог. м.` });
          } else if (manufacturingCostFromProduction(size) || operationPriceComesFromProduction(base)) {
            cuttingPricingStatus = "pending_production";
            cuttingRequiresProductionCost = true;
            requiresOperationProductionCost = true;
            requiresProductionCost = true;
            warnings.push(`${base?.name || "Основа"}: чистовой припил требуется, но автоматический тариф для этой основы не применяется; стоимость учитывается в итоговой сумме производства.`);
          } else {
            cuttingPricingStatus = "missing_tariff";
            warnings.push(`Нет подтверждённого тарифа припила для ${base?.name || "основы"} ${baseThicknessDisplay(thickness)}.`);
            (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
          }
        }
        retailTotal += retailCost; finalTotal += finalCost; standardFinalSubtotal += finalCost; if (p.partial) (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
        mdfPricings.push({
          standard, size, quantity: size.quantity, mdfVolumeId, condition,
          discountKey, ...p
        });
        breakdown.push({ label: `Складской стандарт ${size.length}×${size.width}`, value: finalCost, note: p.conditionUnresolved ? `Цена условия «${clientConditionUiName(condition)}» отсутствует — розничная цена не подставлена.` : `${money(p.finalSheet)}/лист × ${size.quantity}. Цена за м² рассчитывается из цены за лист.` });
        addPositionCost(size, finalCost);
        itemResults.push({ ...size, standard: true, classificationId: classification.id, classificationName: classification.name, standardItem: standard, retailCost, finalCost, veneerRequiredA: 0, veneerRequiredB: 0, veneerWastePercent: null, weight, transitionCoefficient: null, transitionCoefficientApplied: null });
        return;
      }

      const area = size.calcArea || size.area;
      let retailCost = 0, finalCost = 0, baseMaterialCost = 0, baseWork = 0, baseWorkRetail = 0;
      let itemVeneerRequiredA = 0, itemVeneerRequiredB = 0;

      if (classification.id === "standard_request") {
        const veneerThickness = selectedVeneerThickness();
        const scenarioRequiresProduction = data?.baseThicknessScenarioPriceModes?.[base?.id]?.[normalizeThicknessKey(thickness.raw)] && selectedBasePriceMode(size) === "production";
        const rateRow = usesReadyShirt || scenarioRequiresProduction || requiresLayoutProductionCost ? null : standardProductionRateRowFor(thickness.raw, sides, veneerThickness, base?.id);
        const rate = num(rateRow?.ratePerM2);
        if (Number.isFinite(rate)) {
          const basePricing = priceListRateConditionState({
            row: rateRow,
            defaultRate: rate,
            conditionId: condition,
            adjustmentId: `base-rate:standard-request:${base?.id || "none"}:${normalizeThicknessKey(thickness.raw)}:${sides}:${rateRow?.veneerThicknessClass || "none"}:${condition}:discount`,
            componentLabel: `${base?.name || "Основа"} + работа · стандарт по запросу`
          });
          baseRatePricings.push({
            ...basePricing, pricingMode: "standard_request", position: size.position, areaM2: area,
            automaticCost: Number.isFinite(basePricing.automaticRatePerM2) ? area * basePricing.automaticRatePerM2 : null,
            finalCost: Number.isFinite(basePricing.finalRatePerM2) ? area * basePricing.finalRatePerM2 : null
          });
          const appliedRate = basePricing.finalRatePerM2;
          baseWorkRetail = area * rate;
          retailCost += baseWorkRetail;
          if (basePricing.conditionUnresolved) {
            baseWork = 0;
            (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
            warnings.push(`Стандарт по запросу: для компонента «${basePricing.componentLabel}» нет подтверждённой цены условия «${basePricing.conditionName}»; розничная ставка автоматически не подставляется.`);
            breakdown.push({
              label: `Стандарт по запросу · ${size.length}×${size.width}`,
              value: 0,
              note: `Цена условия «${basePricing.conditionName}» для компонента не подтверждена — компонент не включён в итог.`
            });
          } else {
            baseWork = area * appliedRate;
            finalCost += baseWork;
            breakdown.push({
              label: `Стандарт по запросу · ${size.length}×${size.width}`,
              value: baseWork,
              note: `${money(appliedRate)}/м²${basePricing.conditionFound && condition !== "retail" ? ` · ${basePricing.conditionName} по прайсу` : ""} · шпон ${Number.isFinite(veneerThickness) && veneerThickness >= 1.5 ? "от 1,5 мм" : "0,6 мм"}.`
            });
          }
        } else if (usesReadyShirt) {
          const key = `ready-shirt-production-${base?.id || "none"}`;
          if (!standardRequestWarnings.has(key)) {
            warnings.push("Готовая рубашка: стоимость приклеивания / прессования не рассчитывается автоматически и должна быть определена производством. Стоимость материала рубашки считается отдельно.");
            standardRequestWarnings.add(key);
          }
        } else if (base && selectedBasePriceMode(size) !== "production" && !requiresLayoutProductionCost) {
          const key = `standard-request-${base.id}-${thickness.raw || thickness.total}-${veneerThickness || "none"}-${sides}`;
          if (!standardRequestWarnings.has(key)) {
            warnings.push(`Стандарт по запросу: нет подтверждённой ставки для ${base.name} ${baseThicknessDisplay(thickness)}, ${sides} ст., шпон ${Number.isFinite(veneerThickness) ? `${String(veneerThickness).replace(".", ",")} мм` : "—"}. Базовая стоимость не включена.`);
            standardRequestWarnings.add(key);
          }
          (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
        } else {
          // Итоговая стоимость производства для этой основы не рассчитывается в отдельной позиции.
          // Известные компоненты (в том числе шпон) продолжают рассчитываться отдельно.
        }

        // Чистая потребность и рекомендуемый расход храним раздельно.
        // Для стандартного листового шпона рекомендация будет рассчитана ниже
        // по подтверждённой геометрии листа; для обычного шпона — по нормативу отхода.
        const aReadyShirt = isReadyShirt(selectedVeneerA);
        const bReadyShirt = faceVeneerOnBackRequested && isReadyShirt(faceVeneerBItem);
        const aSheetBased = !aReadyShirt && Core.isSheetBasedVeneer(selectedVeneerA);
        const bSheetBased = faceVeneerOnBackRequested && !bReadyShirt && Core.isSheetBasedVeneer(faceVeneerBItem);
        const aOrdinaryVeneer = !aReadyShirt && !aSheetBased;
        const bOrdinaryVeneer = faceVeneerOnBackRequested && !bReadyShirt && !bSheetBased;
        const standardVeneerWasteA = aOrdinaryVeneer ? veneerWasteAdjustmentState({
          size, classificationId: classification.id, layoutId: layout, baseAreaPerSideM2: area
        }) : null;
        const standardVeneerWasteB = bOrdinaryVeneer ? veneerWasteAdjustmentState({
          size, classificationId: classification.id, layoutId: layoutB, baseAreaPerSideM2: area
        }) : null;
        const veneerNetA = !aReadyShirt ? area : 0;
        const veneerNetB = faceVeneerOnBackRequested && !bReadyShirt ? area : 0;
        const veneerRecommendedA = standardVeneerWasteA?.recommendedVeneerAreaM2 ?? null;
        const veneerRecommendedB = standardVeneerWasteB?.recommendedVeneerAreaM2 ?? null;
        // Фактический расход будет применён после группировки по материалу/стороне.
        itemVeneerRequiredA = 0;
        itemVeneerRequiredB = 0;

        if (!faceVeneerOnBackRequested && roughBackSelected()) {
          const roughThickness = roughBackThicknessForCurrentSelection();
          const roughRate = roughBackRateForThickness(roughThickness);
          roughBackThicknessMm = Number.isFinite(roughThickness) ? roughThickness : null;
          roughBackRatePerM2 = Number.isFinite(roughRate) ? roughRate : null;
          if (Number.isFinite(roughRate)) {
            const rough = area * roughRate;
            roughBackCostTotal += rough;
            roughBackPricingStatus = "calculated";
            retailCost += rough;
            finalCost += rough;
            breakdown.push({ label: "Черновая рубашка стороны Б · стандарт", value: rough, note: `${money(roughRate)}/м² для чернового шпона ${String(roughThickness).replace(".", ",")} мм.` });
          } else {
            roughBackPricingStatus = "requires_clarification";
            warnings.push("Стандарт по запросу: для выбранной толщины чернового шпона нет подтверждённой ставки; стоимость не включена.");
            (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
          }
        } else if (!faceVeneerOnBackRequested && Number(form.veneeredSidesSelect.value) === 1 && form.reverseSideSelect.value === "paper") {
          const paperRate = num(data.meta.paperBackRatePerM2);
          if (Number.isFinite(paperRate)) {
            const paper = area * paperRate;
            retailCost += paper;
            finalCost += paper;
            breakdown.push({ label: "Бумага стороны Б · стандарт", value: paper, note: `${money(paperRate)}/м².` });
          } else {
            warnings.push("Стандарт по запросу: ставка бумаги на обратной стороне не задана; стоимость не включена.");
            (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
          }
        }

        if (!sandingEnabled()) {
          // Шлифовка не заказана.
        } else if (manufacturingCostFromProduction(size)) {
          sandingProductionArea += area;
        } else {
        const sandingRate = sides === 2 ? data.meta.sandingRatesPerM2.twoSides : data.meta.sandingRatesPerM2.oneSide;
        const sanding = area * sandingRate;
        sandingCalculatedArea += area;
        sandingCostTotal += sanding;
        retailCost += sanding;
        finalCost += sanding;
        breakdown.push({ label: "Шлифовка · стандарт по запросу", value: sanding, note: `${sides} ст. × ${money(sandingRate)}/м².` });
        }

        if (layout === "diagonal45" && !manufacturingCostFromProduction(size)) {
          const diagonalRate = num(data.meta.diagonalWorkSurchargePerM2);
          if (Number.isFinite(diagonalRate)) {
            const diagonalCost = area * diagonalRate;
            retailCost += diagonalCost;
            finalCost += diagonalCost;
            breakdown.push({ label: "Диагональ 45° · стандарт по запросу", value: diagonalCost, note: (standardVeneerWasteA || standardVeneerWasteB)
              ? `Дополнительная работа ${money(diagonalRate)}/м²; рекомендуемый отход обычного лицевого шпона ${round(standardVeneerWasteA?.recommendedWastePercent ?? standardVeneerWasteB?.recommendedWastePercent ?? 0, 1)}%.`
              : `Дополнительная работа ${money(diagonalRate)}/м²; листовой шпон рассчитывается отдельно по листам.` });
          } else {
            warnings.push("Диагональ 45°: ставка дополнительной работы не задана; стоимость не включена.");
            (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
          }
        }

        if (layout === "herringbone" && !manufacturingCostFromProduction(size)) {
          const rate = num(data.meta.herringboneWorkSurchargePerM2);
          if (Number.isFinite(rate)) { const cost = area * rate; retailCost += cost; finalCost += cost; breakdown.push({ label: "Ёлочка · сторона А", value: cost, note: `${money(rate)}/м².` }); }
          else { (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции")); warnings.push("Не подтверждена ставка ёлочки стороны А."); }
        }
        if (classification.id === "standard_request" && sideBNeedsLayout() && ["diagonal45", "herringbone"].includes(layoutB) && !manufacturingCostFromProduction(size)) {
          const rate = num(layoutB === "herringbone" ? data.meta.herringboneWorkSurchargePerM2 : data.meta.diagonalWorkSurchargePerM2);
          if (Number.isFinite(rate)) { const cost = area * rate; retailCost += cost; finalCost += cost; breakdown.push({ label: `${layoutB === "herringbone" ? "Ёлочка" : "Диагональ 45°"} · сторона Б`, value: cost, note: `${money(rate)}/м².` }); }
          else { (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции")); warnings.push("Не подтверждена ставка диагонали стороны Б."); }
        }
        if (cleanCuttingRequired(size)) {
          const meters = ((size.length + size.width) * 2 / 1000) * size.quantity;
          const rate = manufacturingCostFromProduction(size) ? null : cuttingRateFor(thickness.raw, base?.id);
          cuttingMetersTotal += meters;
          if (Number.isFinite(rate)) {
            const cuttingCost = meters * rate;
            cuttingCostTotal += cuttingCost;
            if (cuttingPricingStatus !== "pending_production" && cuttingPricingStatus !== "missing_tariff") cuttingPricingStatus = "calculated";
            retailCost += cuttingCost;
            finalCost += cuttingCost;
            breakdown.push({ label: "Чистовой припил", value: cuttingCost, note: `${round(meters, 2)} пог. м × ${money(rate)}/пог. м.` });
          } else if (manufacturingCostFromProduction(size) || operationPriceComesFromProduction(base)) {
            cuttingPricingStatus = "pending_production";
            cuttingRequiresProductionCost = true;
            requiresOperationProductionCost = true;
            requiresProductionCost = true;
            warnings.push(`${base?.name || "Основа"}: чистовой припил требуется, но автоматический тариф для этой основы не применяется; стоимость учитывается в итоговой сумме производства.`);
          } else {
            cuttingPricingStatus = "missing_tariff";
            warnings.push(`Нет подтверждённого тарифа припила для ${base?.name || "основы"} ${baseThicknessDisplay(thickness)}.`);
            (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
          }
        }


        retailTotal += retailCost;
        finalTotal += finalCost;
        standardRequestFinalSubtotal += finalCost;
        addPositionCost(size, finalCost);
        itemResults.push({ ...size, standard: true, classificationId: classification.id, classificationName: classification.name, retailCost, finalCost, veneerRequiredA: itemVeneerRequiredA, veneerRequiredB: itemVeneerRequiredB, veneerNetA, veneerNetB, veneerRecommendedA, veneerRecommendedB, veneerWastePercent: standardVeneerWasteA?.recommendedWastePercent ?? standardVeneerWasteB?.recommendedWastePercent ?? null, veneerSheetBasedA: aSheetBased, veneerSheetBasedB: bSheetBased, readyShirtA: aReadyShirt, readyShirtB: bReadyShirt, readyShirtCalculations: [], sheetVeneerCalculations: [], weight, transitionCoefficient: null, transitionCoefficientApplied: null });
        return;
      }

      allStandard = false;
      const transitionPricing = transitionPricingState(size);
      let transitionCoefficientApplied = null;
      if (base && selectedBasePriceMode(size) !== "production" && !usesReadyShirt && !requiresLayoutProductionCost) {
        if (manufacturingTypeForSize(size) === "allowance20") {
          // Полуфабрикат +20: основу, фактический остаток материала и производственные работы
          // не рассчитываем внутри отдельной позиции. Итоговую производственную сумму
          // производство передаст для общей спецификации; шпон считается отдельно ниже.
        } else {
          const rateRow = nonstandardRateRowFor(thickness.raw, sides, base.id);
          const rate = num(rateRow?.ratePerM2);
          if (Number.isFinite(rate)) {
            const basePricing = priceListRateConditionState({
              row: rateRow,
              defaultRate: rate,
              conditionId: condition,
              adjustmentId: `base-rate:nonstandard:${base.id}:${normalizeThicknessKey(thickness.raw)}:${sides}:${condition}:discount`,
              componentLabel: `${base.name} + работа · точный размер`
            });
            baseRatePricings.push({
              ...basePricing, pricingMode: "nonstandard", position: size.position, areaM2: area,
              automaticCost: Number.isFinite(basePricing.automaticRatePerM2) ? area * basePricing.automaticRatePerM2 : null,
              finalCost: Number.isFinite(basePricing.finalRatePerM2) ? area * basePricing.finalRatePerM2 : null
            });
            const appliedRate = basePricing.finalRatePerM2;
            baseWorkRetail = area * rate;
            baseWork = basePricing.conditionUnresolved ? 0 : area * appliedRate;
            if (basePricing.conditionUnresolved) {
              (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
              warnings.push(`Точный размер: для компонента «${basePricing.componentLabel}» нет подтверждённой цены условия «${basePricing.conditionName}»; розничная ставка автоматически не подставляется.`);
              breakdown.push({ label: `${base.name} + работа, ${size.length}×${size.width}`, value: 0, note: `Цена условия «${basePricing.conditionName}» для компонента не подтверждена — компонент не включён в итог.` });
            } else {
              breakdown.push({ label: `${base.name} + работа, ${size.length}×${size.width}`, value: baseWork, note: `${rateRow.sourceNote || "Готовая ставка из актуальной таблицы деталировки"}: ${money(appliedRate)}/м².${basePricing.conditionFound && condition !== "retail" ? ` ${basePricing.conditionName} применено по прайсовым данным.` : ""} Коэффициент 1,53 повторно не применяется.` });
            }
            const faceThickness = selectedVeneerThickness();
            if (!basePricing.conditionUnresolved && thickVeneerWorkAdjustment.applies && Number.isFinite(thickVeneerWorkAdjustment.actualCoefficient)) {
              const baseWorkBeforeThickVeneer = baseWork;
              baseWork = baseWorkBeforeThickVeneer * thickVeneerWorkAdjustment.actualCoefficient;
              baseWorkRetail *= thickVeneerWorkAdjustment.actualCoefficient;
              const thickVeneerDelta = baseWork - baseWorkBeforeThickVeneer;
              const coefficientSource = Number.isFinite(thickVeneerWorkAdjustment.automaticCoefficient)
                ? `${money(thickVeneerWorkAdjustment.thickRatePerM2)}/м² ÷ ${money(thickVeneerWorkAdjustment.baselineRatePerM2)}/м²`
                : "автоматическая пара стандартных ставок отсутствует";
              breakdown.push({
                label: `Работа с толстым шпоном · позиция ${size.position}`,
                value: thickVeneerDelta,
                note: `Ставка точного размера × ${round(thickVeneerWorkAdjustment.actualCoefficient, 4)}. ${thickVeneerWorkAdjustment.changedManually ? "Коэффициент изменён менеджером вручную." : `Автоматически по стандартным ставкам: ${coefficientSource}.`}`
              });
            } else if (!basePricing.conditionUnresolved && Number.isFinite(faceThickness) && Math.abs(faceThickness - 0.6) > 0.001 && faceThickness < thickVeneerWorkAdjustment.thresholdMm) {
              const key = `nonstandard-intermediate-veneer-${faceThickness}`;
              if (!standardRequestWarnings.has(key)) {
                warnings.push(`Нестандарт со шпоном ${String(faceThickness).replace(".", ",")} мм: отдельная подтверждённая доплата для толщины, отличной от 0,6 мм и меньше 1,5 мм, отсутствует. Базовая ставка основы + работы включена, дополнительная корректировка не рассчитана.`);
                standardRequestWarnings.add(key);
              }
              (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
            }
          } else { warnings.push(`Нет подтверждённой ставки нестандарта для ${base.name} ${baseThicknessDisplay(thickness)}, ${sides} ст.`); (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции")); }
        }
      } else if (base) {
        // Для режима production и для готовых рубашек стоимость соответствующей
        // производственной работы не добавляется в отдельный расчёт. Она будет
        // определена на общей странице спецификации.
      }
      if (transitionPricing.applies && Number.isFinite(baseWork) && baseWork > 0) {
        const normalCoefficient = num(data.meta.nonstandardBaseWasteCoefficient) || 1.53;
        const transitionCoefficient = transitionPricing.coefficient;
        const transitionWork = baseWork / normalCoefficient * transitionCoefficient;
        const transitionSurcharge = transitionWork - baseWork;
        baseWork = transitionWork;
        if (baseWorkRetail > 0) baseWorkRetail = baseWorkRetail / normalCoefficient * transitionCoefficient;
        transitionCoefficientApplied = transitionCoefficient;
        breakdown.push({
          label: `Переход рисунка · позиция ${size.position}`,
          value: transitionSurcharge,
          note: `Для компонента ${base.name} + работа коэффициент ${String(normalCoefficient).replace(".", ",")} заменён на ${String(transitionCoefficient).replace(".", ",")}; шпон, распил, кромка и финиш не умножаются.`
        });
      }
      retailCost += baseMaterialCost + (baseWorkRetail || baseWork); finalCost += baseMaterialCost + baseWork;

      const hasFaceVeneerOnBack = sides === 2 && form.veneerBModeSelect.value !== "rough";
      const aReadyShirt = isReadyShirt(selectedVeneerA);
      const bReadyShirt = hasFaceVeneerOnBack && isReadyShirt(faceVeneerBItem);
      const nonstandardVeneerWasteA = !aReadyShirt ? veneerWasteAdjustmentState({
        size, classificationId: classification.id, layoutId: layout, baseAreaPerSideM2: area
      }) : null;
      const nonstandardVeneerWasteB = hasFaceVeneerOnBack && !bReadyShirt ? veneerWasteAdjustmentState({
        size, classificationId: classification.id, layoutId: layoutB, baseAreaPerSideM2: area
      }) : null;
      const veneerNetA = !aReadyShirt ? area : 0;
      const veneerNetB = hasFaceVeneerOnBack && !bReadyShirt ? area : 0;
      const veneerRecommendedA = nonstandardVeneerWasteA?.recommendedVeneerAreaM2 ?? null;
      const veneerRecommendedB = nonstandardVeneerWasteB?.recommendedVeneerAreaM2 ?? null;
      const veneerWastePercent = nonstandardVeneerWasteA?.recommendedWastePercent ?? nonstandardVeneerWasteB?.recommendedWastePercent ?? null;
      // Фактическое количество применяется после группировки по материалу/стороне.
      itemVeneerRequiredA = 0;
      itemVeneerRequiredB = 0;
      if (!hasFaceVeneerOnBack && roughBackSelected()) {
        const roughThickness = roughBackThicknessForCurrentSelection();
        const roughRate = roughBackRateForThickness(roughThickness);
        roughBackThicknessMm = Number.isFinite(roughThickness) ? roughThickness : null;
        roughBackRatePerM2 = Number.isFinite(roughRate) ? roughRate : null;
        if (Number.isFinite(roughRate)) {
          const rough = area * roughRate;
          roughBackCostTotal += rough;
          roughBackPricingStatus = "calculated";
          retailCost += rough; finalCost += rough;
          breakdown.push({ label: "Черновой шпон стороны Б", value: rough, note: `${money(roughRate)}/м² для подтверждённой толщины чернового шпона ${String(roughThickness).replace(".", ",")} мм.` });
        } else {
          roughBackPricingStatus = "requires_clarification";
          (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
          warnings.push(`Черновая сторона Б: для выбранной толщины ${Number.isFinite(roughThickness) ? `${String(roughThickness).replace(".", ",")} мм` : "—"} нет подтверждённой ставки; компонент оставлен на согласование.`);
          breakdown.push({ label: "Черновой шпон стороны Б", value: 0, note: "Тариф для этой толщины не подтверждён — не включён автоматически." });
        }
      } else if (!hasFaceVeneerOnBack && form.reverseSideSelect.value === "paper") {
        const paperRate = num(data.meta.paperBackRatePerM2);
        if (Number.isFinite(paperRate)) {
          const paper = area * paperRate; retailCost += paper; finalCost += paper;
          breakdown.push({ label: "Бумага стороны Б", value: paper, note: `${money(paperRate)}/м².` });
        } else {
          warnings.push("Для бумаги на обратной стороне ставка не задана; стоимость не включена.");
          (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
        }
      }

      if (layout === "diagonal45" && !manufacturingCostFromProduction(size)) { const c = area * data.meta.diagonalWorkSurchargePerM2; retailCost += c; finalCost += c; breakdown.push({ label: "Диагональ 45°", value: c, note: `Дополнительная работа ${money(data.meta.diagonalWorkSurchargePerM2)}/м².` }); }
      if (herringbone && !manufacturingCostFromProduction(size)) { const c = area * data.meta.herringboneWorkSurchargePerM2; retailCost += c; finalCost += c; breakdown.push({ label: "Ёлочка", value: c, note: `Дополнительная работа ${money(data.meta.herringboneWorkSurchargePerM2)}/м²; требуется оцифровка по ТЗ.` }); }

      if (sideBNeedsLayout() && ["diagonal45", "herringbone"].includes(layoutB) && !manufacturingCostFromProduction(size)) {
        const rate = num(layoutB === "herringbone" ? data.meta.herringboneWorkSurchargePerM2 : data.meta.diagonalWorkSurchargePerM2);
        if (Number.isFinite(rate)) { const cost = area * rate; retailCost += cost; finalCost += cost; breakdown.push({ label: `${layoutB === "herringbone" ? "Ёлочка" : "Диагональ 45°"} · сторона Б`, value: cost, note: `${money(rate)}/м².` }); }
        else { (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции")); warnings.push("Не подтверждена ставка диагонали стороны Б."); }
      }
      if (cleanCuttingRequired(size)) {
        const meters = ((size.length + size.width) * 2 / 1000) * size.quantity, rate = manufacturingCostFromProduction(size) ? null : cuttingRateFor(thickness.raw, base?.id);
        cuttingMetersTotal += meters;
        if (Number.isFinite(rate)) {
          const c = meters * rate;
          cuttingCostTotal += c;
          if (cuttingPricingStatus !== "pending_production" && cuttingPricingStatus !== "missing_tariff") cuttingPricingStatus = "calculated";
          retailCost += c; finalCost += c;
          breakdown.push({ label: "Чистовой припил", value: c, note: `${round(meters, 2)} пог. м × ${money(rate)}/пог. м.` });
        } else if (manufacturingCostFromProduction(size) || operationPriceComesFromProduction(base)) {
          cuttingPricingStatus = "pending_production";
          cuttingRequiresProductionCost = true;
          requiresOperationProductionCost = true;
          requiresProductionCost = true;
          warnings.push(`${base?.name || "Основа"}: чистовой припил требуется, но автоматический тариф для этой основы не применяется; стоимость учитывается в итоговой сумме производства.`);
        } else {
          cuttingPricingStatus = "missing_tariff";
          warnings.push(`Нет подтверждённого тарифа припила для ${base?.name || "основы"} ${baseThicknessDisplay(thickness)}.`);
          (hasPartialPrice = true, markPositionPending(size, "Основа и производственные операции"));
        }
      }

      if (!sandingEnabled()) {
          // Шлифовка не заказана.
        } else if (manufacturingCostFromProduction(size)) {
          sandingProductionArea += area;
        } else {
        const sandingRate = sides === 2 ? data.meta.sandingRatesPerM2.twoSides : data.meta.sandingRatesPerM2.oneSide;
      const sanding = area * sandingRate;
      sandingCalculatedArea += area;
      sandingCostTotal += sanding;
      retailCost += sanding; finalCost += sanding;
      breakdown.push({ label: "Шлифовка", value: sanding, note: `${sides} ст. × ${money(sandingRate)}/м².` });
        }

      retailTotal += retailCost; finalTotal += finalCost; nonstandardFinalSubtotal += finalCost;
      addPositionCost(size, finalCost);
      itemResults.push({ ...size, standard: false, classificationId: classification.id, classificationName: classification.name, retailCost, finalCost, veneerRequiredA: itemVeneerRequiredA, veneerRequiredB: itemVeneerRequiredB, veneerNetA, veneerNetB, veneerRecommendedA, veneerRecommendedB, veneerWastePercent, veneerSheetBasedA: !aReadyShirt && Core.isSheetBasedVeneer(selectedVeneerA), veneerSheetBasedB: hasFaceVeneerOnBack && !bReadyShirt && Core.isSheetBasedVeneer(faceVeneerBItem), readyShirtA: aReadyShirt, readyShirtB: bReadyShirt, readyShirtCalculations: [], sheetVeneerCalculations: [], weight, transitionCoefficient: transitionPricing.coefficient, transitionCoefficientApplied });
    });

    if (!validSizes.length) warnings.push("Не добавлен ни один заполненный размер.");

    // Для режимов production итоговая стоимость производства не вводится и не
    // распределяется внутри отдельного расчёта. Здесь сохраняются только известные
    // компоненты; полный итог будет сформирован на общей странице спецификации.

    const veneerConsumptions = [];
    const materialIdentity = (item) => String(item?.id || veneerDisplayName(item) || "unknown");
    const sameMaterial = (left, right) => Boolean(left && right && (
      (left.id && right.id && left.id === right.id) || veneerDisplayName(left) === veneerDisplayName(right)
    ));
    const consumptionKeyFor = (item, which, sameAsA, pricingMode) =>
      `${pricingMode}:${materialIdentity(item)}:${sameAsA ? "A+B" : which}`;
    const groupMap = new Map();
    const addConsumptionContribution = ({ item, which, sameAsA = false, pricingMode, row, cleanArea, recommendedArea }) => {
      if (!item || !(cleanArea > 0)) return;
      const key = consumptionKeyFor(item, which, sameAsA, pricingMode);
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          key, item, which, sameAsA, pricingMode, sideKey: sameAsA ? "A+B" : which, contributions: []
        });
      }
      groupMap.get(key).contributions.push({ row, side: which, cleanArea, recommendedArea });
    };

    itemResults.forEach((row) => {
      if (!["standard_request", "nonstandard"].includes(row.classificationId)) return;
      const pricingMode = row.classificationId === "nonstandard" ? "nonstandard" : "standard";
      const aEligible = row.veneerNetA > 0 && !row.readyShirtA && !(row.classificationId === "standard_request" && row.veneerSheetBasedA);
      const bEligible = row.veneerNetB > 0 && !row.readyShirtB && !(row.classificationId === "standard_request" && row.veneerSheetBasedB);
      const canCombine = layout === layoutB && aEligible && bEligible && sameFaceSelectionOnBack && !isFaceOnlyExtraVeneer(selectedVeneerA) && sameMaterial(selectedVeneerA, faceVeneerBItem);

      if (canCombine) {
        addConsumptionContribution({ item: selectedVeneerA, which: "A", sameAsA: true, pricingMode, row, cleanArea: row.veneerNetA, recommendedArea: row.veneerRecommendedA });
        const group = groupMap.get(consumptionKeyFor(selectedVeneerA, "A", true, pricingMode));
        group.contributions.push({ row, side: "B", cleanArea: row.veneerNetB, recommendedArea: row.veneerRecommendedB });
      } else {
        if (aEligible) addConsumptionContribution({ item: selectedVeneerA, which: "A", pricingMode, row, cleanArea: row.veneerNetA, recommendedArea: row.veneerRecommendedA });
        if (bEligible && faceVeneerBItem) addConsumptionContribution({ item: faceVeneerBItem, which: "B", pricingMode, row, cleanArea: row.veneerNetB, recommendedArea: row.veneerRecommendedB });
      }
    });

    groupMap.forEach((group) => {
      const requiredVeneerAreaM2 = group.contributions.reduce((sum, contribution) => sum + (Number(contribution.cleanArea) || 0), 0);
      const recommendationKnown = group.contributions.every((contribution) => Number.isFinite(contribution.recommendedArea));
      let recommendedVeneerAreaM2 = recommendationKnown
        ? group.contributions.reduce((sum, contribution) => sum + contribution.recommendedArea, 0)
        : null;
      if (group.which === "B" && layoutB === "mixmatch" && layout !== layoutB) {
        const totalBackArea = itemResults.reduce((sum, row) => sum + (row.veneerNetB || 0), 0);
        const minimumArea = num(data.meta.mixMatchDefaultVeneerAreaM2);
        recommendedVeneerAreaM2 = Math.max(totalBackArea, minimumArea || totalBackArea) * requiredVeneerAreaM2 / totalBackArea;
        group.contributions.forEach(contribution => { contribution.recommendedArea = recommendedVeneerAreaM2 * contribution.cleanArea / requiredVeneerAreaM2; contribution.row.veneerRecommendedB = contribution.recommendedArea; });
      }
      const recommendedWastePercent = Number.isFinite(recommendedVeneerAreaM2) && requiredVeneerAreaM2 > 0
        ? (recommendedVeneerAreaM2 / requiredVeneerAreaM2 - 1) * 100
        : null;
      const id = `veneer-actual:${group.key}`;
      const actualVeneerAreaManual = priceAdjustmentOverrides.has(id);
      const storedActual = num(priceAdjustmentOverrides.get(id));
      const actualVeneerAreaM2 = actualVeneerAreaManual ? storedActual : recommendedVeneerAreaM2;
      const complexLayoutMinimumApplies = ["diagonal45", "herringbone"].includes(group.which === "B" ? layoutB : layout) && Number.isFinite(recommendedVeneerAreaM2);
      const minimumActualVeneerAreaM2 = complexLayoutMinimumApplies ? recommendedVeneerAreaM2 : requiredVeneerAreaM2;
      const actualValid = Number.isFinite(actualVeneerAreaM2) && actualVeneerAreaM2 > 0 && actualVeneerAreaM2 + 1e-9 >= minimumActualVeneerAreaM2;
      const validationError = !Number.isFinite(actualVeneerAreaM2)
        ? "Укажите фактическое количество шпона."
        : actualVeneerAreaM2 <= 0 || actualVeneerAreaM2 + 1e-9 < minimumActualVeneerAreaM2
          ? (complexLayoutMinimumApplies
            ? `Для диагонали / ёлочки фактическое количество шпона не может быть меньше подтверждённого минимума 100% отхода (${round(minimumActualVeneerAreaM2, 2)} м²).`
            : "Фактическое количество шпона не может быть меньше расчётной потребности")
          : "";
      const actualWasteAreaM2 = Number.isFinite(actualVeneerAreaM2) ? actualVeneerAreaM2 - requiredVeneerAreaM2 : null;
      const actualWastePercent = Number.isFinite(actualWasteAreaM2) && requiredVeneerAreaM2 > 0
        ? actualWasteAreaM2 / requiredVeneerAreaM2 * 100
        : null;
      const distributionBase = recommendationKnown && recommendedVeneerAreaM2 > 0 ? recommendedVeneerAreaM2 : requiredVeneerAreaM2;

      if (actualValid && distributionBase > 0) {
        group.contributions.forEach((contribution) => {
          const contributionBase = recommendationKnown ? contribution.recommendedArea : contribution.cleanArea;
          const distributedArea = actualVeneerAreaM2 * contributionBase / distributionBase;
          if (contribution.side === "B") contribution.row.veneerRequiredB += distributedArea;
          else contribution.row.veneerRequiredA += distributedArea;
        });
      } else {
        warnings.push(validationError || "Фактическое количество шпона не задано.");
        hasPartialPrice = true;
      }

      const consumption = {
        id, consumptionKey: group.key, item: group.item, materialId: group.item?.id || "", materialName: veneerDisplayName(group.item),
        which: group.which, sideKey: group.sideKey, sameAsA: group.sameAsA, pricingMode: group.pricingMode,
        requiredVeneerAreaM2, recommendedVeneerAreaM2, recommendedWastePercent,
        actualVeneerAreaM2, actualWasteAreaM2, actualWastePercent, actualVeneerAreaManual,
        valid: actualValid, validationError, paidVeneerAreaM2: null, purchasedWholeSheets: null, materialCost: null
      };
      veneerConsumptions.push(consumption);
      veneerWasteAdjustments.push(consumption);
    });

    veneerRequiredStandardA = itemResults.filter((row) => row.classificationId === "standard_request").reduce((sum, row) => sum + (row.veneerRequiredA || 0), 0);
    veneerRequiredStandardB = itemResults.filter((row) => row.classificationId === "standard_request").reduce((sum, row) => sum + (row.veneerRequiredB || 0), 0);
    veneerRequiredNonstandardA = itemResults.filter((row) => row.classificationId === "nonstandard").reduce((sum, row) => sum + (row.veneerRequiredA || 0), 0);
    veneerRequiredNonstandardB = itemResults.filter((row) => row.classificationId === "nonstandard").reduce((sum, row) => sum + (row.veneerRequiredB || 0), 0);

    const sameFaceVeneerOnB = (
      sides === 2 && form.veneerBModeSelect.value === "same" && layout === layoutB
    ) && !isFaceOnlyExtraVeneer(selectedVeneerA);
    const mixMatchRelevantConsumptions = veneerConsumptions.filter((consumption) => (
      sameMaterial(consumption.item, selectedVeneerA) && ["A", "A+B"].includes(consumption.sideKey)
    ));
    const mixMatchRequiredFaceArea = mixMatchRelevantConsumptions.reduce((sum, consumption) => sum + (consumption.requiredVeneerAreaM2 || 0), 0);
    const mixMatchGroupRecords = existingSpecificationItems().filter(record =>
      window.WoodstockSpecificationGroupId && (record.calculationGroupId || record.id) === window.WoodstockSpecificationGroupId &&
      (record.layoutId || record.layoutAId) === "mixmatch" && record.materialSides?.A?.id === selectedVeneerA?.id
    );
    const mixMatchGroupRequiredArea = mixMatchRequiredFaceArea + mixMatchGroupRecords.reduce((sum, record) => sum + (Number(record.pricing?.mixMatchVeneer?.requiredVeneerAreaM2) || 0), 0);
    const mixMatchDefaultArea = num(data?.meta?.mixMatchDefaultVeneerAreaM2);
    const mixMatchMinimumPacks = Math.max(1, Math.round(num(data?.meta?.mixMatchMinimumPacks) || 3));
    const mixMatchAutomaticArea = mixMatchRequiredFaceArea > 0
      ? Math.max(mixMatchGroupRequiredArea, Number.isFinite(mixMatchDefaultArea) && mixMatchDefaultArea > 0 ? mixMatchDefaultArea : mixMatchGroupRequiredArea)
      : null;
    const mixMatchOverrideId = "mixmatch:actualVeneerAreaM2";
    const mixMatchChangedManually = priceAdjustmentOverrides.has(mixMatchOverrideId);
    const mixMatchManualArea = num(priceAdjustmentOverrides.get(mixMatchOverrideId));
    const mixMatchActualFaceArea = mixMatchChangedManually ? mixMatchManualArea : mixMatchAutomaticArea;
    const mixMatchValid = layout !== "mixmatch" || !mixMatchRequiredFaceArea || (
      Number.isFinite(mixMatchActualFaceArea) && mixMatchActualFaceArea + 1e-9 >= mixMatchGroupRequiredArea
    );
    const mixMatchValidationError = mixMatchValid ? "" : "Для MixMatch заложенный объём шпона не может быть меньше расчётной потребности.";
    if (layout === "mixmatch" && mixMatchValidationError) {
      warnings.push(mixMatchValidationError);
      hasPartialPrice = true;
    }

    let mixMatchVeneerPricing = {
      applies: false,
      overrideId: mixMatchOverrideId,
      requiredAreaM2: mixMatchRequiredFaceArea || null,
      recommendedAreaM2: Number.isFinite(mixMatchAutomaticArea) ? mixMatchAutomaticArea : null,
      calculatedAreaM2: Number.isFinite(mixMatchAutomaticArea) ? mixMatchAutomaticArea : null,
      defaultAreaM2: Number.isFinite(mixMatchDefaultArea) && mixMatchDefaultArea > 0 ? mixMatchDefaultArea : null,
      minimumPacks: mixMatchMinimumPacks,
      actualVeneerAreaM2: Number.isFinite(mixMatchActualFaceArea) ? mixMatchActualFaceArea : null,
      automaticPaidAreaM2: null,
      actualPaidAreaM2: null,
      paidSheets: null,
      changedManually: mixMatchChangedManually,
      valid: mixMatchValid,
      validationError: mixMatchValidationError,
      scale: 1
    };
    if (layout === "mixmatch" && selectedVeneerA && mixMatchRequiredFaceArea > 0 && Number.isFinite(mixMatchActualFaceArea) && mixMatchActualFaceArea > 0) {
      const automaticBasis = Core.veneerVolumeBasis(selectedVeneerA, mixMatchAutomaticArea);
      const actualBasis = Core.veneerVolumeBasis(selectedVeneerA, mixMatchActualFaceArea);
      mixMatchVeneerPricing = {
        ...mixMatchVeneerPricing,
        applies: true,
        automaticPaidAreaM2: num(automaticBasis.area) || mixMatchAutomaticArea,
        actualPaidAreaM2: num(actualBasis.area) || mixMatchActualFaceArea,
        paidSheets: Number.isFinite(num(actualBasis.sheets)) ? num(actualBasis.sheets) : null,
        scale: mixMatchActualFaceArea / mixMatchGroupRequiredArea
      };
      mixMatchRelevantConsumptions.forEach((consumption) => {
        const share = mixMatchGroupRequiredArea > 0 ? consumption.requiredVeneerAreaM2 / mixMatchGroupRequiredArea : 0;
        const actualArea = mixMatchActualFaceArea * share;
        consumption.recommendedVeneerAreaM2 = mixMatchAutomaticArea * share;
        consumption.recommendedWastePercent = consumption.requiredVeneerAreaM2 > 0
          ? (consumption.recommendedVeneerAreaM2 / consumption.requiredVeneerAreaM2 - 1) * 100
          : null;
        consumption.actualVeneerAreaM2 = actualArea;
        consumption.actualWasteAreaM2 = actualArea - consumption.requiredVeneerAreaM2;
        consumption.actualWastePercent = consumption.requiredVeneerAreaM2 > 0
          ? consumption.actualWasteAreaM2 / consumption.requiredVeneerAreaM2 * 100
          : null;
        consumption.actualVeneerAreaManual = mixMatchChangedManually;
        consumption.valid = mixMatchValid;
        consumption.validationError = mixMatchValidationError;
        consumption.mixMatchControlled = true;
      });
    }

    const allocateVeneerCostToPositions = (cost, which, sameAsA, pricingMode) => {
      const classificationId = pricingMode === "nonstandard" ? "nonstandard" : "standard_request";
      const items = itemResults.filter((item) => item.classificationId === classificationId);
      allocatePositionCost(items, cost, (item) => {
        if (which === "A" && sameAsA) return (item.veneerRequiredA || 0) + (item.veneerRequiredB || 0);
        return which === "B" ? (item.veneerRequiredB || 0) : (item.veneerRequiredA || 0);
      });
    };

    const addVeneerComponent = (item, requiredArea, which, label, sameAsA = false, pricingMode = "standard") => {
      const affectedPositions = itemResults.filter(row => row.classificationId === (pricingMode === "nonstandard" ? "nonstandard" : "standard_request"));
      const consumptionKey = consumptionKeyFor(item, which, sameAsA, pricingMode);
      const consumption = veneerConsumptions.find((entry) => entry.consumptionKey === consumptionKey) || null;
      if (!item || !Number.isFinite(requiredArea) || requiredArea <= 0) return;
      const linkedConsumptions = existingSpecificationItems().filter(record =>
        window.WoodstockSpecificationGroupId && (record.calculationGroupId || record.id) === window.WoodstockSpecificationGroupId &&
        (record.layoutAId || record.layoutId) === layout
      ).flatMap(record => record.veneerConsumptions || []).filter(entry =>
        entry.materialId === item.id && entry.side === (sameAsA ? 'A+B' : which) && entry.pricingMode === pricingMode
      );
      const linkedArea = linkedConsumptions.reduce((sum,entry)=>sum+(Number(entry.actualVeneerAreaM2)||0),0);
      const sharedArea = requiredArea + linkedArea;
      const mixMatchBasis = mixMatchVeneerPricing.applies && which === "A"
        ? Core.veneerVolumeBasis(item, mixMatchVeneerPricing.actualVeneerAreaM2)
        : linkedConsumptions.length ? Core.veneerVolumeBasis(item, sharedArea) : null;
      const pricing = automaticVeneerPricing(item, requiredArea, which, pricingMode, mixMatchBasis);
      if (!pricing || !Number.isFinite(pricing.retailPrice) || !Number.isFinite(pricing.finalPrice)) {
        warnings.push(pricing?.requiresPriceAgreement
          ? `${label}: ${pricing.priceAgreementReason}`
          : pricing?.conditionUnresolved
          ? `${label}: нет подтверждённой цены условия «${pricing.levelName}»; розничная цена автоматически не подставляется.`
          : `${label}: цена шпона не найдена в выбранной позиции; компонент не включён в стоимость.`);
        hasPartialPrice = true;
        markPositionPending(affectedPositions, "Цена шпона");
        const pendingSheet = pricing?.requiresPriceAgreement && Core.isSheetBasedVeneer(item)
          ? Core.veneerPhysicalSheetDimensions(item) : null;
        const pendingRequirement = pendingSheet ? {
          method: "shared_consumption", exact: pricing.basis.exact,
          netAreaM2: requiredArea,
          physicalLengthMm: pendingSheet.lengthMm, physicalWidthMm: pendingSheet.widthMm,
          physicalSheetAreaM2: pendingSheet.areaM2,
          purchasedSheets: pricing.basis.sheets, paidAreaM2: pricing.basis.area
        } : null;
        if (consumption && pendingRequirement) {
          consumption.paidVeneerAreaM2 = pricing.basis.area;
          consumption.purchasedWholeSheets = pricing.basis.sheets;
        }
        veneerPricings.push({ which, item, sameAsA, pricingMode, ...(pricing || {}), label, consumptionKey, consumption,
          ...(pendingRequirement ? { requirement: pendingRequirement, calculationMethod: "shared_consumption" } : {}) });
        return;
      }
      const chargeableArea = mixMatchVeneerPricing.applies && which === "A"
        ? requiredArea * mixMatchVeneerPricing.scale
        : requiredArea;
      const sharedMixMatch = mixMatchVeneerPricing.applies && which === "A" && mixMatchGroupRecords.length > 0;
      const sharedPurchase = sharedMixMatch || linkedConsumptions.length > 0;
      const purchaseArea = sharedMixMatch ? mixMatchActualFaceArea : linkedConsumptions.length ? sharedArea : chargeableArea;
      const purchaseShare = sharedPurchase ? chargeableArea / purchaseArea : 1;
      const sharePurchase = purchase => sharedPurchase ? {...purchase,
        cost:Number.isFinite(purchase.cost)?purchase.cost*purchaseShare:purchase.cost,
        area:Number.isFinite(purchase.area)?purchase.area*purchaseShare:purchase.area,
        sheets:Number.isFinite(purchase.sheets)?purchase.sheets*purchaseShare:purchase.sheets,
        note:purchase.note+' · доля позиции в общем расходе: '+round(purchaseShare*100,2)+'%'
      } : purchase;
      const retailPurchase = sharePurchase(veneerPurchase(item, purchaseArea, pricing.retailPrice, 0, warnings, label));
      const finalPurchase = sharePurchase(veneerPurchase(item, purchaseArea, pricing.finalPrice, 0, warnings, label));
      if (consumption) {
        consumption.paidVeneerAreaM2 = Number.isFinite(finalPurchase.area) ? finalPurchase.area : null;
        consumption.purchasedWholeSheets = Number.isFinite(finalPurchase.sheets) ? finalPurchase.sheets : null;
        consumption.materialCost = Number.isFinite(finalPurchase.cost) ? finalPurchase.cost : null;
      }
      retailTotal += retailPurchase.cost;
      finalTotal += finalPurchase.cost;
      if (pricingMode === "nonstandard") nonstandardFinalSubtotal += finalPurchase.cost;
      else standardRequestFinalSubtotal += finalPurchase.cost;
      allocateVeneerCostToPositions(finalPurchase.cost, which, sameAsA, pricingMode);
      hasPartialPrice ||= retailPurchase.partial || finalPurchase.partial;
      if (retailPurchase.partial || finalPurchase.partial) markPositionPending(affectedPositions, "Цена шпона");
      const sheetBased = Core.isSheetBasedVeneer(item);
      const physicalSheet = sheetBased ? Core.veneerPhysicalSheetDimensions(item) : null;
      const sharedPanelSizes = sheetBased && pricingMode === "nonstandard"
        ? itemResults.filter((row) => row.classificationId === "nonstandard" && (
          which === "A" && sameAsA ? ((row.veneerRequiredA || 0) + (row.veneerRequiredB || 0)) > 0
            : which === "B" ? (row.veneerRequiredB || 0) > 0
              : (row.veneerRequiredA || 0) > 0
        )).map((row) => ({ length: row.length, width: row.width, quantity: row.quantity, position: row.position }))
        : [];
      veneerPricings.push({
        which, item, sameAsA, pricingMode, label, ...pricing, retailPurchase, finalPurchase, consumptionKey, consumption,
        calculationMethod: sheetBased ? "shared_consumption" : "area",
        calculationMethodLabel: sheetBased ? "Общий расход" : "По площади",
        requirement: sheetBased ? {
          method: "shared_consumption",
          netAreaM2: requiredArea,
          physicalLengthMm: physicalSheet?.lengthMm ?? null,
          physicalWidthMm: physicalSheet?.widthMm ?? null,
          physicalSheetAreaM2: physicalSheet?.areaM2 ?? null,
          purchasedSheets: finalPurchase.sheets,
          paidAreaM2: finalPurchase.area,
          proportionalDistribution: pricingMode === "nonstandard"
        } : null,
        proportionalDistribution: sheetBased && pricingMode === "nonstandard",
        panelSizes: sharedPanelSizes
      });
      if (finalPurchase.cost > 0) {
        breakdown.push({
          label,
          value: finalPurchase.cost,
          note: `${finalPurchase.note} · ${pricing.levelName}`
        });
      }
    };

    const addVeneerContext = (requiredA, requiredB, pricingMode, contextLabel) => {
      if (!(requiredA > 0 || requiredB > 0)) return;
      const sameVeneerOnB = requiredB > 0 && sides === 2 && form.veneerBModeSelect.value === "same";

      if (sameVeneerOnB && isFaceOnlyExtraVeneer(selectedVeneerA)) {
        addVeneerComponent(selectedVeneerA, requiredA, "A", `Шпон стороны А${contextLabel}`, false, pricingMode);
        const backB = backsideBVariantFor(selectedVeneerA);
        if (backB) addVeneerComponent(backB, requiredB, "B", `Шпон стороны Б (категория B)${contextLabel}`, false, pricingMode);
        else {
          warnings.push(`Сторона Б${contextLabel}: для Extra/AA нельзя автоматически дублировать лицевой шпон; цена категории B для выбранной позиции не найдена.`);
          hasPartialPrice = true;
        }
      } else if (sameVeneerOnB && layout === layoutB) {
        addVeneerComponent(selectedVeneerA, requiredA + requiredB, "A", `Шпон сторон А и Б${contextLabel}`, true, pricingMode);
      } else {
        if (requiredA > 0) addVeneerComponent(selectedVeneerA, requiredA, "A", `Шпон стороны А${contextLabel}`, false, pricingMode);
        if (requiredB > 0 && (sameVeneerOnB ? faceVeneerBItem : selectedVeneerB)) addVeneerComponent(sameVeneerOnB ? faceVeneerBItem : selectedVeneerB, requiredB, "B", `Шпон стороны Б${contextLabel}`, false, pricingMode);
      }
    };

    const standardSheetGroups = new Map();
    const addStandardSheetGroupRow = ({ item, which, sameAsA = false, surfaceCount = 1, label, row }) => {
      if (!Core.isSheetBasedVeneer(item) || !row || row.classificationId !== "standard_request") return;
      const itemKey = item.id || veneerDisplayName(item);
      const contextKey = sameAsA ? "A+B" : which;
      const key = `${itemKey}::${contextKey}::${row.length}x${row.width}`;
      if (!standardSheetGroups.has(key)) {
        standardSheetGroups.set(key, {
          key, item, which, sameAsA, surfaceCount, label,
          length: row.length, width: row.width, quantity: 0, rows: []
        });
      }
      const group = standardSheetGroups.get(key);
      group.quantity += Number(row.quantity) || 0;
      group.rows.push(row);
    };

    itemResults.filter((item) => item.classificationId === "standard_request").forEach((item) => {
      const combineSameSheetOnBothFaces = Boolean(
        layout === layoutB && item.veneerSheetBasedA &&
        item.veneerSheetBasedB &&
        sameFaceSelectionOnBack &&
        !isFaceOnlyExtraVeneer(selectedVeneerA) &&
        selectedVeneerA && faceVeneerBItem &&
        (selectedVeneerA.id ? selectedVeneerA.id === faceVeneerBItem.id : veneerDisplayName(selectedVeneerA) === veneerDisplayName(faceVeneerBItem))
      );

      if (combineSameSheetOnBothFaces) {
        addStandardSheetGroupRow({
          item: selectedVeneerA, which: "A", sameAsA: true, surfaceCount: 2,
          label: "Шпон сторон А и Б · стандарт по запросу", row: item
        });
        return;
      }

      if (item.veneerSheetBasedA) {
        addStandardSheetGroupRow({
          item: selectedVeneerA, which: "A", surfaceCount: 1,
          label: "Шпон стороны А · стандарт по запросу", row: item
        });
      }
      if (item.veneerSheetBasedB && faceVeneerBItem) {
        addStandardSheetGroupRow({
          item: faceVeneerBItem, which: "B", surfaceCount: 1,
          label: isFaceOnlyExtraVeneer(selectedVeneerA)
            ? "Шпон стороны Б (категория B) · стандарт по запросу"
            : "Шпон стороны Б · стандарт по запросу",
          row: item
        });
      }
    });

    const standardSheetGroupList = [...standardSheetGroups.values()].map((group) => {
      const automaticRequirement = Core.standardizedSheetVeneerRequirement(group.item, {
        panelLengthMm: group.length,
        panelWidthMm: group.width,
        quantity: group.quantity,
        surfaceCount: group.surfaceCount,
        multiUsableWidthBySheetFormatMm: data?.meta?.multiVeneerUsableWidthBySheetFormatMm || {}
      });
      const requiredVeneerAreaM2 = Number.isFinite(num(automaticRequirement?.netAreaM2)) ? num(automaticRequirement.netAreaM2) : 0;
      const physicalSheetAreaM2 = num(automaticRequirement?.physicalSheetAreaM2);
      const technicalSheets = num(automaticRequirement?.technicalSheets);
      const recommendedVeneerAreaM2 = automaticRequirement?.exact
        ? (Number.isFinite(technicalSheets) && Number.isFinite(physicalSheetAreaM2)
          ? technicalSheets * physicalSheetAreaM2
          : requiredVeneerAreaM2)
        : null;
      const recommendedWastePercent = Number.isFinite(recommendedVeneerAreaM2) && requiredVeneerAreaM2 > 0
        ? (recommendedVeneerAreaM2 / requiredVeneerAreaM2 - 1) * 100
        : null;
      const sideKey = group.sameAsA ? "A+B" : group.which;
      const consumptionKey = `standard-sheet:${materialIdentity(group.item)}:${sideKey}:${group.length}x${group.width}`;
      const id = `veneer-actual:${consumptionKey}`;
      const actualVeneerAreaManual = priceAdjustmentOverrides.has(id);
      const storedActual = num(priceAdjustmentOverrides.get(id));
      const actualVeneerAreaM2 = actualVeneerAreaManual ? storedActual : recommendedVeneerAreaM2;
      const valid = Number.isFinite(actualVeneerAreaM2) && actualVeneerAreaM2 > 0 && actualVeneerAreaM2 + 1e-9 >= requiredVeneerAreaM2;
      const validationError = !Number.isFinite(actualVeneerAreaM2)
        ? "Укажите фактическое количество шпона."
        : actualVeneerAreaM2 <= 0 || actualVeneerAreaM2 + 1e-9 < requiredVeneerAreaM2
          ? "Фактическое количество шпона не может быть меньше расчётной потребности"
          : "";
      const actualWasteAreaM2 = Number.isFinite(actualVeneerAreaM2) ? actualVeneerAreaM2 - requiredVeneerAreaM2 : null;
      const actualWastePercent = Number.isFinite(actualWasteAreaM2) && requiredVeneerAreaM2 > 0
        ? actualWasteAreaM2 / requiredVeneerAreaM2 * 100
        : null;
      let requirement = { ...automaticRequirement, selectedActualAreaM2: Number.isFinite(actualVeneerAreaM2) ? actualVeneerAreaM2 : null };
      if (automaticRequirement?.exact && valid && Number.isFinite(physicalSheetAreaM2) && physicalSheetAreaM2 > 0) {
        const purchasedSheets = Math.ceil(actualVeneerAreaM2 / physicalSheetAreaM2 - 1e-9);
        requirement = { ...requirement, purchasedSheets, paidAreaM2: purchasedSheets * physicalSheetAreaM2 };
      }
      const linkedConsumptions = existingSpecificationItems().filter(record =>
        window.WoodstockSpecificationGroupId && (record.calculationGroupId || record.id) === window.WoodstockSpecificationGroupId
      ).flatMap(record => record.veneerConsumptions || []).filter(item =>
        item.materialId === group.item?.id && item.side === sideKey && item.pricingMode === 'standard' &&
        item.panelSize?.lengthMm === group.length && item.panelSize?.widthMm === group.width
      );
      if(linkedConsumptions.length && valid && physicalSheetAreaM2 > 0){
        const batchActual = actualVeneerAreaM2 + linkedConsumptions.reduce((sum,item)=>sum+(Number(item.actualVeneerAreaM2)||0),0);
        const batchRequired = requiredVeneerAreaM2 + linkedConsumptions.reduce((sum,item)=>sum+(Number(item.requiredVeneerAreaM2)||0),0);
        const batchSheets = Math.ceil(batchActual / physicalSheetAreaM2 - 1e-9);
        const share = batchRequired > 0 ? requiredVeneerAreaM2 / batchRequired : 1;
        requirement = {...requirement,purchasedSheets:batchSheets*share,paidAreaM2:batchSheets*physicalSheetAreaM2*share,
          sharedPurchaseSheets:batchSheets,sharedPaidAreaM2:batchSheets*physicalSheetAreaM2};
      }
      const consumption = {
        id, consumptionKey, item: group.item, materialId: group.item?.id || "", materialName: veneerDisplayName(group.item),
        which: group.which, sideKey, sameAsA: group.sameAsA, pricingMode: "standard",
        panelSize: { length: group.length, width: group.width },
        requiredVeneerAreaM2, recommendedVeneerAreaM2, recommendedWastePercent,
        actualVeneerAreaM2, actualWasteAreaM2, actualWastePercent, actualVeneerAreaManual,
        valid, validationError, paidVeneerAreaM2: Number.isFinite(num(requirement.paidAreaM2)) ? num(requirement.paidAreaM2) : null,
        purchasedWholeSheets: Number.isFinite(num(requirement.purchasedSheets)) ? num(requirement.purchasedSheets) : null, materialCost: null
      };
      if (!valid) {
        warnings.push(validationError || "Фактическое количество шпона не задано.");
        hasPartialPrice = true; markPositionPending(group.rows, "Цена листового шпона");
      }
      veneerConsumptions.push(consumption);
      veneerWasteAdjustments.push(consumption);
      return { ...group, automaticRequirement, requirement, consumption, consumptionKey };
    });

    // Ценовой уровень/условие оставляем общим по тому же выбранному шпону, как и до
    // корректировки. Меняется только физический расход: разные стандартные размеры
    // больше не объединяются для округления количества листов и стоимости материала.
    const standardSheetPricingBasis = new Map();
    standardSheetGroupList.forEach((group) => {
      const itemKey = group.item?.id || veneerDisplayName(group.item);
      const pricingKey = `${itemKey}::${group.sameAsA ? "A+B" : group.which}`;
      group.pricingKey = pricingKey;
      if (!group.consumption?.valid || !group.requirement?.exact) return;
      const current = standardSheetPricingBasis.get(pricingKey) || { area: 0, sheets: 0, exact: true };
      current.area += Number(group.requirement.sharedPaidAreaM2 ?? group.requirement.paidAreaM2) || 0;
      current.sheets += Number(group.requirement.sharedPurchaseSheets ?? group.requirement.purchasedSheets) || 0;
      standardSheetPricingBasis.set(pricingKey, current);
    });

    // The original price tier covers the same veneer across all standard formats.
    // Include linked formats that are not represented in this row's calculator.
    const linkedStandardFormats = new Map();
    existingSpecificationItems().filter(record => window.WoodstockSpecificationGroupId &&
      (record.calculationGroupId || record.id) === window.WoodstockSpecificationGroupId
    ).flatMap(record => record.veneerConsumptions || []).filter(entry => entry.pricingMode === 'standard' && entry.panelSize).forEach(entry => {
      const pricingKey = `${entry.materialId}::${entry.side}`;
      if(!standardSheetPricingBasis.has(pricingKey))return;
      if(standardSheetGroupList.some(group => group.pricingKey === pricingKey && group.length === entry.panelSize.lengthMm && group.width === entry.panelSize.widthMm))return;
      const key = `${pricingKey}::${entry.panelSize.lengthMm}x${entry.panelSize.widthMm}`;
      const group = linkedStandardFormats.get(key) || {pricingKey,materialId:entry.materialId,actualArea:0};
      group.actualArea += Number(entry.actualVeneerAreaM2) || 0;linkedStandardFormats.set(key,group);
    });
    linkedStandardFormats.forEach(group => {
      const item = data.veneers.find(item => item.id === group.materialId);
      const area = Core.veneerPhysicalSheetDimensions(item)?.areaM2;
      if(!(area > 0))return;
      const sheets = Math.ceil(group.actualArea / area - 1e-9),basis = standardSheetPricingBasis.get(group.pricingKey);
      basis.sheets += sheets;basis.area += sheets * area;
    });

    standardSheetGroupList.forEach((group) => {
      const req = group.requirement;
      const groupLabel = `${group.label} · ${group.length}×${group.width}`;
      const pricingBasis = standardSheetPricingBasis.get(group.pricingKey) || null;
      if (!group.consumption?.valid) {
        veneerPricings.push({
          which: group.which, item: group.item, sameAsA: group.sameAsA, pricingMode: "standard",
          label: groupLabel, calculationMethod: "by_sheets", calculationMethodLabel: "По листам", requirement: req,
          panelSize: { length: group.length, width: group.width }, quantity: group.quantity,
          surfaceCount: group.surfaceCount, proportionalDistribution: false, consumptionKey: group.consumptionKey, consumption: group.consumption
        });
        return;
      }
      const pricing = automaticVeneerPricing(group.item, group.consumption.actualVeneerAreaM2 || req?.netAreaM2 || 0, group.which, "standard", pricingBasis);
      if (!pricing || !Number.isFinite(pricing.retailPrice) || !Number.isFinite(pricing.finalPrice)) {
        warnings.push(pricing?.requiresPriceAgreement
          ? `${groupLabel}: ${pricing.priceAgreementReason}`
          : pricing?.conditionUnresolved
          ? `${groupLabel}: нет подтверждённой цены условия «${pricing.levelName}»; розничная цена автоматически не подставляется.`
          : `${groupLabel}: цена шпона не найдена в выбранной позиции; компонент не включён в стоимость.`);
        hasPartialPrice = true; markPositionPending(group.rows, "Цена листового шпона");
        veneerPricings.push({
          which: group.which, item: group.item, sameAsA: group.sameAsA, pricingMode: "standard",
          label: groupLabel, ...(pricing || {}), calculationMethod: "by_sheets", calculationMethodLabel: "По листам", requirement: req,
          panelSize: { length: group.length, width: group.width }, quantity: group.quantity,
          surfaceCount: group.surfaceCount, proportionalDistribution: false, consumptionKey: group.consumptionKey, consumption: group.consumption
        });
        return;
      }

      const retailPurchase = Core.veneerPurchaseFromSheetRequirement(group.item, req, pricing.retailPrice, 0, warnings, groupLabel);
      const finalPurchase = Core.veneerPurchaseFromSheetRequirement(group.item, req, pricing.finalPrice, 0, warnings, groupLabel);
      group.consumption.paidVeneerAreaM2 = Number.isFinite(finalPurchase.area) ? finalPurchase.area : group.consumption.paidVeneerAreaM2;
      group.consumption.purchasedWholeSheets = Number.isFinite(finalPurchase.sheets) ? finalPurchase.sheets : group.consumption.purchasedWholeSheets;
      group.consumption.materialCost = Number.isFinite(finalPurchase.cost) ? finalPurchase.cost : null;
      if (Number.isFinite(retailPurchase.cost)) retailTotal += retailPurchase.cost;
      if (Number.isFinite(finalPurchase.cost)) {
        finalTotal += finalPurchase.cost;
        standardRequestFinalSubtotal += finalPurchase.cost;
      }
      hasPartialPrice ||= retailPurchase.partial || finalPurchase.partial;
      if (retailPurchase.partial || finalPurchase.partial) markPositionPending(group.rows, "Цена листового шпона");

      if (Number.isFinite(finalPurchase.cost)) {
        allocatePositionCost(group.rows, finalPurchase.cost, (row) => (Number(row.area) || 0) * group.surfaceCount);
      }
      const totalGroupWeight = group.rows.reduce((sum, row) => sum + ((Number(row.area) || 0) * group.surfaceCount), 0);
      group.rows.forEach((row) => {
        const weight = (Number(row.area) || 0) * group.surfaceCount;
        const allocatedCost = Number.isFinite(finalPurchase.cost) && totalGroupWeight > 0
          ? finalPurchase.cost * weight / totalGroupWeight
          : null;
        row.sheetVeneerCalculations = row.sheetVeneerCalculations || [];
        row.sheetVeneerCalculations.push({
          which: group.which,
          sameAsA: group.sameAsA,
          veneerId: group.item?.id || "",
          veneerName: veneerDisplayName(group.item),
          calculationMethod: "by_sheets",
          calculationMethodLabel: "По листам",
          panelSize: { length: group.length, width: group.width },
          groupQuantity: group.quantity,
          surfaceCount: group.surfaceCount,
          requirement: req,
          groupCost: finalPurchase.cost,
          allocatedCost,
          proportionalDistribution: false
        });
      });

      const sheetArea = Number(req?.physicalSheetAreaM2);
      const appliedFinalPricePerM2 = Number.isFinite(pricing.finalPricePerM2) ? pricing.finalPricePerM2 : null;
      const pricePerSheet = group.item?.priceUnit === "sheet"
        ? (Number.isFinite(pricing.finalPrice) ? pricing.finalPrice : null)
        : (Number.isFinite(appliedFinalPricePerM2) && Number.isFinite(sheetArea) ? appliedFinalPricePerM2 * sheetArea : null);
      veneerPricings.push({
        which: group.which, item: group.item, sameAsA: group.sameAsA, pricingMode: "standard",
        label: groupLabel, ...pricing, retailPurchase, finalPurchase,
        calculationMethod: "by_sheets", calculationMethodLabel: "По листам", requirement: req,
        panelSize: { length: group.length, width: group.width }, quantity: group.quantity,
        surfaceCount: group.surfaceCount, proportionalDistribution: false,
        pricePerSheet: Number.isFinite(pricePerSheet) ? pricePerSheet : null, consumptionKey: group.consumptionKey, consumption: group.consumption
      });

      if (finalPurchase.cost > 0) {
        const geometryNote = req?.exact
          ? `${round(req.technicalSheets ?? req.purchasedSheets, 2)} лист. технологически → ${req.purchasedSheets} целых лист. к покупке · ${round(req.paidAreaM2, 3)} м² оплачиваемая площадь`
          : req?.reason || "Точный листовой расход не определён";
        breakdown.push({
          label: groupLabel,
          value: finalPurchase.cost,
          note: `${geometryNote} · ${pricing.levelName}`
        });
      }
    });

    addVeneerContext(veneerRequiredStandardA, veneerRequiredStandardB, "standard", " · стандарт по запросу");
    addVeneerContext(veneerRequiredNonstandardA, veneerRequiredNonstandardB, "nonstandard", " · нестандарт");

    const readyShirtUsageConfigs = [];
    if (isReadyShirt(selectedVeneerA)) {
      readyShirtUsageConfigs.push({
        item: selectedVeneerA,
        which: sameFaceSelectionOnBack && isReadyShirt(faceVeneerBItem) ? "A+B" : "A",
        pricingWhich: "A",
        surfaceCount: sameFaceSelectionOnBack && isReadyShirt(faceVeneerBItem) ? 2 : 1
      });
    }
    if (faceVeneerOnBackRequested && isReadyShirt(faceVeneerBItem) && (!isReadyShirt(selectedVeneerA) || !sameFaceSelectionOnBack)) {
      readyShirtUsageConfigs.push({ item: faceVeneerBItem, which: "B", pricingWhich: "B", surfaceCount: 1 });
    }

    readyShirtUsageConfigs.forEach((usage) => {
      const requirements = itemResults.map((row) => {
        const requirement = Core.readyShirtRequirement(usage.item, {
          panelLengthMm: row.calcLength || row.length,
          panelWidthMm: row.calcWidth || row.width,
          quantity: row.quantity,
          surfaceCount: usage.surfaceCount
        });
        row.readyShirtCalculations = row.readyShirtCalculations || [];
        const calc = {
          side: usage.which, readyShirtId: usage.item.id, readyShirtName: usage.item.displayName,
          requirement, allocatedCost: null
        };
        row.readyShirtCalculations.push(calc);
        return { row, requirement, calc };
      });
      const exact = requirements.length > 0 && requirements.every(({ requirement }) => requirement.exact);
      const totalSheets = exact ? requirements.reduce((sum, x) => sum + x.requirement.sheets, 0) : null;
      const paidAreaM2 = exact ? requirements.reduce((sum, x) => sum + x.requirement.paidAreaM2, 0) : null;
      const firstUnresolved = requirements.find(({ requirement }) => !requirement.exact)?.requirement || null;

      if (!exact) {
        warnings.push(`${usage.item.displayName}: ${firstUnresolved?.reason || "Требуется уточнение расхода / стоимости производства"}. Количество готовых рубашек и стоимость материала автоматически не рассчитываются.`);
        hasPartialPrice = true;
        readyShirtPricings.push({
          materialType: "ready_shirt", which: usage.which, pricingWhich: usage.pricingWhich, item: usage.item,
          surfaceCount: usage.surfaceCount, exact: false, totalSheets: null, paidAreaM2: null,
          requirementStatus: "requires_clarification", requirementReason: firstUnresolved?.reason || "Требуется уточнение расхода / стоимости производства",
          pricingMode: "ready_shirt", pricing: null, retailPurchase: null, finalPurchase: null
        });
        return;
      }

      const pricing = automaticVeneerPricing(usage.item, paidAreaM2, usage.pricingWhich, "ready_shirt", { area: paidAreaM2, sheets: totalSheets, exact: true });
      if (!pricing || !Number.isFinite(pricing.retailPricePerM2) || !Number.isFinite(pricing.finalPricePerM2)) {
        warnings.push(`${usage.item.displayName}: ценовое условие готовой рубашки не определено; стоимость материала не включена автоматически.`);
        hasPartialPrice = true;
        readyShirtPricings.push({
          materialType: "ready_shirt", which: usage.which, pricingWhich: usage.pricingWhich, item: usage.item, surfaceCount: usage.surfaceCount,
          exact: true, totalSheets, paidAreaM2, requirementStatus: "calculated", requirementReason: "", pricingMode: "ready_shirt",
          ...(pricing || {}), retailPurchase: null, finalPurchase: null
        });
        return;
      }

      const aggregateRequirement = { exact: true, sheets: totalSheets, paidAreaM2, reason: "" };
      const retailPurchase = Core.readyShirtPurchase(usage.item, aggregateRequirement, pricing.retailPricePerM2);
      const finalPurchase = Core.readyShirtPurchase(usage.item, aggregateRequirement, pricing.finalPricePerM2);
      if (!Number.isFinite(retailPurchase.cost) || !Number.isFinite(finalPurchase.cost)) {
        hasPartialPrice = true;
      } else {
        retailTotal += retailPurchase.cost;
        finalTotal += finalPurchase.cost;
        orderLevelUnallocatedCost += finalPurchase.cost;
        const totalDemandSheets = requirements.reduce((sum, x) => sum + x.requirement.sheets, 0);
        requirements.forEach(({ row, requirement, calc }) => {
          const share = totalDemandSheets > 0 ? requirement.sheets / totalDemandSheets : 0;
          const allocated = finalPurchase.cost * share;
          calc.allocatedCost = allocated;
          addPositionCost(row, allocated);
          orderLevelUnallocatedCost -= allocated;
          if (row.classificationId === "standard_request") standardRequestFinalSubtotal += allocated;
          else if (row.classificationId === "nonstandard") nonstandardFinalSubtotal += allocated;
          else standardFinalSubtotal += allocated;
        });
        breakdown.push({
          label: `Готовая рубашка · сторона ${usage.which}`,
          value: finalPurchase.cost,
          note: `${usage.item.displayName} · ${totalSheets} целых полотен · ${round(paidAreaM2, 3)} м² × ${money(pricing.finalPricePerM2)}/м² · ${pricing.levelName}. Набор шпона не применяется.`
        });
      }
      readyShirtPricings.push({
        materialType: "ready_shirt", which: usage.which, pricingWhich: usage.pricingWhich, item: usage.item, surfaceCount: usage.surfaceCount,
        exact: true, totalSheets, paidAreaM2, requirementStatus: "calculated", requirementReason: "", pricingMode: "ready_shirt",
        ...pricing, retailPurchase, finalPurchase, pricePerSheet: finalPurchase.pricePerSheet
      });
    });

    let attachedEdgeMeters = 0;
    let edge = {
      mode: form.edgeModeSelect.value,
      valid: true,
      validationError: "",
      requiresSeparateSpecification: form.edgeModeSelect.value !== "none",
      materialCost: 0,
      operationCost: 0,
      operationPricingStatus: form.edgeModeSelect.value === "attached" ? "pending" : "not_required",
      operationRequiresProductionCost: false,
      pricePerRunningM: null,
      materialPricingStatus: form.edgeModeSelect.value === "none" ? "not_required" : "pending"
    };

    const addAttachedEdgePositionCost = (size, finalCost, retailCost = finalCost) => {
      if (!Number.isFinite(finalCost)) return;
      addPositionCost(size, finalCost);
      const classificationId = classifySize(size).id;
      if (classificationId === "warehouse_standard") standardFinalSubtotal += finalCost;
      else if (classificationId === "standard_request") standardRequestFinalSubtotal += finalCost;
      else nonstandardFinalSubtotal += finalCost;
      finalTotal += finalCost;
      retailTotal += Number.isFinite(retailCost) ? retailCost : finalCost;
    };

    if (form.edgeModeSelect.value === "attached") {
      const edgeMinThickness = num(data?.meta?.edgeMinBaseThicknessMm);
      const edgeMaxThickness = num(data?.meta?.edgeMaxBaseThicknessMm);
      const commonSelection = edgeSelectionState("attached");
      const commonSides = form.edgeSidesSelect.value;
      const eligibleSizes = validSizes.filter(sizeSupportsAttachedEdge);
      edge = {
        ...edge,
        ...commonSelection,
        valid: true,
        validationError: "",
        sidesId: commonSides,
        sidesName: edgeRuleById(commonSides)?.name || "",
        bevel: form.edgeBevelSelect.value === "yes",
        comment: form.edgeCommentInput.value.trim(),
        geometricMeters: 0,
        calculatedMeters: 0,
        meters: 0,
        reserveCoefficient: 1.2,
        positionSettings: []
      };

      if (Number.isFinite(physicalBaseThicknessMm()) && Number.isFinite(edgeMinThickness) && physicalBaseThicknessMm() < edgeMinThickness) {
        edge.valid = false;
        edge.validationError = `Кромление недоступно для основы тоньше ${edgeMinThickness} мм.`;
        warnings.push(edge.validationError);
        hasPartialPrice = true;
      } else if (Number.isFinite(physicalBaseThicknessMm()) && Number.isFinite(edgeMaxThickness) && physicalBaseThicknessMm() > edgeMaxThickness) {
        edge.valid = false;
        edge.validationError = `Кромление недоступно для основы толще ${edgeMaxThickness} мм.`;
        warnings.push(edge.validationError);
        hasPartialPrice = true;
      } else if (!eligibleSizes.length) {
        edge.valid = false;
        edge.validationError = !sizeValidation.valid && sizes.some((size) => manufacturingTypeForSize(size) === "exact")
          ? sizeValidation.error : "Кромление детали доступно только для готовых деталей в точный размер.";
        warnings.push(edge.validationError);
        hasPartialPrice = true;
      } else {
        const usesCommonEdgeSettings = eligibleSizes.some((size) => { const config = effectiveEdgeForSize(size); return config.applies && config.mode === "inherit"; });
        if (usesCommonEdgeSettings && !commonSides) {
          edge.valid = false;
          edge.validationError = "Выберите стороны кромления.";
          warnings.push(edge.validationError);
          hasPartialPrice = true;
        }
        if (usesCommonEdgeSettings && !commonSelection.valid) {
          edge.valid = false;
          if (!edge.validationError) edge.validationError = commonSelection.validationError;
          warnings.push(commonSelection.validationError);
          hasPartialPrice = true;
        }

        const positionSettings = eligibleSizes.map((size) => {
          const config = effectiveEdgeForSize(size);
          if (!config.applies) {
            return {
              rowId: size.rowId, position: size.position, length: size.length, width: size.width, quantity: size.quantity,
              mode: config.mode || "none", applies: false, sidesId: null, sidesName: null, thicknessMm: null,
              geometricMeters: 0, calculatedMeters: 0, reserveCoefficient: 1, selection: null, valid: true, validationError: ""
            };
          }
          const rule = edgeRuleById(config.sidesId);
          const selection = edgeSelectionState("attached", { thicknessMm: config.thicknessMm, widthMm: config.widthMm });
          let validationError = "";
          if (!rule) validationError = "Выберите стороны кромления для позиции.";
          else if (!selection.valid) validationError = selection.validationError;
          const geometricMeters = rule ? geometricEdgeMetersForSize(size, config.sidesId) : 0;
          const calculatedMeters = rule ? edgeMetersForSize(size, config.sidesId) : 0;
          return {
            rowId: size.rowId, position: size.position, length: size.length, width: size.width, quantity: size.quantity,
            mode: config.mode, applies: true, sidesId: config.sidesId || null, sidesName: rule?.name || null,
            thicknessMm: Number.isFinite(config.thicknessMm) ? config.thicknessMm : null,
            widthMm: selection.widthMm, geometricMeters, calculatedMeters, reserveCoefficient: 1.2, selection,
            valid: !validationError, validationError
          };
        });
        edge.geometricMeters = positionSettings.reduce((sum, item) => sum + (item.geometricMeters || 0), 0);
        attachedEdgeMeters = positionSettings.reduce((sum, item) => sum + (item.calculatedMeters || 0), 0);
        const orderEdgeMeters = attachedEdgeMeters;
        positionSettings.forEach((item) => {
          if (!item.applies) return;
          const matchingMeters = window.WoodstockPanelsView?.edgeVolumePricing
            ? positionSettings.filter(other => other.applies && other.selection?.catalogItemId === item.selection?.catalogItemId && other.widthMm === item.widthMm && other.thicknessMm === item.thicknessMm)
              .reduce((sum, other) => sum + (other.calculatedMeters || 0), 0)
            : orderEdgeMeters;
          const selection = edgeSelectionState("attached", { thicknessMm: item.thicknessMm, widthMm: item.widthMm, orderRunningM: matchingMeters });
          item.selection = selection;
          if (!selection.valid && !item.validationError) item.validationError = selection.validationError;
          item.valid = !item.validationError;
        });
        edge.positionSettings = positionSettings;
        const invalidPosition = positionSettings.find((item) => item.applies && !item.valid);
        if (invalidPosition) {
          edge.valid = false;
          if (!edge.validationError) edge.validationError = `Позиция ${invalidPosition.position}: ${invalidPosition.validationError}`;
          warnings.push(edge.validationError);
          hasPartialPrice = true;
        }

        edge.calculatedMeters = attachedEdgeMeters;
        edge.meters = attachedEdgeMeters;
        edge.orderRunningM = orderEdgeMeters;

        if (edge.valid && attachedEdgeMeters > 0) {
          let materialCostTotal = 0;
          let operationCostTotal = 0;
          let materialIncomplete = false;
          let materialPendingCondition = false;
          let materialPendingOrder = false;
          let operationIncomplete = false;
          let operationPendingProduction = false;
          const materialRates = new Set();
          const operationRates = new Set();
          const operationMethods = new Set();

          positionSettings.filter((item) => item.applies && item.valid && item.calculatedMeters > 0).forEach((item) => {
            const selection = item.selection;
            const meters = item.calculatedMeters;
            if (Number.isFinite(selection.pricePerRunningM)) {
              const materialCost = meters * selection.pricePerRunningM;
              const retailMaterialCost = Number.isFinite(selection.retailPricePerRunningM) ? meters * selection.retailPricePerRunningM : materialCost;
              materialCostTotal += materialCost;
              materialRates.add(selection.pricePerRunningM);
              addAttachedEdgePositionCost(validSizes.find((size) => size.rowId === item.rowId), materialCost, retailMaterialCost);
              breakdown.push({
                label: `Кромка — материал · позиция ${item.position}`,
                value: materialCost,
                note: `${round(meters, 2)} пог. м × ${money(selection.pricePerRunningM)}/пог. м · ${selection.conditionName} · ширина ${selection.widthMm} мм.${selection.customOrder && Number.isFinite(selection.manualOrderPricePerM2) ? ` Цена заказной кромки ${money(selection.manualOrderPricePerM2)}/м².` : ""}`
              });
            } else {
              materialIncomplete = true;
              markPositionPending(item, "Материал кромки: цена на согласовании");
              if (selection.stockProgram) {
                materialPendingCondition = true;
                warnings.push(`Позиция ${item.position}: для выбранной складской кромки нет цены «${selection.conditionName}» на ширину ${selection.widthMm} мм.`);
              } else {
                materialPendingOrder = true;
                warnings.push(`Позиция ${item.position}: кромка отсутствует в складском прайсе; требуется согласование цены материала. Метраж сохранён, итог неполный.`);
              }
              hasPartialPrice = true;
            }

            const productionOperation = manufacturingCostFromProduction(validSizes.find((size) => size.rowId === item.rowId));
            const groupEdgeMeters = attachedEdgeMeters + existingSpecificationItems().filter(record =>
              window.WoodstockSpecificationGroupId && (record.calculationGroupId || record.id) === window.WoodstockSpecificationGroupId && record.edge?.mode === "attached"
            ).reduce((sum, record) => sum + (Number(record.edge.calculatedMeters) || 0), 0);
            const rateInfo = productionOperation ? null : attachedEdgeRateFor(thickness.raw, selection, groupEdgeMeters, base?.id);
            if (rateInfo && Number.isFinite(rateInfo.rate)) {
              const operationCost = meters * rateInfo.rate;
              operationCostTotal += operationCost;
              operationRates.add(rateInfo.rate);
              operationMethods.add(rateInfo.method);
              addAttachedEdgePositionCost(validSizes.find((size) => size.rowId === item.rowId), operationCost, operationCost);
              breakdown.push({
                label: `Кромление — операция · позиция ${item.position}`,
                value: operationCost,
                note: `${round(meters, 2)} пог. м × ${money(rateInfo.rate)}/пог. м · ${rateInfo.method === "machine" ? `станок (общий метраж от ${rateInfo.threshold} пог. м)` : rateInfo.method === "manual" ? `вручную (общий метраж до ${rateInfo.threshold} пог. м)` : "ранее подтверждённый тариф"}.`
              });
            } else if (productionOperation || operationPriceComesFromProduction(base)) {
              operationIncomplete = true;
              markPositionPending(item, "Операция кромления: стоимость производства");
              operationPendingProduction = true;
              requiresOperationProductionCost = true;
              requiresProductionCost = true;
            } else {
              operationIncomplete = true;
              markPositionPending(item, "Операция кромления: тариф не подтверждён");
              warnings.push(`Позиция ${item.position}: нет подтверждённого тарифа операции кромления для ${base?.name || "основы"} ${baseThicknessDisplay(thickness)} и выбранной толщины кромки.`);
              hasPartialPrice = true;
            }
          });

          edge.materialCost = materialIncomplete ? null : materialCostTotal;
          edge.materialPricingStatus = materialPendingOrder ? "pending_order_price" : materialPendingCondition ? "pending_condition_price" : "calculated";
          edge.pricePerRunningM = materialRates.size === 1 ? [...materialRates][0] : null;
          edge.operationCost = operationIncomplete ? null : operationCostTotal;
          edge.operationRatePerRunningM = operationRates.size === 1 ? [...operationRates][0] : null;
          edge.operationMethod = operationMethods.size === 1 ? [...operationMethods][0] : (operationMethods.size > 1 ? "mixed" : null);
          edge.operationPricingStatus = operationPendingProduction ? "pending_production" : operationIncomplete ? "missing_tariff" : "calculated";
          edge.operationRequiresProductionCost = operationPendingProduction;
          edge.stockProgram = positionSettings.filter((item) => item.applies).every((item) => item.selection?.stockProgram);
          edge.orderPosition = positionSettings.filter((item) => item.applies).some((item) => item.selection?.orderPosition);
          const appliedSelections = positionSettings.filter((item) => item.applies && item.selection).map((item) => item.selection);
          const conditionIds = new Set(appliedSelections.map((selection) => selection.conditionId || "retail"));
          const conditionNames = new Set(appliedSelections.map((selection) => selection.conditionName || "Розничная цена"));
          const conditionSources = new Set(appliedSelections.map((selection) => selection.conditionSource || "retail"));
          edge.conditionId = conditionIds.size === 1 ? [...conditionIds][0] : "mixed";
          edge.conditionName = conditionNames.size === 1 ? [...conditionNames][0] : "Разные автоматические условия";
          edge.conditionSource = conditionSources.size === 1 ? [...conditionSources][0] : "mixed";
          if (operationPendingProduction) {
            warnings.push(`${base?.name || "Основа"}: операция кромления требуется, но автоматический тариф для этой основы не применяется; стоимость работы учитывается в итоговой сумме производства. Материал кромки рассчитывается отдельно.`);
          }
        } else if (edge.valid) {
          edge.materialCost = 0;
          edge.operationCost = 0;
          edge.materialPricingStatus = "not_required";
          edge.operationPricingStatus = "not_required";
        }
      }
    } else if (form.edgeModeSelect.value === "separate") {
      const meters = num(form.separateEdgeMetersInput.value);
      const orderEdgeMeters = Number.isFinite(meters) && meters > 0 ? meters : 0;
      const selection = edgeSelectionState("separate", { orderRunningM: orderEdgeMeters });
      edge = {
        ...edge,
        ...selection,
        comment: form.edgeCommentInput.value.trim(),
        sidesId: isQuickStandardPanel() ? null : form.separateEdgeSidesSelect.value,
        sidesName: isQuickStandardPanel() ? "" : edgeRuleById(form.separateEdgeSidesSelect.value)?.name || "",
        geometricMeters: separateEdgeAutomaticMeters(),
        calculatedMeters: isQuickStandardPanel() ? orderEdgeMeters : separateEdgeAutomaticMeters(),
        metersSource: separateEdgeMetersManual ? "manual" : "automatic",
        reserveCoefficient: 1,
        orderedMeters: Number.isFinite(meters) ? meters : null,
        meters: Number.isFinite(meters) ? meters : null,
        orderRunningM: orderEdgeMeters,
        bevel: false,
        operationCost: 0,
        operationRatePerRunningM: null,
        operationMethod: null
      };

      const minMeters = separateEdgeMinimumMeters();
      if (!Number.isFinite(meters) || meters <= 0) {
        edge.valid = false;
        edge.validationError = "Укажите требуемый метраж отдельной кромки.";
        warnings.push(edge.validationError);
        hasPartialPrice = true;
      } else if (isQuickStandardPanel() && meters < minMeters) {
        edge.valid = false;
        edge.validationError = "Минимальный заказ кромки 50 пог. м";
        warnings.push(edge.validationError);
        hasPartialPrice = true;
      } else if (Number.isFinite(minMeters) && meters < minMeters) {
        edge.minimumOrderWarning = `Менее ${minMeters} пог. м: минимум пока не подтверждён на уровне одной позиции; проверьте общий метраж заявки.`;
        warnings.push(edge.minimumOrderWarning);
      }

      if (!selection.valid) {
        edge.valid = false;
        if (!edge.validationError) edge.validationError = selection.validationError;
        warnings.push(selection.validationError);
        hasPartialPrice = true;
      }

      if (edge.valid) {
        if (Number.isFinite(selection.pricePerRunningM)) {
          const materialCost = meters * selection.pricePerRunningM;
          const retailMaterialCost = Number.isFinite(selection.retailPricePerRunningM)
            ? meters * selection.retailPricePerRunningM
            : materialCost;
          edge.materialCost = materialCost;
          edge.pricePerRunningM = selection.pricePerRunningM;
          edge.materialPricingStatus = selection.customOrder ? "calculated_manual_order_price" : "calculated";
          retailTotal += retailMaterialCost;
          finalTotal += materialCost;
          orderLevelUnallocatedCost += materialCost;
          breakdown.push({
            label: "Кромка отдельно — материал",
            value: materialCost,
            note: `${round(meters, 2)} пог. м × ${money(selection.pricePerRunningM)}/пог. м · ${selection.conditionName} · ширина ${selection.widthMm} мм.${selection.customOrder && Number.isFinite(selection.manualOrderPricePerM2) ? ` Цена заказной кромки ${money(selection.manualOrderPricePerM2)}/м².` : ""}`
          });
        } else if (selection.stockProgram) {
          edge.materialCost = null;
          edge.materialPricingStatus = "pending_condition_price";
          warnings.push(`Для выбранной складской кромки нет цены «${selection.conditionName}» на ширину ${selection.widthMm} мм.`);
          hasPartialPrice = true;
        } else {
          edge.materialCost = null;
          edge.pricePerRunningM = null;
          edge.materialPricingStatus = "pending_order_price";
          warnings.push("Кромка отсутствует в складском прайсе; требуется согласование цены материала. Метраж сохранён, итог неполный.");
          hasPartialPrice = true;
        }
      }
    }

    const calibration = calibrationState(base);
    const calibrationEnabled = calibration.enabled;
    const calibrationRequired = calibrationRequiredForBase(base);
    const calibrationSourceBaseThicknessMm = calibration.sourceBaseThicknessMm;
    const baseThicknessAfterCalibrationMm = calibration.baseThicknessAfterCalibrationMm;
    const calibrationDepth = calibration.depthMm;
    const calibrationRatePerM2PerMm = calibration.ratePerM2PerMm;
    const calibrationRatePerM2 = calibrationEnabled && calibration.valid && Number.isFinite(calibrationRatePerM2PerMm)
      ? calibrationDepth * calibrationRatePerM2PerMm
      : null;
    const calibrationFinishedProductThicknessMm = calibration.finishedProductThicknessMm;
    let calibrationCost = calibrationEnabled ? null : 0;
    let calibrationArea = 0;
    let calibrationPricingStatus = calibrationEnabled ? "pending" : "not_required";
    let calibrationRequiresProductionCost = false;
    let calibrationProductionArea = 0;
    if (calibrationEnabled) {
      const calibrationTargetProvided = Number.isFinite(baseThicknessAfterCalibrationMm);
      if (!calibrationTargetProvided) {
        calibrationPricingStatus = window.WoodstockPanelsView?.automaticOperations ? "pending_production" : "missing_target";
        if (window.WoodstockPanelsView?.automaticOperations) {
          calibrationRequiresProductionCost = true;
          calibrationProductionArea = totalArea;
          warnings.push("Калибровка ДСП: величина съёма не подтверждена; стоимость уточняет производство.");
        } else if (addAttempted || touchedFields.has("calibrationTarget")) warnings.push("Укажите толщину основы после калибровки.");
        hasPartialPrice = true;
      } else if (!calibration.valid) {
        calibrationPricingStatus = "invalid_base_thickness";
        if (addAttempted || touchedFields.has("calibrationTarget")) warnings.push("Толщина основы после калибровки должна быть меньше исходной толщины основы.");
        hasPartialPrice = true;
      } else if (!Number.isFinite(calibrationRatePerM2PerMm) || calibrationRatePerM2PerMm <= 0) {
        calibrationPricingStatus = "missing_rate";
        warnings.push("Для калибровки не задана базовая ставка за 1 мм съёма.");
        hasPartialPrice = true;
      } else {
        const calibrationSizes = validSizes.filter((size) => !manufacturingCostFromProduction(size));
        calibrationProductionArea = validSizes.filter(manufacturingCostFromProduction).reduce((sum, size) => sum + (size.calcArea || size.area), 0);
        calibrationRequiresProductionCost = calibrationProductionArea > 0;
        const warehouseArea = calibrationSizes.filter((x) => classifySize(x).id === "warehouse_standard").reduce((sum, x) => sum + (x.calcArea || x.area), 0);
        const requestArea = calibrationSizes.filter((x) => classifySize(x).id === "standard_request").reduce((sum, x) => sum + (x.calcArea || x.area), 0);
        const nonstandardArea = calibrationSizes.filter((x) => classifySize(x).id === "nonstandard").reduce((sum, x) => sum + (x.calcArea || x.area), 0);
        const operationArea = warehouseArea + requestArea + nonstandardArea;
        calibrationArea = operationArea;
        calibrationCost = operationArea * calibrationRatePerM2;
        calibrationPricingStatus = calibrationProductionArea > 0 ? (operationArea > 0 ? "calculated_and_pending_production" : "pending_production") : "calculated";
        retailTotal += calibrationCost;
        finalTotal += calibrationCost;
        calibrationSizes.forEach((size) => addPositionCost(size, (size.calcArea || size.area) * calibrationRatePerM2));
        standardFinalSubtotal += warehouseArea * calibrationRatePerM2;
        standardRequestFinalSubtotal += requestArea * calibrationRatePerM2;
        nonstandardFinalSubtotal += nonstandardArea * calibrationRatePerM2;
        breakdown.push({
          label: "Калибровка основы",
          value: calibrationCost,
          note: `${specNumber(calibrationSourceBaseThicknessMm, 2)} → ${specNumber(baseThicknessAfterCalibrationMm, 2)} мм · съём ${specNumber(calibrationDepth, 2)} мм · ${money(calibrationRatePerM2PerMm)}/м² за 1 мм · итоговая ставка ${money(calibrationRatePerM2)}/м².`
        });
      }
    }


    let toningCost = 0, standardToningCost = 0, requestToningCost = 0, nonstandardToningCost = 0;
    let isolatorCost = 0, standardIsolatorCost = 0, requestIsolatorCost = 0, nonstandardIsolatorCost = 0;
    const finishResults = [];
    const finishWarningKeys = new Set();
    validSizes.forEach((size) => {
      const config = effectiveFinishForSize(size);
      const area = size.calcArea || size.area;
      const classificationId = classifySize(size).id;
      if (!config || config.finishId === "none") {
        finishResults.push({
          position: size.position,
          rowId: size.rowId,
          config: normalizeFinishConfig(config),
          summary: "Не требуется",
          areaM2: area,
          processedSideCount: 0,
          appliedRatePerM2: 0,
          coatingCost: 0,
          toningRatePerM2: null,
          toningCost: 0,
          toningPricingStatus: "not_required",
          isolatorRatePerM2: null,
          isolatorCost: 0,
          isolatorPricingStatus: "not_required",
          additionalCost: 0,
          knownFinishCost: 0,
          totalFinishCost: 0,
          pricingStatus: "not_required",
          requiresProductionCost: false
        });
        return;
      }

      const validation = finishValidationState(config);
      const normalizedConfig = validation.config;
      const summary = finishSummary(normalizedConfig);
      const processedSideCount = Math.max(1, finishSideCount(normalizedConfig.sides));
      const extraProcessedAreaM2 = area * processedSideCount;

      if (!validation.valid) {
        hasPartialPrice = true;
        finishResults.push({
          position: size.position,
          rowId: size.rowId,
          config: normalizedConfig,
          summary,
          areaM2: area,
          processedSideCount,
          extraProcessedAreaM2,
          appliedRatePerM2: null,
          coatingCost: null,
          toningRatePerM2: null,
          toningCost: 0,
          toningPricingStatus: normalizedConfig.toning === "yes" ? "incomplete_finish" : "not_required",
          isolatorRatePerM2: null,
          isolatorCost: 0,
          isolatorPricingStatus: normalizedConfig.isolator === "yes" ? "incomplete_finish" : "not_required",
          additionalCost: 0,
          knownFinishCost: 0,
          totalFinishCost: null,
          pricingStatus: "incomplete",
          requiresProductionCost: false
        });
        return;
      }

      const rateInfo = finishRateInfo(normalizedConfig);
      let coatingCost = null;
      let pricingStatus = "pending_production";
      let finishRequiresProductionCost = false;

      if (rateInfo && Number.isFinite(rateInfo.rate)) {
        coatingCost = area * rateInfo.rate;
        pricingStatus = "calculated";
        retailTotal += coatingCost;
        finalTotal += coatingCost;
        addPositionCost(size, coatingCost);
        if (classificationId === "warehouse_standard") standardFinalSubtotal += coatingCost;
        else if (classificationId === "standard_request") standardRequestFinalSubtotal += coatingCost;
        else nonstandardFinalSubtotal += coatingCost;
        breakdown.push({ label: `Финиш · позиция ${size.position}`, value: coatingCost, note: `${money(rateInfo.rate)}/м² · ${rateInfo.note}.` });
      } else {
        const key = [normalizedConfig.finishId, normalizedConfig.lacquerExecution, normalizedConfig.lacquerProcess, normalizedConfig.enamelVariant, normalizedConfig.sides].join("|");
        if (!finishWarningKeys.has(key)) {
          finishWarningKeys.add(key);
          if (isGloss100Finish(normalizedConfig)) {
            warnings.push("Глянец 100%: подтверждённый стабильный автоматический тариф отсутствует; стоимость лакового исполнения требуется определить производством.");
          } else if (isPolyurethaneLacquer(normalizedConfig.finishId)) {
            warnings.push("Лак полиуретановый: подтверждённый фиксированный тариф отсутствует; стоимость покрытия требуется определить производством. Акриловые тарифы не применяются.");
          } else {
            warnings.push(`${finishOption(normalizedConfig.finishId)?.name || "Финиш"}: для выбранной технологической схемы/числа сторон нет подтверждённого автоматического тарифа; стоимость требуется определить производством.`);
          }
        }
        hasPartialPrice = true;
        finishRequiresProductionCost = true;
        requiresFinishProductionCost = true;
        requiresOperationProductionCost = true;
        requiresProductionCost = true;
      }

      // Quick wall-panel and facade toning is separate, including with PU lacquer.
      // Other scenarios and isolator pricing retain the existing production-scope rule.
      const extrasCanBePricedSeparately = pricingStatus === "calculated" && isLacquerFinish(normalizedConfig.finishId);

      let positionToningCost = 0;
      let toningPricingStatus = "not_required";
      let toningRatePerM2 = null;
      if (normalizedConfig.toning === "yes" && isLacquerFinish(normalizedConfig.finishId)) {
        if (extrasCanBePricedSeparately || isQuickWallPanel() || isQuickDetailsPanel()) {
          toningRatePerM2 = num(data?.meta?.toningRatePerM2);
          if (Number.isFinite(toningRatePerM2)) {
            positionToningCost = extraProcessedAreaM2 * toningRatePerM2;
            toningCost += positionToningCost;
            toningPricingStatus = "calculated";
            addPositionCost(size, positionToningCost);
            if (classificationId === "warehouse_standard") standardToningCost += positionToningCost;
            else if (classificationId === "standard_request") requestToningCost += positionToningCost;
            else nonstandardToningCost += positionToningCost;
          }
        } else {
          toningPricingStatus = "pending_production_scope";
        }
      }

      let positionIsolatorCost = 0;
      let isolatorPricingStatus = "not_required";
      let isolatorRatePerM2 = null;
      if (normalizedConfig.isolator === "yes" && finishAllowsIsolator(normalizedConfig.finishId)) {
        if (extrasCanBePricedSeparately) {
          isolatorRatePerM2 = num(data?.meta?.isolatorRatePerM2);
          if (Number.isFinite(isolatorRatePerM2)) {
            positionIsolatorCost = extraProcessedAreaM2 * isolatorRatePerM2;
            isolatorCost += positionIsolatorCost;
            isolatorPricingStatus = "calculated";
            addPositionCost(size, positionIsolatorCost);
            if (classificationId === "warehouse_standard") standardIsolatorCost += positionIsolatorCost;
            else if (classificationId === "standard_request") requestIsolatorCost += positionIsolatorCost;
            else nonstandardIsolatorCost += positionIsolatorCost;
          }
        } else {
          isolatorPricingStatus = "pending_production_scope";
        }
      }

      const additionalCost = positionToningCost + positionIsolatorCost;
      const knownFinishCost = (Number.isFinite(coatingCost) ? coatingCost : 0) + additionalCost;
      finishResults.push({
        position: size.position,
        rowId: size.rowId,
        config: normalizedConfig,
        summary,
        areaM2: area,
        processedSideCount,
        extraProcessedAreaM2,
        appliedRatePerM2: rateInfo && Number.isFinite(rateInfo.rate) ? rateInfo.rate : null,
        coatingCost: Number.isFinite(coatingCost) ? coatingCost : null,
        toningRatePerM2,
        toningCost: positionToningCost,
        toningPricingStatus,
        isolatorRatePerM2,
        isolatorCost: positionIsolatorCost,
        isolatorPricingStatus,
        additionalCost,
        knownFinishCost,
        totalFinishCost: pricingStatus === "calculated" ? knownFinishCost : null,
        pricingStatus,
        requiresProductionCost: finishRequiresProductionCost
      });
    });

    if (toningCost > 0) {
      retailTotal += toningCost;
      finalTotal += toningCost;
      standardFinalSubtotal += standardToningCost;
      standardRequestFinalSubtotal += requestToningCost;
      nonstandardFinalSubtotal += nonstandardToningCost;
      breakdown.push({ label: "Тонировка", value: toningCost, note: `${money(data.meta.toningRatePerM2)}/м² по фактически обрабатываемым сторонам.` });
    }

    if (isolatorCost > 0) {
      retailTotal += isolatorCost;
      finalTotal += isolatorCost;
      standardFinalSubtotal += standardIsolatorCost;
      standardRequestFinalSubtotal += requestIsolatorCost;
      nonstandardFinalSubtotal += nonstandardIsolatorCost;
      breakdown.push({ label: "Изолятор", value: isolatorCost, note: `${money(data.meta.isolatorRatePerM2)}/м² по фактически обрабатываемым сторонам.` });
    }

    const automaticFinalTotal = finalTotal;
    const manualDiscountPercent = 0;
    let manualDiscountCandidateTotal = null;
    let manualDiscountApplied = false;
    if (manualDiscountPercent > 0 && !hasPartialPrice && !requiresProductionCost && retailTotal > 0) {
      manualDiscountCandidateTotal = retailTotal * (1 - manualDiscountPercent / 100);
      const adjustment = manualDiscountCandidateTotal - finalTotal;
      finalTotal = manualDiscountCandidateTotal;
      orderLevelUnallocatedCost += adjustment;
      manualDiscountApplied = true;
      breakdown.push({
        label: "Ручная скидка менеджера",
        value: -retailTotal * manualDiscountPercent / 100,
        note: `${round(manualDiscountPercent, 1)}% от розничной стоимости позиции. Ручная скидка применяется только при условии клиента «Розничная цена».`
      });
    }

    const mixMatchPurchaseArea = mixMatchVeneerPricing.applies
      ? mixMatchVeneerPricing.actualVeneerAreaM2
      : null;

    const invalidDiagonalSizes = layoutSelectionRequired && (layout === "diagonal45" || layoutB === "diagonal45")
      ? validSizes.filter((size) => !diagonalSizeFits(size.length, size.width))
      : [];
    const diagonalValid = invalidDiagonalSizes.length === 0;
    if (!diagonalValid) warnings.push("Для раскладки „Диагональ 45°“ максимальный размер детали — 2800 × 2070 мм.");
    const layoutValidation = {
      valid: (!layoutSelectionRequired || (Boolean(rawLayout) && layoutAllowed)) && layoutDescriptionValid && diagonalValid && mixMatchValid,
      allowedForMaterialType: layoutAllowed,
      selectedLayoutId: rawLayout,
      descriptionValid: layoutDescriptionValid,
      mixMatchValid,
      mixMatchPurchaseArea,
      diagonalValid,
      invalidDiagonalPositions: invalidDiagonalSizes.map((size) => size.position),
      error: layoutSelectionRequired && rawLayout && !layoutAllowed
        ? "Выбранная раскладка недоступна для мультишпона."
        : layoutSelectionRequired && !rawLayout
        ? "Выберите раскладку шпона."
        : !layoutDescriptionValid
          ? "Добавьте описание раскладки или приложите файл."
          : !diagonalValid
          ? "Для раскладки „Диагональ 45°“ максимальный размер детали — 2800 × 2070 мм."
          : !mixMatchValid
          ? mixMatchValidationError
          : ""
    };
    const veneerThickness = selectedVeneerThickness();
    const otherSideMaterialForCompatibility = sides === 2 && form.veneerBModeSelect.value === "other"
      ? (selectedVeneerB || selectedVeneerBGroup)
      : null;
    const otherSideRequested = sides === 2 && form.veneerBModeSelect.value === "other";
    const roughSideRequested = sides === 2 && form.veneerBModeSelect.value === "rough";
    const sideBThickness = itemThickness(otherSideMaterialForCompatibility);
    const selectedRoughThickness = roughSideRequested ? selectedRoughBackThickness() : null;
    const sideThicknessCompatible = !otherSideRequested || sameConfirmedThickness(veneerThickness, sideBThickness);
    const roughSideCompatible = !roughSideRequested || (isExactlyOnePointFive(veneerThickness) && Number.isFinite(selectedRoughThickness) && selectedRoughThickness <= 1.5 + 0.001);
    if (requiresTwoFaceSides(veneerThickness) && sides !== 2) warnings.push(document.body.classList.contains("quick-panels-page") ? twoSidedVeneerRequirementMessage() : "Шпон толщиной 1,5 мм и более требует двусторонней оклейки.");
    if (otherSideRequested && isReadyShirt(selectedVeneerA || selectedVeneerAGroup) && !Number.isFinite(veneerThickness)) {
      warnings.push("Для выбора другого материала необходимо указать подтверждённую толщину готовой рубашки");
    } else if (otherSideRequested && otherSideMaterialForCompatibility && !sideThicknessCompatible) {
      warnings.push("Для второй стороны выберите материал той же толщины");
    }
    if (roughSideRequested && !isExactlyOnePointFive(veneerThickness)) {
      warnings.push("Черновой шпон на второй стороне разрешён только для лицевого шпона 1,5 мм.");
    } else if (roughSideRequested && !Number.isFinite(selectedRoughThickness)) {
      warnings.push("Выберите подтверждённую толщину чернового шпона стороны Б до 1,5 мм включительно.");
    }

    let weightMin = 0, weightMax = 0, hasWeight = false;
    itemResults.forEach((x) => { if (x.weight) { hasWeight = true; weightMin += x.weight.min; weightMax += x.weight.max; } });
    if (base && !base.weightDensityKgM3 && validSizes.length) warnings.push(`${base.name}: плотность в предоставленных данных не подтверждена; расчётный вес не выводится.`);
    const totalWeight = hasWeight ? { min: weightMin, max: weightMax } : null;

    // The bevel tariff is not confirmed. Preserve the request without presenting a full automatic price.
    if(edge.mode==='attached' && edge.bevel){
      hasPartialPrice=true;requiresProductionCost=true;requiresOperationProductionCost=true;
      itemResults.forEach(item=>markPositionPending(item,"Фаска: стоимость производства"));
      warnings.push("Фаска: отдельный тариф не подтверждён; включите её в общий запрос стоимости производства.");
    }
    const faceVeneerReady = Boolean(selectedVeneerA);
    const faceThicknessReady = isReadyShirt(selectedVeneerA) || Number.isFinite(selectedVeneerThickness());
    const reverseSideReady = (
      sides === 1 ||
      form.veneerBModeSelect.value === "same" ||
      (roughSideRequested && roughSideCompatible) ||
      Boolean(selectedVeneerB || (selectedVeneerBGroup && selectedVeneerBGroup.type !== "natural"))
    ) && sideThicknessCompatible && roughSideCompatible;
    const unconfirmedFitItems = itemResults.filter(item => item.productionFitUnconfirmed);
    if (unconfirmedFitItems.length) {
      hasPartialPrice = true;
      unconfirmedFitItems.forEach(item => {
        const message = "Возможность изготовления не подтверждена: нет подходящего исходного формата для размера с припуском";
        markPositionPending(item, message);
        warnings.push(`Позиция ${item.position}: ${message}. Размеры сохранены для проверки; наличие цены производства само по себе не подтверждает формат.`);
      });
    }
    const pendingQuickRules = [];
    if (isQuickWallPanel() && Math.abs(veneerThickness - 2) < 0.001) pendingQuickRules.push("Лицевой слой 2 мм: материал и цена оборота не согласованы; показанная стоимость предварительная.");
    if ((isQuickWallPanel() || isQuickStandardPanel()) && form.edgeModeSelect.value !== "none" && sides === 1 && form.reverseSideSelect.value === "paper") pendingQuickRules.push("Толщина бумаги не подтверждена: ширина и стоимость кромки предварительные, требуется согласование производства.");
    if (pendingQuickRules.length) {
      hasPartialPrice = true;
      requiresProductionCost = true;
      pendingQuickRules.forEach(message => { warnings.push(message); itemResults.forEach(item => markPositionPending(item, message)); });
    }
    let priceCalculationComplete = Boolean(
      base &&
      Number.isFinite(thickness.total) &&
      validSizes.length &&
      faceVeneerReady &&
      faceThicknessReady &&
      (!requiresTwoFaceSides(veneerThickness) || sides === 2) &&
      reverseSideReady &&
      (!layoutSelectionRequired || layout) &&
      layoutValidation.valid &&
      sizeValidation.valid &&
      !hasPartialPrice &&
      !requiresProductionCost
    );
    if (window.WoodstockPanelsView?.positionPricing) {
      itemResults.forEach(item => {
        if (manufacturingCostFromProduction(item)) markPositionPending(item, "Стоимость производства");
        if (thickVeneerWorkAdjustment.applies && isExactFinishedDetail(item) && !Number.isFinite(thickVeneerWorkAdjustment.actualCoefficient)) markPositionPending(item, "Работа с толстым шпоном");
        if (sameFaceSelectionOnBack && isFaceOnlyExtraVeneer(selectedVeneerA) && !faceVeneerBItem && item.classificationId !== "warehouse_standard") markPositionPending(item, "Шпон оборотной стороны");
        if (calibrationEnabled && !["calculated", "included_in_panel_price", "not_required"].includes(calibrationPricingStatus)) markPositionPending(item, "Калибровка: стоимость уточняет производство");
        const finish = finishResults.find(entry => entry.rowId === item.rowId);
        if (finish && (finish.totalFinishCost === null || finish.requiresProductionCost || [finish.toningPricingStatus,finish.isolatorPricingStatus].some(status => /pending|incomplete/.test(status || "")))) markPositionPending(item, "Финишное покрытие");
      });
    }
    const productionCosts=[];
    if(window.WoodstockPanelsView?.positionPricing){
      const productionReason=reason=>/^(Стоимость производства|Основа и производственные операции|Работа с толстым шпоном|Операция кромления:|Калибровка:|Фаска:|Финишное покрытие)/.test(reason);
      for(const item of itemResults){
        const row=item.row,input=row?.querySelector('[data-size-production-price]');
        const reasons=[...(positionPendingCosts.get(item.rowId)||[])],coveredReasons=reasons.filter(productionReason);
        const required=coveredReasons.length>0;
        const field=input?.closest('[data-production-cost-field]');
        field?.classList.add("is-hidden");
        let amount=null,invalid=false;
        if(input){
          input.value="";
          const signature=productionCostSignature(item,finishResults.find(entry=>entry.rowId===item.rowId),edge,coveredReasons);
          if(!required){input.value='';delete row.dataset.productionSignature;delete row.dataset.productionQuoteChanged;}
          else if(input.value.trim()&&row.dataset.productionSignature&&row.dataset.productionSignature!==signature){
            input.value='';delete row.dataset.productionSignature;row.dataset.productionQuoteChanged='true';
          }
          amount=required?parseProductionCost(input.value):null;
          invalid=required&&!!input.value.trim()&&amount===null;
          if(amount!==null){row.dataset.productionSignature=signature;delete row.dataset.productionQuoteChanged;}
          input.setAttribute('aria-invalid',String(invalid));
          const error=row.querySelector('[data-production-cost-error]');
          if(error)error.textContent=invalid?'Введите положительную сумму в рублях, не более двух знаков после запятой.':'';
          const note=row.querySelector('[data-production-cost-note]');
          if(note)note.textContent=(row.dataset.productionQuoteChanged?'Параметры изменены. Подтвердите стоимость от производства заново. ':'')+'Сумма за всё количество в строке. Не рассчитано автоматически: '+coveredReasons.join('; ')+'. Укажите суммарную стоимость этих составляющих. Уже учтённые материалы и операции в эту сумму не включаются.';
        }
        if(required&&amount!==null){
          addPositionCost(item,amount);finalTotal+=amount;retailTotal+=amount;
          if(item.classificationId==='warehouse_standard')standardFinalSubtotal+=amount;
          else if(item.classificationId==='standard_request')standardRequestFinalSubtotal+=amount;
          else nonstandardFinalSubtotal+=amount;
          positionPendingCosts.set(item.rowId,new Set(reasons.filter(reason=>!productionReason(reason))));
          breakdown.push({label:`Стоимость от производства · позиция ${item.position}`,value:amount,note:'С НДС, за всю позицию. Только нерассчитанные основа и работы; уже учтённые составляющие не начисляются повторно.'});
        }
        item.productionCost={required,amount,invalid,coveredReasons,status:!required?'not_required':amount!==null?'provided':'pending'};
        if(required)productionCosts.push({position:item.position,...item.productionCost});
      }
      if(productionCosts.length)requiresProductionCost=productionCosts.some(item=>item.status!=='provided');
      if(productionCosts.some(item=>item.amount!==null)){
        const materialUnresolved=veneerConsumptions.some(item=>!item.valid||!Number.isFinite(item.materialCost))||
          readyShirtPricings.some(item=>!Number.isFinite(item.finalPurchase?.cost)||item.finalPurchase?.partial)||
          (edge.mode!=='none'&&!['calculated','calculated_manual_order_price','not_required'].includes(edge.materialPricingStatus));
        const pending=itemResults.some(item=>(positionPendingCosts.get(item.rowId)?.size||0)>0);
        const parametersReady=Boolean(base&&Number.isFinite(thickness.total)&&validSizes.length&&faceVeneerReady&&faceThicknessReady&&(!requiresTwoFaceSides(veneerThickness)||sides===2)&&reverseSideReady&&(!layoutSelectionRequired||layout)&&layoutValidation.valid&&sizeValidation.valid);
        priceCalculationComplete=parametersReady&&!pending&&!materialUnresolved;
        requiresProductionCost=productionCosts.some(item=>item.status!=='provided');
        if(edge.mode==='attached'&&edge.operationRequiresProductionCost&&itemResults.filter(item=>item.productionCost?.coveredReasons.some(reason=>reason.startsWith('Операция кромления:'))).every(item=>item.productionCost.status==='provided')){
          edge.operationPricingStatus='included_in_production_quote';edge.operationRequiresProductionCost=false;
        }
        hasPartialPrice=!priceCalculationComplete;
      }
    }
    const positionTotalSum = itemResults.reduce((sum, item) => sum + (positionCostByRowId.get(item.rowId) || 0), 0);
    const knownPositionPricingReconciled = Math.abs(positionTotalSum + orderLevelUnallocatedCost - finalTotal) <= 0.005;
    const positionPricingReconciled = window.WoodstockPanelsView?.positionPricing
      ? knownPositionPricingReconciled : !priceCalculationComplete || Math.abs(positionTotalSum + orderLevelUnallocatedCost - finalTotal) <= 0.05;
    if (priceCalculationComplete && !positionPricingReconciled) {
      warnings.push("Позиционные стоимости не сошлись с итогом заказа; цены по отдельным позициям временно скрыты.");
    }

    itemResults.forEach((item) => {
      const positionTotalRaw = positionCostByRowId.get(item.rowId);
      const positionPricingComplete = Boolean(
        priceCalculationComplete &&
        positionPricingReconciled &&
        Number.isFinite(positionTotalRaw)
      );
      if (window.WoodstockPanelsView?.positionPricing) {
        const reasons = [...(positionPendingCosts.get(item.rowId) || [])];
        const hasKnownPrice = positionPricingReconciled && (Number.isFinite(positionTotalRaw) || priceCalculationComplete);
        item.positionKnownTotal = hasKnownPrice ? (positionTotalRaw || 0) : null;
        item.positionKnownPricePerM2 = hasKnownPrice && item.area > 0 ? item.positionKnownTotal / item.area : null;
        item.positionKnownPricePerPiece = hasKnownPrice && item.quantity > 0 ? item.positionKnownTotal / item.quantity : null;
        item.positionPricingPartial = reasons.length > 0;
        item.positionPendingCosts = reasons;
      }
      item.positionPricingComplete = positionPricingComplete;
      item.positionTotal = positionPricingComplete ? positionTotalRaw : null;
      item.positionPricePerM2 = positionPricingComplete && Number.isFinite(item.area) && item.area > 0
        ? positionTotalRaw / item.area
        : null;
      item.positionPricePerPiece = positionPricingComplete && Number.isFinite(item.quantity) && item.quantity > 0
        ? positionTotalRaw / item.quantity
        : null;
    });

    const vat = finalTotal > 0 ? finalTotal * data.meta.vatRate / (1 + data.meta.vatRate) : 0;
    const sandingRatePerM2 = sides === 2 ? data.meta.sandingRatesPerM2.twoSides : data.meta.sandingRatesPerM2.oneSide;
    const sandingPricingStatus = sandingProductionArea > 0 ? (sandingCalculatedArea > 0 ? "calculated_and_pending_production" : "pending_production") : sandingCalculatedArea > 0
      ? (sandingIncludedArea > 0 ? "calculated_and_included" : "calculated")
      : sandingIncludedArea > 0 ? "included_in_panel_price" : "not_required";
    const cuttingRatePerRunningM = cuttingMetersTotal > 0 ? cuttingRateFor(thickness.raw, base?.id) : null;
    const gluingRequired = Boolean(thickness.composite);
    const gluingPositionHasAppliedRate = (size) => baseRatePricings.some((pricing) =>
      pricing.position === size.position && Number.isFinite(pricing.finalCost) && !pricing.conditionUnresolved
    );
    const gluingIncludedInBaseRate = Boolean(gluingRequired && validSizes.length && validSizes.every(gluingPositionHasAppliedRate));
    const gluingPartlyIncluded = Boolean(gluingRequired && validSizes.some(gluingPositionHasAppliedRate) && !gluingIncludedInBaseRate);
    const gluingPricingStatus = !gluingRequired
      ? "not_required"
      : gluingIncludedInBaseRate ? "included_in_base_rate"
        : gluingPartlyIncluded ? "included_and_pending_production" : "pending_production";
    const techOperations = {
      sides,
      sandingEnabled: sandingEnabled(),
      sandingRatePerM2,
      sandingArea: sandingCalculatedArea + sandingIncludedArea + sandingProductionArea,
      sandingProductionArea,
      sandingCalculatedArea,
      sandingIncludedArea,
      sandingCost: sandingCostTotal,
      sandingPricingStatus,
      sandingIncludedInProductionCost: sandingProductionArea > 0,
      cuttingRequired: cuttingMetersTotal > 0,
      cuttingMeters: cuttingMetersTotal,
      cuttingRatePerRunningM: Number.isFinite(cuttingRatePerRunningM) ? cuttingRatePerRunningM : null,
      cuttingCost: cuttingCostTotal,
      cuttingPricingStatus,
      cuttingRequiresProductionCost,
      cuttingIncludedInProductionCost: cuttingPricingStatus === "pending_production",
      gluing: gluingRequired,
      gluingComposition: thickness.raw || "",
      gluingIncludedInBaseRate,
      gluingPricingStatus,
      gluingIncludedInProductionCost: ["pending_production", "included_and_pending_production"].includes(gluingPricingStatus),
      calibration: calibrationEnabled,
      calibrationRequired,
      calibrationSourceBaseThicknessMm,
      baseThicknessAfterCalibrationMm,
      calibrationDepth,
      calibrationRatePerM2PerMm,
      calibrationRatePerM2,
      calibrationArea,
      calibrationCost,
      calibrationPricingStatus,
      calibrationRequiresProductionCost,
      calibrationProductionArea,
      calibrationIncludedInProductionCost: calibrationRequiresProductionCost,
      calibrationFinishedProductThicknessMm,
      readyShirt: usesReadyShirt,
      readyShirtAssemblyRequired: usesReadyShirt,
      readyShirtAssemblyPricingStatus: usesReadyShirt ? "pending_production" : "not_required",
      readyShirtAssemblyRequiresProductionCost: usesReadyShirt
    };
    const edgeComment = form.edgeModeSelect.value === "none" ? "" : form.edgeCommentInput.value.trim();
    const roughBackVeneer = roughBackSelected() ? {
      side: "B",
      materialType: "rough_veneer",
      name: "Черновой шпон",
      thicknessMm: Number.isFinite(roughBackThicknessMm) ? roughBackThicknessMm : roughBackThicknessForCurrentSelection(),
      ratePerM2: Number.isFinite(roughBackRatePerM2) ? roughBackRatePerM2 : null,
      materialCost: roughBackPricingStatus === "calculated" ? roughBackCostTotal : null,
      pricingStatus: roughBackPricingStatus === "not_required" ? "requires_clarification" : roughBackPricingStatus,
      source: "meta.roughBackVeneerRatesPerM2ByThickness"
    } : null;
    return { base, thickness, sizes, validSizes, itemResults, productionCosts, totalArea, totalProductionArea, totalPieces, retailTotal, retailAvgM2: totalArea > 0 ? retailTotal / totalArea : null, automaticFinalTotal, finalTotal, manualDiscountPercent, manualDiscountCandidateTotal, manualDiscountApplied, vat, avgM2: totalArea > 0 ? finalTotal / totalArea : null, avgPiece: totalPieces > 0 ? finalTotal / totalPieces : null, totalWeight, warnings: [...new Set(warnings)], breakdown, hasPartialPrice, priceCalculationComplete, allStandard, attachedEdgeMeters, edge, edgeComment, orderLevelUnallocatedCost, positionPricingReconciled, mdfVolumeId, herringbone, customLayout, veneerPricings, readyShirtPricings, mdfPricings, baseRatePricings, veneerWasteAdjustments, veneerConsumptions, standardFinalSubtotal, standardRequestFinalSubtotal, nonstandardFinalSubtotal, roughBackVeneer, techOperations, finishResults, requiresBaseProductionCost, requiresLayoutProductionCost, requiresAllowanceProductionCost, requiresReadyShirtProductionCost, requiresFinishProductionCost, requiresOperationProductionCost, requiresProductionCost, thickVeneerWorkAdjustment, mixMatchVeneerPricing, layoutValidation, sizeValidation };
  }

  function specRow(label, value, level = 0) {
    const classes = [];
    if (level >= 1) classes.push("spec-list__nested");
    if (level >= 2) classes.push("spec-list__nested--2");
    const classAttr = classes.length ? ` class="${classes.join(" ")}"` : "";
    const displayValue = value === null || value === undefined || value === "" ? "—" : value;
    return `<div${classAttr}><dt>${esc(label)}</dt><dd>${esc(displayValue)}</dd></div>`;
  }

  function specNumber(value, maximumFractionDigits = 2) {
    return Number.isFinite(value)
      ? new Intl.NumberFormat("ru-RU", { maximumFractionDigits }).format(value)
      : "—";
  }

  function specMm(value) {
    return Number.isFinite(num(value)) && num(value) > 0 ? `${specNumber(num(value), 2)} мм` : "—";
  }

  function compositeThicknessText(raw) {
    const text = String(raw || "").trim();
    if (!text) return "—";
    return `${text.split("+").map((part) => part.trim()).join(" + ")} мм`;
  }

  function finishSpecRows(config, { label = "Финишное покрытие", level = 0, commentLabel = "Комментарий к финишу", filesLabel = "Файлы к финишу" } = {}) {
    const normalized = normalizeFinishConfig(config);
    const finishId = normalized.finishId;
    const childLevel = level + 1;

    if (finishId === "none") return [specRow(label, "Не требуется", level)];

    if (isGloss100Finish(normalized)) {
      const rows = [specRow(label, "Глянец 100%", level)];
      rows.push(specRow("Стороны покрытия", normalized.sides || "—", childLevel));
      if (normalized.toning === "yes") rows.push(specRow("Тонировка", "Да", childLevel));
      if (normalized.isolator === "yes") rows.push(specRow("Изолятор", "Да", childLevel));
      return rows;
    }

    const option = finishOption(finishId);
    const rows = [specRow(label, option?.name || "—", level)];

    if (isLacquerFinish(finishId)) {
      rows.push(specRow("Стороны покрытия", normalized.sides || "—", childLevel));
      if (isAcrylicLacquer(finishId)) {
        const process = data?.finishParameters?.lacquerProcesses?.find((item) => item.id === normalized.lacquerProcess);
        rows.push(specRow("Схема", process?.name || "—", childLevel));
      }
      rows.push(specRow("Степень блеска", normalized.lacquerGloss || "—", childLevel));
      if (normalized.toning === "yes") rows.push(specRow("Тонировка", "Да", childLevel));
      if (normalized.isolator === "yes") rows.push(specRow("Изолятор", "Да", childLevel));
    } else if (finishId === "enamel") {
      rows.push(specRow("Стороны покрытия", normalized.sides || "—", childLevel));
      rows.push(specRow("Схема", normalized.enamelVariant || "—", childLevel));
    }

    return rows;
  }

  function manufacturingTypeForSize(size) {
    const explicit = size?.manufacturingType || "";
    if (["standard", "exact", "allowance20"].includes(explicit)) return explicit;
    const mode = size?.sizeInputMode || size?.mode || "";
    if (!mode) return "";
    return legacyManufacturingType({
      mode,
      resultMode: size?.resultMode || "",
      standardOrderType: size?.standardOrderType || null
    });
  }

  function sizeTypeForSpec(size) {
    const manufacturingType = manufacturingTypeForSize(size);
    if (!manufacturingType) return "—";
    if (manufacturingType === "standard") return "Стандартная панель";
    if (manufacturingType === "allowance20") return "Нестандарт с припуском +20 мм";
    return "Готовая деталь в точный размер";
  }

  function priceSourceForSpec(size, item = null) {
    const manufacturingType = manufacturingTypeForSize(size);
    const classificationId = item?.classificationId || size?.classificationId || "";
    if (manufacturingCostFromProduction(size)) return "Стоимость производства";
    if (manufacturingType === "standard") {
      return classificationId === "warehouse_standard" ? "Складская программа" : "Стандарт по запросу";
    }
    if (manufacturingType === "allowance20") return "Стоимость производства";
    if (manufacturingType === "exact") return "Расчёт точного нестандарта";
    return "—";
  }

  function sizeVolumeForSpec(size, thickness) {
    const length = num(size?.calcLength);
    const width = num(size?.calcWidth);
    const quantity = num(size?.quantity);
    const totalThickness = physicalBaseThicknessMm();
    if (![length, width, quantity, totalThickness].every((value) => Number.isFinite(value) && value > 0)) return null;
    return (length / 1000) * (width / 1000) * (totalThickness / 1000) * quantity;
  }

  function thickVeneerWorkAdjustmentLabel(adjustment) {
    if (!adjustment?.applies) return "";
    if (!Number.isFinite(adjustment.actualCoefficient)) return "Требуется указать вручную";
    const actual = `× ${specNumber(adjustment.actualCoefficient, 4)}`;
    if (adjustment.changedManually) {
      return Number.isFinite(adjustment.automaticCoefficient)
        ? `${actual} · вручную (авто × ${specNumber(adjustment.automaticCoefficient, 4)})`
        : `${actual} · вручную (авто не определён)`;
    }
    return `${actual} · автоматически`;
  }

  function sideBVeneerMaterialCost(result, mode = form.veneerBModeSelect?.value) {
    if (!result || Number(form.veneeredSidesSelect?.value) !== 2) return null;
    if (mode === "rough") return Number.isFinite(result.roughBackVeneer?.materialCost) ? result.roughBackVeneer.materialCost : null;

    let total = 0;
    let found = false;
    (result.veneerPricings || []).forEach((pricing) => {
      const cost = num(pricing?.finalPurchase?.cost);
      if (!Number.isFinite(cost)) return;
      if (mode === "other" && pricing.which === "B" && !pricing.sameAsA) { total += cost; found = true; }
      if (mode === "same") {
        if (pricing.which === "B") { total += cost; found = true; }
        else if (pricing.sameAsA) { total += cost / 2; found = true; }
      }
    });
    (result.readyShirtPricings || []).forEach((pricing) => {
      const cost = num(pricing?.finalPurchase?.cost);
      if (!Number.isFinite(cost)) return;
      const pricingWhich = pricing.pricingWhich || pricing.which;
      if (mode === "other" && pricingWhich === "B") { total += cost; found = true; }
      if (mode === "same" && String(pricing.which || "").includes("A+B")) { total += cost / 2; found = true; }
    });
    return found ? total : null;
  }

  function renderSpec(result) {
    if (!result) return;

    const base = result.base;
    const sides = Number(form.veneeredSidesSelect.value);
    const sideText = sides === 2 ? "2 стороны" : sides === 1 ? "1 сторона" : "—";
    const veneerA = selectedVeneerA || selectedVeneerAGroup;
    const veneerThickness = selectedVeneerThickness();
    const selectedFiles = uploadedFileNames(form.filesInput);
    const layoutFiles = uploadedFileNames(form.layoutTzFiles);
    const globalFinish = currentGlobalFinishConfig();
    const layout = selectedLayout();

    const userPatternAId = effectiveLayoutId() === "mixmatch" ? "" : form.veneerCutSelect.value;
    const cutA = ["radial", "tangential"].includes(userPatternAId)
      ? (data.veneerCuts.find((item) => item.id === userPatternAId)?.name || "")
      : "";
    const directCutBId = effectiveLayoutBId() === "mixmatch" ? "" : form.veneerBCutSelect.value;
    const cutB = ["radial", "tangential"].includes(directCutBId)
      ? (data.veneerCuts.find((item) => item.id === directCutBId)?.name || "")
      : "";

    const sideBSelectionMode = sides === 2 ? form.veneerBModeSelect.value : "";
    const sideBMode = sides === 2
      ? (form.veneerBModeSelect.options[form.veneerBModeSelect.selectedIndex]?.text || "—")
      : (form.reverseSideSelect.options[form.reverseSideSelect.selectedIndex]?.text || "—");
    const sideBSelectedMaterial = sides === 2
      ? (sideBSelectionMode === "same"
        ? (isFaceOnlyExtraVeneer(selectedVeneerA) ? backsideBVariantFor(selectedVeneerA) : veneerA)
        : sideBSelectionMode === "other" ? (selectedVeneerB || selectedVeneerBGroup) : null)
      : null;
    const sideBThickness = sideBSelectionMode === "rough"
      ? num(result.roughBackVeneer?.thicknessMm)
      : itemThickness(sideBSelectedMaterial);
    const sameBPatternCuts = sideBSelectionMode === "same" && sideBSelectedMaterial && !isReadyShirt(sideBSelectedMaterial)
      ? confirmedPatternTypes([sideBSelectedMaterial])
      : [];
    const sameBPatternId = sideBSelectionMode === "same" && effectiveLayoutBId() !== "mixmatch"
      ? (sameBPatternCuts.includes(userPatternAId) ? userPatternAId : (sameBPatternCuts.length === 1 ? sameBPatternCuts[0] : ""))
      : "";
    const sideBPatternName = sameBPatternId
      ? (data.veneerCuts.find((item) => item.id === sameBPatternId)?.name || "")
      : cutB;

    const characteristics = [
      specRow("Основа", base?.name || "—"),
      specRow("Толщина основы", baseThicknessDisplay(result.thickness)),
      specRow("Фанерованные стороны", sideText)
    ];

    if (isReadyShirt(veneerA)) {
      characteristics.push(specRow("Сторона А", veneerA?.displayName || "—"));
      if (Number.isFinite(veneerThickness)) characteristics.push(specRow("Толщина материала стороны А", `${specNumber(veneerThickness, 2)} мм`, 1));
      const dims = Core.readyShirtDimensions(veneerA);
      if (dims) characteristics.push(specRow("Формат готовой рубашки", `${specNumber(dims.lengthMm, 0)} × ${specNumber(dims.widthMm, 0)} мм`, 1));
    } else {
      characteristics.push(specRow("Сторона А", veneerDisplayName(veneerA)));
      if (veneerA?.typeName) characteristics.push(specRow("Тип шпона стороны А", veneerA.typeName, 1));
      if (Number.isFinite(veneerThickness)) characteristics.push(specRow("Толщина шпона стороны А", `${specNumber(veneerThickness, 2)} мм`, 1));
      if (cutA) characteristics.push(specRow("Тип рисунка стороны А", cutA, 1));
    }

    if (layout?.name && needsLayoutSelection()) characteristics.push(specRow("Раскладка А", layout.name));
    if (sideBNeedsLayout()) characteristics.push(specRow("Раскладка Б", data.layouts.find(x => x.id === effectiveLayoutBId())?.name || "—"));

    characteristics.push(specRow("Сторона Б", sideBMode));
    if (sides === 2) {
      if (sideBSelectionMode === "rough") {
        characteristics.push(specRow("Материал стороны Б", "Черновой шпон", 1));
      } else if (sideBSelectedMaterial) {
        characteristics.push(specRow(
          "Материал стороны Б",
          isReadyShirt(sideBSelectedMaterial) ? (sideBSelectedMaterial.displayName || "—") : veneerDisplayName(sideBSelectedMaterial),
          1
        ));
        if (!isReadyShirt(sideBSelectedMaterial) && sideBSelectedMaterial?.typeName) {
          characteristics.push(specRow("Тип шпона стороны Б", sideBSelectedMaterial.typeName, 1));
        }
      }
      if (Number.isFinite(sideBThickness)) characteristics.push(specRow("Толщина материала стороны Б", `${specNumber(sideBThickness, 2)} мм`, 1));
      if (sideBPatternName && !isReadyShirt(sideBSelectedMaterial)) characteristics.push(specRow("Тип рисунка стороны Б", sideBPatternName, 1));
    }

    if (form.layoutTzComment.value.trim()) characteristics.push(specRow("Комментарий к раскладке", form.layoutTzComment.value.trim()));
    if (layoutFiles.length) characteristics.push(specRow("Файлы к раскладке", layoutFiles.join(", ")));

    const edge = result.edge;
    if (!edge || edge.mode === "none") {
      characteristics.push(specRow("Кромка", "Нет"));
    } else {
      characteristics.push(specRow("Кромка", edge.displayName || edge.name || edge.typeName || "Да"));
      if (edge.thicknessApplicable && Number.isFinite(edge.thicknessMm)) characteristics.push(specRow("Толщина кромки", `${specNumber(edge.thicknessMm, 2)} мм`, 1));
      if (Number.isFinite(edge.widthMm)) characteristics.push(specRow("Ширина кромки", `${specNumber(edge.widthMm, 2)} мм`, 1));
      if (edge.mode === "attached") {
        if (edge.sidesName) characteristics.push(specRow("Стороны кромления", edge.sidesName, 1));
        if (Number.isFinite(edge.geometricMeters) && edge.geometricMeters > 0) {
          characteristics.push(specRow("Геометрический метраж кромки", `${specNumber(edge.geometricMeters, 2)} пог. м`, 1));
          characteristics.push(specRow("Расход кромки с запасом 20%", `${specNumber(edge.calculatedMeters, 2)} пог. м`, 1));
        }
        (edge.positionSettings || []).forEach((item) => {
          if (item.mode === "inherit") return;
          characteristics.push(specRow(
            `Кромка · Позиция ${item.position}`,
            item.applies
              ? `${item.sidesName || "—"}${Number.isFinite(item.thicknessMm) ? ` · толщина ${specNumber(item.thicknessMm, 2)} мм` : ""}${Number.isFinite(item.selection?.widthMm) ? ` · ширина ${specNumber(item.selection.widthMm, 2)} мм` : ""} · Индивидуальные настройки`
              : "Без кромления",
            2
          ));
        });
      } else if (Number.isFinite(edge.orderedMeters) && edge.orderedMeters > 0) {
        characteristics.push(specRow("Стороны для расчёта кромки", edge.sidesName || "—", 1));
        characteristics.push(specRow("Расчётный метраж кромки", `${specNumber(edge.calculatedMeters, 2)} пог. м`, 1));
        characteristics.push(specRow(edge.metersSource === "manual" ? "Метраж к заказу · ручная корректировка" : "Метраж к заказу · автоматически", `${specNumber(edge.orderedMeters, 2)} пог. м`, 1));
      }
      if (edge.bevel) characteristics.push(specRow("Фаска на кромке", "Да", 1));
      if (result.edgeComment) characteristics.push(specRow("Комментарий к кромке", result.edgeComment, 1));
    }

    const tech = result.techOperations || {};
    if (tech.calibration) {
      characteristics.push(specRow("Калибровка", "Да"));
      if (Number.isFinite(tech.baseThicknessAfterCalibrationMm)) {
        characteristics.push(specRow("Толщина основы после калибровки", specMm(tech.baseThicknessAfterCalibrationMm), 1));
      }
      if (Number.isFinite(tech.calibrationFinishedProductThicknessMm)) {
        characteristics.push(specRow("Итоговая расчётная толщина изделия", specMm(tech.calibrationFinishedProductThicknessMm), 1));
      }
    }
    characteristics.push(specRow("Шлифовка", sandingEnabled() ? "Да" : "Нет"));
    if (tech.cuttingRequired || tech.cuttingMeters > 0) characteristics.push(specRow("Чистовой припил", "Да"));
    if (tech.gluing) characteristics.push(specRow("Проклейка основы", "Да"));

    if (globalFinish.finishId && globalFinish.finishId !== "none") {
      characteristics.push(specRow("Финишное покрытие", finishSummary(globalFinish)));
    }
    (result.finishResults || []).forEach((item) => {
      if (item.config?.source !== "position") return;
      characteristics.push(specRow(`Финиш · Позиция ${item.position}`, item.summary || finishSummary(item.config), 1));
    });

    if (form.commentInput.value.trim()) characteristics.push(specRow("Комментарий", form.commentInput.value.trim()));
    if (selectedFiles.length) characteristics.push(specRow("Файлы к позиции", selectedFiles.join(", ")));
    form.specCharacteristics.innerHTML = characteristics.join("");

    const sizeRows = result.sizes || [];
    const itemByRowId = new Map((result.itemResults || []).map((item) => [item.rowId, item]));
    form.specSizes.innerHTML = sizeRows.map((size, index) => {
      const item = itemByRowId.get(size.rowId) || size;
      const lengthValue = Number.isFinite(size.length) && size.length > 0 ? `${specNumber(size.length, 2)} мм` : "—";
      const widthValue = Number.isFinite(size.width) && size.width > 0 ? `${specNumber(size.width, 2)} мм` : "—";
      const quantityValue = Number.isInteger(size.quantity) && size.quantity > 0 ? `${size.quantity} шт.` : "—";
      const areaValue = Number.isFinite(size.area) && size.area > 0 ? `${specNumber(size.area, 3)} м²` : "—";
      const volume = sizeVolumeForSpec(size, result.thickness);
      const weight = item?.weight || weightForSize(size, result.base, result.thickness);
      const weightValue = weightText(weight).replace(/\s*кг$/, "");
      const rows = [
        specRow("Длина, мм", Number.isFinite(size.length) && size.length > 0 ? specNumber(size.length, 2) : "—"),
        specRow("Ширина, мм", Number.isFinite(size.width) && size.width > 0 ? specNumber(size.width, 2) : "—"),
        specRow("Количество, шт.", Number.isInteger(size.quantity) && size.quantity > 0 ? String(size.quantity) : "—"),
        specRow("Тип изготовления", sizeTypeForSpec(size)),
        specRow("Источник цены", priceSourceForSpec(size, item)),
        specRow("Площадь, м²", Number.isFinite(size.area) && size.area > 0 ? specNumber(size.area, 3) : "—"),
        specRow("Объём, м³", Number.isFinite(volume) ? specNumber(volume, 4) : "—"),
        specRow("Расчётный вес основы, кг", weightValue),
        ...(size.transition ? [specRow("Переход рисунка", "Да")] : []),
        ...(size.comment ? [specRow("Комментарий", size.comment)] : []),
        ...(size.files?.length ? [specRow("Файлы", size.files.join(", "))] : [])
      ];
      return `<section class="spec-position-block"><h4 class="spec-position-block__title">Позиция ${index + 1} · ${esc(lengthValue.replace(" мм", ""))} × ${esc(widthValue.replace(" мм", ""))} мм · ${esc(quantityValue)}</h4><dl class="spec-list spec-list--full">${rows.join("")}</dl></section>`;
    }).join("");

    const multiplePositions = (result.validSizes || []).length > 1;
    form.specPricePerM2Label.textContent = multiplePositions ? "Средняя цена за м² с НДС" : "Цена за м² с НДС";
    form.specPricePerPieceLabel.textContent = multiplePositions ? "Средняя цена за шт. / лист" : "Цена за шт. / лист";
    if (result.priceCalculationComplete) {
      form.specPricePerM2.textContent = money(result.avgM2);
      form.specPricePerPiece.textContent = money(result.avgPiece);
      form.specTotal.textContent = money(result.finalTotal);
      form.specVat.textContent = `В том числе НДС 22%: ${money(result.vat)}`;
    } else if (result.requiresProductionCost) {
      form.specPricePerM2.textContent = "—";
      form.specPricePerPiece.textContent = "—";
      form.specTotal.textContent = "Требуется стоимость производства";
      form.specVat.textContent = "В том числе НДС 22%: —";
    } else {
      form.specPricePerM2.textContent = "—";
      form.specPricePerPiece.textContent = "—";
      form.specTotal.textContent = "—";
      form.specVat.textContent = "В том числе НДС 22%: —";
    }
  }

  function setRowStatus() {}

  function renderPriceAdjustmentControl({ name, percent = 0, note = "" }) {
    const wrapper = document.createElement("div");
    wrapper.className = "dynamic-adjustment-row";

    const label = document.createElement("span");
    label.className = "dynamic-adjustment-row__label";
    label.textContent = name;
    if (note) {
      const meta = document.createElement("span");
      meta.className = "adjustment-manual";
      meta.textContent = note;
      label.append(document.createElement("br"), meta);
    }

    const right = document.createElement("div");
    right.className = "dynamic-adjustment-row__right";
    const value = document.createElement("strong");
    value.textContent = `${round(Math.max(Number(percent) || 0, 0), 1)}%`;
    right.append(value);

    wrapper.append(label, right);
    form.priceAdjustmentsList.append(wrapper);
  }

  function renderCoefficientAdjustmentControl({ id, name, automaticCoefficient = null, coefficient = null, note = "" }) {
    const wrapper = document.createElement("div");
    wrapper.className = "dynamic-adjustment-row";

    const label = document.createElement("span");
    label.className = "dynamic-adjustment-row__label";
    label.textContent = name;
    if (note) {
      const meta = document.createElement("span");
      meta.className = "adjustment-manual";
      meta.textContent = note;
      label.append(document.createElement("br"), meta);
    }

    const right = document.createElement("div");
    right.className = "dynamic-adjustment-row__right";
    const control = document.createElement("span");
    control.className = "inline-percent-control";
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0.001";
    input.step = "0.001";
    input.value = Number.isFinite(coefficient) ? String(round(coefficient, 4)) : "";
    input.placeholder = "Укажите";
    input.setAttribute("aria-label", name);
    const sign = document.createElement("strong");
    sign.textContent = "×";
    control.append(input, sign);
    right.append(control);

    input.addEventListener("change", () => {
      const raw = String(input.value || "").trim();
      if (!raw) {
        priceAdjustmentOverrides.delete(id);
        recalc();
        return;
      }
      const value = Number(raw);
      if (!Number.isFinite(value) || value <= 0) {
        input.value = Number.isFinite(coefficient) ? String(round(coefficient, 4)) : "";
        return;
      }
      if (Number.isFinite(automaticCoefficient) && Math.abs(value - automaticCoefficient) < 0.000001) priceAdjustmentOverrides.delete(id);
      else priceAdjustmentOverrides.set(id, value);
      recalc();
    });

    const manuallyChanged = priceAdjustmentOverrides.has(id);
    if (manuallyChanged) {
      const meta = document.createElement("span");
      meta.className = "adjustment-manual";
      meta.append(Number.isFinite(automaticCoefficient) ? "Изменено вручную · " : "Указано вручную");
      if (Number.isFinite(automaticCoefficient)) {
        const reset = document.createElement("button");
        reset.type = "button";
        reset.className = "adjustment-reset";
        reset.textContent = "Вернуть";
        let handled = false;
        const resetValue = () => {
          if (handled) return;
          handled = true;
          priceAdjustmentOverrides.delete(id);
          recalc();
        };
        reset.addEventListener("pointerdown", (event) => { event.preventDefault(); resetValue(); });
        reset.addEventListener("click", (event) => { event.preventDefault(); resetValue(); });
        meta.append(reset);
      }
      right.append(meta);
    } else if (!Number.isFinite(automaticCoefficient)) {
      const meta = document.createElement("span");
      meta.className = "adjustment-manual";
      meta.textContent = "Укажите коэффициент или получите стоимость работ от производства для спецификации.";
      right.append(meta);
    }

    wrapper.append(label, right);
    form.priceAdjustmentsList.append(wrapper);
  }

  function renderAreaAdjustmentControl({ id, name, automaticArea = null, area = null, note = "" }) {
    const wrapper = document.createElement("div");
    wrapper.className = "dynamic-adjustment-row";

    const label = document.createElement("span");
    label.className = "dynamic-adjustment-row__label";
    label.textContent = name;
    if (note) {
      const meta = document.createElement("span");
      meta.className = "adjustment-manual";
      meta.textContent = note;
      label.append(document.createElement("br"), meta);
    }

    const right = document.createElement("div");
    right.className = "dynamic-adjustment-row__right";
    const control = document.createElement("span");
    control.className = "inline-percent-control";
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0.01";
    input.step = "0.01";
    input.value = Number.isFinite(area) ? String(round(area, 2)) : "";
    input.setAttribute("aria-label", `${name}, м²`);
    const sign = document.createElement("strong");
    sign.textContent = "м²";
    control.append(input, sign);
    right.append(control);

    input.addEventListener("change", () => {
      const value = Number(input.value);
      if (!Number.isFinite(value) || value <= 0) {
        input.value = Number.isFinite(area) ? String(round(area, 2)) : "";
        return;
      }
      if (Number.isFinite(automaticArea) && Math.abs(value - automaticArea) < 0.000001) priceAdjustmentOverrides.delete(id);
      else priceAdjustmentOverrides.set(id, value);
      recalc();
    });

    const manuallyChanged = priceAdjustmentOverrides.has(id);
    if (manuallyChanged) {
      const meta = document.createElement("span");
      meta.className = "adjustment-manual";
      meta.append("Изменено вручную · ");
      const reset = document.createElement("button");
      reset.type = "button";
      reset.className = "adjustment-reset";
      reset.textContent = "Вернуть";
      let handled = false;
      const resetValue = () => {
        if (handled) return;
        handled = true;
        priceAdjustmentOverrides.delete(id);
        recalc();
      };
      reset.addEventListener("pointerdown", (event) => { event.preventDefault(); resetValue(); });
      reset.addEventListener("click", (event) => { event.preventDefault(); resetValue(); });
      meta.append(reset);
      right.append(meta);
    }

    wrapper.append(label, right);
    form.priceAdjustmentsList.append(wrapper);
  }

  function renderVeneerWasteAdjustmentControl(consumption) {
    if (!consumption) return;
    const wrapper = document.createElement("div");
    wrapper.className = "dynamic-adjustment-row";

    const label = document.createElement("span");
    label.className = "dynamic-adjustment-row__label";
    const sideLabel = consumption.sideKey === "A+B" ? "стороны А и Б" : `сторона ${consumption.sideKey || consumption.which || "—"}`;
    const contextLabel = consumption.panelSize
      ? `${specNumber(num(consumption.panelSize.length), 0)} × ${specNumber(num(consumption.panelSize.width), 0)} мм`
      : consumption.pricingMode === "nonstandard" ? "нестандарт" : "стандарт по запросу";
    label.textContent = `Фактическое количество шпона · ${sideLabel}`;
    const meta = document.createElement("span");
    meta.className = "adjustment-manual";
    const recommendedText = Number.isFinite(consumption.recommendedVeneerAreaM2)
      ? `${round(consumption.recommendedVeneerAreaM2, 2)} м² (${round(consumption.recommendedWastePercent, 1)}%)`
      : "не определён";
    meta.textContent = `${consumption.materialName || "Шпон"} · ${contextLabel} · расчётная потребность ${round(consumption.requiredVeneerAreaM2, 2)} м² · рекомендуемый расход ${recommendedText}`;
    label.append(document.createElement("br"), meta);

    const right = document.createElement("div");
    right.className = "dynamic-adjustment-row__right";

    const areaControl = document.createElement("span");
    areaControl.className = "inline-percent-control";
    const areaInput = document.createElement("input");
    areaInput.type = "number";
    areaInput.min = "0.01";
    areaInput.step = "0.01";
    areaInput.value = Number.isFinite(consumption.actualVeneerAreaM2) ? String(round(consumption.actualVeneerAreaM2, 2)) : "";
    areaInput.setAttribute("aria-label", `Фактическое количество шпона, ${sideLabel}, м²`);
    const areaSign = document.createElement("strong");
    areaSign.textContent = "м²";
    areaControl.append(areaInput, areaSign);
    right.append(areaControl);

    const actualMeta = document.createElement("span");
    actualMeta.className = "adjustment-manual";
    const validationKey = `veneerActual:${consumption.id || consumption.materialId || "current"}`;
    if (consumption.valid) {
      const wasteArea = Number.isFinite(consumption.actualWasteAreaM2) ? round(consumption.actualWasteAreaM2, 2) : 0;
      const wastePercent = Number.isFinite(consumption.actualWastePercent) ? round(consumption.actualWastePercent, 1) : 0;
      const showPaid = Number.isFinite(consumption.purchasedWholeSheets) || (
        Number.isFinite(consumption.paidVeneerAreaM2) && Number.isFinite(consumption.actualVeneerAreaM2) &&
        Math.abs(consumption.paidVeneerAreaM2 - consumption.actualVeneerAreaM2) > 0.000001
      );
      const paid = showPaid
        ? ` · оплачиваемое количество ${round(consumption.paidVeneerAreaM2, 2)} м²${Number.isFinite(consumption.purchasedWholeSheets) ? ` (${round(consumption.purchasedWholeSheets, 0)} лист.)` : ""}`
        : "";
      actualMeta.textContent = `Фактический отход ${wasteArea} м² · ${wastePercent}%${paid}`;
    } else if (addAttempted || touchedFields.has(validationKey)) {
      actualMeta.textContent = consumption.validationError || "Укажите фактическое количество шпона.";
      actualMeta.classList.add("field__error");
    } else {
      actualMeta.textContent = "Фактическое количество шпона уточняется вручную.";
    }
    right.append(actualMeta);

    areaInput.addEventListener("input", () => {
      actualMeta.classList.remove("field__error");
    });
    areaInput.addEventListener("change", () => {
      markFieldTouched(validationKey);
      const raw = areaInput.value.trim();
      if (!raw) {
        if (Number.isFinite(consumption.recommendedVeneerAreaM2)) priceAdjustmentOverrides.set(consumption.id, Number.NaN);
        else priceAdjustmentOverrides.delete(consumption.id);
      } else {
        const value = Number(raw.replace(",", "."));
        if (Number.isFinite(value) && Number.isFinite(consumption.recommendedVeneerAreaM2) && Math.abs(value - consumption.recommendedVeneerAreaM2) < 0.000001) {
          priceAdjustmentOverrides.delete(consumption.id);
        } else {
          priceAdjustmentOverrides.set(consumption.id, value);
        }
      }
      recalc();
    });

    if (consumption.actualVeneerAreaManual) {
      const manual = document.createElement("span");
      manual.className = "adjustment-manual";
      manual.append("Количество изменено вручную · ");
      const reset = document.createElement("button");
      reset.type = "button";
      reset.className = "adjustment-reset";
      reset.textContent = "Вернуть рекомендацию";
      let handled = false;
      const resetValue = (event) => {
        event?.preventDefault();
        if (handled) return;
        handled = true;
        priceAdjustmentOverrides.delete(consumption.id);
        clearTouchedFields(validationKey);
        recalc();
      };
      reset.addEventListener("pointerdown", resetValue);
      reset.addEventListener("click", resetValue);
      manual.append(reset);
      right.append(manual);
    }

    wrapper.append(label, right);
    form.priceAdjustmentsList.append(wrapper);
  }

  function renderPriceAdjustments(result) {
    form.priceAdjustmentsList.replaceChildren();
    let rowCount = 0;

    const veneerSeen = new Set();
    (result?.veneerPricings || []).forEach((pricing) => {
      if (!pricing?.item || pricing.conditionUnresolved || pricing.conditionSource !== "volume") return;
      const key = `${pricing.which}|${pricing.levelId}`;
      if (veneerSeen.has(key)) return;
      veneerSeen.add(key);
      const sideName = pricing.sameAsA ? "Шпон сторон А и Б" : `Шпон стороны ${pricing.which}`;
      renderPriceAdjustmentControl({
        name: `${sideName} — скидка по объёму`,
        percent: Number(pricing.automaticDiscountPercent || 0),
        note: pricing.levelName ? `Условие: ${pricing.levelName}.` : "Автоматически выбрана более выгодная объёмная цена."
      });
      rowCount += 1;
    });

    const edgeSelections = result?.edge?.mode === "attached"
      ? (result.edge.positionSettings || []).map((item) => item.selection).filter(Boolean)
      : result?.edge ? [result.edge] : [];
    const edgeSeen = new Set();
    edgeSelections.forEach((selection) => {
      if (!selection?.stockProgram || selection.conditionSource !== "volume" || !Number.isFinite(selection.pricePerRunningM)) return;
      const key = `${selection.catalogItemId || selection.name}|${selection.widthMm}|${selection.conditionId}`;
      if (edgeSeen.has(key)) return;
      edgeSeen.add(key);
      const edgeDiscountPercent = Number.isFinite(selection.retailPricePerRunningM) && selection.retailPricePerRunningM > 0
        ? Math.max((1 - selection.pricePerRunningM / selection.retailPricePerRunningM) * 100, 0)
        : 0;
      renderPriceAdjustmentControl({
        name: "Кромка — скидка по объёму",
        percent: edgeDiscountPercent,
        note: `Суммарный объём заказа: ${round(selection.orderRunningM || result.edge.orderRunningM || 0, 2)} пог. м.`
      });
      rowCount += 1;
    });

    if (result?.mixMatchVeneerPricing?.applies) {
      const mixMatch = result.mixMatchVeneerPricing;
      renderAreaAdjustmentControl({
        id: mixMatch.overrideId || "mixmatch:actualVeneerAreaM2",
        name: "Для MixMatch заложено",
        automaticArea: mixMatch.recommendedAreaM2,
        area: mixMatch.actualVeneerAreaM2,
        note: `Ориентир по ${mixMatch.minimumPacks || 3} пачкам — около ${round(mixMatch.defaultAreaM2 || mixMatch.recommendedAreaM2, 2)} м². Значение можно скорректировать вручную.`
      });
      rowCount += 1;
    }

    (result?.veneerConsumptions || []).forEach((consumption) => {
      if (consumption.mixMatchControlled) return;
      renderVeneerWasteAdjustmentControl(consumption);
      rowCount += 1;
    });

    const thickWork = result?.thickVeneerWorkAdjustment;
    if (thickWork?.applies && (result.itemResults||[]).some(item=>isExactFinishedDetail(item)&&!manufacturingCostFromProduction(item)&&!(item.productionCost?.status==='provided'&&item.productionCost.coveredReasons.includes('Работа с толстым шпоном')))) {
      const note = Number.isFinite(thickWork.automaticCoefficient)
        ? `Авто по стандартным ставкам: ${money(thickWork.thickRatePerM2)}/м² ÷ ${money(thickWork.baselineRatePerM2)}/м² = × ${round(thickWork.automaticCoefficient, 4)}`
        : "Нет пары стандартных ставок 0,6 мм / 1,5 мм+ для этой основы, толщины и количества сторон.";
      renderCoefficientAdjustmentControl({
        id: thickWork.id,
        name: "Коэффициент работы с толстым лицевым шпоном",
        automaticCoefficient: thickWork.automaticCoefficient,
        coefficient: thickWork.actualCoefficient,
        note
      });
      rowCount += 1;
    }

    form.priceAdjustmentsBlock.classList.toggle("is-hidden", rowCount === 0);
  }

  function renderTechOperations(result) {
    if (!result?.techOperations) return;
    const tech = result.techOperations;
    form.techVeneeringSummary.textContent = tech.readyShirt
      ? `${tech.sides} ${tech.sides === 1 ? "сторона" : "стороны"} · готовая рубашка: набор не требуется, приклеивание / прессование — стоимость производства`
      : `${tech.sides} ${tech.sides === 1 ? "сторона" : "стороны"}`;
    form.techSandingSummary.textContent = tech.sandingProductionArea > 0
      ? `В составе производства: ${round(tech.sandingProductionArea, 2)} м²${tech.sandingCalculatedArea > 0 ? ` · отдельно рассчитано ${round(tech.sandingCalculatedArea, 2)} м²` : ""}`
      : tech.sandingPricingStatus === "included_in_panel_price"
      ? "Первичная шлифовка · учтена в стоимости панели"
      : tech.sandingPricingStatus === "calculated_and_included"
        ? `${tech.sides} ${tech.sides === 1 ? "сторона" : "стороны"} · ${money(tech.sandingRatePerM2)}/м² для изготавливаемых позиций · для складских учтена в стоимости панели`
        : tech.sandingPricingStatus === "calculated"
          ? `${tech.sides} ${tech.sides === 1 ? "сторона" : "стороны"} · ${money(tech.sandingRatePerM2)}/м²`
          : "Не требуется";
    form.techCuttingSummary.textContent = tech.cuttingMeters > 0
      ? tech.cuttingPricingStatus === "pending_production"
        ? `${round(tech.cuttingMeters, 2)} пог. м · стоимость в составе производства`
        : `${round(tech.cuttingMeters, 2)} пог. м${tech.cuttingCost > 0 ? ` · ${money(tech.cuttingCost)}` : ""}`
      : "Не требуется";

    form.techGluingRow.classList.toggle("is-hidden", !tech.gluing);
    if (tech.gluing) {
      form.techGluingSummary.textContent = tech.gluingIncludedInBaseRate
        ? `${baseThicknessDisplay(result.thickness)} · учтена в ставке основы + работа`
        : `${baseThicknessDisplay(result.thickness)} · ${tech.gluingPricingStatus === "included_and_pending_production" ? "частично учтена в ставках; остальные позиции — стоимость производства" : "стоимость в составе производства"}`;
    }

    form.techCalibrationRow.classList.toggle("is-hidden", !tech.calibration);
    if (tech.calibration) {
      const sourceText = Number.isFinite(tech.calibrationSourceBaseThicknessMm) ? String(tech.calibrationSourceBaseThicknessMm).replace(".", ",") : "—";
      const afterText = Number.isFinite(tech.baseThicknessAfterCalibrationMm) ? String(tech.baseThicknessAfterCalibrationMm).replace(".", ",") : "—";
      const depthText = Number.isFinite(tech.calibrationDepth) ? `съём ${String(tech.calibrationDepth).replace(".", ",")} мм` : "съём не рассчитан";
      const rateText = Number.isFinite(tech.calibrationRatePerM2) ? `${money(tech.calibrationRatePerM2)}/м²` : "ставка не рассчитана";
      const costText = Number.isFinite(tech.calibrationCost) ? money(tech.calibrationCost) : "стоимость не рассчитана";
      const finishedText = Number.isFinite(tech.calibrationFinishedProductThicknessMm)
        ? ` · итог изделия ${String(tech.calibrationFinishedProductThicknessMm).replace(".", ",")} мм`
        : "";
      form.techCalibrationSummary.textContent = `${tech.calibrationRequired ? "обязательна · " : ""}${sourceText} → ${afterText} мм · ${depthText} · ${rateText} · ${costText}${finishedText}`;
    }
  }

  function thickWorkCoefficientRequired(result) {
    if(!result?.thickVeneerWorkAdjustment?.applies||Number.isFinite(result.thickVeneerWorkAdjustment.actualCoefficient))return false;
    return (result.itemResults||[]).some(item=>isExactFinishedDetail(item)&&!manufacturingCostFromProduction(item)&&
      !item.productionCost?.coveredReasons.includes('Работа с толстым шпоном'));
  }
  function currentBlockingValidationIssues(result = lastCalculation) {
    const issues = [];
    const add = (key, label, control, message, errorNode = null, kind = "field") => {
      issues.push({ key, label, control, message, errorNode, kind });
    };

    if (window.WoodstockPanelsView?.positionPricing && result?.positionPricingReconciled === false) {
      add("positionPricing", "согласованную стоимость позиций", form.sizeRows, "Рассчитанные суммы позиций не согласованы с итогом. Проверьте расчёт.", form.sizeBlockError, "sizeBlock");
    }
    const base = result?.base || selectedBase();
    const thickness = result?.thickness || parseThicknessComposition(currentBaseThicknessRaw());
    if (!base) {
      add("base", "основу", form.baseSelect, "Выберите основу.");
    } else if (!Number.isFinite(thickness?.total)) {
      add("baseThickness", "толщину основы", form.baseThicknessSelect, "Выберите толщину основы.");
    } else if (["plywood_water", "blockboard"].includes(base.id)) {
      const selectedThicknessKey = normalizeThicknessKey(currentBaseThicknessRaw());
      const allowedThickness = baseThicknessOptions(base).some((value) => normalizeThicknessKey(value) === selectedThicknessKey);
      if (!allowedThickness) {
        add("baseThickness", "доступную толщину основы", form.baseThicknessSelect,
          base.id === "blockboard" ? "Выберите доступную толщину столярной плиты из справочника." : "Выберите доступную толщину влагостойкой фанеры из справочника.");
      }
    }

    if (window.WoodstockPanelsView?.baseSelectable?.(base) === false) {
      add("base", "МДФ или ДСП", form.baseSelect, "Для краткого расчёта выберите МДФ или ДСП.");
    }
    if (window.WoodstockPanelsView?.thicknesses && base && !baseThicknessOptions(base).some(value => normalizeThicknessKey(value) === normalizeThicknessKey(currentBaseThicknessRaw()))) {
      add("baseThickness", "толщину с автоматической ценой", form.baseThicknessSelect, "Выберите толщину с подтверждённой автоматической ценой.");
    }

    const veneerType = form.veneerTypeSelect.value;
    const readyShirtSelected = veneerType === "ready_shirt";
    if (!veneerType) {
      add("veneerType", "тип материала", form.veneerTypeSelect, "Выберите тип материала.");
    }

    if (veneerType) {
      const groupMatchesType = Boolean(selectedVeneerAGroup && materialTypeOf(selectedVeneerAGroup) === veneerType);
      if (!groupMatchesType) {
        add("veneerA", readyShirtSelected ? "готовую рубашку" : "наименование шпона", form.veneerAInput,
          readyShirtSelected ? "Выберите готовую рубашку из справочника." : "Выберите точное наименование шпона из справочника.", form.veneerAError);
      } else if (!readyShirtSelected) {
        const faceThickness = selectedVeneerThickness();
        const thicknessValid = Number.isFinite(faceThickness) && veneerVariantsAtThickness(selectedVeneerAGroup, faceThickness).length > 0;
        if (!thicknessValid) {
          add("veneerThickness", "толщину лицевого шпона", form.veneerThicknessSelect, "Выберите доступную толщину лицевого шпона.", form.veneerThicknessError);
        }
      }
    }

    const sides = Number(form.veneeredSidesSelect.value);
    const veneerThickness = selectedVeneerThickness();
    if (requiresTwoFaceSides(veneerThickness) && sides !== 2) {
      add("veneeredSides", "две фанерованные стороны", form.veneeredSidesSelect, twoSidedVeneerRequirementMessage());
    }

    if (sides === 2 && form.veneerBModeSelect.value === "other") {
      const sideBMaterial = selectedVeneerB || selectedVeneerBGroup;
      if (isReadyShirt(selectedVeneerA || selectedVeneerAGroup) && !Number.isFinite(veneerThickness)) {
        add("veneerB", "материал стороны Б", form.veneerBInput, "Для выбора другого материала необходимо указать подтверждённую толщину готовой рубашки.", form.veneerBError);
      } else if (!sideBMaterial || !sameConfirmedThickness(veneerThickness, itemThickness(sideBMaterial))) {
        add("veneerB", "материал стороны Б той же толщины", form.veneerBInput, "Для второй стороны выберите материал той же толщины.", form.veneerBError);
      }
    }

    if (sides === 2 && form.veneerBModeSelect.value === "rough") {
      const roughThickness = selectedRoughBackThickness();
      if (!isExactlyOnePointFive(veneerThickness)) {
        add("veneerBMode", "допустимый материал стороны Б", form.veneerBModeSelect, "Черновой шпон на второй стороне разрешён только для лицевого шпона 1,5 мм.", form.veneerBModeHint);
      } else if (!Number.isFinite(roughThickness) || roughThickness > 1.5 + 0.001) {
        add("veneerBRoughThickness", "толщину чернового шпона стороны Б", form.veneerBRoughThicknessSelect, "Выберите подтверждённую толщину чернового шпона стороны Б до 1,5 мм включительно.");
      }
    }

    if (needsLayoutSelection()) {
      const rawLayout = form.layoutSelect.value;
      if (!rawLayout) {
        add("layout", "раскладку шпона", form.layoutSelect, "Выберите раскладку шпона.", form.layoutError);
      } else if (!isLayoutAllowedForType(rawLayout)) {
        add("layout", "допустимую раскладку шпона", form.layoutSelect, "Выбранная раскладка недоступна для мультишпона.", form.layoutError);
      } else if (layoutNeedsTz(rawLayout) && !layoutHasDescriptionOrFile()) {
        add("layoutTz", "описание или файл раскладки", form.layoutTzComment, "Добавьте описание раскладки или приложите файл.", form.layoutTzError, "layoutTz");
      } else if (result?.layoutValidation && !result.layoutValidation.valid && result.layoutValidation.error) {
        add("layout", "корректную раскладку", form.layoutSelect, result.layoutValidation.error, form.layoutError);
      }
    }

    if (window.WoodstockPanelsView?.priceSensitivePatterns) {
      [["A",form.veneerCutField,form.veneerCutSelect,form.veneerCutError], ["B",form.veneerBCutField,form.veneerBCutSelect,form.veneerBCutError]].forEach(([side,field,select,error]) => {
        if (!field.classList.contains("is-hidden") && !select.value && (side === "A" || Number(form.veneeredSidesSelect.value) === 2 && form.veneerBModeSelect.value === "other"))
          add("pattern"+side, "тип рисунка стороны "+side, select, "Выберите тип рисунка шпона.", error);
      });
    }

    const calibrationRequired = calibrationRequiredForBase(base);
    if (calibrationRequired && form.calibrationSelect.value !== "yes") {
      add("calibration", "калибровку основы", form.calibrationSelect, `Для ${String(base?.name || "выбранной основы").toLocaleLowerCase("ru")} калибровка обязательна.`);
    }
    const calibration = calibrationState(base);
    if (!window.WoodstockPanelsView?.automaticOperations && calibration.enabled && !Number.isFinite(calibration.baseThicknessAfterCalibrationMm)) {
      add("calibrationTarget", "толщину после калибровки", form.calibrationTargetInput, "Укажите толщину основы после калибровки.", form.calibrationTargetError);
    } else if (!window.WoodstockPanelsView?.automaticOperations && calibration.enabled && !calibration.valid) {
      add("calibrationTarget", "толщину после калибровки", form.calibrationTargetInput, "Толщина основы после калибровки должна быть меньше исходной толщины основы.", form.calibrationTargetError);
    }

    if (!result?.validSizes?.length) {
      add("sizes", "хотя бы один заполненный размер", form.addSizeRowBtn, "Не добавлен ни один заполненный размер.", form.sizeBlockError, "sizeBlock");
    }
    if (result?.sizeValidation && !result.sizeValidation.valid) {
      add("sizeValidation", "корректные параметры размера", form.sizeRows, result.sizeValidation.error || "Проверьте размеры и количество.", form.sizeBlockError, "sizeBlock");
    }

    const invalidVeneerConsumption = (result?.veneerConsumptions || []).find((consumption) => !consumption.valid);
    if (invalidVeneerConsumption) {
      add(`veneerActual:${invalidVeneerConsumption.id || invalidVeneerConsumption.materialId || "current"}`, "фактическое количество шпона", form.priceAdjustmentsBlock,
        invalidVeneerConsumption.validationError || "Укажите фактическое количество шпона.", null, "block");
    }

    if (thickWorkCoefficientRequired(result)) {
      add("thickVeneerWork", "коэффициент работы с толстым шпоном", form.priceAdjustmentsBlock,
        "Для точного размера со шпоном от 1,5 мм укажите коэффициент работы с толстым шпоном вручную.", null, "block");
    }

    if (!manualDiscountInputValid()) {
      add("manualDiscount", "ручную скидку от 0 до 10%", form.manualDiscountInput, manualDiscountValidationMessage(), form.manualDiscountError);
    }

    const validSizesForFinish = result?.validSizes || [];
    const globalFinishUsed = validSizesForFinish.some((size) => effectiveFinishForSize(size).source === "global");
    if (globalFinishUsed) {
      const globalFinishValidation = finishValidationState(currentGlobalFinishConfig());
      globalFinishValidation.issues.forEach((issue) => {
        if (issue.field === "gloss") {
          add("finishGloss", "степень блеска", form.lacquerGlossSelect, issue.message, form.lacquerGlossError);
        } else if (issue.field === "process") {
          add("finishProcess", "технологическую схему лака", form.lacquerProcessSelect, issue.message, form.lacquerProcessError);
        } else if (issue.field === "enamel") {
          add("finishEnamel", "технологическую схему эмали", form.enamelVariantSelect, issue.message, form.enamelVariantError);
        }
      });
    }

    validSizesForFinish.forEach((size) => {
      const config = effectiveFinishForSize(size);
      if (config?.source !== "position") return;
      const validation = finishValidationState(config);
      if (validation.valid) return;
      const rowId = size.rowId;
      const card = $(`[data-position-finish-row="${rowId}"]`, form.positionFinishOverrides);
      validation.issues.forEach((issue) => {
        let control = form.positionFinishToggle;
        let errorNode = null;
        let keySuffix = issue.field;
        let label = `параметры финиша позиции ${size.position}`;
        if (card && issue.field === "gloss") {
          control = $('[data-position-lacquer-gloss]', card) || control;
          errorNode = $('[data-position-lacquer-gloss-error]', card);
          label = `степень блеска позиции ${size.position}`;
        } else if (card && issue.field === "process") {
          control = $('[data-position-lacquer-process]', card) || control;
          errorNode = $('[data-position-lacquer-process-error]', card);
          label = `технологическую схему лака позиции ${size.position}`;
        } else if (card && issue.field === "enamel") {
          control = $('[data-position-enamel-variant]', card) || control;
          errorNode = $('[data-position-enamel-error]', card);
          label = `технологическую схему эмали позиции ${size.position}`;
        }
        add(`positionFinish:${rowId}:${keySuffix}`, label, control, issue.message, errorNode);
      });
    });

    const edgeMode = form.edgeModeSelect.value;
    if (edgeMode !== "none" && result?.edge?.valid !== true) {
      const which = edgeMode === "separate" ? "separate" : "attached";
      const controls = edgeControls(which);
      const selection = edgeSelectionState(which);
      if (edgeMode === "attached" && !form.edgeSidesSelect.value) {
        add("edgeSides", "стороны кромления", form.edgeSidesSelect, "Выберите стороны кромления.");
      }
      if (!controls.typeSelect.value) {
        add(`${which}EdgeType`, "тип кромки", controls.typeSelect, "Выберите тип кромки.");
      }
      if (!controls.materialInput.value.trim()) {
        add(`${which}EdgeMaterial`, "наименование кромки", controls.materialInput, "Выберите или укажите шпон / наименование кромки.", controls.materialError);
      }
      const type = edgeTypeById(controls.typeSelect.value);
      if (type && type.thicknessMode !== "none" && !Number.isFinite(currentEdgeThickness(which))) {
        add(`${which}EdgeThickness`, "толщину кромки", controls.thicknessSelect, "Выберите толщину кромки.");
      }
      if (selection && !Number.isFinite(selection.widthMm)) {
        const widthControl = controls.orderWidthField?.classList.contains("is-hidden") ? controls.widthSelect : controls.orderWidthInput;
        add(`${which}EdgeWidth`, "ширину кромки", widthControl, "Выберите или укажите ширину кромки.");
      }
      if (edgeMode === "separate") {
        const meters = num(form.separateEdgeMetersInput.value);
        const minMeters = separateEdgeMinimumMeters();
        if (!Number.isFinite(meters) || meters <= 0) {
          add("separateEdgeMeters", "метраж отдельной кромки", form.separateEdgeMetersInput, "Укажите требуемый метраж отдельной кромки.", form.separateEdgeMetersError);
        } else if (isQuickStandardPanel() && meters < minMeters) {
          add("separateEdgeMeters", "метраж отдельной кромки", form.separateEdgeMetersInput, "Минимальный заказ кромки 50 пог. м", form.separateEdgeMetersError);
        }
      }
      if (edgeMode === "attached") {
        (result?.edge?.positionSettings || []).filter((item) => item.applies && !item.valid).forEach((item) => {
          const card = $(`[data-position-edge-row="${item.rowId}"]`, form.positionEdgeOverrides);
          const sidesControl = card ? $('[data-position-edge-sides]', card) : null;
          const thicknessControl = card ? $('[data-position-edge-thickness]', card) : null;
          if (!item.sidesId) {
            add(`positionEdge:${item.rowId}:sides`, `стороны кромления позиции ${item.position}`, sidesControl || form.positionEdgeToggle, "Выберите стороны кромления.", card ? $('[data-position-edge-sides-error]', card) : null);
          } else if (item.selection && !item.selection.valid) {
            const control = thicknessControl || sidesControl || form.positionEdgeToggle;
            add(`positionEdge:${item.rowId}:thickness`, `параметры кромки позиции ${item.position}`, control, item.selection.validationError || "Проверьте параметры кромки позиции.", card ? $('[data-position-edge-thickness-error]', card) : null);
          }
        });
      }
    }

    (result?.itemResults||[]).filter(item=>item.productionCost?.invalid).forEach(item=>{
      const input=item.row.querySelector('[data-size-production-price]');
      add(`productionCost:${item.rowId}`,`стоимость от производства позиции ${item.position}`,input,'Введите положительную сумму с точностью до копеек.',item.row.querySelector('[data-production-cost-error]'));
    });
    return issues;
  }

  function focusFirstValidationIssue(issue) {
    if (!issue) return;
    const target = issue.control?.closest?.(".field") || issue.control || form.root;
    target?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      if (issue.control?.focus && !issue.control.disabled) issue.control.focus({ preventScroll: true });
    }, 250);
  }

  function renderLocalValidation(result) {
    clearPatternTypeError("A");
    clearPatternTypeError("B");
    $$('[data-validation-error]', form.root).forEach((error) => {
      error.textContent = "";
      error.classList.add("is-hidden");
      error.closest(".field")?.classList.remove("field--invalid");
    });
    if (addAttempted) {
      setControlError(form.veneerAInput, "veneerA", "", form.veneerAError);
      setControlError(form.veneerBInput, "veneerB", "", form.veneerBError);
      setSeparateEdgeMetersError("");
      setAutocompleteError(form.edgeMaterialInput, form.edgeMaterialError, "");
      setAutocompleteError(form.separateEdgeMaterialInput, form.separateEdgeMaterialError, "");
      if (form.veneerBModeHint) form.veneerBModeHint.textContent = "";
    }

    if (window.WoodstockPanelsView?.positionPricing && result?.positionPricingReconciled === false) {
      add("positionPricing", "согласованную стоимость позиций", form.sizeRows, "Рассчитанные суммы позиций не согласованы с итогом. Проверьте расчёт.", form.sizeBlockError, "sizeBlock");
    }
    const base = result?.base || selectedBase();
    const rawLayout = form.layoutSelect.value;
    const layoutRequired = needsLayoutSelection();
    const layoutInvalid = layoutRequired && Boolean(rawLayout) && !isLayoutAllowedForType(rawLayout);
    const layoutMessage = layoutInvalid && shouldShowError("layout", true)
      ? "Выбранная раскладка недоступна для мультишпона."
      : addAttempted && layoutRequired && !rawLayout
        ? "Выберите раскладку шпона."
        : "";

    setControlError(form.baseSelect, "base", "");
    setControlError(form.baseThicknessSelect, "baseThickness", "");
    setControlError(form.veneerTypeSelect, "veneerType", "");
    if (!addAttempted) {
      const aRaw = form.veneerAInput.value.trim();
      const aValid = Boolean(selectedVeneerAGroup && materialTypeOf(selectedVeneerAGroup) === form.veneerTypeSelect.value);
      setControlError(form.veneerAInput, "veneerA", !aValid && aRaw && touchedFields.has("veneerA") ? "Выберите точное наименование из справочника." : "", form.veneerAError);
      const otherB = Number(form.veneeredSidesSelect.value) === 2 && form.veneerBModeSelect.value === "other";
      const bRaw = form.veneerBInput.value.trim();
      setControlError(form.veneerBInput, "veneerB", otherB && bRaw && !selectedVeneerBGroup && touchedFields.has("veneerB") ? "Выберите точное наименование из справочника." : "", form.veneerBError);
    }
    setControlError(form.layoutSelect, "layout", layoutMessage, form.layoutError);

    const manualDiscountInvalid = manualDiscountAvailable() && !manualDiscountInputValid();
    const manualDiscountShowError = manualDiscountInvalid && (addAttempted || touchedFields.has("manualDiscount"));
    form.manualDiscountError.textContent = manualDiscountShowError ? manualDiscountValidationMessage() : "";
    form.manualDiscountField.classList.toggle("field--invalid", manualDiscountShowError);
    form.manualDiscountInput.setAttribute("aria-invalid", manualDiscountShowError ? "true" : "false");

    const globalFinishUsedForValidation = (result?.validSizes || []).some((size) => effectiveFinishForSize(size).source === "global");
    const globalFinishValidation = globalFinishUsedForValidation
      ? finishValidationState(currentGlobalFinishConfig())
      : { valid: true, issues: [] };
    const globalFinishIssues = new Map(globalFinishValidation.issues.map((issue) => [issue.field, issue.message]));
    setControlError(
      form.lacquerGlossSelect,
      "finishGloss",
      globalFinishIssues.has("gloss") && (addAttempted || touchedFields.has("finishGloss")) ? globalFinishIssues.get("gloss") : "",
      form.lacquerGlossError
    );
    setControlError(
      form.lacquerProcessSelect,
      "finishProcess",
      globalFinishIssues.has("process") && (addAttempted || touchedFields.has("finishProcess")) ? globalFinishIssues.get("process") : "",
      form.lacquerProcessError
    );
    setControlError(
      form.enamelVariantSelect,
      "finishEnamel",
      globalFinishIssues.has("enamel") && (addAttempted || touchedFields.has("finishEnamel")) ? globalFinishIssues.get("enamel") : "",
      form.enamelVariantError
    );

    const invalidPositionFinishExists = (result?.validSizes || []).some((size) => {
      const config = effectiveFinishForSize(size);
      return config?.source === "position" && !finishValidationState(config).valid;
    });
    if (addAttempted && invalidPositionFinishExists && !positionFinishOverridesEnabled) {
      positionFinishOverridesEnabled = true;
      form.positionFinishToggle?.setAttribute("aria-expanded", "true");
      if (form.positionFinishToggle) form.positionFinishToggle.textContent = "Скрыть настройки по позициям";
      form.positionFinishOverrides?.classList.remove("is-hidden");
      renderPositionFinishOverrides(false);
    }
    if (positionFinishOverridesEnabled) {
      (result?.validSizes || []).forEach((size) => {
        const config = effectiveFinishForSize(size);
        if (config?.source !== "position") return;
        const validation = finishValidationState(config);
        const issueMap = new Map(validation.issues.map((issue) => [issue.field, issue.message]));
        const card = $(`[data-position-finish-row="${size.rowId}"]`, form.positionFinishOverrides);
        if (!card) return;
        const glossKey = `positionFinish:${size.rowId}:gloss`;
        const processKey = `positionFinish:${size.rowId}:process`;
        const enamelKey = `positionFinish:${size.rowId}:enamel`;
        setControlError(
          $('[data-position-lacquer-gloss]', card),
          glossKey,
          issueMap.has("gloss") && (addAttempted || touchedFields.has(glossKey)) ? issueMap.get("gloss") : "",
          $('[data-position-lacquer-gloss-error]', card)
        );
        setControlError(
          $('[data-position-lacquer-process]', card),
          processKey,
          issueMap.has("process") && (addAttempted || touchedFields.has(processKey)) ? issueMap.get("process") : "",
          $('[data-position-lacquer-process-error]', card)
        );
        setControlError(
          $('[data-position-enamel-variant]', card),
          enamelKey,
          issueMap.has("enamel") && (addAttempted || touchedFields.has(enamelKey)) ? issueMap.get("enamel") : "",
          $('[data-position-enamel-error]', card)
        );
      });
    }

    const calibration = calibrationState(base);
    const calibrationInvalid = !window.WoodstockPanelsView?.automaticOperations && calibration.enabled && !calibration.valid;
    const calibrationTouched = touchedFields.has("calibrationTarget");
    const calibrationTargetMissing = !window.WoodstockPanelsView?.automaticOperations && calibration.enabled && !Number.isFinite(calibration.baseThicknessAfterCalibrationMm);
    const calibrationMessage = calibrationTargetMissing && (addAttempted || calibrationTouched)
      ? "Укажите толщину основы после калибровки."
      : calibrationInvalid && (addAttempted || calibrationTouched)
        ? "Толщина основы после калибровки должна быть меньше исходной толщины основы."
        : "";
    setControlError(form.calibrationTargetInput, "calibrationTarget", calibrationMessage, form.calibrationTargetError);
    if (form.calibrationDepthError) form.calibrationDepthError.textContent = "";

    if (form.sizeBlockError) {
      const hasValidSize = Boolean(result?.validSizes?.length);
      const message = addAttempted && (!hasValidSize || (result?.sizeValidation && !result.sizeValidation.valid))
        ? (result?.sizeValidation && !result.sizeValidation.valid ? result.sizeValidation.error : "Не добавлен ни один заполненный размер.")
        : "";
      form.sizeBlockError.textContent = message;
      form.sizeBlockError.classList.toggle("is-hidden", !message);
    }

    const tzInvalid = layoutRequired && layoutNeedsTz(rawLayout) && !layoutHasDescriptionOrFile();
    setLayoutTzError(tzInvalid && (addAttempted || touchedFields.has("layoutTz")));

    if (form.edgeModeSelect.value === "attached") {
      const invalidPositionEdges = (result?.edge?.positionSettings || []).filter((item) => item.applies && !item.valid);
      if (addAttempted && invalidPositionEdges.length && !positionEdgeOverridesEnabled) {
        positionEdgeOverridesEnabled = true;
        form.positionEdgeToggle?.setAttribute("aria-expanded", "true");
        if (form.positionEdgeToggle) form.positionEdgeToggle.textContent = "Скрыть настройки кромки по позициям";
        form.positionEdgeOverrides?.classList.remove("is-hidden");
        renderPositionEdgeOverrides(false);
      }
      invalidPositionEdges.forEach((item) => {
        const card = $(`[data-position-edge-row="${item.rowId}"]`, form.positionEdgeOverrides);
        if (!card) return;
        if (!item.sidesId) {
          const control = $('[data-position-edge-sides]', card);
          const error = $('[data-position-edge-sides-error]', card);
          const key = `positionEdge:${item.rowId}:sides`;
          setControlError(control, key, shouldShowError(key, true) ? "Выберите стороны кромления." : "", error);
        } else if (item.selection && !item.selection.valid) {
          const control = $('[data-position-edge-thickness]', card) || $('[data-position-edge-sides]', card);
          const error = $('[data-position-edge-thickness-error]', card);
          const key = `positionEdge:${item.rowId}:thickness`;
          setControlError(control, key, shouldShowError(key, true) ? item.selection.validationError : "", error);
        }
      });
    }

    if (addAttempted) {
      const issues = currentBlockingValidationIssues(result);
      issues.forEach((issue) => {
        if (issue.kind === "sizeBlock") {
          if (form.sizeBlockError) {
            form.sizeBlockError.textContent = issue.message;
            form.sizeBlockError.classList.remove("is-hidden");
          }
          return;
        }
        if (issue.kind === "layoutTz") {
          setLayoutTzError(true);
          return;
        }
        if (issue.kind === "block") return;
        setControlError(issue.control, issue.key, issue.message, issue.errorNode);
      });
      const labels = [...new Set(issues.map((issue) => issue.label).filter(Boolean))];
      form.saveStatus.textContent = issues.length
        ? `Заполните обязательные поля расчёта: ${labels.join(", ")}.`
        : "";
    }
  }

  function currentVeneerDemandSignature() {
    const rows = readSizeRows().map((size) => ({
      mode: size.mode || "",
      sizeInputMode: size.sizeInputMode || size.mode || "",
      manufacturingType: manufacturingTypeForSize(size),
      length: Number.isFinite(size.length) ? size.length : null,
      width: Number.isFinite(size.width) ? size.width : null,
      quantity: Number.isFinite(size.quantity) ? size.quantity : null,
      resultMode: size.resultMode || "",
      standardOrderType: size.standardOrderType || ""
    }));
    const sideAMaterial = selectedVeneerA || selectedVeneerAGroup;
    const sideBMaterial = selectedVeneerB || selectedVeneerBGroup;
    return JSON.stringify({
      baseId: selectedBase()?.id || "",
      baseThickness: normalizeThicknessKey(currentBaseThicknessRaw()),
      veneerType: selectedMaterialType(),
      veneerThickness: selectedVeneerThickness(),
      veneerA: sideAMaterial?.id || veneerDisplayName(sideAMaterial) || "",
      veneerCutA: form.veneerCutSelect?.value || "",
      sides: Number(form.veneeredSidesSelect?.value) || 0,
      reverseSide: form.reverseSideSelect?.value || "",
      veneerBMode: form.veneerBModeSelect?.value || "",
      veneerB: sideBMaterial?.id || veneerDisplayName(sideBMaterial) || "",
      veneerCutB: form.veneerBCutSelect?.value || "",
      roughBackThickness: form.veneerBRoughThicknessSelect?.value || "",
      layout: effectiveLayoutId(),
      layoutB: effectiveLayoutBId(),
      sanding: sandingEnabled(),
      rows
    });
  }

  function syncVeneerActualOverridesWithDemand() {
    const signature = currentVeneerDemandSignature();
    if (veneerDemandSignatureState && signature !== veneerDemandSignatureState) {
      clearPriceOverrides("veneer-actual:");
      clearTouchedPrefix("veneerActual:");
    }
    veneerDemandSignatureState = signature;
  }

  function calculationBlockingMessage(result) {
    if (!result) return "Расчёт не завершён";
    if (result.sizeValidation && !result.sizeValidation.valid && result.sizeValidation.error) {
      return `Цена не рассчитана: ${result.sizeValidation.error}`;
    }
    if (result.layoutValidation && !result.layoutValidation.valid && result.layoutValidation.error) {
      return `Цена не рассчитана: ${result.layoutValidation.error}`;
    }
    if (result.edge && result.edge.valid === false && result.edge.validationError) {
      return `Цена не рассчитана: ${result.edge.validationError}`;
    }
    if (result.edge?.materialPricingStatus === "pending_order_price") {
      return result.edge?.orderPosition ? "Требуется согласование цены заказной кромки. Метраж рассчитан; итог неполный." : "Цена не рассчитана: для выбранной кромки нет подтверждённой прайсовой цены.";
    }
    if (result.edge?.materialPricingStatus === "pending_condition_price") {
      return "Цена не рассчитана: для выбранной складской кромки отсутствует цена для выбранной ширины / условия.";
    }
    if (result.edge?.operationPricingStatus === "missing_tariff") {
      return "Цена не рассчитана: для выбранного кромления отсутствует подтверждённый тариф операции.";
    }

    const blockingWarning = (result.warnings || []).find((warning) => /(?:нет подтвержден|нет подтверждён|цена .*не найден|стоимость .*не включ|требует отдельного подтверждения|оставлен на согласование|укажите|выберите|недоступн|не хватает|не задана? ставка|не задан тариф)/i.test(String(warning || "")));
    return blockingWarning ? `Цена не рассчитана: ${blockingWarning}` : "Расчёт не завершён";
  }

  function syncQuickWallEdge() {
    if (!isQuickWallPanel()) return;
    // Existing KM1 certificate handling remains authoritative for GSP.
    if (selectedBase()?.id === "gsp") return;
    form.edgeModeSelect.value = "attached";
    form.edgeBevelSelect.value = "no";
    edgeWidthAutomatic.attached = true;
    const typeId = Math.abs(num(form.edgeThicknessSelect.value) - 0.6) < 0.001 ? "vl_s" : "thick";
    if (form.edgeTypeSelect.value !== typeId) {
      form.edgeTypeSelect.value = typeId;
      clearEdgeCatalogBinding("attached");
      syncEdgeThicknessOptions("attached", { preserve: true });
      syncEdgeDefaultForKind("attached");
    }
  }

  function recalc() {
    syncQuickWallBack();
    syncQuickPaperBack();
    syncQuickWallEdge();
    if (isQuickStandardPanel()) edgeWidthAutomatic.separate = true;
    syncEdgeWidthOptions("attached", { preserve: true });
    syncEdgeWidthOptions("separate", { preserve: true });
    syncSeparateEdgeMeters();
    updateBaseProductionCostHint();
    updateThicknessWarnings();
    const edgeModeChangedByAvailability = updateAttachedEdgeAvailability();
    syncPositionEdgeStateWithRows();
    if (edgeModeChangedByAvailability || isQuickWallPanel()) syncEdgeModeFields();
    if (form.edgeModeSelect.value === "attached" && positionEdgeOverridesEnabled) renderPositionEdgeOverrides();
    syncVeneerActualOverridesWithDemand();
    lastCalculation = calculate();
    if (!lastCalculation) {
      renderLocalValidation(null);
      if (window.WoodstockPanelsView?.changed) window.WoodstockPanelsView.changed(null);
      return;
    }
    renderLocalValidation(lastCalculation);
    const showEdgeMeters = form.edgeModeSelect.value === "attached" && lastCalculation.attachedEdgeMeters > 0;
    form.attachedEdgeMetersSummary.classList.toggle("is-hidden", !showEdgeMeters && !isQuickWallPanel());
    form.attachedEdgeMetersSummary.textContent = showEdgeMeters ? `По торцам: ${round(lastCalculation.edge.geometricMeters, 2)} пог. м · с запасом 20%: ${round(lastCalculation.edge.calculatedMeters, 2)} пог. м` : isQuickWallPanel() ? "—" : "";
    const edgeCostSummary = el(lastCalculation.edge.mode === "attached" ? "edgeCostSummary" : "separateEdgeCostSummary");
    if (edgeCostSummary) {
      const edge = lastCalculation.edge;
      const materialKnown = ["calculated", "calculated_manual_order_price", "not_required"].includes(edge.materialPricingStatus);
      const material = materialKnown && Number.isFinite(edge.materialCost) ? money(edge.materialCost) : edge.valid === false ? "заполните параметры кромки" : "цена по согласованию";
      const workKnown = ["calculated", "not_required"].includes(edge.operationPricingStatus);
      const operation = edge.mode === "attached" ? ` · Кромление: ${workKnown && Number.isFinite(edge.operationCost) ? money(edge.operationCost) : edge.valid === false ? "заполните параметры кромки" : "запрос производства"}` : "";
      edgeCostSummary.textContent = `Материал: ${material}${operation}`;
    }
    const condition = form.clientConditionSelect.value || "retail";
    const manualDiscountVisible = false;
    form.manualDiscountField.classList.toggle("is-hidden", true);
    if (!manualDiscountVisible) {
      form.manualDiscountError.textContent = "";
      form.manualDiscountField.classList.remove("field--invalid");
      form.manualDiscountInput.setAttribute("aria-invalid", "false");
    }
    const conditionNotes = [];
    if (condition !== "retail") {
      const calculatedBaseRows = lastCalculation.baseRatePricings || [];
      if (calculatedBaseRows.some((pricing) => !pricing.conditionFound)) {
        conditionNotes.push("Для части основы/работ в текущих прайсовых данных нет отдельной цены или скидки по выбранному условию; такие компоненты оставлены без автоматически придуманной скидки.");
      }
      if (lastCalculation.requiresProductionCost) {
        conditionNotes.push("Общая стоимость производства не изменяется по условию клиента внутри подробного расчёта; она обрабатывается отдельно на общей странице.");
      }
    }
    form.clientConditionNote.textContent = conditionNotes.join(" ");
    form.clientConditionNote.classList.toggle("is-hidden", conditionNotes.length === 0);
    setRowStatus(lastCalculation); renderTechOperations(lastCalculation); renderSpec(lastCalculation); renderPriceAdjustments(lastCalculation);
    if (lastCalculation.priceCalculationComplete) {
      form.retailPriceValue.textContent = Number.isFinite(lastCalculation.retailAvgM2) ? money(lastCalculation.retailAvgM2) : "—";
      form.finalPriceValue.textContent = Number.isFinite(lastCalculation.avgM2) ? money(lastCalculation.avgM2) : "—";
      form.finalPriceNote.textContent = lastCalculation.manualDiscountApplied
        ? `Ручная скидка ${round(lastCalculation.manualDiscountPercent, 1)}% применена к розничной цене.`
        : "";
    } else if (lastCalculation.requiresProductionCost) {
      form.retailPriceValue.textContent = "—";
      form.finalPriceValue.textContent = "Требуется стоимость производства";
      form.finalPriceNote.textContent = "Окончательная стоимость определяется на общей странице спецификации.";
    } else {
      form.retailPriceValue.textContent = "—";
      form.finalPriceValue.textContent = "—";
      form.finalPriceNote.textContent = calculationBlockingMessage(lastCalculation);
    }
    updateVeneerLayoutWarnings(lastCalculation);
    if (window.WoodstockPanelsView?.changed) window.WoodstockPanelsView.changed(lastCalculation);
  }

  function updateFinishUI() {
    const finishId = form.finishSelect.value || "none";
    const active = finishUsesSides(finishId);
    const lacquer = isLacquerFinish(finishId);
    const enamel = finishId === "enamel";
    syncGlobalFinishSidesWithVeneer();

    updateLacquerExecutionOptions();
    const gloss100 = lacquer && form.lacquerExecutionSelect?.value === GLOSS_100_EXECUTION;
    const acrylic = isAcrylicLacquer(finishId) && !gloss100;

    if (!lacquer) {
      if (form.toningSelect) form.toningSelect.value = "no";
      if (form.isolatorSelect) form.isolatorSelect.value = "no";
      if (form.lacquerExecutionSelect) form.lacquerExecutionSelect.value = STANDARD_LACQUER_EXECUTION;
      if (form.lacquerGlossSelect) form.lacquerGlossSelect.value = "";
      if (form.lacquerProcessSelect) form.lacquerProcessSelect.value = "";
    } else if (gloss100) {
      if (form.lacquerGlossSelect) form.lacquerGlossSelect.value = "";
      if (form.lacquerProcessSelect) form.lacquerProcessSelect.value = "";
    } else if (!isAcrylicLacquer(finishId) && form.lacquerProcessSelect) {
      form.lacquerProcessSelect.value = "";
    }

    if (!enamel && form.enamelVariantSelect) form.enamelVariantSelect.value = "";

    form.finishParameterFields.classList.toggle("is-hidden", !active);
    form.lacquerParameterFields.classList.toggle("is-hidden", !lacquer);
    form.enamelParameterFields.classList.toggle("is-hidden", !enamel);
    form.finishCommonFields.classList.toggle("is-hidden", !active);
    form.lacquerExtraFields?.classList.toggle("is-hidden", !lacquer);
    form.lacquerExecutionField?.classList.toggle("is-hidden", !lacquer);
    form.lacquerGlossField?.classList.toggle("is-hidden", !lacquer || gloss100);
    form.lacquerProcessField?.classList.toggle("is-hidden", !acrylic);

    updateLacquerGlossOptions();
    updateLacquerProcessOptions();
    updateEnamelVariantOptions();
    recalc();
  }

  function updateLacquerExecutionOptions() {
    if (!form.lacquerExecutionSelect) return;
    const current = form.lacquerExecutionSelect.value || STANDARD_LACQUER_EXECUTION;
    form.lacquerExecutionSelect.innerHTML = "";
    lacquerExecutionOptions().forEach((item) => form.lacquerExecutionSelect.add(new Option(item.name, item.id)));
    form.lacquerExecutionSelect.value = lacquerExecutionExists(current) ? current : STANDARD_LACQUER_EXECUTION;
  }

  function updateLacquerGlossOptions() {
    if (!form.lacquerGlossSelect) return;
    const finishId = form.finishSelect.value || "none";
    const gloss100 = isLacquerFinish(finishId) && form.lacquerExecutionSelect?.value === GLOSS_100_EXECUTION;
    const options = gloss100 ? [] : lacquerGlossOptions(finishId);
    const current = form.lacquerGlossSelect.value;
    form.lacquerGlossSelect.innerHTML = "";
    if (options.length) form.lacquerGlossSelect.add(new Option("Выберите степень блеска", ""));
    options.forEach((value) => form.lacquerGlossSelect.add(new Option(value, value)));
    if (options.includes(current)) form.lacquerGlossSelect.value = current;
    else form.lacquerGlossSelect.value = "";
  }

  function updateLacquerProcessOptions() {
    if (!form.lacquerProcessSelect) return;
    const acrylic = isAcrylicLacquer(form.finishSelect.value);
    const gloss100 = acrylic && form.lacquerExecutionSelect?.value === GLOSS_100_EXECUTION;
    if (!acrylic || gloss100) {
      form.lacquerProcessSelect.innerHTML = "";
      form.lacquerProcessSelect.value = "";
      return;
    }
    const current = form.lacquerProcessSelect.value;
    const options = availableLacquerProcesses(form.finishSidesSelect.value);
    form.lacquerProcessSelect.innerHTML = "";
    form.lacquerProcessSelect.add(new Option("Выберите технологическую схему", ""));
    options.forEach((item) => form.lacquerProcessSelect.add(new Option(item.name, item.id)));
    if (options.some((item) => item.id === current)) form.lacquerProcessSelect.value = current;
    else form.lacquerProcessSelect.value = "";
  }

  function updateEnamelVariantOptions() {
    if (!form.enamelVariantSelect) return;
    const current = form.enamelVariantSelect.value;
    const options = data?.finishParameters?.enamelVariants || [];
    form.enamelVariantSelect.innerHTML = "";
    form.enamelVariantSelect.add(new Option("Выберите технологическую схему", ""));
    options.forEach((value) => form.enamelVariantSelect.add(new Option(value, value)));
    if (options.includes(current)) form.enamelVariantSelect.value = current;
    else form.enamelVariantSelect.value = "";
  }

  function defaultPositionFinishState() {
    return {
      finishId: "inherit",
      toning: "no",
      lacquerExecution: STANDARD_LACQUER_EXECUTION,
      lacquerGloss: "",
      lacquerProcess: "",
      enamelVariant: "",
      sides: defaultFinishSides(),
      sidesManual: false,
      isolator: "no"
    };
  }

  function capturePositionFinishStateFromDom() {
    if (!form.positionFinishOverrides) return;
    $$('[data-position-finish-row]', form.positionFinishOverrides).forEach((card) => {
      const rowId = card.dataset.positionFinishRow;
      const previous = positionFinishState.get(rowId) || defaultPositionFinishState();
      const rawState = {
        ...previous,
        finishId: $('[data-position-finish-select]', card)?.value || previous.finishId || "inherit",
        toning: $('[data-position-toning]', card)?.value || previous.toning || "no",
        lacquerExecution: $('[data-position-lacquer-execution]', card)?.value || previous.lacquerExecution || STANDARD_LACQUER_EXECUTION,
        lacquerGloss: $('[data-position-lacquer-gloss]', card)?.value || previous.lacquerGloss || "",
        lacquerProcess: $('[data-position-lacquer-process]', card)?.value || previous.lacquerProcess || "",
        enamelVariant: $('[data-position-enamel-variant]', card)?.value || previous.enamelVariant || "",
        sides: $('[data-position-finish-sides]', card)?.value || previous.sides || defaultFinishSides(),
        sidesManual: Boolean(previous.sidesManual),
        isolator: $('[data-position-isolator]', card)?.value || previous.isolator || "no"
      };
      positionFinishState.set(rowId, normalizeFinishConfig(rawState, { allowInherit: true }));
    });
  }

  function positionFinishLabel(row, index) {
    const length = num($('[data-size-length]', row)?.value);
    const width = num($('[data-size-width]', row)?.value);
    const quantity = num($('[data-size-quantity]', row)?.value);
    const parts = [`Позиция ${index + 1}`];
    if (length > 0 && width > 0) parts.push(`${length} × ${width} мм`);
    if (quantity > 0) parts.push(`${quantity} шт.`);
    return parts.join(" · ");
  }

  function positionFinishOptionsHtml(selectedId) {
    const options = [`<option value="inherit"${selectedId === "inherit" ? " selected" : ""}>Общие настройки</option>`];
    allowedFinishOptions().forEach((item) => {
      options.push(`<option value="${esc(item.id)}"${selectedId === item.id ? " selected" : ""}>${esc(item.name)}</option>`);
    });
    return options.join("");
  }

  function positionFinishSummary(state) {
    const normalized = normalizeFinishConfig(state, { allowInherit: true });
    if (normalized.finishId === "inherit") return `Общие настройки · ${finishSummary(currentGlobalFinishConfig())}`;
    return `${finishSummary(normalized)} · Индивидуальные настройки`;
  }

  function selectOptionsHtml(items, selectedValue, valueGetter = (item) => item, labelGetter = (item) => item) {
    return (items || []).map((item) => {
      const value = String(valueGetter(item) ?? "");
      const label = String(labelGetter(item) ?? value);
      return `<option value="${esc(value)}"${String(selectedValue) === value ? " selected" : ""}>${esc(label)}</option>`;
    }).join("");
  }

  function renderPositionFinishOverrides(capture = true) {
    if (!form.positionFinishOverrides) return;
    if (capture) capturePositionFinishStateFromDom();
    const rows = $$('[data-size-row]', form.sizeRows);
    const validRowIds = new Set(rows.map((row) => row.dataset.rowId));
    [...positionFinishState.keys()].forEach((rowId) => {
      if (!validRowIds.has(rowId)) positionFinishState.delete(rowId);
    });

    form.positionFinishOverrides.innerHTML = rows.map((row, index) => {
      const rowId = row.dataset.rowId;
      let state = normalizeFinishConfig({ ...defaultPositionFinishState(), ...(positionFinishState.get(rowId) || {}) }, { allowInherit: true });
      const finishId = state.finishId;
      const lacquer = isLacquerFinish(finishId);
      const gloss100 = lacquer && state.lacquerExecution === GLOSS_100_EXECUTION;
      const acrylic = isAcrylicLacquer(finishId) && !gloss100;
      const enamel = finishId === "enamel";
      const active = finishUsesSides(finishId);
      if (active && !state.sidesManual) {
        state.sides = defaultFinishSides();
        state = normalizeFinishConfig(state, { allowInherit: true });
      }
      positionFinishState.set(rowId, state);

      const glossOptions = lacquer && !gloss100 ? lacquerGlossOptions(finishId) : [];
      const lacquerProcesses = acrylic ? availableLacquerProcesses(state.sides) : [];
      const glossHtml = [`<option value="">Выберите степень блеска</option>`, ...glossOptions.map((value) => `<option value="${esc(value)}"${state.lacquerGloss === value ? " selected" : ""}>${esc(value)}</option>`)].join("");
      const processHtml = [`<option value="">Выберите технологическую схему</option>`, ...lacquerProcesses.map((item) => `<option value="${esc(item.id)}"${state.lacquerProcess === item.id ? " selected" : ""}>${esc(item.name)}</option>`)].join("");
      const enamelHtml = [`<option value="">Выберите технологическую схему</option>`, ...(data.finishParameters.enamelVariants || []).map((value) => `<option value="${esc(value)}"${state.enamelVariant === value ? " selected" : ""}>${esc(value)}</option>`)].join("");

      return `<div class="finish-position-card" data-position-finish-row="${esc(rowId)}">
        <div class="finish-position-card__head">
          <strong data-position-finish-title>${esc(positionFinishLabel(row, index))}</strong>
          <div class="field__note" data-position-finish-summary>${esc(positionFinishSummary(state))}</div>
        </div>
        <label class="field">
          <span class="field__label">Финишное покрытие</span>
          <select data-position-finish-select>${positionFinishOptionsHtml(finishId)}</select>
        </label>
        ${active ? `<label class="field"><span class="field__label">Стороны финишного покрытия</span><select data-position-finish-sides>${selectOptionsHtml(data.finishParameters.coatingSides, state.sides)}</select></label>` : ""}
        ${lacquer ? `<label class="field"><span class="field__label">Лаковое исполнение</span><select data-position-lacquer-execution>${selectOptionsHtml(lacquerExecutionOptions(), state.lacquerExecution, (item) => item.id, (item) => item.name)}</select></label>
        ${!gloss100 ? `<div class="field-grid field-grid--two">
          <label class="field"><span class="field__label">Степень блеска</span><select data-position-lacquer-gloss>${glossHtml}</select><span class="field__error is-hidden" data-validation-error data-position-lacquer-gloss-error></span></label>
          ${acrylic ? `<label class="field"><span class="field__label">Технологическая схема лака</span><select data-position-lacquer-process>${processHtml}</select><span class="field__error is-hidden" data-validation-error data-position-lacquer-process-error></span></label>` : ""}
        </div>` : ""}
        <div class="field-grid field-grid--two">
          <label class="field"><span class="field__label">Тонировка</span><select data-position-toning><option value="no"${state.toning !== "yes" ? " selected" : ""}>Нет</option><option value="yes"${state.toning === "yes" ? " selected" : ""}>Да</option></select></label>
          <label class="field"><span class="field__label">Изолятор</span><select data-position-isolator><option value="no"${state.isolator !== "yes" ? " selected" : ""}>Нет</option><option value="yes"${state.isolator === "yes" ? " selected" : ""}>Да</option></select></label>
        </div>` : ""}
        ${enamel ? `<label class="field"><span class="field__label">Технологическая схема эмали</span><select data-position-enamel-variant>${enamelHtml}</select><span class="field__error is-hidden" data-validation-error data-position-enamel-error></span></label>` : ""}
      </div>`;
    }).join("");
  }

  function updatePositionFinishLabels() {
    if (!form.positionFinishOverrides || form.positionFinishOverrides.classList.contains("is-hidden")) return;
    const rows = $$('[data-size-row]', form.sizeRows);
    rows.forEach((row, index) => {
      const rowId = row.dataset.rowId;
      const card = $(`[data-position-finish-row="${rowId}"]`, form.positionFinishOverrides);
      const title = card ? $('[data-position-finish-title]', card) : null;
      const summary = card ? $('[data-position-finish-summary]', card) : null;
      if (title) title.textContent = positionFinishLabel(row, index);
      if (summary) summary.textContent = positionFinishSummary(positionFinishState.get(rowId) || defaultPositionFinishState());
    });
  }

  function effectiveFinishForSize(size) {
    const globalConfig = currentGlobalFinishConfig();
    const rowId = size?.rowId || size?.row?.dataset?.rowId;
    const storedOverride = rowId ? positionFinishState.get(rowId) : null;
    const override = storedOverride ? normalizeFinishConfig(storedOverride, { allowInherit: true }) : null;
    if (!override || override.finishId === "inherit") return { ...globalConfig, source: "global" };
    return { ...override, source: "position" };
  }

  function fileIdentity(file) {
    return [file.name, file.size, file.type, file.lastModified].join("::");
  }

  function getUploadedFiles(input) {
    const stored = uploadedFilesState.get(input);
    return stored ? [...stored] : [...(input?.files || [])];
  }

  function setUploadedFiles(input, files) {
    const nextFiles = [...files];
    uploadedFilesState.set(input, nextFiles);
    try {
      const transfer = new DataTransfer();
      nextFiles.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
    } catch {
      // The same fallback as in the flooring calculator: state remains in uploadedFilesState.
    }
  }

  function appendUploadedFiles(input, files) {
    const current = getUploadedFiles(input);
    const existing = new Set(current.map(fileIdentity));
    files.forEach((file) => {
      const key = fileIdentity(file);
      if (existing.has(key)) return;
      existing.add(key);
      current.push(file);
    });
    setUploadedFiles(input, current);
  }

  function removeUploadedFile(input, index) {
    setUploadedFiles(input, getUploadedFiles(input).filter((_, fileIndex) => fileIndex !== index));
  }

  function uploadedFileNames(input) {
    return getUploadedFiles(input).map((file) => file.name);
  }

  function renderUploadedFiles(input, output, hideWhenEmpty = true) {
    const files = getUploadedFiles(input);
    output.innerHTML = "";
    output.classList.toggle("is-hidden", hideWhenEmpty && !files.length);
    if (!files.length) {
      output.textContent = "Файлы не выбраны";
      return;
    }
    files.forEach((file, index) => {
      const tag = document.createElement("span");
      tag.className = "uploaded-file";
      const name = document.createElement("span");
      name.className = "uploaded-file__name";
      name.textContent = file.name;
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "uploaded-file__remove";
      removeButton.textContent = "×";
      removeButton.setAttribute("aria-label", `Удалить файл ${file.name}`);
      removeButton.addEventListener("click", () => {
        removeUploadedFile(input, index);
        renderUploadedFiles(input, output, hideWhenEmpty);
        recalc();
      });
      tag.append(name, removeButton);
      output.append(tag);
    });
  }

  function handleFileInputChange(input, output, hideWhenEmpty = true) {
    const selectedNow = [...(input.files || [])];
    appendUploadedFiles(input, selectedNow);
    renderUploadedFiles(input, output, hideWhenEmpty);
    recalc();
  }

  function bindFileInput(input, output, hideWhenEmpty = true) {
    setUploadedFiles(input, getUploadedFiles(input));
    renderUploadedFiles(input, output, hideWhenEmpty);
    input.addEventListener("change", () => handleFileInputChange(input, output, hideWhenEmpty));
  }

  function populate() {
    const typeLabels = new Map((data.veneerTypes || []).map((item) => [item.id, item.name]));
    data.veneers.forEach((x) => { if (!typeLabels.has(x.type)) typeLabels.set(x.type, x.typeName); });
    (data.meta?.veneerTypeOrder || ["natural", "design", "multi"]).forEach((type) => {
      if (typeLabels.has(type)) form.veneerTypeSelect.add(new Option(typeLabels.get(type), type));
    });
    data.bases.filter(x => !window.WoodstockPanelsView?.allowBase || window.WoodstockPanelsView.allowBase(x)).forEach((x) => {
      const option = new Option(x.name, x.id);
      option.disabled = window.WoodstockPanelsView?.baseSelectable?.(x) === false;
      form.baseSelect.add(option);
    });
    form.baseSelect.value = window.WoodstockPanelsView?.emptyInitialBase ? "" : "mdf";
    syncLayoutOptions({ preserve: false });
    availableAttachedEdgeSides().forEach((x) => form.edgeSidesSelect.add(new Option(x.name, x.id)));
    data.edgeSides.forEach((x) => form.separateEdgeSidesSelect.add(new Option(x.name, x.id)));
    form.separateEdgeSidesSelect.value = "perimeter";
    (data.edgeTypes || []).forEach((x) => {
      form.edgeTypeSelect.add(new Option(x.name, x.id));
      form.separateEdgeTypeSelect.add(new Option(x.name, x.id));
    });
    syncEdgeThicknessOptions("attached", { preserve: false });
    syncEdgeThicknessOptions("separate", { preserve: false });
    syncEdgeWidthOptions("attached", { preserve: false });
    syncEdgeWidthOptions("separate", { preserve: false });
    allowedFinishOptions().forEach((x) => form.finishSelect.add(new Option(x.name, x.id)));
    (data.finishParameters.lacquerProcesses || []).forEach((x) => form.lacquerProcessSelect?.add(new Option(x.name, x.id)));
    data.finishParameters.enamelVariants.forEach((x) => form.enamelVariantSelect.add(new Option(x, x)));
    data.finishParameters.coatingSides.forEach((x) => form.finishSidesSelect.add(new Option(x, x)));
    priceListClientConditions().forEach((x) => form.clientConditionSelect.add(new Option(clientConditionUiName(x.id), x.id)));

    updateVeneerThicknessOptions({ preserve: false });
    addSizeRow(); updateFinishUI(); updateBaseUI();
  }

  function pricingSnapshot(result) {
    const veneer = {};
    (result?.veneerPricings || []).forEach((pricing) => {
      if (!pricing?.item || !pricing.which) return;
      if (!veneer[pricing.which]) veneer[pricing.which] = [];
      veneer[pricing.which].push({
        pricingMode: pricing.pricingMode || "standard",
        sameAsA: Boolean(pricing.sameAsA),
        veneerId: pricing.item.id || "",
        veneerName: veneerDisplayName(pricing.item),
        retailPricePerM2: Number.isFinite(pricing.retailPricePerM2) ? pricing.retailPricePerM2 : null,
        priceSource: pricing.priceSource || "price_list",
        priceSourceLabel: "Прайс",
        condition: {
          id: pricing.levelId || "retail",
          name: pricing.levelName || "Розничная цена",
          source: pricing.conditionSource || "retail",
          selectedConditionId: pricing.selectedConditionId || "",
          unresolved: Boolean(pricing.conditionUnresolved),
          requiresPriceAgreement: Boolean(pricing.requiresPriceAgreement),
          priceAgreementReason: pricing.priceAgreementReason || "",
          automaticPercent: Number(pricing.automaticDiscountPercent || 0),
          actualPercent: Number(pricing.discountPercent || 0),
          changedManually: false
        },
        finalPricePerM2: Number.isFinite(pricing.finalPricePerM2) ? pricing.finalPricePerM2 : null,
        effectivePricePerM2: Number.isFinite(effectiveVeneerPricePerM2(pricing)) ? effectiveVeneerPricePerM2(pricing) : null,
        calculationMethod: pricing.calculationMethod || "area",
        calculationMethodLabel: pricing.calculationMethodLabel || (pricing.calculationMethod === "by_sheets" ? "По листам" : pricing.calculationMethod === "shared_consumption" ? "Общий расход" : "По площади"),
        panelSize: pricing.panelSize ? {
          lengthMm: Number.isFinite(num(pricing.panelSize.length)) ? num(pricing.panelSize.length) : null,
          widthMm: Number.isFinite(num(pricing.panelSize.width)) ? num(pricing.panelSize.width) : null
        } : null,
        panelSizes: (pricing.panelSizes || []).map((size) => ({
          position: Number.isFinite(num(size.position)) ? num(size.position) : null,
          lengthMm: Number.isFinite(num(size.length)) ? num(size.length) : null,
          widthMm: Number.isFinite(num(size.width)) ? num(size.width) : null,
          quantity: Number.isFinite(num(size.quantity)) ? num(size.quantity) : null
        })),
        quantity: Number.isFinite(num(pricing.quantity)) ? num(pricing.quantity) : null,
        surfaceCount: Number.isFinite(num(pricing.surfaceCount)) ? num(pricing.surfaceCount) : null,
        sheetFormat: pricing.requirement ? {
          physicalLengthMm: Number.isFinite(num(pricing.requirement.physicalLengthMm)) ? num(pricing.requirement.physicalLengthMm) : null,
          physicalWidthMm: Number.isFinite(num(pricing.requirement.physicalWidthMm)) ? num(pricing.requirement.physicalWidthMm) : null,
          physicalAreaM2: Number.isFinite(num(pricing.requirement.physicalSheetAreaM2)) ? num(pricing.requirement.physicalSheetAreaM2) : null
        } : null,
        usableFormat: pricing.requirement ? {
          usableLengthMm: Number.isFinite(num(pricing.requirement.usableLengthMm)) ? num(pricing.requirement.usableLengthMm) : null,
          usableWidthMm: Number.isFinite(num(pricing.requirement.usableWidthMm)) ? num(pricing.requirement.usableWidthMm) : null
        } : null,
        geometryExact: pricing.requirement ? pricing.requirement.exact !== false : null,
        geometryReason: pricing.requirement?.reason || "",
        requiredArea: Number.isFinite(pricing.requirement?.netAreaM2) ? pricing.requirement.netAreaM2 : (Number.isFinite(pricing.requiredArea) ? pricing.requiredArea : null),
        technicalSheetsPerSurface: Number.isFinite(pricing.requirement?.technicalSheetsPerSurface) ? pricing.requirement.technicalSheetsPerSurface : null,
        technicalSheetDemand: Number.isFinite(pricing.requirement?.technicalSheets) ? pricing.requirement.technicalSheets : null,
        purchasedWholeSheets: Number.isFinite(pricing.finalPurchase?.sheets) ? pricing.finalPurchase.sheets : (Number.isFinite(pricing.requirement?.purchasedSheets) ? pricing.requirement.purchasedSheets : null),
        purchaseArea: Number.isFinite(pricing.finalPurchase?.area) ? pricing.finalPurchase.area : (Number.isFinite(pricing.requirement?.paidAreaM2) ? pricing.requirement.paidAreaM2 : null),
        pricePerSheet: Number.isFinite(pricing.pricePerSheet)
          ? pricing.pricePerSheet
          : pricing.item?.priceUnit === "sheet" && Number.isFinite(pricing.finalPrice)
            ? pricing.finalPrice
            : Core.isSheetBasedVeneer(pricing.item) && Number.isFinite(effectiveVeneerPricePerM2(pricing)) && Number.isFinite(num(pricing.requirement?.physicalSheetAreaM2))
              ? effectiveVeneerPricePerM2(pricing) * num(pricing.requirement.physicalSheetAreaM2)
              : null,
        priceUnit: pricing.item?.priceUnit === "sheet" ? "sheet" : "m2",
        unitPrice: pricing.item?.priceUnit === "sheet"
          ? (Number.isFinite(pricing.finalPrice) ? pricing.finalPrice : null)
          : (Number.isFinite(effectiveVeneerPricePerM2(pricing)) ? effectiveVeneerPricePerM2(pricing) : null),
        requiredVeneerAreaM2: Number.isFinite(pricing.consumption?.requiredVeneerAreaM2) ? pricing.consumption.requiredVeneerAreaM2 : null,
        recommendedVeneerAreaM2: Number.isFinite(pricing.consumption?.recommendedVeneerAreaM2) ? pricing.consumption.recommendedVeneerAreaM2 : null,
        recommendedWastePercent: Number.isFinite(pricing.consumption?.recommendedWastePercent) ? pricing.consumption.recommendedWastePercent : null,
        actualVeneerAreaM2: Number.isFinite(pricing.consumption?.actualVeneerAreaM2) ? pricing.consumption.actualVeneerAreaM2 : null,
        actualWasteAreaM2: Number.isFinite(pricing.consumption?.actualWasteAreaM2) ? pricing.consumption.actualWasteAreaM2 : null,
        actualWastePercent: Number.isFinite(pricing.consumption?.actualWastePercent) ? pricing.consumption.actualWastePercent : null,
        actualVeneerAreaManual: Boolean(pricing.consumption?.actualVeneerAreaManual),
        paidVeneerAreaM2: Number.isFinite(pricing.consumption?.paidVeneerAreaM2) ? pricing.consumption.paidVeneerAreaM2 : (Number.isFinite(pricing.finalPurchase?.area) ? pricing.finalPurchase.area : null),
        purchasedWholeSheets: Number.isFinite(pricing.consumption?.purchasedWholeSheets) ? pricing.consumption.purchasedWholeSheets : (Number.isFinite(pricing.finalPurchase?.sheets) ? pricing.finalPurchase.sheets : null),
        calculatedCost: Number.isFinite(pricing.finalPurchase?.cost) ? pricing.finalPurchase.cost : null,
        proportionalDistribution: Boolean(pricing.proportionalDistribution)
      });
    });

    const readyShirts = (result?.readyShirtPricings || []).map((pricing) => ({
      materialType: "ready_shirt",
      side: pricing.which || pricing.pricingWhich || "",
      readyShirtId: pricing.item?.id || "",
      name: pricing.item?.displayName || pricing.item?.name || "",
      series: pricing.item?.series || "",
      article: pricing.item?.article || "",
      origin: pricing.item?.origin || null,
      format: {
        lengthMm: Number.isFinite(num(pricing.item?.lengthMm)) ? num(pricing.item.lengthMm) : null,
        widthMm: Number.isFinite(num(pricing.item?.widthMm)) ? num(pricing.item.widthMm) : null,
        areaM2: Number.isFinite(num(pricing.item?.areaM2)) ? num(pricing.item.areaM2) : null
      },
      thicknessMm: Number.isFinite(num(pricing.item?.thicknessMm)) ? num(pricing.item.thicknessMm) : null,
      thicknessSource: thicknessSourceForItem(pricing.item) || null,
      surfaceCount: Number.isFinite(num(pricing.surfaceCount)) ? num(pricing.surfaceCount) : null,
      quantity: Number.isFinite(num(pricing.totalSheets)) ? num(pricing.totalSheets) : null,
      paidAreaM2: Number.isFinite(num(pricing.paidAreaM2)) ? num(pricing.paidAreaM2) : null,
      requirementStatus: pricing.requirementStatus || (pricing.exact ? "calculated" : "requires_clarification"),
      requirementReason: pricing.requirementReason || "",
      priceSource: pricing.priceSource || "price_list",
      priceCondition: {
        id: pricing.levelId || "retail",
        name: pricing.levelName || "Розничная цена",
        source: pricing.conditionSource || "retail",
        selectedConditionId: pricing.selectedConditionId || "",
        unresolved: Boolean(pricing.conditionUnresolved)
      },
      automaticPricePerM2: Number.isFinite(pricing.automaticPrice) ? veneerPricePerM2(pricing.item, pricing.automaticPrice) : null,
      appliedPricePerM2: Number.isFinite(pricing.finalPricePerM2) ? pricing.finalPricePerM2 : null,
      pricePerSheet: Number.isFinite(pricing.pricePerSheet) ? pricing.pricePerSheet : null,
      materialCost: Number.isFinite(pricing.finalPurchase?.cost) ? pricing.finalPurchase.cost : null,
      availabilityStatus: pricing.item?.availabilityStatus || "clarification",
      availabilityLabel: pricing.item?.availabilityLabel || "Наличие требует уточнения",
      source: pricing.item?.source || "",
      sourceSheet: pricing.item?.sourceSheet || "",
      requiresProductionCost: true,
      productionCostReason: pricing.item?.productionCostReason || "Требуется стоимость производства"
    }));

    const veneerSelections = [];

    const mdf = (result?.mdfPricings || []).map((pricing) => ({
      size: `${pricing.size?.length || ""}×${pricing.size?.width || ""}`,
      conditionId: pricing.conditionId || "retail",
      conditionPriceKey: pricing.conditionKey || clientConditionPriceKey(pricing.conditionId || "retail"),
      conditionName: pricing.conditionId && pricing.conditionId !== "retail" ? clientConditionUiName(pricing.conditionId) : "Розничная цена",
      conditionSource: pricing.conditionFound ? "price_list" : null,
      priceListConditionFound: Boolean(pricing.conditionFound),
      sourceMode: pricing.sourceMode || null,
      automaticConditionPricePerSheet: Number.isFinite(pricing.automaticConditionPrice) ? pricing.automaticConditionPrice : null,
      actualConditionPricePerSheet: Number.isFinite(pricing.actualConditionPrice) ? pricing.actualConditionPrice : null,
      automaticConditionPercent: Number(pricing.automaticDiscountPercent || 0),
      actualConditionPercent: Number(pricing.discountPercent || 0),
      conditionChangedManually: false,
      selectionId: "none",
      automaticSelectionPercent: 0,
      actualSelectionPercent: 0,
      selectionChangedManually: false,
      priceListConditionPricePerSheet: Number.isFinite(num(pricing.standard?.pricesPerSheet?.[pricing.conditionKey || "retail"]))
        ? num(pricing.standard.pricesPerSheet[pricing.conditionKey || "retail"])
        : null,
      retailSheet: Number.isFinite(pricing.retailSheet) ? pricing.retailSheet : null,
      finalSheet: Number.isFinite(pricing.finalSheet) ? pricing.finalSheet : null
    }));

    const baseRates = (result?.baseRatePricings || []).map((pricing) => ({
      pricingMode: pricing.pricingMode || null,
      position: pricing.position || null,
      component: pricing.componentLabel || "Основа + работа",
      conditionId: pricing.conditionId || "retail",
      conditionPriceKey: pricing.conditionPriceKey || clientConditionPriceKey(pricing.conditionId || "retail"),
      conditionName: pricing.conditionName || clientConditionById(pricing.conditionId || "retail")?.name || "Розничная цена",
      conditionSource: pricing.conditionFound ? "price_list" : null,
      priceListConditionFound: Boolean(pricing.conditionFound),
      sourceMode: pricing.sourceMode || null,
      retailRatePerM2: Number.isFinite(pricing.retailRatePerM2) ? pricing.retailRatePerM2 : null,
      automaticRatePerM2: Number.isFinite(pricing.automaticRatePerM2) ? pricing.automaticRatePerM2 : null,
      finalRatePerM2: Number.isFinite(pricing.finalRatePerM2) ? pricing.finalRatePerM2 : null,
      automaticDiscountPercent: Number(pricing.automaticDiscountPercent || 0),
      actualDiscountPercent: Number(pricing.actualDiscountPercent || 0),
      changedManually: Boolean(pricing.changedManually),
      areaM2: Number.isFinite(pricing.areaM2) ? pricing.areaM2 : null,
      automaticCost: Number.isFinite(pricing.automaticCost) ? pricing.automaticCost : null,
      finalCost: Number.isFinite(pricing.finalCost) ? pricing.finalCost : null
    }));
    return {
      veneer,
      readyShirts,
      veneerSelections,
      mdf,
      clientConditionSelected: form.clientConditionSelect.value || "retail",
      clientConditionPriceKey: clientConditionPriceKey(form.clientConditionSelect.value || "retail"),
      clientConditionName: clientConditionUiName(form.clientConditionSelect.value || "retail"),
      clientConditionSource: "price_list",
      baseRates,
      roughBackVeneer: result?.roughBackVeneer ? {
        side: "B",
        materialType: "rough_veneer",
        thicknessMm: Number.isFinite(num(result.roughBackVeneer.thicknessMm)) ? num(result.roughBackVeneer.thicknessMm) : null,
        pricePerM2: Number.isFinite(num(result.roughBackVeneer.ratePerM2)) ? num(result.roughBackVeneer.ratePerM2) : null,
        materialCost: Number.isFinite(num(result.roughBackVeneer.materialCost)) ? num(result.roughBackVeneer.materialCost) : null,
        pricingStatus: result.roughBackVeneer.pricingStatus || "requires_clarification",
        source: result.roughBackVeneer.source || "meta.roughBackVeneerRatesPerM2ByThickness"
      } : null,
      mdfConditionSelected: null,
      panelPrices: {
        retailPricePerM2: result?.priceCalculationComplete && Number.isFinite(result?.retailAvgM2) ? result.retailAvgM2 : null,
        finalPricePerM2: result?.priceCalculationComplete && Number.isFinite(result?.avgM2) ? result.avgM2 : null
      },
      manualDiscount: {
        percent: Number(result?.manualDiscountPercent || 0),
        applied: Boolean(result?.manualDiscountApplied),
        applicationMode: "disabled_global_component_specific_only",
        automaticTotalBeforeManualDiscount: Number.isFinite(result?.automaticFinalTotal) ? result.automaticFinalTotal : null,
        candidateTotal: Number.isFinite(result?.manualDiscountCandidateTotal) ? result.manualDiscountCandidateTotal : null
      },
      productionCost: {
        required: Boolean(result?.requiresProductionCost)||(result?.productionCosts?.length||0)>0,
        status: result?.productionCosts?.length&&result.productionCosts.every(item=>item.status==='provided')?'provided':(result?.requiresProductionCost||result?.productionCosts?.length)?'pending_shared_specification':'not_required',
        totalCost: result?.productionCosts?.length&&result.productionCosts.every(item=>item.status==='provided')?result.productionCosts.reduce((sum,item)=>sum+item.amount,0):null,
        baseRequired: Boolean(result?.requiresBaseProductionCost),
        layoutRequired: Boolean(result?.requiresLayoutProductionCost),
        allowance20Required: Boolean(result?.requiresAllowanceProductionCost),
        readyShirtRequired: Boolean(result?.requiresReadyShirtProductionCost),
        finishRequired: Boolean(result?.requiresFinishProductionCost)
      },
      veneerConsumptions: (result?.veneerConsumptions || []).map((consumption) => ({
        materialId: consumption.materialId || "",
        material: consumption.materialName || "",
        side: consumption.sideKey || consumption.which || "",
        pricingMode: consumption.pricingMode || "",
        panelSize: consumption.panelSize ? { lengthMm: num(consumption.panelSize.length), widthMm: num(consumption.panelSize.width) } : null,
        requiredVeneerAreaM2: Number.isFinite(consumption.requiredVeneerAreaM2) ? consumption.requiredVeneerAreaM2 : null,
        recommendedVeneerAreaM2: Number.isFinite(consumption.recommendedVeneerAreaM2) ? consumption.recommendedVeneerAreaM2 : null,
        recommendedWastePercent: Number.isFinite(consumption.recommendedWastePercent) ? consumption.recommendedWastePercent : null,
        actualVeneerAreaM2: Number.isFinite(consumption.actualVeneerAreaM2) ? consumption.actualVeneerAreaM2 : null,
        actualWasteAreaM2: Number.isFinite(consumption.actualWasteAreaM2) ? consumption.actualWasteAreaM2 : null,
        actualWastePercent: Number.isFinite(consumption.actualWastePercent) ? consumption.actualWastePercent : null,
        actualVeneerAreaManual: Boolean(consumption.actualVeneerAreaManual),
        paidVeneerAreaM2: Number.isFinite(consumption.paidVeneerAreaM2) ? consumption.paidVeneerAreaM2 : null,
        purchasedWholeSheets: Number.isFinite(consumption.purchasedWholeSheets) ? consumption.purchasedWholeSheets : null,
        materialCost: Number.isFinite(consumption.materialCost) ? consumption.materialCost : null,
        valid: Boolean(consumption.valid),
        validationError: consumption.validationError || ""
      })),
      veneerWaste: (result?.veneerConsumptions || []).map((consumption) => ({
        materialId: consumption.materialId || "",
        side: consumption.sideKey || consumption.which || "",
        requiredVeneerAreaM2: Number.isFinite(consumption.requiredVeneerAreaM2) ? consumption.requiredVeneerAreaM2 : null,
        recommendedVeneerAreaM2: Number.isFinite(consumption.recommendedVeneerAreaM2) ? consumption.recommendedVeneerAreaM2 : null,
        recommendedWastePercent: Number.isFinite(consumption.recommendedWastePercent) ? consumption.recommendedWastePercent : null,
        actualVeneerAreaM2: Number.isFinite(consumption.actualVeneerAreaM2) ? consumption.actualVeneerAreaM2 : null,
        actualWasteAreaM2: Number.isFinite(consumption.actualWasteAreaM2) ? consumption.actualWasteAreaM2 : null,
        actualWastePercent: Number.isFinite(consumption.actualWastePercent) ? consumption.actualWastePercent : null,
        actualVeneerAreaManual: Boolean(consumption.actualVeneerAreaManual),
        paidVeneerAreaM2: Number.isFinite(consumption.paidVeneerAreaM2) ? consumption.paidVeneerAreaM2 : null,
        materialCost: Number.isFinite(consumption.materialCost) ? consumption.materialCost : null
      })),
      mixMatchVeneer: result?.mixMatchVeneerPricing?.applies ? {
        requiredVeneerAreaM2: Number.isFinite(result.mixMatchVeneerPricing.requiredAreaM2) ? result.mixMatchVeneerPricing.requiredAreaM2 : null,
        recommendedVeneerAreaM2: Number.isFinite(result.mixMatchVeneerPricing.recommendedAreaM2) ? result.mixMatchVeneerPricing.recommendedAreaM2 : null,
        actualVeneerAreaM2: Number.isFinite(result.mixMatchVeneerPricing.actualVeneerAreaM2) ? result.mixMatchVeneerPricing.actualVeneerAreaM2 : null,
        defaultAreaM2: Number.isFinite(result.mixMatchVeneerPricing.defaultAreaM2) ? result.mixMatchVeneerPricing.defaultAreaM2 : null,
        minimumPacks: Number.isFinite(result.mixMatchVeneerPricing.minimumPacks) ? result.mixMatchVeneerPricing.minimumPacks : 3,
        automaticPaidAreaM2: Number.isFinite(result.mixMatchVeneerPricing.automaticPaidAreaM2) ? result.mixMatchVeneerPricing.automaticPaidAreaM2 : null,
        paidVeneerAreaM2: Number.isFinite(result.mixMatchVeneerPricing.actualPaidAreaM2) ? result.mixMatchVeneerPricing.actualPaidAreaM2 : null,
        purchasedWholeSheets: Number.isFinite(result.mixMatchVeneerPricing.paidSheets) ? result.mixMatchVeneerPricing.paidSheets : null,
        actualVeneerAreaManual: Boolean(result.mixMatchVeneerPricing.changedManually)
      } : null,
      thickVeneerWork: result?.thickVeneerWorkAdjustment?.applies ? {
        thresholdMm: result.thickVeneerWorkAdjustment.thresholdMm,
        baselineClass: result.thickVeneerWorkAdjustment.baselineClass,
        thickClass: result.thickVeneerWorkAdjustment.thickClass,
        baselineRatePerM2: Number.isFinite(result.thickVeneerWorkAdjustment.baselineRatePerM2) ? result.thickVeneerWorkAdjustment.baselineRatePerM2 : null,
        thickRatePerM2: Number.isFinite(result.thickVeneerWorkAdjustment.thickRatePerM2) ? result.thickVeneerWorkAdjustment.thickRatePerM2 : null,
        automaticCoefficient: Number.isFinite(result.thickVeneerWorkAdjustment.automaticCoefficient) ? result.thickVeneerWorkAdjustment.automaticCoefficient : null,
        actualCoefficient: Number.isFinite(result.thickVeneerWorkAdjustment.actualCoefficient) ? result.thickVeneerWorkAdjustment.actualCoefficient : null,
        changedManually: Boolean(result.thickVeneerWorkAdjustment.changedManually),
        manualRequired: Boolean(result.thickVeneerWorkAdjustment.manualRequired)&&thickWorkCoefficientRequired(result)
      } : null,
      calibration: result?.techOperations?.calibration ? {
        enabled: true,
        required: Boolean(result.techOperations.calibrationRequired),
        sourceBaseThicknessMm: Number.isFinite(result.techOperations.calibrationSourceBaseThicknessMm) ? result.techOperations.calibrationSourceBaseThicknessMm : null,
        baseThicknessAfterCalibrationMm: Number.isFinite(result.techOperations.baseThicknessAfterCalibrationMm) ? result.techOperations.baseThicknessAfterCalibrationMm : null,
        depthMm: Number.isFinite(result.techOperations.calibrationDepth) ? result.techOperations.calibrationDepth : null,
        ratePerM2PerMm: Number.isFinite(result.techOperations.calibrationRatePerM2PerMm) ? result.techOperations.calibrationRatePerM2PerMm : null,
        effectiveRatePerM2: Number.isFinite(result.techOperations.calibrationRatePerM2) ? result.techOperations.calibrationRatePerM2 : null,
        cost: Number.isFinite(result.techOperations.calibrationCost) ? result.techOperations.calibrationCost : null,
        finishedProductThicknessMm: Number.isFinite(result.techOperations.calibrationFinishedProductThicknessMm) ? result.techOperations.calibrationFinishedProductThicknessMm : null,
        includedInProductionCost: result.techOperations.calibrationIncludedInProductionCost === true,
        requiresProductionCost: result.techOperations.calibrationRequiresProductionCost === true,
        productionAreaM2: result.techOperations.calibrationProductionArea || 0,
        pricingStatus: result.techOperations.calibrationPricingStatus || "pending"
      } : null,
      total: result?.priceCalculationComplete ? result.finalTotal : null,
      pricePerM2: result?.priceCalculationComplete ? result.avgM2 : null,
      pricePerPiece: result?.priceCalculationComplete ? result.avgPiece : null,
      vatIncluded: true,
      vat: result?.priceCalculationComplete ? result.vat : null
    };
  }

  function veneerConsumptionSaveRecord(consumption) {
    return {
      materialId: consumption?.materialId || "",
      material: consumption?.materialName || "",
      side: consumption?.sideKey || consumption?.which || "",
      pricingMode: consumption?.pricingMode || "",
      panelSize: consumption?.panelSize ? { lengthMm: num(consumption.panelSize.length), widthMm: num(consumption.panelSize.width) } : null,
      requiredVeneerAreaM2: Number.isFinite(consumption?.requiredVeneerAreaM2) ? consumption.requiredVeneerAreaM2 : null,
      recommendedVeneerAreaM2: Number.isFinite(consumption?.recommendedVeneerAreaM2) ? consumption.recommendedVeneerAreaM2 : null,
      recommendedWastePercent: Number.isFinite(consumption?.recommendedWastePercent) ? consumption.recommendedWastePercent : null,
      actualVeneerAreaM2: Number.isFinite(consumption?.actualVeneerAreaM2) ? consumption.actualVeneerAreaM2 : null,
      actualWasteAreaM2: Number.isFinite(consumption?.actualWasteAreaM2) ? consumption.actualWasteAreaM2 : null,
      actualWastePercent: Number.isFinite(consumption?.actualWastePercent) ? consumption.actualWastePercent : null,
      actualVeneerAreaManual: Boolean(consumption?.actualVeneerAreaManual),
      paidVeneerAreaM2: Number.isFinite(consumption?.paidVeneerAreaM2) ? consumption.paidVeneerAreaM2 : null,
      purchasedWholeSheets: Number.isFinite(consumption?.purchasedWholeSheets) ? consumption.purchasedWholeSheets : null,
      materialCost: Number.isFinite(consumption?.materialCost) ? consumption.materialCost : null
    };
  }

  function materialSaveRecord(item, side, totalVeneeredSides, selectedAutomatically) {
    if (!item) return null;
    const thicknessMm = itemThickness(item);
    return {
      side,
      materialType: isReadyShirt(item) ? "ready_shirt" : "veneer",
      veneerType: isReadyShirt(item) ? null : (item.type || null),
      typeName: item.typeName || (isReadyShirt(item) ? "Готовая рубашка" : ""),
      id: item.id || "",
      article: item.article || "",
      name: item.displayName || item.name || veneerDisplayName(item),
      thicknessMm: Number.isFinite(thicknessMm) ? thicknessMm : null,
      thicknessSource: thicknessSourceForItem(item) || null,
      totalVeneeredSides,
      selectedAutomatically: Boolean(selectedAutomatically),
      selectionMode: selectedAutomatically ? "automatic" : "manual",
      ...(isReadyShirt(item) ? {
        series: item.series || "",
        format: Core.readyShirtDimensions(item) || null,
        availabilityStatus: item.availabilityStatus || "clarification",
        availabilityLabel: item.availabilityLabel || "Наличие требует уточнения"
      } : {})
    };
  }

  function saveToSpecification({ capture = false } = {}) {
    // Serialize known row costs with the existing presentation mode, then restore the normal form mode.
    if(!window.WoodstockPanelsView?.positionPricing){
      const view=window.WoodstockPanelsView;
      window.WoodstockPanelsView={...view,positionPricing:true};
      try{return saveToSpecification({capture});}finally{window.WoodstockPanelsView=view;}
    }
    addAttempted = true;
    layoutValidationAttempted = true;
    recalc();
    const validationIssues = currentBlockingValidationIssues(lastCalculation);
    if (validationIssues.length) {
      const labels = [...new Set(validationIssues.map((issue) => issue.label).filter(Boolean))];
      form.saveStatus.textContent = labels.length
        ? `Заполните обязательные поля расчёта: ${labels.join(", ")}.`
        : "Проверьте обязательные поля расчёта.";
      focusFirstValidationIssue(validationIssues[0]);
      return;
    }
    if (!lastCalculation) { form.saveStatus.textContent = "Проверьте обязательные поля расчёта."; return; }
    const veneerType = form.veneerTypeSelect.value;
    const veneerThickness = selectedVeneerThickness();
    const readyShirtSelected = veneerType === "ready_shirt";
    if (!veneerType) { form.saveStatus.textContent = "Выберите тип материала."; return; }
    if (!readyShirtSelected && !validateVeneerThickness()) { form.saveStatus.textContent = "Выберите доступную толщину лицевого шпона."; return; }
    const selectedFaceMaterialValid = Boolean(
      selectedVeneerAGroup &&
      materialTypeOf(selectedVeneerAGroup) === veneerType &&
      (readyShirtSelected || veneerVariantsAtThickness(selectedVeneerAGroup, veneerThickness).length)
    );
    if (!selectedFaceMaterialValid) {
      form.saveStatus.textContent = readyShirtSelected
        ? "Выберите готовую рубашку из справочника."
        : "Выберите наименование шпона для выбранного типа и толщины.";
      return;
    }
    if (["plywood_water", "blockboard"].includes(lastCalculation.base?.id)) {
      const selectedThicknessKey = normalizeThicknessKey(currentBaseThicknessRaw());
      const allowedThickness = baseThicknessOptions(lastCalculation.base).some((value) => normalizeThicknessKey(value) === selectedThicknessKey);
      if (!allowedThickness) {
        form.saveStatus.textContent = lastCalculation.base.id === "blockboard"
          ? "Выберите доступную толщину столярной плиты из справочника."
          : "Выберите доступную толщину влагостойкой фанеры из справочника.";
        return;
      }
    }
    if (calibrationRequiredForBase(lastCalculation.base) && form.calibrationSelect.value !== "yes") {
      form.saveStatus.textContent = `Для ${String(lastCalculation.base?.name || "выбранной основы").toLocaleLowerCase("ru")} калибровка обязательна.`;
      return;
    }
    const calibrationForSave = calibrationState(lastCalculation.base);
    if (!window.WoodstockPanelsView?.automaticOperations && calibrationForSave.enabled && !calibrationForSave.valid) {
      form.saveStatus.textContent = "Толщина основы после калибровки должна быть меньше исходной толщины основы";
      return;
    }
    if (thickWorkCoefficientRequired(lastCalculation)) {
      form.saveStatus.textContent = "Для точного размера со шпоном от 1,5 мм укажите коэффициент работы с толстым шпоном вручную.";
      return;
    }
    if (lastCalculation.sizeValidation && !lastCalculation.sizeValidation.valid) {
      form.saveStatus.textContent = lastCalculation.sizeValidation.error;
      return;
    }
    if (!lastCalculation.validSizes.length) { form.saveStatus.textContent = "Добавьте хотя бы один заполненный размер."; return; }
    if (needsLayoutSelection() && !form.layoutSelect.value) {
      layoutValidationAttempted = true;
      recalc();
      form.saveStatus.textContent = "Выберите раскладку шпона.";
      return;
    }
    if (needsLayoutSelection() && form.layoutSelect.value && !isLayoutAllowedForType(form.layoutSelect.value, veneerType)) {
      form.saveStatus.textContent = "Выбранная раскладка недоступна для мультишпона.";
      return;
    }
    if (lastCalculation.layoutValidation && !lastCalculation.layoutValidation.valid) {
      form.saveStatus.textContent = lastCalculation.layoutValidation.error;
      return;
    }
    const invalidVeneerConsumption = (lastCalculation.veneerConsumptions || []).find((consumption) => !consumption.valid);
    if (invalidVeneerConsumption) {
      form.saveStatus.textContent = invalidVeneerConsumption.validationError || "Укажите фактическое количество шпона.";
      return;
    }
    if (lastCalculation.edge?.mode !== "none" && !lastCalculation.edge?.valid) {
      form.saveStatus.textContent = lastCalculation.edge?.validationError || "Заполните обязательные параметры кромки.";
      return;
    }
    const sides = Number(form.veneeredSidesSelect.value);
    const sideAMaterialForSave = selectedVeneerA || selectedVeneerAGroup;
    const sideBOtherMaterialForSave = selectedVeneerB || selectedVeneerBGroup;
    const sideBSelectionModeForSave = sides === 2 ? form.veneerBModeSelect.value : "";
    if (requiresTwoFaceSides(veneerThickness) && sides !== 2) {
      form.saveStatus.textContent = twoSidedVeneerRequirementMessage();
      return;
    }
    if (sides === 2 && sideBSelectionModeForSave === "other") {
      if (isReadyShirt(sideAMaterialForSave) && !Number.isFinite(veneerThickness)) {
        form.saveStatus.textContent = "Для выбора другого материала необходимо указать подтверждённую толщину готовой рубашки";
        return;
      }
      if (!sideBOtherMaterialForSave || !sameConfirmedThickness(veneerThickness, itemThickness(sideBOtherMaterialForSave))) {
        form.saveStatus.textContent = "Для второй стороны выберите материал той же толщины";
        return;
      }
    }
    if (sides === 2 && sideBSelectionModeForSave === "rough") {
      const roughThickness = selectedRoughBackThickness();
      if (!isExactlyOnePointFive(veneerThickness)) {
        form.saveStatus.textContent = "Черновой шпон на второй стороне разрешён только для лицевого шпона 1,5 мм.";
        return;
      }
      if (!Number.isFinite(roughThickness) || roughThickness > 1.5 + 0.001) {
        form.saveStatus.textContent = "Выберите подтверждённую толщину чернового шпона стороны Б до 1,5 мм включительно.";
        return;
      }
    }
    const sideBMaterialForSave = sides === 2
      ? (sideBSelectionModeForSave === "same"
        ? (isFaceOnlyExtraVeneer(selectedVeneerA) ? backsideBVariantFor(selectedVeneerA) : sideAMaterialForSave)
        : sideBSelectionModeForSave === "other" ? sideBOtherMaterialForSave : null)
      : null;
    const sideBMaterialCostForSave = sideBVeneerMaterialCost(lastCalculation, sideBSelectionModeForSave);
    const sideBBaseRecord = sideBMaterialForSave ? materialSaveRecord(sideBMaterialForSave, "B", sides, sideBSelectionModeForSave === "same") : null;
    const materialSides = {
      A: materialSaveRecord(sideAMaterialForSave, "A", sides, false),
      B: sideBSelectionModeForSave === "rough" ? {
        side: "B",
        materialType: "rough_veneer",
        veneerType: "rough",
        typeName: "Черновой шпон",
        id: "rough_back_veneer",
        article: "",
        name: "Черновой шпон",
        thicknessMm: selectedRoughBackThickness(),
        thicknessSource: "meta.roughBackVeneerRatesPerM2ByThickness",
        totalVeneeredSides: sides,
        selectedAutomatically: false,
        selectionMode: "manual",
        sideType: "rough",
        pricePerM2: Number.isFinite(lastCalculation.roughBackVeneer?.ratePerM2) ? lastCalculation.roughBackVeneer.ratePerM2 : null,
        materialCost: Number.isFinite(lastCalculation.roughBackVeneer?.materialCost) ? lastCalculation.roughBackVeneer.materialCost : null,
        pricingStatus: lastCalculation.roughBackVeneer?.pricingStatus || "requires_clarification"
      } : sideBBaseRecord ? {
        ...sideBBaseRecord,
        sideType: sideBSelectionModeForSave === "same" ? "same" : "other",
        materialCost: Number.isFinite(sideBMaterialCostForSave) ? sideBMaterialCostForSave : null
      } : null
    };
    const readyShirtsForSave = (lastCalculation.readyShirtPricings || []).map((pricing) => ({
      materialType: "ready_shirt",
      side: pricing.which || pricing.pricingWhich || "",
      id: pricing.item?.id || "",
      series: pricing.item?.series || "",
      name: pricing.item?.displayName || pricing.item?.name || "",
      article: pricing.item?.article || "",
      origin: pricing.item?.origin || null,
      lengthMm: Number.isFinite(num(pricing.item?.lengthMm)) ? num(pricing.item.lengthMm) : null,
      widthMm: Number.isFinite(num(pricing.item?.widthMm)) ? num(pricing.item.widthMm) : null,
      areaM2: Number.isFinite(num(pricing.item?.areaM2)) ? num(pricing.item.areaM2) : null,
      thicknessMm: Number.isFinite(num(pricing.item?.thicknessMm)) ? num(pricing.item.thicknessMm) : null,
      thicknessSource: thicknessSourceForItem(pricing.item) || null,
      quantity: Number.isFinite(num(pricing.totalSheets)) ? num(pricing.totalSheets) : null,
      sides: Number.isFinite(num(pricing.surfaceCount)) ? num(pricing.surfaceCount) : null,
      priceCondition: {
        id: pricing.levelId || "retail",
        name: pricing.levelName || "Розничная цена",
        source: pricing.conditionSource || "retail",
        selectedConditionId: pricing.selectedConditionId || "",
        unresolved: Boolean(pricing.conditionUnresolved)
      },
      automaticPricePerM2: Number.isFinite(pricing.automaticPrice) ? veneerPricePerM2(pricing.item, pricing.automaticPrice) : null,
      appliedPricePerM2: Number.isFinite(pricing.finalPricePerM2) ? pricing.finalPricePerM2 : null,
      pricePerSheet: Number.isFinite(pricing.pricePerSheet) ? pricing.pricePerSheet : null,
      materialCost: Number.isFinite(pricing.finalPurchase?.cost) ? pricing.finalPurchase.cost : null,
      availabilityStatus: pricing.item?.availabilityStatus || "clarification",
      availabilityLabel: pricing.item?.availabilityLabel || "Наличие требует уточнения",
      source: pricing.item?.source || "",
      sourceSheet: pricing.item?.sourceSheet || "",
      requiresProductionCost: true,
      productionCostReason: pricing.item?.productionCostReason || "Требуется стоимость производства",
      requirementStatus: pricing.requirementStatus || (pricing.exact ? "calculated" : "requires_clarification"),
      requirementReason: pricing.requirementReason || ""
    }));
    const payload = {
      id: `plate_${Date.now()}`, productType: "plate", productTypeName: "Плитные материалы и изделия", createdAt: new Date().toISOString(),
      title: `${lastCalculation.base?.name || "Плита"} ${baseThicknessDisplay(lastCalculation.thickness)}`.trim(),
      base: lastCalculation.base?.name || "", baseId: lastCalculation.base?.id || "", baseCharacteristics: lastCalculation.base?.characteristics || [], baseThickness: lastCalculation.thickness.raw,
      basePrice: (lastCalculation.requiresBaseProductionCost || lastCalculation.requiresAllowanceProductionCost)
        ? { source: "production", sourceLabel: "Определяется производством на общей странице спецификации", cost: null }
        : { source: "automatic", sourceLabel: "Автоматический расчёт", cost: null },
      requiresProductionCost: Boolean(lastCalculation.requiresProductionCost),
      requiresBaseProductionCost: Boolean(lastCalculation.requiresBaseProductionCost),
      requiresLayoutProductionCost: Boolean(lastCalculation.requiresLayoutProductionCost),
      requiresAllowanceProductionCost: Boolean(lastCalculation.requiresAllowanceProductionCost),
      requiresOperationProductionCost: Boolean(lastCalculation.requiresOperationProductionCost),
      requiresReadyShirtProductionCost: Boolean(lastCalculation.requiresReadyShirtProductionCost),
      requiresFinishProductionCost: Boolean(lastCalculation.requiresFinishProductionCost),
      productionCostStatus: lastCalculation.productionCosts?.length&&lastCalculation.productionCosts.every(item=>item.status==='provided')?'provided':(lastCalculation.requiresProductionCost||lastCalculation.productionCosts?.length)?'pending_shared_specification':'not_required',
      layoutProductionCostStatus: lastCalculation.requiresLayoutProductionCost ? "pending_shared_specification" : "not_required",
      allowanceProductionCostStatus: lastCalculation.requiresAllowanceProductionCost ? "pending_shared_specification" : "not_required",
      readyShirtProductionCostStatus: lastCalculation.requiresReadyShirtProductionCost ? "pending_shared_specification" : "not_required",
      materialType: readyShirtSelected ? "ready_shirt" : "veneer",
      materialSides,
      veneerConsumptions: (lastCalculation.veneerConsumptions || []).map(veneerConsumptionSaveRecord),
      readyShirts: readyShirtsForSave,
      veneerType: readyShirtSelected ? "" : ((selectedVeneerA || selectedVeneerAGroup)?.typeName || ""),
      veneerA: readyShirtSelected ? "" : veneerDisplayName(selectedVeneerA || selectedVeneerAGroup),
      veneerThickness: readyShirtSelected ? null : selectedVeneerThickness(),
      veneerAPriceLevel: readyShirtSelected ? "" : (lastCalculation.veneerPricings.find((x) => x.which === "A")?.levelName || ""),
      sides, sideB: sides === 1 ? (form.reverseSideSelect.options[form.reverseSideSelect.selectedIndex]?.text || "") : (sideBSelectionModeForSave === "same" ? (isFaceOnlyExtraVeneer(selectedVeneerA) ? "Категория B той же породы (автоматически)" : veneerDisplayName(selectedVeneerA || selectedVeneerAGroup)) : sideBSelectionModeForSave === "rough" ? "Черновой шпон" : veneerDisplayName(selectedVeneerB || selectedVeneerBGroup)), veneerBPriceLevel: lastCalculation.veneerPricings.find((x) => x.which === "B")?.levelName || "",
      layout: needsLayoutSelection() ? (selectedLayout()?.name || "") : "",
      layoutId: needsLayoutSelection() ? (form.layoutSelect.value || "") : "",
      layoutAId: effectiveLayoutId(),
      layoutBId: effectiveLayoutBId(),
      layoutB: data.layouts.find(x => x.id === effectiveLayoutBId())?.name || "",
      sanding: sandingEnabled(),
      veneerCut: readyShirtSelected || effectiveLayoutId() === "mixmatch" ? "" : (["radial", "tangential"].includes(form.veneerCutSelect.value) ? (data.veneerCuts.find((x) => x.id === form.veneerCutSelect.value)?.name || "") : ""),
      veneerBCut: (() => {
        if (!needsLayoutSelection() || effectiveLayoutBId() === "mixmatch" || sides !== 2) return "";
        let patternId = "";
        if (sideBSelectionModeForSave === "other") patternId = form.veneerBCutSelect.value;
        if (sideBSelectionModeForSave === "same" && sideBMaterialForSave && !isReadyShirt(sideBMaterialForSave)) {
          const available = confirmedPatternTypes([sideBMaterialForSave]);
          const preferred = form.veneerCutSelect.value;
          patternId = available.includes(preferred) ? preferred : (available.length === 1 ? available[0] : "");
        }
        return ["radial", "tangential"].includes(patternId) ? (data.veneerCuts.find((x) => x.id === patternId)?.name || "") : "";
      })(),
      herringbone: needsLayoutSelection() && form.layoutSelect.value === "herringbone",
      layoutTzComment: needsLayoutSelection() ? form.layoutTzComment.value.trim() : "",
      layoutTzFiles: needsLayoutSelection() ? uploadedFileNames(form.layoutTzFiles) : [],
      sizes: lastCalculation.itemResults.map((x) => ({
        position: x.position,
        length: x.length,
        width: x.width,
        quantity: x.quantity,
        sizeInputMode: x.sizeInputMode || x.mode || "",
        manufacturingType: manufacturingTypeForSize(x),
        resultMode: x.resultMode,
        standardOrderType: x.standardOrderType || null,
        productionFitStatus: x.productionFitUnconfirmed ? "unconfirmed" : "fits_catalogue",
        productionLength: x.calcLength,
        productionWidth: x.calcWidth,
        cleanCuttingRequired: cleanCuttingRequired(x),
        cuttingPricingStatus: cleanCuttingRequired(x) ? (lastCalculation.techOperations?.cuttingPricingStatus || "pending") : "not_required",
        requiresProductionCost: Boolean(
          manufacturingTypeForSize(x) === "allowance20" ||
          selectedBasePriceMode(x) === "production" ||
          lastCalculation.requiresLayoutProductionCost ||
          lastCalculation.requiresReadyShirtProductionCost ||
          (cleanCuttingRequired(x) && (manufacturingCostFromProduction(x) || operationPriceComesFromProduction())) ||
          (manufacturingCostFromProduction(x) && lastCalculation.techOperations?.calibrationRequiresProductionCost) ||
          (lastCalculation.edge?.mode === "attached" && lastCalculation.edge?.operationRequiresProductionCost && (manufacturingCostFromProduction(x) || operationPriceComesFromProduction()) && (lastCalculation.edge?.positionSettings || []).some((item) => item.rowId === x.rowId && item.applies && item.calculatedMeters > 0))
        ),
        productionCostStatus: (
          manufacturingTypeForSize(x) === "allowance20" ||
          selectedBasePriceMode(x) === "production" ||
          lastCalculation.requiresLayoutProductionCost ||
          lastCalculation.requiresReadyShirtProductionCost ||
          (cleanCuttingRequired(x) && (manufacturingCostFromProduction(x) || operationPriceComesFromProduction())) ||
          (manufacturingCostFromProduction(x) && lastCalculation.techOperations?.calibrationRequiresProductionCost) ||
          (lastCalculation.edge?.mode === "attached" && lastCalculation.edge?.operationRequiresProductionCost && (manufacturingCostFromProduction(x) || operationPriceComesFromProduction()) && (lastCalculation.edge?.positionSettings || []).some((item) => item.rowId === x.rowId && item.applies && item.calculatedMeters > 0))
        ) ? "pending_shared_specification" : "not_required",
        veneerDemand: {
          sideA: {
            requiredVeneerAreaM2: Number.isFinite(x.veneerNetA) ? x.veneerNetA : null,
            recommendedVeneerAreaM2: Number.isFinite(x.veneerRecommendedA) ? x.veneerRecommendedA : null,
            actualAllocatedVeneerAreaM2: Number.isFinite(x.veneerRequiredA) ? x.veneerRequiredA : null
          },
          sideB: {
            requiredVeneerAreaM2: Number.isFinite(x.veneerNetB) ? x.veneerNetB : null,
            recommendedVeneerAreaM2: Number.isFinite(x.veneerRecommendedB) ? x.veneerRecommendedB : null,
            actualAllocatedVeneerAreaM2: Number.isFinite(x.veneerRequiredB) ? x.veneerRequiredB : null
          }
        },
        sheetVeneerCalculations: (x.sheetVeneerCalculations || []).map((calc) => ({
          side: calc.sameAsA ? "A+B" : calc.which,
          veneerId: calc.veneerId || "",
          veneerName: calc.veneerName || "",
          calculationMethod: calc.calculationMethod || "by_sheets",
          calculationMethodLabel: calc.calculationMethodLabel || "По листам",
          panelSize: calc.panelSize || null,
          groupQuantity: Number.isFinite(calc.groupQuantity) ? calc.groupQuantity : null,
          surfaceCount: Number.isFinite(calc.surfaceCount) ? calc.surfaceCount : null,
          physicalSheetFormat: calc.requirement ? { lengthMm: calc.requirement.physicalLengthMm ?? null, widthMm: calc.requirement.physicalWidthMm ?? null } : null,
          usableSheetFormat: calc.requirement ? { lengthMm: calc.requirement.usableLengthMm ?? null, widthMm: calc.requirement.usableWidthMm ?? null } : null,
          requiredAreaM2: Number.isFinite(calc.requirement?.netAreaM2) ? calc.requirement.netAreaM2 : null,
          technicalSheetsPerSurface: Number.isFinite(calc.requirement?.technicalSheetsPerSurface) ? calc.requirement.technicalSheetsPerSurface : null,
          technicalSheetDemand: Number.isFinite(calc.requirement?.technicalSheets) ? calc.requirement.technicalSheets : null,
          purchasedWholeSheets: Number.isFinite(calc.requirement?.purchasedSheets) ? calc.requirement.purchasedSheets : null,
          paidAreaM2: Number.isFinite(calc.requirement?.paidAreaM2) ? calc.requirement.paidAreaM2 : null,
          groupCost: Number.isFinite(calc.groupCost) ? calc.groupCost : null,
          allocatedCost: Number.isFinite(calc.allocatedCost) ? calc.allocatedCost : null,
          proportionalDistribution: Boolean(calc.proportionalDistribution)
        })),
        readyShirtCalculations: (x.readyShirtCalculations || []).map((calc) => ({
          materialType: "ready_shirt",
          side: calc.side || "",
          readyShirtId: calc.readyShirtId || "",
          readyShirtName: calc.readyShirtName || "",
          fitsSingleSheet: calc.requirement?.fitsSingleSheet === true,
          requirementStatus: calc.requirement?.exact ? "calculated" : "requires_clarification",
          reason: calc.requirement?.reason || "",
          quantity: Number.isFinite(calc.requirement?.sheets) ? calc.requirement.sheets : null,
          paidAreaM2: Number.isFinite(calc.requirement?.paidAreaM2) ? calc.requirement.paidAreaM2 : null,
          lengthMm: Number.isFinite(calc.requirement?.lengthMm) ? calc.requirement.lengthMm : null,
          widthMm: Number.isFinite(calc.requirement?.widthMm) ? calc.requirement.widthMm : null,
          areaPerSheetM2: Number.isFinite(calc.requirement?.areaPerSheetM2) ? calc.requirement.areaPerSheetM2 : null,
          allocatedCost: Number.isFinite(calc.allocatedCost) ? calc.allocatedCost : null
        })),
        area: x.area,
        productionCost:x.productionCost||null,
        weight: x.weight,
        transition: x.transition,
        transitionCoefficient: Number.isFinite(x.transitionCoefficient) ? x.transitionCoefficient : null,
        transitionCoefficientApplied: Number.isFinite(x.transitionCoefficientApplied) ? x.transitionCoefficientApplied : null,
        transitionPricingMode: x.transition ? (isExactFinishedDetail(x) ? "exact_base_work" : "not_applicable") : "none",
        comment: x.comment,
        files: x.files,
        standard: x.classificationId !== "nonstandard",
        classificationId: x.classificationId,
        classificationName: x.classificationName,
        ...(window.WoodstockPanelsView?.positionPricing ? {
          knownSubtotal: x.positionKnownTotal,
          knownPricePerM2: x.positionKnownPricePerM2,
          knownPricePerPiece: x.positionKnownPricePerPiece,
          pricingPartial: x.positionPricingPartial,
          pendingCosts: x.positionPendingCosts || []
        } : {}),
        pricingComplete: window.WoodstockPanelsView?.positionPricing ? !x.positionPricingPartial && Number.isFinite(x.positionKnownTotal) : Boolean(x.positionPricingComplete),
        total: window.WoodstockPanelsView?.positionPricing ? (!x.positionPricingPartial ? x.positionKnownTotal : null) : Number.isFinite(x.positionTotal) ? x.positionTotal : null,
        pricePerM2: window.WoodstockPanelsView?.positionPricing ? (!x.positionPricingPartial ? x.positionKnownPricePerM2 : null) : Number.isFinite(x.positionPricePerM2) ? x.positionPricePerM2 : null,
        pricePerPiece: window.WoodstockPanelsView?.positionPricing ? (!x.positionPricingPartial ? x.positionKnownPricePerPiece : null) : Number.isFinite(x.positionPricePerPiece) ? x.positionPricePerPiece : null
      })),
      edge: lastCalculation.edge?.mode === "none" ? {
        mode: "none",
        requiresSeparateSpecification: false
      } : {
        mode: lastCalculation.edge.mode,
        requiresSeparateSpecification: true,
        catalogItemId: lastCalculation.edge.catalogItemId || null,
        typeId: lastCalculation.edge.typeId || "",
        typeName: lastCalculation.edge.typeName || "",
        name: lastCalculation.edge.name || "",
        displayName: lastCalculation.edge.displayName || "",
        veneerName: lastCalculation.edge.veneerName || "",
        thicknessMm: Number.isFinite(lastCalculation.edge.thicknessMm) ? lastCalculation.edge.thicknessMm : null,
        thicknessApplicable: Boolean(lastCalculation.edge.thicknessApplicable),
        widthMm: Number.isFinite(lastCalculation.edge.widthMm) ? lastCalculation.edge.widthMm : null,
        manualOrderPricePerM2: Number.isFinite(lastCalculation.edge.manualOrderPricePerM2) ? lastCalculation.edge.manualOrderPricePerM2 : null,
        hasGlue: lastCalculation.edge.hasGlue ?? null,
        hasFleece: lastCalculation.edge.hasFleece ?? null,
        sidesId: lastCalculation.edge.sidesId || null,
        sides: lastCalculation.edge.sidesName || null,
        ...(lastCalculation.edge.mode === "separate" ? {
          geometricMeters: lastCalculation.edge.geometricMeters,
          calculatedMeters: lastCalculation.edge.calculatedMeters,
          reserveCoefficient: 1,
          metersSource: lastCalculation.edge.metersSource,
          manuallyAdjusted: separateEdgeMetersManual
        } : {}),
        ...(lastCalculation.edge.mode === "attached" ? {
          geometricMeters: Number.isFinite(lastCalculation.edge.geometricMeters) ? lastCalculation.edge.geometricMeters : null,
          calculatedMeters: Number.isFinite(lastCalculation.edge.calculatedMeters) ? lastCalculation.edge.calculatedMeters : null,
          reserveCoefficient: Number.isFinite(lastCalculation.edge.reserveCoefficient) ? lastCalculation.edge.reserveCoefficient : 1,
          positionSettings: (lastCalculation.edge.positionSettings || []).map((item) => ({
            rowId: item.rowId || "",
            position: item.position || null,
            length: Number.isFinite(item.length) ? item.length : null,
            width: Number.isFinite(item.width) ? item.width : null,
            quantity: Number.isFinite(item.quantity) ? item.quantity : null,
            mode: item.mode || "inherit",
            applies: item.applies === true,
            sidesId: item.sidesId || null,
            sides: item.sidesName || null,
            thicknessMm: Number.isFinite(item.thicknessMm) ? item.thicknessMm : null,
            widthMm: item.selection?.widthMm ?? null,
            catalogItemId: item.selection?.catalogItemId || null,
            stockProgram: Boolean(item.selection?.stockProgram),
            orderPosition: Boolean(item.selection?.orderPosition),
            priceConditionId: item.selection?.conditionId || "retail",
            priceConditionName: item.selection?.conditionName || "Розничная цена",
            priceConditionSource: item.selection?.conditionSource || "retail",
            pricePerRunningM: Number.isFinite(item.selection?.pricePerRunningM) ? item.selection.pricePerRunningM : null,
            manualOrderPricePerM2: Number.isFinite(item.selection?.manualOrderPricePerM2) ? item.selection.manualOrderPricePerM2 : null,
            volumePricingDeferred: Boolean(item.selection?.volumePricingDeferred),
            volumePriceLevels: item.selection?.volumePriceLevels || null,
            volumePriceRanges: item.selection?.volumePriceRanges || null,
            orderRunningM: Number.isFinite(item.selection?.orderRunningM) ? item.selection.orderRunningM : null,
            geometricMeters: Number.isFinite(item.geometricMeters) ? item.geometricMeters : 0,
            calculatedMeters: Number.isFinite(item.calculatedMeters) ? item.calculatedMeters : 0,
            reserveCoefficient: Number.isFinite(item.reserveCoefficient) ? item.reserveCoefficient : 1
          }))
        } : {}),
        orderedMeters: Number.isFinite(lastCalculation.edge.orderedMeters) ? lastCalculation.edge.orderedMeters : null,
        meters: Number.isFinite(lastCalculation.edge.meters) ? lastCalculation.edge.meters : null,
        bevel: Boolean(lastCalculation.edge.bevel),
        comment: lastCalculation.edgeComment || "",
        priceCondition: {
          id: lastCalculation.edge.conditionId || "retail",
          name: lastCalculation.edge.conditionName || "Розничная цена",
          source: lastCalculation.edge.conditionSource || "retail"
        },
        orderRunningM: Number.isFinite(lastCalculation.edge.orderRunningM) ? lastCalculation.edge.orderRunningM : null,
        pricePerRunningM: Number.isFinite(lastCalculation.edge.pricePerRunningM) ? lastCalculation.edge.pricePerRunningM : null,
        materialCost: Number.isFinite(lastCalculation.edge.materialCost) ? lastCalculation.edge.materialCost : null,
        operationCost: Number.isFinite(lastCalculation.edge.operationCost) ? lastCalculation.edge.operationCost : null,
        operationRatePerRunningM: Number.isFinite(lastCalculation.edge.operationRatePerRunningM) ? lastCalculation.edge.operationRatePerRunningM : null,
        operationMethod: lastCalculation.edge.operationMethod || null,
        operationPricingStatus: lastCalculation.edge.operationPricingStatus || "not_required",
        operationRequiresProductionCost: lastCalculation.edge.operationRequiresProductionCost === true,
        materialPricingStatus: lastCalculation.edge.materialPricingStatus || "pending",
        stockProgram: Boolean(lastCalculation.edge.stockProgram),
        orderPosition: Boolean(lastCalculation.edge.orderPosition),
        volumePriceLevels: lastCalculation.edge.volumePriceLevels || null,
        volumePriceRanges: lastCalculation.edge.volumePriceRanges || null
      },
      technologicalOperations: lastCalculation.techOperations,
      calibration: {
        enabled: lastCalculation.techOperations?.calibration === true,
        required: lastCalculation.techOperations?.calibrationRequired === true,
        sourceBaseThicknessMm: Number.isFinite(lastCalculation.techOperations?.calibrationSourceBaseThicknessMm) ? lastCalculation.techOperations.calibrationSourceBaseThicknessMm : null,
        baseThicknessAfterCalibrationMm: Number.isFinite(lastCalculation.techOperations?.baseThicknessAfterCalibrationMm) ? lastCalculation.techOperations.baseThicknessAfterCalibrationMm : null,
        depthMm: Number.isFinite(lastCalculation.techOperations?.calibrationDepth) ? lastCalculation.techOperations.calibrationDepth : null,
        ratePerM2PerMm: Number.isFinite(lastCalculation.techOperations?.calibrationRatePerM2PerMm) ? lastCalculation.techOperations.calibrationRatePerM2PerMm : null,
        effectiveRatePerM2: Number.isFinite(lastCalculation.techOperations?.calibrationRatePerM2) ? lastCalculation.techOperations.calibrationRatePerM2 : null,
        areaM2: Number.isFinite(lastCalculation.techOperations?.calibrationArea) ? lastCalculation.techOperations.calibrationArea : null,
        cost: Number.isFinite(lastCalculation.techOperations?.calibrationCost) ? lastCalculation.techOperations.calibrationCost : null,
        finishedProductThicknessMm: Number.isFinite(lastCalculation.techOperations?.calibrationFinishedProductThicknessMm) ? lastCalculation.techOperations.calibrationFinishedProductThicknessMm : null,
        pricingStatus: lastCalculation.techOperations?.calibrationPricingStatus || "not_required",
        includedInProductionCost: lastCalculation.techOperations?.calibrationIncludedInProductionCost === true,
        requiresProductionCost: lastCalculation.techOperations?.calibrationRequiresProductionCost === true
      },
      finish: finishSummary(currentGlobalFinishConfig()),
      finishParameters: finishConfigForPersistence(currentGlobalFinishConfig()),
      finishByPosition: (lastCalculation.finishResults || []).map((item) => ({
        position: item.position,
        rowId: item.rowId || "",
        summary: item.summary,
        ...finishConfigForPersistence(item.config),
        areaM2: Number.isFinite(item.areaM2) ? item.areaM2 : null,
        processedSideCount: Number.isFinite(item.processedSideCount) ? item.processedSideCount : null,
        extraProcessedAreaM2: Number.isFinite(item.extraProcessedAreaM2) ? item.extraProcessedAreaM2 : null,
        appliedRatePerM2: Number.isFinite(item.appliedRatePerM2) ? item.appliedRatePerM2 : null,
        coatingCost: Number.isFinite(item.coatingCost) ? item.coatingCost : null,
        toningRatePerM2: Number.isFinite(item.toningRatePerM2) ? item.toningRatePerM2 : null,
        toningCost: Number.isFinite(item.toningCost) ? item.toningCost : 0,
        toningPricingStatus: item.toningPricingStatus || "not_required",
        isolatorRatePerM2: Number.isFinite(item.isolatorRatePerM2) ? item.isolatorRatePerM2 : null,
        isolatorCost: Number.isFinite(item.isolatorCost) ? item.isolatorCost : 0,
        isolatorPricingStatus: item.isolatorPricingStatus || "not_required",
        additionalCost: Number.isFinite(item.additionalCost) ? item.additionalCost : 0,
        knownFinishCost: Number.isFinite(item.knownFinishCost) ? item.knownFinishCost : 0,
        totalFinishCost: Number.isFinite(item.totalFinishCost) ? item.totalFinishCost : null,
        pricingStatus: item.pricingStatus || "not_required",
        requiresProductionCost: item.requiresProductionCost === true
      })),
      clientCondition: form.clientConditionSelect.value, mdfVolumeCondition: null, manualDiscountPercent: Number(lastCalculation.manualDiscountPercent || 0), manualDiscountApplied: Boolean(lastCalculation.manualDiscountApplied),
      comment: form.commentInput.value.trim(), files: uploadedFileNames(form.filesInput),
      totalArea: lastCalculation.totalArea, total: lastCalculation.priceCalculationComplete ? lastCalculation.finalTotal : null, vat: lastCalculation.priceCalculationComplete ? lastCalculation.vat : null, totalWeight: lastCalculation.totalWeight, pricePerM2: lastCalculation.priceCalculationComplete ? lastCalculation.avgM2 : null, pricePerPiece: lastCalculation.priceCalculationComplete ? lastCalculation.avgPiece : null, pricingPartial: !lastCalculation.priceCalculationComplete, pricing: pricingSnapshot(lastCalculation), warnings: lastCalculation.warnings
    };
    payload.productionCosts=lastCalculation.productionCosts||[];
    if(payload.basePrice.source==='production'){
      payload.basePrice.cost=payload.productionCosts.length&&payload.productionCosts.every(item=>item.status==='provided')?payload.productionCosts.reduce((sum,item)=>sum+item.amount,0):null;
      if(payload.basePrice.cost!==null)payload.basePrice.sourceLabel='Введённая стоимость основы и работ от производства с НДС';
    }
    if(window.WoodstockSpecificationGroupId)payload.calculationGroupId=window.WoodstockSpecificationGroupId;
    payload.editorState = exportSpecificationState();
    payload.specification = {
      characteristics: window.WoodstockSpecificationState.details(form.specCharacteristics),
      sizes: Array.from(form.specSizes.querySelectorAll('.spec-position-block')).map(node => window.WoodstockSpecificationState.details(node)),
      knownTotal: lastCalculation.finalTotal,
      knownVat: lastCalculation.vat,
      unallocatedCost: lastCalculation.orderLevelUnallocatedCost,
      breakdown: lastCalculation.breakdown,
      adjustments: window.WoodstockSpecificationState.details(form.priceAdjustmentsList)
    };
    if (capture) return payload;
    window.WoodstockSpecificationState.save(payload);
    return;
  }

  function bind() {
    form.baseSelect.addEventListener("change", () => {
      markFieldTouched("base");
      clearTouchedFields("baseThickness", "calibration", "calibrationTarget");
      updateBaseUI();
    });
    form.baseThicknessSelect.addEventListener("change", () => {
      markFieldTouched("baseThickness");
      clearTouchedFields("calibration", "calibrationTarget");
      updateBaseProductionCostHint();
      updateThicknessWarnings();
      updateEdgeUI();
      updateCalibrationUI();
      renderStandardSizes();
      revalidateCustomSizeRows();
      recalc();
    });
    form.veneerTypeSelect.addEventListener("change", () => {
      markFieldTouched("veneerType");
      clearTouchedFields("veneerA", "veneerThickness", "veneeredSides", "veneerB", "veneerBMode", "veneerBRoughThickness", "layout", "layoutTz", "veneerAPrice", "veneerBPrice", "veneerACondition", "veneerBCondition");
      clearTouchedPrefix("veneerActual:");
      const selectedType = form.veneerTypeSelect.value;
      const keepSelection = Boolean(selectedVeneerAGroup && materialTypeOf(selectedVeneerAGroup) === selectedType);
      syncLayoutOptions({ preserve: keepSelection });
      if (!keepSelection) resetVeneerASelection();
      if (!keepSelection && ["design", "multi"].includes(selectedType)) form.layoutSelect.value = "straight";
      else if (!keepSelection) form.layoutSelect.value = "";
      updateVeneerAInputAvailability();
      updateVeneerThicknessOptions({ preserve: keepSelection });
      applyVeneerThicknessRules();
      syncMaterialSpecificUI();
      renderStandardSizes();
      recalc();
    });
    form.veneerThicknessSelect.addEventListener("change", onVeneerThicknessChanged);
    form.veneeredSidesSelect.addEventListener("change", () => { markFieldTouched("veneeredSides"); clearTouchedFields("veneerB", "veneerBMode", "veneerBRoughThickness", "layout", "layoutTz"); updateSidesUI(); });
    form.reverseSideSelect.addEventListener("change", () => { renderStandardSizes(); recalc(); });
    form.veneerBModeSelect.addEventListener("change", () => { markFieldTouched("veneerBMode"); clearTouchedFields("veneerB", "veneerBRoughThickness", "layout", "layoutTz"); updateSidesUI(); });
    form.veneerBRoughThicknessSelect?.addEventListener("change", () => { markFieldTouched("veneerBRoughThickness"); recalc(); });
    form.layoutBSelect.addEventListener("change", () => { clearPriceOverrides("veneer-actual:"); updateLayoutUI(); recalc(); });
    form.sandingSelect.addEventListener("change", () => { renderStandardSizes(); recalc(); });
    form.layoutSelect.addEventListener("change", () => { if (form.layoutSelect.value) markFieldTouched("layout"); else clearTouchedFields("layout"); clearTouchedFields("layoutTz"); layoutFieldInteracted = Boolean(form.layoutSelect.value); updateLayoutUI(); });
    form.layoutSelect.addEventListener("blur", () => { if (form.layoutSelect.value) markFieldTouched("layout"); recalc(); });
    form.veneerCutSelect.addEventListener("change", onVeneerCutChanged); form.veneerBCutSelect.addEventListener("change", onVeneerBCutChanged);
    form.layoutTzComment.addEventListener("input", () => { setLayoutTzError(false); recalc(); });
    form.layoutTzComment.addEventListener("blur", () => { if (form.layoutTzComment.value.trim()) markFieldTouched("layoutTz"); recalc(); });

    form.addSizeRowBtn.addEventListener("click", () => addSizeRow());
    form.sizeRows.addEventListener("keydown", (e) => {
      if (!e.target.matches('[data-size-quantity]')) return;
      if ([".", ",", "-", "+", "e", "E"].includes(e.key)) e.preventDefault();
    });
    form.sizeRows.addEventListener("focusin", (e) => {
      const row = e.target.closest('[data-size-row]');
      if (row) setActiveSizeRow(row);
    });
    form.sizeRows.addEventListener("click", (e) => {
      const row = e.target.closest('[data-size-row]');
      if (!row) return;

      const duplicate = e.target.closest('[data-duplicate-size-row]');
      if (duplicate) {
        duplicateSizeRow(row);
        return;
      }

      const remove = e.target.closest('[data-remove-size-row]');
      if (remove) {
        if ($$('[data-size-row]', form.sizeRows).length > 1) {
          capturePositionFinishStateFromDom();
          capturePositionEdgeStateFromDom();
          positionFinishState.delete(row.dataset.rowId);
          positionEdgeState.delete(row.dataset.rowId);
          clearTouchedPrefix(`positionEdge:${row.dataset.rowId}:`);
          clearTouchedPrefix(`positionFinish:${row.dataset.rowId}:`);
          row.remove();
          activeSizeRow = $('[data-size-row]', form.sizeRows);
          updateSizeRemoveButtons();
          if (positionFinishOverridesEnabled) renderPositionFinishOverrides();
          recalc();
        }
        return;
      }

      const standardSize = e.target.closest('[data-standard-size]');
      if (standardSize) {
        applyStandardSize(row, Number(standardSize.dataset.length), Number(standardSize.dataset.width));
        return;
      }

      if (e.target.closest('[data-custom-size-toggle]')) {
        setCustomSizeMode(row);
        return;
      }

    });
    form.sizeRows.addEventListener("input", (e) => {
      if (!e.target.matches('[data-size-length],[data-size-width],[data-size-quantity],[data-size-comment],[data-size-production-price]')) return;
      const row = e.target.closest('[data-size-row]');
      if (row) {
        if (e.target.matches('[data-size-length]')) setSizeFieldError(row, "length", "");
        if (e.target.matches('[data-size-width]')) setSizeFieldError(row, "width", "");
        if (e.target.matches('[data-size-quantity]')) setSizeQuantityError(row, "");
        updateSizeRowAvailability(row);
        updateSizeTransitionUI(row);
        updatePositionFinishLabels();
      }
      recalc();
    });
    form.sizeRows.addEventListener("focusout", (e) => {
      const row = e.target.closest('[data-size-row]');
      if (!row) return;
      const rowId = row.dataset.rowId || "";
      if (e.target.matches('[data-size-quantity]')) {
        if (e.target.value.trim()) markFieldTouched(`sizeQuantity:${rowId}`);
        validateSizeQuantity(row, Boolean(row.dataset.sizeMode && $('[data-size-length]', row)?.value && $('[data-size-width]', row)?.value));
      }
      if (e.target.matches('[data-size-comment]')) {
        markFieldTouched(`sizeTransitionDetails:${rowId}`);
        updateSizeTransitionUI(row);
      }
      const standardExact = row.dataset.sizeMode === "standard" && manufacturingTypeForRow(row) === "exact";
      if (row.dataset.sizeMode !== "custom" && !standardExact) return;
      if (e.target.matches('[data-size-length]')) validateCustomSizeOnBlur(e.target, row, "length", "Длина");
      if (e.target.matches('[data-size-width]')) validateCustomSizeOnBlur(e.target, row, "width", "Ширина");
    });
    form.sizeRows.addEventListener("change", (e) => {
      const row = e.target.closest('[data-size-row]');
      if (!row) return;
      if (e.target.matches('[data-size-manufacturing-type]')) {
        syncLegacySizeFields(row);
        if (row.dataset.sizeMode === "standard") {
          syncStandardManufacturingMode(row, { resetExact: true });
          const widthInput = $('[data-size-width]', row);
          if (manufacturingTypeForRow(row) === "exact" && widthInput?.value.trim()) {
            validateCustomSizeOnBlur(widthInput, row, "width", "Ширина");
          } else {
            recalc();
          }
        } else {
          updateSizeRowAvailability(row);
          const widthInput = $('[data-size-width]', row);
          if (widthInput?.value.trim()) {
            validateCustomSizeOnBlur(widthInput, row, "width", "Ширина");
          } else {
            recalc();
          }
        }
      }
      if (e.target.matches('[data-size-transition]')) {
        markFieldTouched(`sizeTransition:${row.dataset.rowId || ""}`);
        clearTouchedFields(`sizeTransitionDetails:${row.dataset.rowId || ""}`);
        updateSizeTransitionUI(row);
        recalc();
      }
    });

    form.edgeModeSelect.addEventListener("change", () => { clearTouchedFields("edgeSides", "attachedEdgeType", "attachedEdgeMaterial", "attachedEdgeThickness", "attachedEdgeWidth", "separateEdgeType", "separateEdgeMaterial", "separateEdgeThickness", "separateEdgeWidth", "separateEdgeMeters"); updateEdgeUI(); });
    form.edgeTypeSelect.addEventListener("change", () => { markFieldTouched("attachedEdgeType"); clearTouchedFields("attachedEdgeMaterial", "attachedEdgeThickness", "attachedEdgeWidth"); clearTouchedPrefix("positionEdge:"); onEdgeTypeChanged("attached"); });
    form.separateEdgeTypeSelect.addEventListener("change", () => { markFieldTouched("separateEdgeType"); clearTouchedFields("separateEdgeMaterial", "separateEdgeThickness", "separateEdgeWidth"); onEdgeTypeChanged("separate"); });
    form.edgeSidesSelect.addEventListener("change", () => { markFieldTouched("edgeSides"); recalc(); });
    form.edgeThicknessSelect.addEventListener("change", () => { markFieldTouched("attachedEdgeThickness"); clearTouchedFields("attachedEdgeWidth"); syncEdgeWidthOptions("attached", { preserve: false }); recalc(); });
    form.separateEdgeThicknessSelect.addEventListener("change", () => { markFieldTouched("separateEdgeThickness"); clearTouchedFields("separateEdgeWidth"); syncEdgeWidthOptions("separate", { preserve: false }); recalc(); });
    form.edgeWidthSelect.addEventListener("change", () => { edgeWidthAutomatic.attached = false; markFieldTouched("attachedEdgeWidth"); recalc(); });
    form.separateEdgeWidthSelect.addEventListener("change", () => { edgeWidthAutomatic.separate = false; markFieldTouched("separateEdgeWidth"); recalc(); });
    form.edgeOrderWidthInput.addEventListener("input", () => { edgeWidthAutomatic.attached = false; recalc(); });
    form.separateEdgeOrderWidthInput.addEventListener("input", () => { edgeWidthAutomatic.separate = false; recalc(); });
    form.edgeOrderPriceInput?.addEventListener("input", recalc);
    form.separateEdgeOrderPriceInput?.addEventListener("input", recalc);
    form.edgeBevelSelect.addEventListener("change", recalc);
    form.positionEdgeToggle?.addEventListener("click", () => {
      capturePositionEdgeStateFromDom();
      positionEdgeOverridesEnabled = !positionEdgeOverridesEnabled;
      form.positionEdgeToggle.setAttribute("aria-expanded", String(positionEdgeOverridesEnabled));
      form.positionEdgeToggle.textContent = positionEdgeOverridesEnabled ? "Скрыть настройки кромки по позициям" : "Настроить кромку по позициям";
      form.positionEdgeOverrides.classList.toggle("is-hidden", !positionEdgeOverridesEnabled);
      if (positionEdgeOverridesEnabled) renderPositionEdgeOverrides();
      recalc();
    });
    form.positionEdgeOverrides?.addEventListener("change", (e) => {
      const card = e.target.closest('[data-position-edge-row]');
      if (!card) return;
      const rowId = card.dataset.positionEdgeRow;
      if (e.target.matches('[data-position-edge-mode]')) {
        clearTouchedPrefix(`positionEdge:${rowId}:`);
        const previous = normalizePositionEdgeState(positionEdgeState.get(rowId) || defaultPositionEdgeState());
        const mode = e.target.value;
        positionEdgeState.set(rowId, normalizePositionEdgeState({
          ...previous, mode,
          sidesId: mode === "custom" ? (previous.sidesId || form.edgeSidesSelect.value) : previous.sidesId,
          thicknessMm: mode === "custom" ? (Number.isFinite(previous.thicknessMm) ? previous.thicknessMm : currentEdgeThickness("attached")) : previous.thicknessMm
        }));
        renderPositionEdgeOverrides(false);
      } else {
        if (e.target.matches('[data-position-edge-sides]')) markFieldTouched(`positionEdge:${rowId}:sides`);
        if (e.target.matches('[data-position-edge-thickness]')) markFieldTouched(`positionEdge:${rowId}:thickness`);
        capturePositionEdgeStateFromDom();
        if (e.target.matches('[data-position-edge-thickness]')) renderPositionEdgeOverrides(false);
      }
      recalc();
    });
    form.separateEdgeSidesSelect.addEventListener("change", recalc);
    form.separateEdgeMetersReset.addEventListener("click", () => {
      separateEdgeMetersManual = false;
      setSeparateEdgeMetersError("");
      recalc();
    });
    form.separateEdgeMetersInput.addEventListener("input", () => {
      separateEdgeMetersManual = true;
      setSeparateEdgeMetersError("");
      const meters = num(form.separateEdgeMetersInput.value);
      const minMeters = separateEdgeMinimumMeters();
      setSeparateEdgeMetersWarning(Number.isFinite(meters) && meters > 0 && Number.isFinite(minMeters) && meters < minMeters
        ? `Менее ${minMeters} пог. м: минимум пока не подтверждён на уровне одной позиции. Проверьте общий метраж заявки.`
        : "");
      recalc();
    });
    form.separateEdgeMetersInput.addEventListener("blur", validateSeparateEdgeMetersOnBlur);
    form.edgeCommentInput.addEventListener("input", recalc);
    form.calibrationSelect.addEventListener("change", () => {
      markFieldTouched("calibration");
      clearTouchedFields("calibrationTarget");
      const active = calibrationAvailableForBase() && form.calibrationSelect.value === "yes";
      if (!active) form.calibrationTargetInput.value = "";
      updateCalibrationUI();
      recalc();
    });
    form.calibrationTargetInput.addEventListener("input", () => {
      setControlError(form.calibrationTargetInput, "calibrationTarget", "", form.calibrationTargetError);
      syncCalibrationDepthInput();
      recalc();
    });
    form.calibrationTargetInput.addEventListener("blur", () => {
      markFieldTouched("calibrationTarget");
      recalc();
    });

    form.finishSelect.addEventListener("change", () => {
      clearTouchedFields("finishGloss", "finishProcess", "finishEnamel");
      updateFinishUI();
    });
    form.lacquerExecutionSelect?.addEventListener("change", () => {
      clearTouchedFields("finishGloss", "finishProcess");
      updateFinishUI();
    });
    form.toningSelect?.addEventListener("change", recalc);
    form.finishSidesSelect.addEventListener("change", () => {
      globalFinishSidesManual = true;
      clearTouchedFields("finishProcess");
      updateLacquerProcessOptions();
      recalc();
    });
    form.isolatorSelect?.addEventListener("change", recalc);
    [
      [form.lacquerGlossSelect, "finishGloss"],
      [form.lacquerProcessSelect, "finishProcess"],
      [form.enamelVariantSelect, "finishEnamel"]
    ].forEach(([control, key]) => {
      if (!control) return;
      control.addEventListener("change", () => { markFieldTouched(key); recalc(); });
      control.addEventListener("blur", () => { markFieldTouched(key); recalc(); });
    });
    form.positionFinishToggle.addEventListener("click", () => {
      capturePositionFinishStateFromDom();
      positionFinishOverridesEnabled = !positionFinishOverridesEnabled;
      form.positionFinishToggle.setAttribute("aria-expanded", String(positionFinishOverridesEnabled));
      form.positionFinishToggle.textContent = positionFinishOverridesEnabled ? "Скрыть настройки по позициям" : "Настроить финиш по позициям";
      form.positionFinishOverrides.classList.toggle("is-hidden", !positionFinishOverridesEnabled);
      if (positionFinishOverridesEnabled) renderPositionFinishOverrides();
      recalc();
    });

    form.positionFinishOverrides.addEventListener("change", (e) => {
      const card = e.target.closest('[data-position-finish-row]');
      if (!card) return;
      const rowId = card.dataset.positionFinishRow;
      if (e.target.matches('[data-position-finish-select]')) {
        clearTouchedPrefix(`positionFinish:${rowId}:`);
      }
      if (e.target.matches('[data-position-lacquer-execution]')) {
        clearTouchedFields(`positionFinish:${rowId}:gloss`, `positionFinish:${rowId}:process`);
      }
      if (e.target.matches('[data-position-finish-sides]')) {
        const previous = positionFinishState.get(rowId) || defaultPositionFinishState();
        positionFinishState.set(rowId, { ...previous, sides: e.target.value, sidesManual: true });
        clearTouchedFields(`positionFinish:${rowId}:process`);
      }
      if (e.target.matches('[data-position-lacquer-gloss]')) markFieldTouched(`positionFinish:${rowId}:gloss`);
      if (e.target.matches('[data-position-lacquer-process]')) markFieldTouched(`positionFinish:${rowId}:process`);
      if (e.target.matches('[data-position-enamel-variant]')) markFieldTouched(`positionFinish:${rowId}:enamel`);
      capturePositionFinishStateFromDom();
      if (e.target.matches('[data-position-finish-select],[data-position-lacquer-execution],[data-position-toning],[data-position-finish-sides]')) {
        renderPositionFinishOverrides();
      } else {
        updatePositionFinishLabels();
      }
      recalc();
    });
    form.positionFinishOverrides.addEventListener("focusout", (e) => {
      const card = e.target.closest('[data-position-finish-row]');
      if (!card) return;
      const rowId = card.dataset.positionFinishRow;
      if (e.target.matches('[data-position-lacquer-gloss]')) markFieldTouched(`positionFinish:${rowId}:gloss`);
      if (e.target.matches('[data-position-lacquer-process]')) markFieldTouched(`positionFinish:${rowId}:process`);
      if (e.target.matches('[data-position-enamel-variant]')) markFieldTouched(`positionFinish:${rowId}:enamel`);
      recalc();
    });
    form.clientConditionSelect.addEventListener("change", () => {
      if (!manualDiscountAvailable()) {
        manualDiscountPercentState = 0;
        form.manualDiscountInput.value = "0";
        clearTouchedFields("manualDiscount");
        form.manualDiscountError.textContent = "";
        form.manualDiscountField.classList.remove("field--invalid");
        form.manualDiscountInput.setAttribute("aria-invalid", "false");
      }
      recalc();
    });
    form.manualDiscountInput.addEventListener("input", () => {
      if (!manualDiscountAvailable()) return;
      const raw = String(form.manualDiscountInput.value || "").trim();
      const value = Number(raw.replace(",", "."));
      const valid = raw && Number.isFinite(value) && value >= 0 && value <= 10 && Math.abs(value * 10 - Math.round(value * 10)) < 1e-8;
      manualDiscountPercentState = valid ? value : 0;
      if (valid) {
        clearTouchedFields("manualDiscount");
        form.manualDiscountError.textContent = "";
        form.manualDiscountField.classList.remove("field--invalid");
        form.manualDiscountInput.setAttribute("aria-invalid", "false");
      }
      recalc();
    });
    form.manualDiscountInput.addEventListener("blur", () => {
      if (!manualDiscountAvailable()) return;
      const raw = String(form.manualDiscountInput.value || "").trim();
      const value = Number(raw.replace(",", "."));
      const valid = raw && Number.isFinite(value) && value >= 0 && value <= 10 && Math.abs(value * 10 - Math.round(value * 10)) < 1e-8;
      if (!valid) {
        manualDiscountPercentState = 0;
        form.manualDiscountInput.value = "";
        markFieldTouched("manualDiscount");
      } else {
        manualDiscountPercentState = value;
        clearTouchedFields("manualDiscount");
      }
      recalc();
    });
    form.commentInput.addEventListener("input", recalc); form.addToSpecButton.addEventListener("click", saveToSpecification);
    bindFileInput(form.layoutTzFiles, form.layoutTzFileNames, true);
    form.layoutTzFiles.addEventListener("change", () => { markFieldTouched("layoutTz"); setLayoutTzError(false); recalc(); });
    if (!window.WoodstockPanelsView || new URLSearchParams(location.search).has("specEngine")) bindFileInput(form.filesInput, form.selectedFiles, true);
  }

  async function init() {
    try {
      const response = await fetch(DATA_URL); if (!response.ok) throw new Error(`HTTP ${response.status}`); data = await response.json();
      setupAutocomplete({
        input: form.veneerAInput,
        menu: form.veneerASuggestions,
        clear: form.veneerAClear,
        error: form.veneerAError,
        validationKey: "veneerA",
        getItems: () => availableVeneers("A"),
        getSelected: () => selectedVeneerAGroup,
        onSelect: onVeneerASelected,
        onInput: (value) => {
          if (selectedVeneerAGroup && value.trim() !== veneerDisplayName(selectedVeneerAGroup)) {
            resetVeneerASelection({ clearInput: false });
            renderStandardSizes();
            recalc();
          }
        },
        onClear: () => {
          resetVeneerASelection();
          renderStandardSizes();
          recalc();
        }
      });
      setupAutocomplete({
        input: form.veneerBInput,
        menu: form.veneerBSuggestions,
        clear: form.veneerBClear,
        error: form.veneerBError,
        validationKey: "veneerB",
        getItems: () => availableVeneers("B"),
        getSelected: () => selectedVeneerBGroup,
        onSelect: onVeneerBSelected,
        onInput: (value) => {
          if (selectedVeneerBGroup && value.trim() !== veneerDisplayName(selectedVeneerBGroup)) {
            selectedVeneerBGroup = null;
            selectedVeneerB = null;
            veneerBPriceAuto = true;
            veneerConditionChoices.B = "";
            syncVeneerBCutUI(false);
            recalc();
          }
        },
        onClear: () => { selectedVeneerBGroup = null; selectedVeneerB = null; veneerBPriceAuto = true; veneerConditionChoices.B = ""; form.veneerBError.textContent = ""; syncVeneerBCutUI(false); recalc(); }
      });
      setupEdgeAutocomplete("attached");
      setupEdgeAutocomplete("separate");
      populate(); bind(); syncEdgeVeneerDefaults(); updateEdgeUI(); recalc();
    } catch (error) { console.error(error); form.saveStatus.textContent = "Не удалось загрузить данные расчёта. Откройте прототип через локальный HTTP-сервер."; }
  }


  function exportSpecificationState() {
    capturePositionFinishStateFromDom(); capturePositionEdgeStateFromDom();
    return window.WoodstockSpecificationState.clone({
      version:1, form:window.WoodstockSpecificationState.snapshot(form.root,getUploadedFiles),
      selectedVeneerAGroup,selectedVeneerA,selectedVeneerBGroup,selectedVeneerB,
      attachedEdgeMaterialAuto,separateEdgeMaterialAuto,edgeWidthAutomatic,separateEdgeMetersManual,
      veneerAPriceAuto,veneerBPriceAuto,veneerConditionChoices,manualDiscountPercentState,
      positionFinishOverridesEnabled,positionEdgeOverridesEnabled,globalFinishSidesManual,calibrationForcedRequiredBaseId,
      positionFinishState:[...positionFinishState],positionEdgeState:[...positionEdgeState],
      priceAdjustmentOverrides:[...priceAdjustmentOverrides],veneerDemandSignatureState
    });
  }
  function restoreSpecificationState(state) {
    if (state?.version!==1) throw new Error('У позиции отсутствуют данные для редактирования.');
    window.WoodstockSpecificationState.restore(form.root,state.form,(input,files)=>uploadedFilesState.set(input,files));
    selectedVeneerAGroup=state.selectedVeneerAGroup; selectedVeneerA=state.selectedVeneerA;
    selectedVeneerBGroup=state.selectedVeneerBGroup; selectedVeneerB=state.selectedVeneerB;
    attachedEdgeMaterialAuto=state.attachedEdgeMaterialAuto; separateEdgeMaterialAuto=state.separateEdgeMaterialAuto;
    Object.assign(edgeWidthAutomatic,state.edgeWidthAutomatic); separateEdgeMetersManual=state.separateEdgeMetersManual;
    veneerAPriceAuto=state.veneerAPriceAuto; veneerBPriceAuto=state.veneerBPriceAuto;
    Object.assign(veneerConditionChoices,state.veneerConditionChoices); manualDiscountPercentState=state.manualDiscountPercentState;
    positionFinishOverridesEnabled=state.positionFinishOverridesEnabled; positionEdgeOverridesEnabled=state.positionEdgeOverridesEnabled;
    globalFinishSidesManual=state.globalFinishSidesManual; calibrationForcedRequiredBaseId=state.calibrationForcedRequiredBaseId;
    for (const [map,values] of [[positionFinishState,state.positionFinishState],[positionEdgeState,state.positionEdgeState],[priceAdjustmentOverrides,state.priceAdjustmentOverrides]]) {map.clear();values.forEach(([key,value])=>map.set(key,value));}
    veneerDemandSignatureState=state.veneerDemandSignatureState;
    renderUploadedFiles(form.filesInput,form.selectedFiles,true);
    renderUploadedFiles(form.layoutTzFiles,form.layoutTzFileNames,true);
    activeSizeRow=form.sizeRows.querySelector('[data-size-row]');
    form.sizeRows.querySelectorAll('[data-size-row]').forEach(row=>{
      if(!row.querySelector('[data-size-production-price]'))row.insertAdjacentHTML('beforeend',productionCostField());
      const input=row.querySelector('[data-size-files]'),output=row.querySelector('[data-size-file-names]');
      bindFileInput(input,output,true);
      input.addEventListener('change',()=>{updateSizeTransitionUI(row);recalc();});
    });
    if(positionFinishOverridesEnabled)renderPositionFinishOverrides(false);
    if(positionEdgeOverridesEnabled)renderPositionEdgeOverrides(false);
    recalc();
  }
  function modifySpecificationRow(action,index) {
    const row=form.sizeRows.querySelectorAll('[data-size-row]')[index];
    if(!row)throw new Error('Позиция не найдена.');
    if(action==='duplicate') duplicateSizeRow(row);
    else {
      row.querySelector('[data-remove-size-row]').click();
      updateSizeRowIndexes();
    }
    recalc();
    return saveToSpecification({capture:true});
  }

  function isolateSpecificationRow(index) {
    const saved = exportSpecificationState();
    const originalConsumptions = (lastCalculation.veneerConsumptions || []).map(item => ({...item}));
    const count = form.sizeRows.querySelectorAll('[data-size-row]').length;
    if (index < 0 || index >= count) throw new Error('Позиция не найдена.');
    const captureSubset = (keep, retainManualEdge) => {
      restoreSpecificationState(saved);
      Array.from(form.sizeRows.querySelectorAll('[data-size-row]')).forEach((row, i) => {
        if (!keep(i)) {
          positionFinishState.delete(row.dataset.rowId);
          positionEdgeState.delete(row.dataset.rowId);
          row.remove();
        }
      });
      updateSizeRowIndexes();
      activeSizeRow = form.sizeRows.querySelector('[data-size-row]');
      // A manually ordered separate edging batch belongs to the original calculation.
      // Keep it once, with the first original row; never allocate or multiply its metres.
      if (!retainManualEdge && form.edgeModeSelect.value === 'separate' && separateEdgeMetersManual) {
        form.edgeModeSelect.value = 'none';
      }
      if (positionFinishOverridesEnabled) renderPositionFinishOverrides(false);
      if (positionEdgeOverridesEnabled) renderPositionEdgeOverrides(false);
      updateEdgeUI(); recalc();
      // Preserve the calculator's existing proportional allocation of a manually specified batch.
      for(const consumption of lastCalculation.veneerConsumptions || []){
        const original = originalConsumptions.find(item => item.id === consumption.id);
        if(original?.actualVeneerAreaManual && !original.mixMatchControlled && original.requiredVeneerAreaM2 > 0){
          priceAdjustmentOverrides.set(consumption.id, original.actualVeneerAreaM2 * consumption.requiredVeneerAreaM2 / original.requiredVeneerAreaM2);
        }
      }
      recalc();
      const record = saveToSpecification({capture:true});
      if (!record) throw new Error('Проверьте параметры изделия перед изменением позиции.');
      return record;
    };
    try {
      const before = index > 0 ? captureSubset(i => i < index, true) : null;
      const after = index < count - 1 ? captureSubset(i => i > index, false) : null;
      const selected = captureSubset(i => i === index, index === 0);
      restoreSpecificationState(selected.editorState);
      return {selected, before, after};
    } catch (error) {
      restoreSpecificationState(saved);
      throw error;
    }
  }

  // Restore the explicit fields written by earlier detailed-calculation versions.
  // Catalog choices are matched by saved identifiers, never by a guessed price.
  function restoreSpecificationRecord(record) {
    window.WoodstockSpecificationGroupId=record.calculationGroupId||record.id||null;
    if(record.editorState) {restoreSpecificationState(record.editorState);return;}
    const set=(node,value,event='change')=>{if(!node||value===undefined||value===null)return;node.value=String(value);node.dispatchEvent(new Event(event,{bubbles:true}));};
    const files=(input,names)=>{if(input)uploadedFilesState.set(input,(names||[]).map(file=>typeof file==='string'?{name:file}:file));};
    const findMaterial=(side,fallback)=>{
      const saved=record.materialSides?.[side];
      return data.veneers.find(item=>item.id===saved?.id)||data.veneers.find(item=>veneerDisplayName(item)===(saved?.name||fallback));
    };
    set(form.baseSelect,record.baseId);set(form.baseThicknessSelect,record.baseThickness);
    const face=findMaterial('A',record.veneerA);
    if(face){set(form.veneerTypeSelect,face.type);form.veneerAInput.value=veneerDisplayName(face);onVeneerASelected(face);}
    else if(record.materialSides?.A?.veneerType)set(form.veneerTypeSelect,record.materialSides.A.veneerType);
    set(form.veneerThicknessSelect,record.veneerThickness??record.materialSides?.A?.thicknessMm);
    const cut=(value)=>data.veneerCuts.find(item=>item.id===value||item.name===value)?.id||'';
    set(form.veneerCutSelect,cut(record.veneerCut));set(form.veneeredSidesSelect,record.sides);
    if(record.sides===2){
      const b=record.materialSides?.B;
      const mode=b?.sideType==='rough'?'rough':b?.sideType==='same'||b?.selectedAutomatically?'same':'other';
      set(form.veneerBModeSelect,mode);
      if(mode==='other'){const back=findMaterial('B',record.sideB);if(back){form.veneerBInput.value=veneerDisplayName(back);onVeneerBSelected(back);}}
      if(mode==='rough')set(form.veneerBRoughThicknessSelect,b?.thicknessMm);
      set(form.veneerBCutSelect,cut(record.veneerBCut));
    } else {
      const reverse=Array.from(form.reverseSideSelect.options).find(option=>option.textContent.trim()===record.sideB);
      if(reverse)set(form.reverseSideSelect,reverse.value);
    }
    const layout=data.layouts.find(item=>item.id===(record.layoutId||record.layoutAId)||item.name===record.layout);
    set(form.layoutSelect,layout?.id);set(form.layoutBSelect,record.layoutBId);
    set(form.layoutTzComment,record.layoutTzComment||'','input');files(form.layoutTzFiles,record.layoutTzFiles);
    set(form.sandingSelect,record.sanding?'yes':'no');
    if(record.calibration?.enabled){set(form.calibrationSelect,'yes');set(form.calibrationTargetInput,record.calibration.baseThicknessAfterCalibrationMm,'input');}
    form.sizeRows.innerHTML='';positionFinishState.clear();positionEdgeState.clear();
    (record.sizes||[]).forEach(size=>{
      const row=addSizeRow(size);$('[data-size-transition]',row).checked=!!size.transition;
      $('[data-size-comment]',row).value=size.comment||'';files($('[data-size-files]',row),size.files);
      updateSizeTransitionUI(row);
    });
    const finish=record.finishParameters||{};
    let finishId=finish.finishId;
    if(finishId==='lacquer')finishId=finish.lacquerType==='polyurethane'?'lacquer_polyurethane':'lacquer_acrylic';
    set(form.finishSelect,finishId||'none');set(form.lacquerExecutionSelect,finish.lacquerExecution);
    set(form.finishSidesSelect,finish.sides);set(form.lacquerGlossSelect,finish.lacquerGloss);
    set(form.lacquerProcessSelect,finish.lacquerProcess);set(form.enamelVariantSelect,finish.enamelVariant);
    set(form.toningSelect,finish.toning);set(form.isolatorSelect,finish.isolator);
    const rows=Array.from(form.sizeRows.querySelectorAll('[data-size-row]'));
    (record.finishByPosition||[]).forEach(item=>{const row=rows[item.position-1];if(row){const normalized=normalizeFinishConfig(item,{allowInherit:true}),global=currentGlobalFinishConfig();if(item.source==='position'||Object.keys(global).some(key=>normalized[key]!==global[key]))positionFinishState.set(row.dataset.rowId,normalized);}});
    positionFinishOverridesEnabled=positionFinishState.size>0;
    if(positionFinishOverridesEnabled){form.positionFinishOverrides.classList.remove('is-hidden');renderPositionFinishOverrides(false);}
    const edge=record.edge||{mode:'none'};set(form.edgeModeSelect,edge.mode);
    if(edge.mode!=='none'){
      const which=edge.mode==='separate'?'separate':'attached',controls=edgeControls(which);
      set(which==='separate'?form.separateEdgeSidesSelect:form.edgeSidesSelect,edge.sidesId);
      set(controls.typeSelect,edge.typeId);
      set(controls.materialInput,edge.veneerName||edge.name||edge.displayName,'input');
      set(controls.thicknessSelect,edge.thicknessMm);syncEdgeThicknessOptions(which,{preserve:true});syncEdgeWidthOptions(which,{preserve:true});
      set(controls.widthSelect,edge.widthMm);set(controls.orderWidthInput,edge.widthMm,'input');
      if(edge.mode==='separate'&&(edge.manuallyAdjusted||edge.metersSource==='manual'))set(form.separateEdgeMetersInput,edge.orderedMeters??edge.meters,'input');
      if(edge.mode==='attached'){
        (edge.positionSettings||[]).forEach(item=>{const row=rows[item.position-1];if(row)positionEdgeState.set(row.dataset.rowId,{mode:item.mode||'inherit',sidesId:item.sidesId,thicknessMm:item.thicknessMm,widthMm:item.widthMm});});
        positionEdgeOverridesEnabled=(edge.positionSettings||[]).some(item=>item.mode&&item.mode!=='inherit');
        if(positionEdgeOverridesEnabled)renderPositionEdgeOverrides(false);
      }
      set(form.edgeBevelSelect,edge.bevel?'yes':'no');set(form.edgeCommentInput,edge.comment||'','input');
    }
    const condition=record.clientCondition||record.pricing?.clientConditionSelected;
    set(form.clientConditionSelect,condition);
    Object.entries(record.pricing?.veneer||{}).forEach(([side,items])=>{const item=items[0];if(item?.condition?.selectedConditionId)veneerConditionChoices[side]=item.condition.selectedConditionId;});
    set(form.commentInput,record.comment||'','input');files(form.filesInput,record.files);
    form.root.querySelectorAll('input[type=file]').forEach(input=>{const output=input.id==='filesInput'?form.selectedFiles:input.id==='layoutTzFiles'?form.layoutTzFileNames:input.closest('[data-size-row]')?.querySelector('[data-size-file-names]');if(output)renderUploadedFiles(input,output,true);});
    recalc();
    (record.veneerConsumptions||record.pricing?.veneerConsumptions||[]).filter(saved=>saved.actualVeneerAreaManual).forEach(saved=>{
      const current=(lastCalculation.veneerConsumptions||[]).find(item=>item.materialId===saved.materialId&&(item.sideKey||item.which)===saved.side&&item.pricingMode===saved.pricingMode&&(!saved.panelSize||item.panelSize?.length===saved.panelSize.lengthMm&&item.panelSize?.width===saved.panelSize.widthMm));
      if(current&&Number.isFinite(saved.actualVeneerAreaM2))priceAdjustmentOverrides.set(current.id,saved.actualVeneerAreaM2);
    });
    if(record.pricing?.mixMatchVeneer?.actualVeneerAreaManual)priceAdjustmentOverrides.set('mixmatch:actualVeneerAreaM2',record.pricing.mixMatchVeneer.actualVeneerAreaM2);
    if(record.pricing?.thickVeneerWork?.changedManually&&lastCalculation.thickVeneerWorkAdjustment?.id)priceAdjustmentOverrides.set(lastCalculation.thickVeneerWorkAdjustment.id,record.pricing.thickVeneerWork.actualCoefficient);
    Array.from(form.sizeRows.querySelectorAll('[data-size-row]')).forEach((row,index)=>{
      const quote=record.sizes?.[index]?.productionCost||record.productionCosts?.find(item=>item.position===index+1);
      const input=row.querySelector('[data-size-production-price]');
      if(input){input.value="";delete row.dataset.productionSignature;}
    });
    recalc();
  }
  window.WoodstockPanelsController = {
    restoreRecord: restoreSpecificationRecord,
    exportState: exportSpecificationState,
    restoreState: restoreSpecificationState,
    modifyRow: modifySpecificationRow,
    isolateRow: isolateSpecificationRow,
    form,
    result: () => lastCalculation,
    recalculate: recalc,
    capture: () => saveToSpecification({ capture: true }),
    issues: () => currentBlockingValidationIssues(lastCalculation),
    customSize: setCustomSizeMode,
    resetBase: updateBaseUI,
    ready: init()
  };
})();
