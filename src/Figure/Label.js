import { TYPE } from "./Figure";
import Figure from "./Figure";

/**
 * The definition method of a Label.
 * @readonly
 * @enum {DefBy}
 */
const BY = {
  /** @type {DefBy} By an offset to the Point. */
  PointName: "PointName",
  /** @type {DefBy} By a length mark to the Segment. */
  SegLength: "Length",
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
   * @param {Id}      host  - The Id of the host Figure of a Label.
   * @param {Object}  [encodedObj={}] - The encoded object to decode and directly assign to a Label. It has the highest priority.
   */
  constructor(by, props, host, encodedObj = {}) {
    super(TYPE.Label, by, props, encodedObj);
    this.host = encodedObj.host || host;
  }

  /**
   * Create a Label by an offset to the Point.
   * @param   {Id}      host  - The Id of the host Point.
   * @param   {number}  x     - The x value of offset.
   * @param   {number}  y     - The y value of offset.
   * @returns {Label}           The Label.
   */
  static byPointName(host, x, y) {
    const props = { x, y };
    return new Label(BY.PointName, props, host);
  }

  /**
   * Create a Label by a length mark to the Segment.
   * @param   {Id}      host  - The Id of the host Segment.
   * @param   {string}  text  - The text to display as a Label.
   * @returns {Label}           The Label.
   */
  static bySegLength(host, text) {
    const props = { text };
    return new Label(BY.SegLength, props, host);
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
   *  @type {React.SVGProps<SVGGElement>}
   */
  get draw() {
    let inner = <></>;
    const fontStyle = {
      fontFamily: "Computer Modern",
      fontSize: 16,
    };

    const textElem = (text, x, y) => (
      <text
        x={x}
        y={y}
        fontFamily={fontStyle.fontFamily}
        fontSize={fontStyle.fontSize}
      >
        {text}
      </text>
    );

    switch (this.def.by) {
      case BY.PointName:
        const host = this.figures.fig(this.host);
        const pos = host.coord;
        inner = textElem(
          host.name,
          pos.x + this.def.x - Label.#textDim(host.name, fontStyle).width / 2,
          pos.y + this.def.y
        );
        break;
      case BY.SegLength:
        const endCoords = this.figures.fig(this.host).endCoords;
        const control = endCoords[0].atDistance(endCoords[1], 50);
        const d = `M ${endCoords[0].x} ${endCoords[0].y} Q ${control.x} ${control.y} ${endCoords[1].x} ${endCoords[1].y}`;
        const t = 0.5;
        const x =
          (1 - t) * (1 - t) * endCoords[0].x +
          2 * (1 - t) * t * control.x +
          t * t * endCoords[1].x;
        const y =
          (1 - t) * (1 - t) * endCoords[0].y +
          2 * (1 - t) * t * control.y +
          t * t * endCoords[1].y;
        const textDim = Label.#textDim(this.def.text, fontStyle);

        inner = (
          <>
            <defs>
              <mask id={`cut-off-${this.id}`}>
                <path
                  fill="none"
                  d={d}
                  stroke="white"
                  strokeWidth="10"
                  strokeOpacity="1"
                />
                <rect
                  x={x - textDim.width / 2 - 4}
                  y={y - textDim.height + 4}
                  width={textDim.width + 8}
                  height={textDim.height + 4}
                />
              </mask>
            </defs>
            <path
              d={d}
              stroke="black"
              strokeOpacity="1"
              strokeWidth="1"
              strokeDasharray="5,4"
              fill="transparent"
              mask={`url(#cut-off-${this.id})`}
            />
            {textElem(this.def.text, x - textDim.width / 2, y)}
          </>
        );
        break;
      default:
        break;
    }

    return <g {...this.commonProps}>{inner}</g>;
  }

  /**
   * The human-readable name based on Points' names of the Label.
   * @type {string}
   */
  get name() {
    return this.figures.fig(this.host).name;
  }

  /**
   * The description of the Label's definition.
   * @type {string}
   */
  get description() {
    const prefix = "A label";
    const host = this.figures.fig(this.host).name;
    let definition = "";

    switch (this.def.by) {
      case BY.PointName:
        definition = `${prefix} displaying the name of point ${host}.`;
        break;
      case BY.SegLength:
        definition = `${prefix} displaying the length of segment ${host}.`;
        break;
      default:
        break;
    }

    return definition;
  }
}

export default Label;
export { BY };
