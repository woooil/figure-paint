import { useSelector } from "react-redux";
import PaperMode from "./PaperMode";

function Paper() {
  const figures = useSelector((state) => state.figures.value);

  return (
    <div>
      <PaperMode />
      <div className="figures">{figures.map((figure) => figure.component)}</div>
    </div>
  );
}

export default Paper;
