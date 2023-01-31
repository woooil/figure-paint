import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

import Point from "./Point";
import Segment from "./Segment";

export const FIGTYPE = {
  Point: "point",
  Segment: "segment",
};
Object.freeze(FIGTYPE);

export const newFigure = (type, def, other = {}) => {
  return {
    id: uuidv4(),
    type: type,
    def: def,
    ...other,
  };
};

function Component({ type, ...props }) {
  switch (type) {
    case FIGTYPE.Point:
      return <Point {...props} />;
    case FIGTYPE.Segment:
      return <Segment {...props} />;
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
