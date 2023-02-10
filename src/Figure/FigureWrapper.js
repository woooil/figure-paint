import { useSelector } from "react-redux";
import getFigureStyle from "./getFigureStyle";

function FigureWrapper({ id, ...props }) {
  const figures = useSelector((state) => state.figures.value);
  const figure = figures.find((f) => f.id === id);
  const style = getFigureStyle(figures, id);

  return (
    <div
      style={{
        ...style.wrapperStyle,
        position: "absolute",
        display: figure.visible === false ? "none" : "",
      }}
      className={`${figure.type} figure-wrapper`}
      id={id}
      {...props}
    >
      <div
        style={{
          ...style.figureStyle,
          position: "absolute",
        }}
      >
        {style.child}
      </div>
    </div>
  );
}

export default FigureWrapper;
