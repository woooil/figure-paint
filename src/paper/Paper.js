import { useSelector } from "react-redux";
import PaperMode from "./PaperMode";
import Figure from "../figures/Figure";

function Paper() {
  const figures = useSelector((state) => state.figures.value);

  return (
    <div>
      <PaperMode />
      <div className="figures">
        {figures.map((figure) => (
          <Figure id={figure.id} key={figure.id} />
        ))}
      </div>
    </div>
  );
}

export default Paper;
