import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { create } from "../figures/figureSlice";

import Segment from "../figures/Segment";
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
        const value = {
          startPos: endpoints[0].position,
          endPos: endpoints[1].position,
        };
        const segment = new Segment(
          endpoints[0].name + endpoints[1].name,
          value
        );
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
