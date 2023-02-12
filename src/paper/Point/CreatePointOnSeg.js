import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Point from "../../Figure/Point";
import Paper from "../Paper";
import clickJudge from "../clickJudge";

function CreatePointOnSeg() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    let segment = undefined;
    const handleMouseClick = (event) => {
      segment = clickJudge(figures, event, TYPE.Segment);
      if (segment !== undefined) {
        const segmentObj = figures.fig(segment);
        const coord = Paper.offsetOf(event);
        const ratio =
          coord.distanceFrom(figures.fig(segmentObj.def.fst).coord) /
          figures.fig(segment).length;
        const point = Point.byOnSeg(segment, ratio);
        dispatch(create(point));
        dispatch(setDep({ determinant: segment, dependant: point.id }));
        segment = undefined;
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });
}

export default CreatePointOnSeg;
