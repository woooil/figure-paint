import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep, hinter } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Segment from "../../Figure/Segment";
import Figure from "../../Figure/Figure";
import Paper from "../Paper";
import clickJudge from "../clickJudge";

function CreateSegByClkEndpnts() {
  const dispatch = useDispatch();

  useEffect(() => {
    let endpoints = [];
    const hints = [Figure.newId(), Figure.newId(), Figure.newId()];
    var activeId = false;
    const handleMouseMove = (event) => {
      const id = clickJudge(event, TYPE.Point);
      if (id !== undefined) {
        if (activeId !== id) {
          const point = Paper.figures.fig(id);
          dispatch(hinter({ id: hints[endpoints.length], with: point }));
          if (endpoints.length > 0) {
            const segment = Segment.byEndpnts(endpoints[0], id);
            dispatch(hinter({ id: hints[2], with: segment }));
          }
          activeId = id;
        }
      } else if (activeId) {
        dispatch(hinter({ id: hints[endpoints.length], with: undefined }));
        if (endpoints.length > 0) {
          dispatch(hinter({ id: hints[2], with: undefined }));
        }
        activeId = false;
      }
    };
    const handleMouseClick = (event) => {
      const id = clickJudge(event, TYPE.Point);
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
        dispatch(hinter({ id: hints[0], with: undefined }));
        dispatch(hinter({ id: hints[1], with: undefined }));
        dispatch(hinter({ id: hints[2], with: undefined }));
      }
    };
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
      dispatch(hinter({ id: hints[0], with: undefined }));
      dispatch(hinter({ id: hints[1], with: undefined }));
      dispatch(hinter({ id: hints[2], with: undefined }));
    };
  });
}

export default CreateSegByClkEndpnts;
