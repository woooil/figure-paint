import { useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasSidebar from "./Sidebar/CanvasSidebar";
import { DrawPaper } from "./Paper";

function Canvas() {
  const figures = useSelector((state) => state.figures.value);

  useEffect(() => {
    console.log("figure updated:", figures);
  }, [figures]);

  return (
    <div className="canvas">
      <CanvasSidebar className="canvas-sidebar" />
      <DrawPaper figures={figures} />
    </div>
  );
}

export default Canvas;
