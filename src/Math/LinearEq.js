import Coord from "./Coord";
import CANVAS_OPT from "../Paper/CANVAS_OPT";

/**  Class of an algebra model expressing a linear equation in two variables. */
class LinearEq {
  /**
   * Create a Linear equation.
   *
   * The equation is as the following form:
   *     [[ ax + by + c = 0 where b = 1 XOR (b = 0 AND a = 1) ]]
   * Note that b only has the value 0 or 1.
   *
   * @param {number} a - The coefficient of x.
   * @param {number} b - The coefficient of y.
   * @param {number} c - The constant term.
   */
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /**
   * Get an intersection with the given Linear eqauation.
   * @param   {LinearEq}    eq  - Another Linear equation to calulate the intersection with.
   * @returns {Coord | string}  A Coord object of intersection if there is exactly one point of intersection. Else, "Coincident" or "Parallel" depending on condition.
   * @see {@link https://www.geeksforgeeks.org/pair-of-linear-equations-in-two-variables/}
   */
  intersectionWith(eq) {
    // Coincident if [ a = a' AND b = b' = 1 AND c = c' ] OR [ a = a' = 1 AND b = b' = 0 AND c = c' ]
    if (
      this.a === eq.a &&
      this.b === eq.b &&
      this.c === eq.c &&
      (this.b === 1 || (this.a === 1 && this.b === 0))
    ) {
      return "Coincident";
    }

    // Parallel if [ a = a' AND b = b' = 1 AND c != c' ] OR [ a = a' = 1 AND b = b' = 0 AND c != c' ]
    if (
      this.a === eq.a &&
      this.b === eq.b &&
      this.c !== eq.c &&
      (this.b === 1 || (this.a === 1 && this.b === 0))
    ) {
      return "Parallel";
    }

    const denom = this.a * eq.b - eq.a * this.b;
    const x = (this.b * eq.c - eq.b * this.c) / denom;
    const y = (this.c * eq.a - eq.c * this.a) / denom;

    return new Coord(x, y);
  }

  /**
   * Get two intersections with the Canvas.
   * @returns {Coord[]} Two Coords of intersection with the Canvas.
   */
  intersectionWithCanvas() {
    const pad = 5;

    const sides = [
      new LinearEq(0, 1, pad),
      new LinearEq(1, 0, pad),
      new LinearEq(0, 1, -CANVAS_OPT.height - pad),
      new LinearEq(1, 0, -CANVAS_OPT.width - pad),
    ];

    const intsecs = sides.map((s) => {
      return this.intersectionWith(s);
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
}

export default LinearEq;
