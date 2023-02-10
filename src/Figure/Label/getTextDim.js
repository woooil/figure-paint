function getTextDim(text, style) {
  const element = document.createElement("div");
  element.innerText = text;
  Object.assign(element.style, style);
  element.style.display = "inline-block";

  document.body.appendChild(element);
  const dim = { width: element.clientWidth, height: element.clientHeight };
  document.body.removeChild(element);

  return dim;
}

export default getTextDim;
