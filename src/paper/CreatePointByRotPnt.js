import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create } from "../figures/figureSlice";
import { FIG_TYPE, newFigure } from "../figures/Figure";
import { getNextName } from "../figures/Point/getNextName";
import { POINT_DEF } from "../figures/Point/PointDef";

import clickJudge from "./clickJudge";

function CreatePointByRotPnt() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  const [angle, setAngle] = useState(0.0);

  useEffect(() => {
    var counterPoint = undefined;
    var refPoint = undefined;
    const handleMouseClick = (event) => {
      const point = { x: event.clientX, y: event.clientY };
      if (counterPoint === undefined) {
        counterPoint = clickJudge(figures, point, FIG_TYPE.point);
      } else {
        refPoint = clickJudge(figures, point, FIG_TYPE.point);
        if (refPoint !== undefined) {
          const def = {
            by: POINT_DEF.rotPnt,
            counterPoint: counterPoint,
            refPoint: refPoint,
            angle: angle,
          };
          const figure = newFigure(FIG_TYPE.point, def, {
            name: getNextName(),
          });
          dispatch(create(figure));
          counterPoint = undefined;
          refPoint = undefined;
        }
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return (
    <input
      type="text"
      value={angle}
      onChange={(e) => setAngle(e.target.value)}
    />
  );
}

export default CreatePointByRotPnt;
