import LinearEq from "./LinearEq";
import CANVAS_OPT from "../../Paper/CANVAS_OPT";
import getIntersection from "./getIntersection";

function getIntsecsWithCanvas(line) {
  const pad = 5;

  const sides = [
    new LinearEq(0, 1, pad),
    new LinearEq(1, 0, pad),
    new LinearEq(0, 1, -CANVAS_OPT.height - pad),
    new LinearEq(1, 0, -CANVAS_OPT.width - pad),
  ];

  const intsecs = sides.map((s) => {
    return getIntersection(line, s);
  });

  var diss = [];

  intsecs.forEach((intsec, index) => {
    const target = index % 2 === 0 ? intsec.x : intsec.y;
    const bound = index % 2 === 0 ? CANVAS_OPT.width : CANVAS_OPT.height;

    var dis = undefined;
    if (0 < target && target < bound) {
      dis = 0;
    } else if (target < 0) {
      dis = -target;
    } else {
      dis = target - bound;
    }

    diss.push([dis, index]);
  });

  diss.sort((a, b) => a[0] - b[0]);

  const result = [intsecs[diss[0][1]], intsecs[diss[1][1]]];
  return result;
}

export default getIntsecsWithCanvas;
