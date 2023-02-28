import { useEffect } from "react";
import { useSelector } from "react-redux";
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

  static isUnder(event) {
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

  static saveAsPng() {
    const svgElement = Paper.element;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const multiplier = 2;
    canvas.width = svgElement.width.baseVal.value * multiplier;
    canvas.height = svgElement.height.baseVal.value * multiplier;
    const ctx = canvas.getContext("2d");
    ctx.scale(multiplier, multiplier);
    const image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
      const a = document.createElement("a");
      a.download = "untitled.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    image.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
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

const DrawPaper = () => {
  const figures = useSelector((state) => state.figures.value);
  const hints = useSelector((state) => state.figures.hints);

  useEffect(() => {
    console.log("figure updated:", figures);
  }, [figures]);

  return (
    <svg className={Paper.className}>
      {figures.map((figure) => figure.draw)}
      {hints.map((hint) => hint.draw)}
    </svg>
  );
};

export default Paper;

export { DrawPaper };
