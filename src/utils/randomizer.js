import { options } from "../data/options.js";
import { defaultState } from "../data/fields.js";

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateRandomValues = (genderPreference) => {
  const values = { ...defaultState };
  
  // Determine actual gender for this instance
  let gender = genderPreference;
  if (gender === "Mixed") {
    gender = Math.random() > 0.5 ? "Female" : "Male";
  }
  
  values.genderPresentation = gender;

  // Iterate through options and pick random values
  Object.keys(options).forEach((key) => {
    if (key === "genderPresentation") return;
    
    let pool = options[key];

    // Basic gender-based filtering for better quality
    if (gender === "Female") {
      if (key === "facialHairType") {
        values[key] = "N/A";
        return;
      }
      if (key === "hairstyle") {
        pool = pool.filter(h => !["Fade haircut", "Crew cut", "Man bun", "Undercut"].includes(h));
      }
      if (key === "clothingStyle") {
        pool = pool.filter(c => !["Sherwani", "Kurta pajama", "Business suit"].includes(c) || Math.random() > 0.8);
      }
    } else if (gender === "Male") {
      if (key === "hairstyle") {
        pool = pool.filter(h => !["Long center-parted", "Low bun", "High bun", "Braided single plait", "Short bob", "Pixie cut"].includes(h));
      }
      if (key === "clothingStyle") {
        pool = pool.filter(c => !["Saree", "Salwar kameez", "Lehenga"].includes(c));
      }
      if (key === "accessories") {
        pool = pool.filter(a => !["Bindi", "Sindoor", "Nose ring (nath)", "Mangalsutra", "Traditional bangles"].includes(a));
      }
      if (key === "facialHairType" && pool.includes("N/A")) {
        // Higher chance of having facial hair for males if not "Mixed"
        if (Math.random() > 0.2) {
          pool = pool.filter(f => f !== "N/A");
        }
      }
    }

    values[key] = getRandom(pool);
  });

  return values;
};

export const generateVariationValues = (baseValues) => {
  const gender = baseValues.genderPresentation;
  const variation = { ...baseValues };

  const variantFields = [
    "clothingStyle",
    "accessories",
    "setting",
    "pose",
    "hairstyle",
    "expressionType",
    "photoStyleTail"
  ];

  variantFields.forEach((key) => {
    let pool = options[key];

    // Reuse the same filtering logic as before
    if (gender === "Female") {
      if (key === "hairstyle") {
        pool = pool.filter(h => !["Fade haircut", "Crew cut", "Man bun", "Undercut"].includes(h));
      }
      if (key === "clothingStyle") {
        pool = pool.filter(c => !["Sherwani", "Kurta pajama", "Business suit"].includes(c) || Math.random() > 0.8);
      }
    } else if (gender === "Male") {
      if (key === "hairstyle") {
        pool = pool.filter(h => !["Long center-parted", "Low bun", "High bun", "Braided single plait", "Short bob", "Pixie cut"].includes(h));
      }
      if (key === "clothingStyle") {
        pool = pool.filter(c => !["Saree", "Salwar kameez", "Lehenga"].includes(c));
      }
      if (key === "accessories") {
        pool = pool.filter(a => !["Bindi", "Sindoor", "Nose ring (nath)", "Mangalsutra", "Traditional bangles"].includes(a));
      }
    }

    variation[key] = getRandom(pool);
  });

  return variation;
};
