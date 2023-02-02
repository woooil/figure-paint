import { useEffect } from "react";
import { useSelector } from "react-redux";
import PaperMode from "./PaperMode";
import CANVAS_OPT from "./CANVAS_OPT";
import Figure from "../Figure/Figure";

function Paper() {
  const figures = useSelector((state) => state.figures.value);

  const canvasStyle = {
    backgroundColor: "gray",
    width: `${CANVAS_OPT.width}px`,
    height: `${CANVAS_OPT.height}.px`,
    overflow: "hidden",
    margin: "10px",
    position: "absolute",
  };

  useEffect(() => {
    console.log("figure updated:");
    console.log(figures);
  }, [figures]);

  return (
    <div>
      <PaperMode />
      <div id={CANVAS_OPT.id} style={canvasStyle}>
        {figures.map((figure) => (
          <Figure id={figure.id} key={figure.id} />
        ))}
      </div>
    </div>
  );
}

export default Paper;
