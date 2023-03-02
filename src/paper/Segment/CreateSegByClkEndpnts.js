import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, update, remove, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Segment from "../../Figure/Segment";
import clickJudge from "../clickJudge";

function CreateSegByClkEndpnts() {
  const dispatch = useDispatch();

  useEffect(() => {
    let endpoints = [];
    var hint = undefined;
    var activeId = false;
    const handleMouseMove = (event) => {
      const id = clickJudge(event, TYPE.Point);
      if (id !== undefined) {
        if (activeId !== id) {
          dispatch(update({ id: id, with: { isHint: true } }));
          if (endpoints.length > 0) {
            hint = Segment.byEndpnts(endpoints[0], id);
            dispatch(create(hint));
            dispatch(setDep({ determinant: endpoints[0], dependant: hint.id }));
            dispatch(setDep({ determinant: id, dependant: hint.id }));
            dispatch(update({ id: hint.id, with: { isHint: true } }));
          }
          activeId = id;
        }
      } else if (activeId) {
        if (endpoints.length === 0 || endpoints[0] !== activeId) {
          dispatch(
            update({
              id: activeId,
              with: { isHint: false },
            })
          );
        }
        if (hint) {
          dispatch(remove(hint.id));
          hint = undefined;
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
        dispatch(update({ id: hint.id, with: { isHint: false } }));
        dispatch(update({ id: endpoints[0], with: { isHint: false } }));
        dispatch(update({ id: endpoints[1], with: { isHint: false } }));
        endpoints = [];
        hint = undefined;
      }
    };
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
}

export default CreateSegByClkEndpnts;
