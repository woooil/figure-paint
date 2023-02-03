import { TYPE } from "./Figure";
import getPointStyle from "./Point/getPointStyle";
import getLineStyle from "./Line/getLineStyle";
import getSegmentStyle from "./Segment/getSegmentStyle";
import getLabelStyle from "./Label/getLabelStyle";

function getFigureStyle(figures, id) {
  const figure = figures.find((f) => f.id === id);
  const type = figure.type;

  var getter = () => {};

  switch (type) {
    case TYPE.Point:
      getter = getPointStyle;
      break;
    case TYPE.Line:
      getter = getLineStyle;
      break;
    case TYPE.Segment:
      getter = getSegmentStyle;
      break;
    case TYPE.Label:
      getter = getLabelStyle;
      break;
    default:
      break;
  }

  return getter(figures, id);
}

export default getFigureStyle;
