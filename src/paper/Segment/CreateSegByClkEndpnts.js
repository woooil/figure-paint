import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Segment from "../../Figure/Segment/Segment";
import clickJudge from "../clickJudge";

function CreateSegByClkEndpnts() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var endpoints = [];
    const handleMouseClick = (event) => {
      const id = clickJudge(figures, event, TYPE.Point);
      if (
        id !== undefined &&
        (endpoints.length === 0 || id.id !== endpoints[0])
      ) {
        endpoints.push(id);
      }
      if (endpoints.length === 2) {
        const segment = Segment.byEndpnts(endpoints[0], endpoints[1]);
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
