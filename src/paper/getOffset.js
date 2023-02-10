import CANVAS_OPT from "./CANVAS_OPT";

function getOffset(event) {
  const canvas = document.getElementById(CANVAS_OPT.id);
  var bound = canvas.getBoundingClientRect();
  var html = document.documentElement;

  return {
    y: event.pageY - bound.top - window.pageYOffset + html.clientTop,
    x: event.pageX - bound.left - window.pageXOffset + html.clientLeft,
  };
}

export default getOffset;
