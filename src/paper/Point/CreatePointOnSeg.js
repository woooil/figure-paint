import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Point from "../../Figure/Point/Point";
import getDistance from "../../Figure/Point/getDistance";
import getLength from "../../Figure/Segment/getLength";
import clickJudge from "../clickJudge";
import getPointCoord from "../../Figure/Point/getPointCoord";
import getOffset from "../getOffset";

function CreatePointOnSeg() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var segment = undefined;
    const handleMouseClick = (event) => {
      segment = clickJudge(figures, event, TYPE.Segment);
      if (segment !== undefined) {
        const segmentObj = figures.find((f) => f.id === segment);
        const coord = getOffset(event);
        const ratio =
          getDistance(coord, getPointCoord(figures, segmentObj.def.fst)) /
          getLength(figures, segment);
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
