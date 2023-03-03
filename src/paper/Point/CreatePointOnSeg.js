import { TYPE } from "../../Figure/Figure";
import Point from "../../Figure/Point";
import Paper from "../Paper";
import SelectFigure from "../Hinter/SelectFigure";

function CreatePointOnSeg() {
  const figures = Paper.figures;

  const generator = (event, id) => {
    const segmentObj = figures.fig(id);
    const coord = Paper.offsetOf(event);
    const ratio =
      coord.distanceFrom(figures.fig(segmentObj.def.fst).coord) /
      figures.fig(id).length;
    return Point.byOnSeg(id, ratio);
  };

  return (
    <SelectFigure
      type={TYPE.Segment}
      withCreate={{ generator, precise: true }}
    />
  );
}

export default CreatePointOnSeg;
