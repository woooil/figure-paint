import { useEffect } from "react";
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

  useEffect(() => {
    console.log("figure updated:");
    console.log(figures);
  }, [figures]);

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
