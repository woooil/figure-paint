import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Point from "../../Figure/Point/Point";
import getDistance from "../../Figure/Point/getDistance";
import getLength from "../../Figure/Segment/getLength";
import clickJudge from "../clickJudge";
import CANVAS_OPT from "../CANVAS_OPT";
import Coord from "../../Figure/Point/Coord";
import getPointCoord from "../../Figure/Point/getPointCoord";

function CreatePointOnSeg() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var segment = undefined;
    const handleMouseClick = (event) => {
      segment = clickJudge(figures, event, TYPE.Segment);
      if (segment !== undefined) {
        const canvas = document.getElementById(CANVAS_OPT.id);
        const coord = new Coord(
          event.pageX - canvas.offsetLeft,
          event.pageY - canvas.offsetTop
        );
        const segmentObj = figures.find((f) => f.id === segment);
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
