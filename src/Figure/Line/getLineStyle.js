import getLinearEq from "./getLinearEq";
import getIntsecsWithCanvas from "./getIntsecsWithCanvas";
import getLineStyleHelper from "./getLineStyleHelper";

function getLineStyle(figures, id) {
  const linearEq = getLinearEq(figures, id);
  const coords = getIntsecsWithCanvas(linearEq);

  return getLineStyleHelper(coords[0], coords[1]);
}

export default getLineStyle;
