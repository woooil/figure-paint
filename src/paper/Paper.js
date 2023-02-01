import { useSelector } from "react-redux";
import PaperMode from "./PaperMode";
import Figure from "../Figure/Figure";

function Paper() {
  const figures = useSelector((state) => state.figures.value);

  const canvasStyle = {
    backgroundColor: "gray",
    width: "900px",
    height: "600px",
    overflow: "hidden",
    margin: "10px",
    position: "absolute",
  };
  return (
    <div>
      <PaperMode />
      <div id="canvas" style={canvasStyle}>
        {figures.map((figure) => (
          <Figure id={figure.id} key={figure.id} />
        ))}
      </div>
    </div>
  );
}

export default Paper;
