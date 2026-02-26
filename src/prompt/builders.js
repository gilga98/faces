const pick = (values, key, fallback = "N/A") => (values[key] || "").trim() || fallback;

export const buildPromptText = (values) => {
  const prompt = `Ultra-photorealistic portrait of a ${pick(values, "age")} ${pick(
    values,
    "genderPresentation"
  )} from ${pick(values, "regionEthnicContext")} India.
Height approximately ${pick(values, "height")}, with a ${pick(values, "bodyBuild")} body structure and ${pick(
    values,
    "boneStructure"
  )}.

Skin tone is ${pick(values, "exactShade")} with ${pick(values, "undertone")}, natural ${pick(
    values,
    "skinTextureDetails"
  )}, realistic pores and subtle imperfections.

Face shape is ${pick(values, "faceShape")} with ${pick(values, "jawlineDescription")} and ${pick(
    values,
    "cheekboneStructure"
  )}.

Eyes are ${pick(values, "eyeSize")} ${pick(values, "eyeShape")}, ${pick(
    values,
    "eyeColor"
  )} with natural sclera, framed by ${pick(values, "eyebrowType")} eyebrows and ${pick(
    values,
    "eyelashType"
  )} eyelashes.

Nose is ${pick(values, "noseType")}.
Lips are ${pick(values, "lipTypeColor")}.
Expression shows ${pick(values, "expressionType")}, teeth ${pick(values, "teethDetails")}.

Ears are ${pick(values, "earType")}, wearing ${pick(values, "earringOrNone")}.
Forehead is ${pick(values, "foreheadType")}.

Hair is ${pick(values, "hairDensity")}, ${pick(values, "hairTexture")}, colored ${pick(
    values,
    "hairColor"
  )}, styled as ${pick(values, "hairstyle")}.
Facial hair (if applicable): ${pick(values, "facialHairType")}.

Wearing ${pick(values, "clothingStyle")} with ${pick(values, "accessories")}.

${pick(values, "photoStyleTail", "")}`;

  const negativePrompt = pick(values, "negativePrompt", "");
  if (!negativePrompt) return prompt;

  return `${prompt}\n\nNegative prompt: ${negativePrompt}`;
};

export const buildPromptJson = (values) => ({
  prompt_type: "ultra_photorealistic_indian_person",
  version: 1,
  fields: {
    age: pick(values, "age"),
    gender_presentation: pick(values, "genderPresentation"),
    region_ethnic_context: pick(values, "regionEthnicContext"),
    height: pick(values, "height"),
    body_build: pick(values, "bodyBuild"),
    bone_structure: pick(values, "boneStructure"),
    skin_tone: {
      exact_shade: pick(values, "exactShade"),
      undertone: pick(values, "undertone"),
      skin_texture_details: pick(values, "skinTextureDetails")
    },
    face: {
      shape: pick(values, "faceShape"),
      jawline_description: pick(values, "jawlineDescription"),
      cheekbone_structure: pick(values, "cheekboneStructure")
    },
    eyes: {
      size: pick(values, "eyeSize"),
      shape: pick(values, "eyeShape"),
      color: pick(values, "eyeColor"),
      eyebrows: pick(values, "eyebrowType"),
      eyelashes: pick(values, "eyelashType")
    },
    nose: pick(values, "noseType"),
    lips: pick(values, "lipTypeColor"),
    expression: pick(values, "expressionType"),
    teeth_details: pick(values, "teethDetails"),
    ears: {
      type: pick(values, "earType"),
      earring: pick(values, "earringOrNone")
    },
    forehead: pick(values, "foreheadType"),
    hair: {
      density: pick(values, "hairDensity"),
      texture: pick(values, "hairTexture"),
      color: pick(values, "hairColor"),
      style: pick(values, "hairstyle")
    },
    facial_hair: pick(values, "facialHairType"),
    clothing_style: pick(values, "clothingStyle"),
    accessories: pick(values, "accessories"),
    photo_style_tail: pick(values, "photoStyleTail"),
    negative_prompt: pick(values, "negativePrompt", "")
  }
});
