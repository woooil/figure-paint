import { useState } from "react";
import { TYPE } from "../../Figure/Figure";
import Segment from "../../Figure/Segment";
import SelectFigure from "../Hinter/SelectFigure";

function CreateSegByClkEndpnts() {
  const [fstPnt, setFstPnt] = useState(undefined);
  const setSndPnt = useState(undefined)[1];
  const generator = (id) => {
    return Segment.byEndpnts(fstPnt, id);
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

export default CreateSegByClkEndpnts;
