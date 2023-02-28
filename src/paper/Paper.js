import { Canvg } from "canvg";
import { store } from "../store";
import Coord from "../Math/Coord";
import figureCoder from "../Figure/figureCoder";

class Paper {
  static className = "paper";

  static get width() {
    return Paper.element.clientWidth;
  }

  static get height() {
    return Paper.element.clientHeight;
  }

  static get element() {
    return document.getElementsByClassName(Paper.className)[0];
  }

  static isClicked(event) {
    return (
      document
        .elementsFromPoint(event.clientX, event.clientY)
        .find((e) => e.classList.contains(Paper.className)) !== undefined
    );
  }

  static offsetOf(event) {
    const canvas = Paper.element;
    let bound = canvas.getBoundingClientRect();
    let html = document.documentElement;

    return new Coord(
      event.pageX - bound.left - window.pageXOffset + html.clientLeft,
      event.pageY - bound.top - window.pageYOffset + html.clientTop
    );
  }

  static async saveAsPng() {
    const svgElement = Paper.element;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const scaleFactor = 3;
    const canvas = document.createElement("canvas");
    canvas.width = svgElement.width.baseVal.value * scaleFactor;
    canvas.height = svgElement.height.baseVal.value * scaleFactor;
    canvas.style.width = `${svgElement.width.baseVal.value}px`;
    canvas.style.height = `${svgElement.height.baseVal.value}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(scaleFactor, scaleFactor);
    const v = await Canvg.from(ctx, svgData);
    await v.render();
    const link = document.createElement("a");
    link.download = "untitled.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  static saveAsSvg() {
    const svgElement = Paper.element;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.download = "untitled.svg";
    a.href = url;
    a.click();
  }

  static saveRaw() {
    const json = {
      date: Date.now(),
      figures: store.getState().figures.value.map((f) => figureCoder.encode(f)),
    };
    const data = JSON.stringify(json);
    const fileName = "untitled.fpd";
    const a = document.createElement("a");
    const blob = new Blob([data], { type: "text/plain" });
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  }

  static readRaw(raw) {
    const data = JSON.parse(raw);
    return data.figures.map((f) => figureCoder.decode(f));
  }
}

const DrawPaper = ({ figures }) => {
  return (
    <svg className={Paper.className}>
      {figures.map((figure) => figure.draw)}
    </svg>
  );
};

export default Paper;

export { DrawPaper };
