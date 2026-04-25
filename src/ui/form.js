const createField = (field) => {
  const wrap = document.createElement("div");
  wrap.className = "form-control w-full";

  const label = document.createElement("label");
  label.className = "label";
  label.innerHTML = `<span class="label-text font-bold text-base-content/70">${field.label}</span>`;
  wrap.appendChild(label);

  if (field.options?.length) {
    const select = document.createElement("select");
    select.className = "select select-bordered select-sm w-full bg-base-200 focus:select-primary transition-all";
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
  textarea.className = "textarea textarea-bordered textarea-sm w-full bg-base-200 focus:textarea-primary transition-all";
  textarea.id = field.id;
  textarea.name = field.id;
  textarea.rows = field.id === "negativePrompt" ? 3 : 4;
  textarea.value = field.defaultValue || "";
  wrap.appendChild(textarea);

  return wrap;
};

export const renderForm = (formEl, groups) => {
  formEl.innerHTML = "";

  groups.forEach((group) => {
    const section = document.createElement("div");
    section.className = "md:col-span-2 mt-4 first:mt-0";

    const title = document.createElement("h3");
    title.className = "text-xs font-black uppercase tracking-widest text-secondary mb-4 flex items-center gap-2 after:content-[''] after:h-px after:flex-1 after:bg-base-content/10";
    title.textContent = group.title;
    section.appendChild(title);

    const fieldsWrap = document.createElement("div");
    fieldsWrap.className = "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4";

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
