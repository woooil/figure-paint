import Figure, { TYPE } from "./Figure";
import Point from "./Point";
import Line from "./Line";
import Segment from "./Segment";
import Label from "./Label";

const figureCoder = {
  /**
   * Get the encoded plain object from the Figure.
   * @param   {Figure} fig - The Figure instance to encode.
   * @returns {Object}       The encoded object.
   */
  encode: (fig) => {
    return { ...fig, id: fig.id };
  },

  /**
   * Get the decoded Figure object from the encoded plain object.
   * @param   {Object} obj - The encoded plain object.
   * @returns {Figure}       The decoded Figure object.
   */
  decode: (obj) => {
    switch (obj.type) {
      case TYPE.Point:
        return new Point(undefined, undefined, obj);
      case TYPE.Line:
        return new Line(undefined, undefined, obj);
      case TYPE.Segment:
        return new Segment(undefined, undefined, obj);
      case TYPE.Label:
        return new Label(undefined, undefined, undefined, obj);
      default:
        return new Figure(undefined, undefined, undefined, obj);
    }
  },
};

export default figureCoder;
