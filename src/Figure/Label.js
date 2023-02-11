import { TYPE } from "./Figure";
import Figure from "./Figure";

/**
 * The definition method of a Label.
 * @readonly
 * @enum {DefBy}
 */
const BY = {
  /** @type {DefBy} By an offset to the Point. */
  RelToFig: "RelToFig",
};
Object.freeze(BY);

/**
 * Class representing a label figure.
 * @extends Figure
 */
class Label extends Figure {
  /**
   * Create a Label.
   * @param {DefBy}   by    - The definition method of a Label.
   * @param {Object}  props - The properties for the definition of a Label.
   */
  constructor(by, props) {
    super(TYPE.Label, by, props);
  }

  /**
   * Create a Label by an offset to the Point.
   * @param {Id}      host  - The Id of the host Point.
   * @param {number}  x     - The x value of offset.
   * @param {number}  y     - The y value of offset.
   */
  static byRelToFig(host, x, y) {
    const props = { host, x, y };
    return new Label(BY.RelToFig, props);
  }

  /**
   * Get the dimension of the given text.
   * @param   {string} text       - The text to get the dimension of.
   * @param   {string} [style=""] - The style of the text.
   * @returns {{width: number, height: number}} The dimension of the text.
   */
  static #textDim(text, style = "") {
    const element = document.createElement("div");
    element.innerText = text;
    Object.assign(element.style, style);
    element.style.display = "inline-block";

    document.body.appendChild(element);
    const dim = { width: element.clientWidth, height: element.clientHeight };
    document.body.removeChild(element);

    return dim;
  }

  /**
   *  The actual React component drawing the Label.
   *  @type {React.SVGProps<SVGTextElement>}
   */
  get draw() {
    const name = this.figures.fig(this.def.host).name;
    const hostPos = this.figures.fig(this.def.host).coord;
    const dim = Label.#textDim(name);

    return (
      <text
        x={hostPos.x + this.def.x - dim.width / 2}
        y={hostPos.y + this.def.y}
        {...this.commonProps}
      >
        {name}
      </text>
    );
  }
}

export default Label;

export { BY };
