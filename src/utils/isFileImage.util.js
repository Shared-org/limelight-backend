exports.isFileImage = (location) => {
  if (
    location.includes("jpg") ||
    location.includes("jpeg") ||
    location.includes("png") ||
    location.includes("")
  ) {
    return true;
  }
  return false;
};
