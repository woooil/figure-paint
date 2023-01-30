import { create } from "../figures/figureSlice";
import Point from "../figures/Point";
import { getNextName } from "../figures/Point";
import PaperMode from "./PaperMode";

class ClickToCreatePoint extends PaperMode {
  get modeName() {
    return "Click to create new point";
  }
  onClick(event) {
    const value = { x: event.clientX, y: event.clientY };
    const point = new Point(getNextName(), value);
    return create(point);
  }
}

export default ClickToCreatePoint;
