import Point from "./Point/Point";
import Segment from "./Segment/Segment";
import Label from "./Label/Label";
import Line from "./Line/Line";

const type = (name, component) => {
  return {
    name,
    component,
  };
};

const FIG_TYPE = {
  point: type("point", Point),
  segment: type("segment", Segment),
  label: type("label", Label),
  line: type("line", Line),
};
Object.freeze(FIG_TYPE);

export default FIG_TYPE;
