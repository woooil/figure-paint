import Point from "./Point/Point";
import Segment from "./Segment/Segment";
import Label from "./Label/Label";
import Line from "./Line/Line";

import getNextName from "./Point/getNextName";

const type = (name, component, extension) => {
  const defaultExtension = () => {
    return {};
  };
  return {
    name,
    component,
    extension: extension !== undefined ? extension : defaultExtension,
  };
};

const FIG_TYPE = {
  point: type("point", Point, () => {
    return { name: getNextName() };
  }),
  segment: type("segment", Segment),
  label: type("label", Label),
  line: type("line", Line),
};
Object.freeze(FIG_TYPE);

export default FIG_TYPE;
