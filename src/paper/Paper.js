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
