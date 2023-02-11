import Coord from "../Math/Coord";
import CANVAS_OPT from "./CANVAS_OPT";

function getOffset(event) {
  const canvas = document.getElementById(CANVAS_OPT.id);
  var bound = canvas.getBoundingClientRect();
  var html = document.documentElement;

  return new Coord(
    event.pageX - bound.left - window.pageXOffset + html.clientLeft,
    event.pageY - bound.top - window.pageYOffset + html.clientTop
  );
}

export default getOffset;
