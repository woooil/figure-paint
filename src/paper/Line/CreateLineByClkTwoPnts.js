import { useState } from "react";
import { TYPE } from "../../Figure/Figure";
import Line from "../../Figure/Line";
import SelectFigure from "../Hinter/SelectFigure";

function CreateLineByClkTwoPnts() {
  const [fstPnt, setFstPnt] = useState(undefined);
  const setSndPnt = useState(undefined)[1];
  const generator = (_, id) => {
    return Line.byTwoPnts(fstPnt, id);
  };

  return !fstPnt ? (
    <SelectFigure type={TYPE.Point} setId={setFstPnt} />
  ) : (
    <SelectFigure
      type={TYPE.Point}
      exclude={[fstPnt]}
      setId={setSndPnt}
      withCreate={{ generator, determinants: [[fstPnt, setFstPnt]] }}
    />
  );
}

export default CreateLineByClkTwoPnts;
