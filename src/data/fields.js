import { options } from "./options.js";

const field = (id, label, opts, defaultValue = "") => ({
  id,
  label,
  options: opts,
  defaultValue: defaultValue || opts?.[0] || ""
});

export const fieldGroups = [
  {
    title: "Core Identity",
    fields: [
      field("age", "Age", options.age, "Early 20s"),
      field("genderPresentation", "Gender Presentation", options.genderPresentation, "Female"),
      field("regionEthnicContext", "Region / Ethnic Context", options.regionEthnicContext, "Mixed urban metropolitan look")
    ]
  },
  {
    title: "Body & Skin",
    fields: [
      field("height", "Height", options.height, "Average Indian female (5'0\"-5'4\")"),
      field("bodyBuild", "Body Build", options.bodyBuild, "Slim"),
      field("boneStructure", "Bone Structure", options.boneStructure, "Medium bone density"),
      field("exactShade", "Skin Shade", options.exactShade, "Medium wheatish"),
      field("undertone", "Undertone", options.undertone, "Warm golden"),
      field("skinTextureDetails", "Skin Texture", options.skinTextureDetails, "Textured with pores visible")
    ]
  },
  {
    title: "Face",
    fields: [
      field("faceShape", "Face Shape", options.faceShape, "Oval"),
      field("jawlineDescription", "Jawline", options.jawlineDescription, "Soft jaw"),
      field("cheekboneStructure", "Cheekbones", options.cheekboneStructure, "Medium cheekbones"),
      field("eyeSize", "Eye Size", options.eyeSize, "Large expressive"),
      field("eyeShape", "Eye Shape", options.eyeShape, "Almond"),
      field("eyeColor", "Eye Color", options.eyeColor, "Dark brown"),
      field("eyebrowType", "Eyebrows", options.eyebrowType, "Thick natural"),
      field("eyelashType", "Eyelashes", options.eyelashType, "Short natural"),
      field("noseType", "Nose Type", options.noseType, "Straight narrow bridge"),
      field("lipTypeColor", "Lips", options.lipTypeColor, "Medium balanced"),
      field("expressionType", "Expression", options.expressionType, "Soft subtle smile"),
      field("teethDetails", "Teeth Details", options.teethDetails, "Not visible"),
      field("earType", "Ear Type", options.earType, "Medium proportionate"),
      field("earringOrNone", "Earrings", options.earringOrNone, "None"),
      field("foreheadType", "Forehead", options.foreheadType, "Medium")
    ]
  },
  {
    title: "Hair & Styling",
    fields: [
      field("hairDensity", "Hair Density", options.hairDensity, "Very thick"),
      field("hairTexture", "Hair Texture", options.hairTexture, "Slightly wavy"),
      field("hairColor", "Hair Color", options.hairColor, "Natural black"),
      field("hairstyle", "Hairstyle", options.hairstyle, "Long center-parted"),
      field("facialHairType", "Facial Hair", options.facialHairType, "N/A"),
      field("clothingStyle", "Clothing", options.clothingStyle, "Casual shirt jeans"),
      field("accessories", "Accessories", options.accessories, "Minimal jewelry")
    ]
  },
  {
    title: "Context & Pose",
    fields: [
      field("setting", "Setting / Background", options.setting, "Urban street"),
      field("pose", "Pose / Action", options.pose, "Standing straight facing camera")
    ]
  },
  {
    title: "Optional Prompt Controls",
    fields: [
      {
        id: "negativePrompt",
        label: "Negative Prompt",
        options: [],
        defaultValue:
          "Unrealistic skin, plastic texture, over-smoothed face, exaggerated symmetry, distorted anatomy, extra fingers, blurred eyes, artificial lighting glare, cartoonish features, over-sharpened edges, CGI look."
      },
      {
        id: "photoStyleTail",
        label: "Photo / Quality Tail",
        options: [],
        defaultValue:
          "Shot on a DSLR with 85mm lens, shallow depth of field, natural skin rendering, cinematic lighting, extremely detailed skin texture, hyper-realistic, 8K resolution, professional color grading, documentary photography style, realistic proportions, no distortion, no AI artifacts."
      }
    ]
  }
];

export const defaultState = Object.fromEntries(
  fieldGroups.flatMap((group) => group.fields.map((f) => [f.id, f.defaultValue]))
);
