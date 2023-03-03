import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { update } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import SelectFigure from "../Hinter/SelectFigure";

function HideLineByClick() {
  const dispatch = useDispatch();
  const [line, setLine] = useState(undefined);

  useEffect(() => {
    if (line) {
      dispatch(update({ id: line, with: { visible: false } }));
    }
  }, [line, dispatch]);

  return <SelectFigure type={TYPE.Line} setId={setLine} />;
}

export default HideLineByClick;
