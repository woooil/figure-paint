import { v4 as uuidv4 } from "uuid";

const newFigure = (type, def) => {
  return {
    id: uuidv4(),
    type: type,
    def: def,
  };
};

export default newFigure;
