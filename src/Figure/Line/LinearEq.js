/**
 * The equations is as the following form:
 *     [[ ax + by + c = 0 where b = 1 XOR (b = 0 AND a = 1) ]]
 * Note that b only has the value 0 or 1.
 *
 * @property {number} a - The coefficient of x.
 * @property {number} b - The coefficient of y.
 * @property {number} c - The constant term.
 *
 */
class LinearEq {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

export default LinearEq;
