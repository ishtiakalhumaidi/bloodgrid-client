export const errorCap = (error) => {
  const errorMessage = error
    .split("/")[1]
    .replace(/\)|\(/g, "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return errorMessage;
};
