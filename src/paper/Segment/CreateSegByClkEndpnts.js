import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import newFigure from "../../Figure/newFigure";
import SEGMENT_DEF from "../../Figure/Segment/SEGMENT_DEF";
import clickJudge from "../clickJudge";

function CreateSegByClkEndpnts() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var endpoints = [];
    const handleMouseClick = (event) => {
      const point = { x: event.clientX, y: event.clientY };
      const id = clickJudge(figures, point, FIG_TYPE.point);
      if (
        id !== undefined &&
        (endpoints.length === 0 || id.id !== endpoints[0])
      ) {
        endpoints.push(id);
      }
      if (endpoints.length === 2) {
        const def = {
          by: SEGMENT_DEF.endpnts,
          fst: endpoints[0],
          snd: endpoints[1],
        };
        const segment = newFigure(FIG_TYPE.segment, def);
        dispatch(create(segment));
        dispatch(setDep({ determinant: endpoints[0], dependant: segment.id }));
        dispatch(setDep({ determinant: endpoints[1], dependant: segment.id }));
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
