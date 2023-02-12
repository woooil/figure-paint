import { store } from "../store";
import Coord from "../Math/Coord";

class Paper {
  static className = "paper";
  static width = 600;
  static height = 600;

  static #style = {
    backgroundColor: "gray",
    width: `${Paper.width}px`,
    height: `${Paper.height}.px`,
    overflow: "hidden",
    margin: "10px",
  };

  static get figures() {
    return store.getState().figures.value;
  }

  static get draw() {
    return (
      <svg className={Paper.className} id="canvas" style={Paper.#style}>
        {Paper.figures.map((figure) => figure.draw)}
      </svg>
    );
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
    var bound = canvas.getBoundingClientRect();
    var html = document.documentElement;

    return new Coord(
      event.pageX - bound.left - window.pageXOffset + html.clientLeft,
      event.pageY - bound.top - window.pageYOffset + html.clientTop
    );
  }
}

export default Paper;
