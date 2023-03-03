import Paper from "../Paper";
import Point from "../../Figure/Point";
import SetFigure from "../Hinter/SetFigure";

function CreatePointByClick() {
  const generator = (event) => {
    const coord = Paper.offsetOf(event);
    return Point.byAbsCoord(coord.x, coord.y);
  };

  return <SetFigure generator={generator} />;
}

export default CreatePointByClick;
