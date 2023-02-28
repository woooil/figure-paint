import CanvasSidebar from "./Sidebar/CanvasSidebar";
import { DrawPaper } from "./Paper";

function Canvas() {
  return (
    <div className="canvas">
      <CanvasSidebar className="canvas-sidebar" />
      <DrawPaper />
    </div>
  );
}

export default Canvas;
