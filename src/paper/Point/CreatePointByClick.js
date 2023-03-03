import Paper from "../Paper";
import Point from "../../Figure/Point";
import CreateFigure from "../Hinter/CreateFigure";

function CreatePointByClick() {
  const generator = (event) => {
    const coord = Paper.offsetOf(event);
    return Point.byAbsCoord(coord.x, coord.y);
  };

  return <CreateFigure generator={generator} />;
}

export default CreatePointByClick;
