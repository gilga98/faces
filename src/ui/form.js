const createField = (field) => {
  const wrap = document.createElement("div");
  wrap.className = "field";

  const label = document.createElement("label");
  label.htmlFor = field.id;
  label.textContent = field.label;
  wrap.appendChild(label);

  if (field.options?.length) {
    const select = document.createElement("select");
    select.className = "select";
    select.id = field.id;
    select.name = field.id;
    select.required = true;

    field.options.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      option.selected = opt === field.defaultValue;
      select.appendChild(option);
    });

    if (!field.options.includes(field.defaultValue) && field.defaultValue) {
      const option = document.createElement("option");
      option.value = field.defaultValue;
      option.textContent = field.defaultValue;
      option.selected = true;
      select.appendChild(option);
    }

    wrap.appendChild(select);
    return wrap;
  }

  const textarea = document.createElement("textarea");
  textarea.className = "input";
  textarea.id = field.id;
  textarea.name = field.id;
  textarea.rows = field.id === "negativePrompt" ? 4 : 5;
  textarea.value = field.defaultValue || "";
  wrap.appendChild(textarea);

  return wrap;
};

export const renderForm = (formEl, groups) => {
  formEl.innerHTML = "";

  groups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "group";

    const title = document.createElement("h3");
    title.textContent = group.title;
    section.appendChild(title);

    const fieldsWrap = document.createElement("div");
    fieldsWrap.className = "group-fields";

    group.fields.forEach((field) => {
      fieldsWrap.appendChild(createField(field));
    });

    section.appendChild(fieldsWrap);
    formEl.appendChild(section);
  });
};

export const readFormValues = (formEl) => {
  const formData = new FormData(formEl);
  return Object.fromEntries(formData.entries());
};

export const hydrateFormValues = (formEl, values) => {
  Object.entries(values).forEach(([key, value]) => {
    const el = formEl.elements.namedItem(key);
    if (el) {
      el.value = value;
    }
  });
};
