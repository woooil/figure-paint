function getTextDim(text, style) {
  const element = document.createElement("div");
  element.innerText = text;
  Object.assign(element.style, style);
  element.style.display = "inline-block";

  const canvas = document.getElementById("canvas");

  canvas.appendChild(element);
  const dim = { width: element.clientWidth, height: element.clientWidth };
  canvas.removeChild(element);

  return dim;
}

export default getTextDim;
