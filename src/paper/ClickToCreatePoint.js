import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../figures/figureSlice";
import Point, { getNextName } from "../figures/Point";

function ClickToCreatePoint() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const value = { x: event.clientX, y: event.clientY };
      const point = new Point(getNextName(), value);
      dispatch(create(point));
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default ClickToCreatePoint;
