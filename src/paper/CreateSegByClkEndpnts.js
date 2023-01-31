import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create } from "../figures/figureSlice";
import { FIG_TYPE, newFigure } from "../figures/Figure";
import { SEGMENT_DEF_BY } from "../figures/Segment/SegmentDefBy";
import clickJudge from "./clickJudge";

function CreateSegByClkEndpnts() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var endpoints = [];
    const handleMouseClick = (event) => {
      const point = { x: event.clientX, y: event.clientY };
      const element = clickJudge(figures, point, FIG_TYPE.point);
      if (
        element !== undefined &&
        (endpoints.length === 0 || element.id !== endpoints[0])
      ) {
        endpoints.push(element);
      }
      if (endpoints.length === 2) {
        const def = {
          by: SEGMENT_DEF_BY.endpnts,
          fst: endpoints[0],
          snd: endpoints[1],
        };
        const segment = newFigure(FIG_TYPE.segment, def);
        dispatch(create(segment));
        endpoints = [];
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });
}

export default CreateSegByClkEndpnts;
