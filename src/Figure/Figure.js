import { v4 as uuidv4 } from "uuid";
import { store } from "../store";

/**
 * @typedef {string} FigType
 * @typedef {string} DefBy
 * @typedef {string} Id
 */

/**
 * The type of a Figure.
 * @readonly
 * @enum {FigType}
 */
const TYPE = {
  /** @type {FigType} Point type. */
  Point: "Point",
  /** @type {FigType} Line type. */
  Line: "Line",
  /** @type {FigType} Segment type. */
  Segment: "Segment",
  /** @type {FigType} Label type. */
  Label: "Label",
};
Object.freeze(TYPE);

/** Class representing a figure. */
class Figure {
  /**
   * Create a Figure.
   * @param {FigType} type            - The type of a Figure.
   * @param {DefBy}   by              - The definition method of a Figure.
   * @param {Object}  props           - The properties for the definition of a Figure.
   * @param {Object}  [encodedObj={}] - The encoded object to decode and directly assign to a Figure. It has the highest priority.
   */
  constructor(type, by, props, encodedObj = {}) {
    const {
      id: encodedId,
      type: encodedType,
      def: encodedDef,
      determinants: encodedDeterminants,
      dependants: encodedDependants,
      ...extra
    } = encodedObj;
    this.id = encodedId || Figure.newId();
    this.type = encodedType || type;
    this.def = encodedDef || { by, ...props };
    this.determinants = encodedDeterminants || [];
    this.dependants = encodedDependants || [];
    Object.assign(this, extra);
  }

  static newId() {
    return uuidv4().slice(-4);
  }

  /**
   * The common properties of Figure's drawings.
   * @type {Object}
   */
  get commonProps() {
    return {
      stroke: "white",
      strokeWidth: "4",
      strokeOpacity: "0",
      style: {
        display: this.visible === false ? "none" : "",
      },
      className: `${this.type.toLowerCase()} figure ${
        this.isHint === true ? "hint" : ""
      }`,
      id: this.id,
      key: this.id,
    };
  }

  /**
   * The list of all Figures stored in the store.
   * @type {Figure[]}
   */
  get figures() {
    return store.getState().figures.value;
  }

  /**
   *  The actual React component drawing the Figure.
   *  @type {React.SVGProps}
   */
  get draw() {
    return <></>;
  }

  /**
   * The human-readable name based on Points' names of the Figure.
   * @type {string}
   */
  get name() {
    return "Any";
  }

  /**
   * The description of the Figure's definition.
   * @type {string}
   */
  get description() {
    return "Any definition";
  }
}

export default Figure;
export { TYPE };
