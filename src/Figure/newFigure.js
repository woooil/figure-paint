import { v4 as uuidv4 } from "uuid";

const newFigure = (type, def) => {
  return {
    id: uuidv4().slice(-4),
    type: type,
    def: def,
    determinants: [],
    dependants: [],
  };
};

export default newFigure;
