import { useSelector } from "react-redux";
import PaperMode from "./PaperMode";
import Figure from "../figures/Figure";

function Paper() {
  const figures = useSelector((state) => state.figures.value);

  const canvasStyle = {
    height: "100vh",
  };
  return (
    <div>
      <PaperMode />
      <div className="canvas" style={canvasStyle}>
        {figures.map((figure) => (
          <Figure id={figure.id} key={figure.id} />
        ))}
      </div>
    </div>
  );
}

export default Paper;
