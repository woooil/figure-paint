import { useState } from "react";
import Paper from "../Paper";
import Point from "../../Figure/Point";
import { TYPE } from "../../Figure/Figure";
import SetFigure from "../Hinter/SetFigure";
import SelectFigure from "../Hinter/SelectFigure";

function MovePointByClick() {
  const [point, setPoint] = useState(undefined);
  const generator = (event) => {
    const coord = Paper.offsetOf(event);
    return Point.byAbsCoord(coord.x, coord.y);
  };

  return !point ? (
    <SelectFigure type={TYPE.Point} setId={setPoint} />
  ) : (
    <SetFigure generator={generator} existing={[point, setPoint]} />
  );
}

export default MovePointByClick;
