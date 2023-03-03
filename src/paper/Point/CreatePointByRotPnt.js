import { useState } from "react";
import { TYPE } from "../../Figure/Figure";
import Paper from "../Paper";
import Point from "../../Figure/Point";

import SelectFigure from "../Hinter/SelectFigure";
import SetFigure from "../Hinter/SetFigure";

function CreatePointByRotPnt() {
  const [fstPnt, setFstPnt] = useState(undefined);
  const [sndPnt, setSndPnt] = useState(undefined);
  const generator = (event) => {
    const figures = Paper.figures;
    const angle = figures
      .fig(fstPnt)
      .coord.angleBetween(figures.fig(sndPnt).coord, Paper.offsetOf(event));
    return Point.byRotPnt(sndPnt, fstPnt, angle);
  };

  return !fstPnt ? (
    <SelectFigure type={TYPE.Point} setId={setFstPnt} />
  ) : !sndPnt ? (
    <SelectFigure type={TYPE.Point} setId={setSndPnt} exclude={[fstPnt]} />
  ) : (
    <SetFigure
      generator={generator}
      determinants={[
        [fstPnt, setFstPnt],
        [sndPnt, setSndPnt],
      ]}
    />
  );
}

export default CreatePointByRotPnt;
