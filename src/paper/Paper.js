import Coord from "../Math/Coord";

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

  static save() {
    const svgElement = Paper.element;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    canvas.width = svgElement.width.baseVal.value;
    canvas.height = svgElement.height.baseVal.value;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
      const a = document.createElement("a");
      a.download = "image.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    image.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
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
