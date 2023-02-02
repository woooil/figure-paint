import CANVAS_OPT from "../../Paper/CANVAS_OPT";

function getTextDim(text, style) {
  const element = document.createElement("div");
  element.innerText = text;
  Object.assign(element.style, style);
  element.style.display = "inline-block";

  const canvas = document.getElementById(CANVAS_OPT.id);

  canvas.appendChild(element);
  const dim = { width: element.clientWidth, height: element.clientHeight };
  canvas.removeChild(element);

  return dim;
}

export default getTextDim;
