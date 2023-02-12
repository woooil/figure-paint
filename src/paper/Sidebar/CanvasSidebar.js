import { Divider } from "@mui/material";

import AppTitle from "./AppTitle";
import CanvasMode from "./CanvasMode";
import FigureList from "./FigureList";

function CanvasSidebar(props) {
  return (
    <div {...props} style={{ display: "flex", flexDirection: "column" }}>
      <AppTitle className="app-title-card" />
      <CanvasMode className="canvas-mode-card" />
      <Divider sx={{ my: 1.5 }} />
      <FigureList className="figure-list-card" />
    </div>
  );
}

export default CanvasSidebar;
