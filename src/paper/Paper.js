import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ClickToCreatePoint from "./ClickToCreatePoint";

function Paper() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  const [mode, setMode] = useState(new ClickToCreatePoint());

  useEffect(() => {
    const handleMouseClick = (event) => {
      dispatch(mode.onClick(event));
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return (
    <div>
      <h2>Current mode: {mode.modeName}</h2>
      <div>{figures.map((figure) => figure.component)}</div>
    </div>
  );
}

export default Paper;
