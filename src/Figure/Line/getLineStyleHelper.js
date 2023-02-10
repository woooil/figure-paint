import FigureStyle from "../FigureStyle";

function getLineStyleHelper(fstCoord, sndCoord) {
  const paddingWidth = 4;
  const backgroundColor = "black";
  const lineWidth = 2;

  const len = Math.sqrt(
    (fstCoord.x - sndCoord.x) ** 2 + (fstCoord.y - sndCoord.y) ** 2
  );
  const angle =
    (Math.atan((sndCoord.y - fstCoord.y) / (sndCoord.x - fstCoord.x)) * 180) /
    Math.PI;
  const pos = {
    x: (fstCoord.x + sndCoord.x - len) / 2,
    y: (fstCoord.y + sndCoord.y) / 2,
  };

  const figureStyle = {
    backgroundColor: backgroundColor,
    width: `${len}px`,
    height: `${lineWidth}px`,
    top: paddingWidth - lineWidth / 2,
  };
  const wrapperStyle = {
    width: `${len}px`,
    height: `${paddingWidth * 2}px`,
    transform: `rotate(${angle}deg)`,
    left: pos.x,
    top: pos.y - paddingWidth,
  };

  return new FigureStyle(wrapperStyle, figureStyle);
}

export default getLineStyleHelper;
