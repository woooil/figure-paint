import { useRef, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

import FIG_TYPE from "../FIG_TYPE";
import getPointPos from "../Point/getPointPos";

function Label(props) {
  const target = useRef();
  const [dim, setDim] = useState({ width: 0, height: 0 });

  const figures = useSelector((state) => state.figures.value);
  const label = figures.find((f) => f.id === props.id);
  const hostPos = getPointPos(figures, label.def.host);

  const paddingSize = 4;
  const labelStyle = {
    position: "absolute",
    left: paddingSize,
    top: paddingSize,
  };
  const paddingStyle = {
    position: "absolute",
    width: dim.width + paddingSize * 2,
    height: dim.height + paddingSize * 2,
    left: hostPos.x + label.def.x - dim.width / 2 - paddingSize,
    top: hostPos.y + label.def.y - paddingSize,
  };

  useLayoutEffect(() => {
    setDim({
      width: target.current.offsetWidth,
      height: target.current.offsetHeight,
    });
  }, []);

  return (
    <div
      style={paddingStyle}
      className={`${FIG_TYPE.label} figure-wrapper`}
      {...props}
    >
      <div ref={target} style={labelStyle}>
        {label.def.text}
      </div>
    </div>
  );
}

export default Label;
