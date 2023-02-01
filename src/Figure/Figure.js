import { useSelector } from "react-redux";

import FIG_TYPE from "./FIG_TYPE";

import Point from "./Point/Point";
import Segment from "./Segment/Segment";
import Label from "./Label/Label";
import Line from "./Line/Line";

function Component({ type, ...props }) {
  switch (type) {
    case FIG_TYPE.point:
      return <Point {...props} />;
    case FIG_TYPE.segment:
      return <Segment {...props} />;
    case FIG_TYPE.label:
      return <Label {...props} />;
    case FIG_TYPE.line:
      return <Line {...props} />;
    default:
      return <div>Error</div>;
  }
}

function Figure({ id }) {
  const figures = useSelector((state) => state.figures.value);
  const figure = figures.find((f) => f.id === id);

  return <Component id={id} type={figure.type} />;
}

export default Figure;
