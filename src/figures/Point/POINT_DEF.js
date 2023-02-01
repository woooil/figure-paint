const POINT_DEF = {
  // absolute position
  // def: {
  //   by: POINT_DEF.absPos,
  //   x: (x value of position of point),
  //   y: (y value of position of point),
  // }
  absPos: "absPos",

  // relative position determined by rotating another point with respect to reference point by a given angle
  // def: {
  //   by: POINT_DEF.rotPos,
  //   counterPoint: (id of point rotated),
  //   refPoint: (id of point referenced),
  //   angle: (angle to rotate in degree),
  // }
  rotPnt: "rotPnt",
};
Object.freeze(POINT_DEF);

export default POINT_DEF;
