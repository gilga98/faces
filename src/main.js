import { defaultState, fieldGroups } from "./data/fields.js";
import { buildPromptJson, buildPromptText } from "./prompt/builders.js";
import { copyText } from "./ui/clipboard.js";
import { hydrateFormValues, readFormValues, renderForm } from "./ui/form.js";

const formEl = document.querySelector("#attributesForm");
const promptOutputEl = document.querySelector("#promptOutput");
const jsonOutputEl = document.querySelector("#jsonOutput");
const generateBtn = document.querySelector("#generateBtn");
const copyPromptBtn = document.querySelector("#copyPromptBtn");
const copyJsonBtn = document.querySelector("#copyJsonBtn");
const resetBtn = document.querySelector("#resetBtn");
const statusEl = document.querySelector("#status");

const setStatus = (text, isError = false) => {
  statusEl.textContent = text;
  statusEl.style.color = isError ? "#b91c1c" : "#475569";
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

generateBtn.addEventListener("click", () => {
  generateOutputs();
  setStatus("Prompt and JSON regenerated.");
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
