import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { remove } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import SelectFigure from "../Hinter/SelectFigure";

function RemovePointByClick() {
  const dispatch = useDispatch();
  const [point, setPoint] = useState(undefined);

  useEffect(() => {
    if (point) {
      dispatch(remove(point));
    }
  }, [point, dispatch]);

  return <SelectFigure type={TYPE.Point} setId={setPoint} />;
}

export default RemovePointByClick;
