import { defaultState, fieldGroups } from "./data/fields.js";
import { buildPromptJson, buildPromptText } from "./prompt/builders.js";
import { copyText } from "./ui/clipboard.js";
import { hydrateFormValues, readFormValues, renderForm } from "./ui/form.js";
import { generateRandomValues, generateVariationValues } from "./utils/randomizer.js";
import { downloadZippedJsons } from "./utils/zipUtils.js";


const formEl = document.querySelector("#attributesForm");
const promptOutputEl = document.querySelector("#promptOutput");
const jsonOutputEl = document.querySelector("#jsonOutput");
const copyPromptBtn = document.querySelector("#copyPromptBtn");
const copyJsonBtn = document.querySelector("#copyJsonBtn");
const resetBtn = document.querySelector("#resetBtn");
const variationsBtn = document.querySelector("#variationsBtn");
const statusEl = document.querySelector("#status");

const bulkGenerateBtn = document.querySelector("#bulkGenerateBtn");
const bulkCountInput = document.querySelector("#bulkCount");
const bulkGenderSelect = document.querySelector("#bulkGender");


const setStatus = (text, isError = false) => {
  statusEl.textContent = text;
  statusEl.className = `alert ${isError ? 'alert-error' : 'alert-info'} py-2 text-xs font-semibold shadow-inner transition-all duration-300 transform scale-105`;
  
  setTimeout(() => {
    statusEl.classList.remove('scale-105');
  }, 150);
};

const generateOutputs = () => {
  const values = readFormValues(formEl);
  const promptText = buildPromptText(values);
  const jsonText = JSON.stringify(buildPromptJson(values), null, 2);

  promptOutputEl.value = promptText;
  jsonOutputEl.value = jsonText;

  return { promptText, jsonText };
};

const copyFromOutput = async (outputType) => {
  try {
    const source = outputType === "prompt" ? promptOutputEl.value : jsonOutputEl.value;
    await copyText(source);
    setStatus(`${outputType === "prompt" ? "Prompt" : "JSON"} copied to clipboard.`);
  } catch (error) {
    setStatus("Copy failed. Browser denied clipboard access.", true);
  }
};

renderForm(formEl, fieldGroups);
hydrateFormValues(formEl, defaultState);
generateOutputs();

formEl.addEventListener("input", () => {
  generateOutputs();
});

// Removed manual generateBtn listener as outputs update automatically on input.

variationsBtn.addEventListener("click", () => {
  variationsBtn.classList.add("loading");
  
  setTimeout(() => {
    const currentValues = readFormValues(formEl);
    const variationValues = generateVariationValues(currentValues);
    hydrateFormValues(formEl, variationValues);
    generateOutputs();
    
    // Add highlight animation to all inputs
    const inputs = formEl.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.classList.remove("field-highlight");
      void input.offsetWidth; // Trigger reflow
      input.classList.add("field-highlight");
    });

    variationsBtn.classList.remove("loading");
    setStatus("Generated variations for the current face.");
  }, 300);
});


copyPromptBtn.addEventListener("click", () => {
  copyFromOutput("prompt");
});

copyJsonBtn.addEventListener("click", () => {
  copyFromOutput("json");
});

resetBtn.addEventListener("click", () => {
  hydrateFormValues(formEl, defaultState);
  generateOutputs();
  setStatus("Form reset to defaults.");
});

bulkGenerateBtn.addEventListener("click", async () => {
  const count = parseInt(bulkCountInput.value, 10) || 10;
  const gender = bulkGenderSelect.value;
  
  setStatus(`Generating ${count} ${gender} profiles...`);
  
  try {
    const jsonObjects = [];
    for (let i = 0; i < count; i++) {
      const values = generateRandomValues(gender);
      const json = buildPromptJson(values);
      jsonObjects.push(json);
    }
    
    await downloadZippedJsons(jsonObjects, `indian_portraits_${gender.toLowerCase()}`);
    setStatus(`Successfully downloaded ${count} profiles.`);
  } catch (error) {
    console.error(error);
    setStatus("Bulk generation failed.", true);
  }
});

