import { v4 as uuidv4 } from "uuid";

/**
 * Creates a new figure
 *
 * @typedef {string} ID
 *
 * @typedef {Object} Figure
 * @property {ID}       id            - The figure's id.
 * @property {FigType}  type          - The figure's type.
 * @property {Object}   def           - The figure's definition.
 * @property {[ID]}     determinants  - The ids of the figure's determinants.
 * @property {[ID]}     dependants    - The ids of the figure's dependants.
 *
 */
const newFigure = (type, def) => {
  const extension = type.extension(def);
  return {
    id: uuidv4().slice(-4),
    type: type,
    def: def,
    determinants: [],
    dependants: [],
    ...extension,
  };
};

export default newFigure;
