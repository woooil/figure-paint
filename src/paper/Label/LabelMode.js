import CreateLabelByClick from "./CreateLabelByClick";

const MODE = {
  CreateLabelByClick: "Enter a label text, and click a point to label",
};
Object.freeze(MODE);
export { MODE as LABEL_MODE };

function LabelMode({ mode }) {
  switch (mode) {
    case MODE.CreateLabelByClick:
      return <CreateLabelByClick />;

    default:
      return <div></div>;
  }
}

export default LabelMode;
