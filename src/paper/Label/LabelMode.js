import CreateLabelByClick from "./CreateLabelByClick";
import CreateLabelOfSegLength from "./CreateLabelOfSegLength";

const MODE = {
  CreateLabelByClick: "Click a point to label",
  CreateLabelOfSegLength: "Enter a label and click a segment to label",
};
Object.freeze(MODE);
export { MODE as LABEL_MODE };

function LabelMode({ mode }) {
  switch (mode) {
    case MODE.CreateLabelByClick:
      return <CreateLabelByClick />;
    case MODE.CreateLabelOfSegLength:
      return <CreateLabelOfSegLength />;
    default:
      return <div></div>;
  }
}

export default LabelMode;
