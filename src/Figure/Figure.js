import { useSelector } from "react-redux";
import FigureWrapper from "./FigureWrapper";

function Figure({ id }) {
  const figures = useSelector((state) => state.figures.value);
  const figure = figures.find((f) => f.id === id);
  const component = figure.type.component({ id });

  return <FigureWrapper type={figure.type} component={component} id={id} />;
}

export default Figure;
