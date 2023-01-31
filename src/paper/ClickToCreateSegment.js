import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create } from "../figures/figureSlice";
import { FIGTYPE, newFigure } from "../figures/Figure";

import clickJudge from "./clickJudge";

function ClickToCreateSegment() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var endpoints = [];
    const handleMouseClick = (event) => {
      const point = { x: event.clientX, y: event.clientY };
      const element = clickJudge(figures, point, "point");
      if (
        element !== undefined &&
        (endpoints.length === 0 || element.id !== endpoints[0].id)
      ) {
        endpoints.push(element);
      }
      if (endpoints.length === 2) {
        const def = {
          by: "ENDPNTS",
          fst: endpoints[0].id,
          snd: endpoints[1].id,
        };
        const segment = newFigure(FIGTYPE.Segment, def);
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

export default ClickToCreateSegment;
