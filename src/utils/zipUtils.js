/**
 * Expects JSZip to be available on window (from CDN)
 */
export const downloadZippedJsons = async (jsonObjects, folderName = "generated_profiles") => {
  if (!window.JSZip) {
    throw new Error("JSZip library not loaded");
  }

  const zip = new window.JSZip();
  const folder = zip.folder(folderName);

  jsonObjects.forEach((obj, index) => {
    const fileName = `${obj.fields.gender_presentation.toLowerCase()}_${index + 1}.json`;
    folder.file(fileName, JSON.stringify(obj, null, 2));
  });

  const content = await zip.generateAsync({ type: "blob" });
  
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = `${folderName}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
