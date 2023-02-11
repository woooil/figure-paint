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
  #id;

  /**
   * Create a Figure.
   * @param {FigType} type            - The type of a Figure.
   * @param {DefBy}   by              - The definition method of a Figure.
   * @param {Object}  props           - The properties for the definition of a Figure.
   * @param {Object}  [extensions={}] - The extra properties for a Figure.
   */
  constructor(type, by, props, extensions = {}) {
    this.#id = uuidv4().slice(-4);
    this.type = type;
    this.def = { by, ...props };
    this.determinants = [];
    this.dependants = [];
    Object.assign(this, extensions);
  }

  /**
   * The id of the Figure.
   * @type {Id}
   */
  get id() {
    return this.#id;
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
      className: `${this.type} figure`,
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
}

export default Figure;
export { TYPE };
