import { useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasMode from "./CanvasMode";
import Paper from "./Paper";

function Canvas() {
  const figures = useSelector((state) => state.figures.value);

  useEffect(() => {
    console.log("figure updated:", figures);
  }, [figures]);

  return (
    <div className="canvas">
      <CanvasMode className="canvas-sidebar" />
      {Paper.draw}
    </div>
  );
}

export default Canvas;
