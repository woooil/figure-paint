import Coord from "../Point/Coord";

// Reference: https://www.geeksforgeeks.org/pair-of-linear-equations-in-two-variables/
function getIntersection(fst, snd) {
  console.log(fst, snd);
  // Coincident if [ a = a' AND b = b' = 1 AND c = c' ] OR [ a = a' = 1 AND b = b' = 0 AND c = c' ]
  if (
    fst.a === snd.a &&
    fst.b === snd.b &&
    fst.c === snd.c &&
    (fst.b === 1 || (fst.a === 1 && fst.b === 0))
  ) {
    return "Coincident";
  }

  // Parallel if [ a = a' AND b = b' = 1 AND c != c' ] OR [ a = a' = 1 AND b = b' = 0 AND c != c' ]
  if (
    fst.a === snd.a &&
    fst.b === snd.b &&
    fst.c !== snd.c &&
    (fst.b === 1 || (fst.a === 1 && fst.b === 0))
  ) {
    return "Parallel";
  }

  const denom = fst.a * snd.b - snd.a * fst.b;
  const x = (fst.b * snd.c - snd.b * fst.c) / denom;
  const y = (fst.c * snd.a - snd.c * fst.a) / denom;

  return new Coord(x, y);
}

export default getIntersection;
