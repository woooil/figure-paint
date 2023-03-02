import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, update, remove, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Segment from "../../Figure/Segment";
import clickJudge from "../clickJudge";

function CreateSegByClkEndpnts() {
  const dispatch = useDispatch();

  // Current step of creating Segment; 0 for selecting first Point, 1 for selecting second Point
  var step = 0;
  // Id of first Point, second Point and Segment; undefined if not exists
  var ids = [undefined, undefined, undefined];
  // Call when mouse is moved; update first Point
  const updateFstPoint = (event) => {
    const id = clickJudge(event, TYPE.Point);
    // If mouse is on Point which is different from the old first, set the Point as the first
    if (id && id !== ids[0]) {
      ids[0] = id;
      dispatch(update({ id: id, with: { isHint: true } }));
    }
    // Else if mouse gets out of Point, lift the Point as the first
    else if (ids[0] && !id) {
      dispatch(update({ id: ids[0], with: { isHint: false } }));
      ids[0] = undefined;
    }
  };
  // Call when mouse is clicked; select first Point
  const selectFstPoint = () => {
    if (ids[0]) {
      step = 1;
    }
  };
  // Call when mouse is moved; update second Point
  const updateSndPoint = (event) => {
    const id = clickJudge(event, TYPE.Point);
    // If mouse is on Point which is different from the old first, set the Point as the second
    if (id && id !== ids[1] && id !== ids[0]) {
      ids[1] = id;
      const segment = Segment.byEndpnts(ids[0], ids[1]);
      ids[2] = segment.id;
      dispatch(create(segment));
      dispatch(setDep({ determinant: ids[0], dependant: ids[2] }));
      dispatch(setDep({ determinant: ids[1], dependant: ids[2] }));
      dispatch(update({ id: ids[2], with: { isHint: true } }));
      dispatch(update({ id: id, with: { isHint: true } }));
    }
    // Else if mouse gets out of Point, lift the Point as the second
    else if (ids[1] && !id) {
      dispatch(update({ id: ids[1], with: { isHint: false } }));
      dispatch(remove(ids[2]));
      ids = [undefined, undefined];
    }
  };
  // Call when mouse is clicked; select second Point
  const selectSndPoint = () => {
    if (ids[1]) {
      dispatch(update({ id: ids[0], with: { isHint: false } }));
      dispatch(update({ id: ids[1], with: { isHint: false } }));
      dispatch(update({ id: ids[2], with: { isHint: false } }));
      step = 0;
      ids = [undefined, undefined, undefined];
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (step === 0) {
        updateFstPoint(event);
      } else {
        updateSndPoint(event);
      }
    };
    const handleMouseClick = () => {
      if (step === 0) {
        selectFstPoint();
      } else {
        selectSndPoint();
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
