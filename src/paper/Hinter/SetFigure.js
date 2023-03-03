import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, remove, setDep } from "../../Figure/figureSlice";
import Paper from "../Paper";

function SetFigure({ generator, determinants = [], existing = undefined }) {
  const dispatch = useDispatch();

  // Id of Figure instance; undefined if not exists
  var id = undefined;
  // When mouse is moved, update Figure
  const updateFigure = (event) => {
    // If mouse is on Paper, move or create Figure
    if (Paper.isUnder(event)) {
      const figure = generator(event);
      // If Figure doesn't exist, first create Figure
      if (existing && !id) {
        id = existing[0];
      }
      if (!id) {
        id = figure.id;
        dispatch(create(figure));
        determinants.forEach((d) =>
          dispatch(setDep({ determinant: d[0], dependant: id }))
        );
        dispatch(update({ id: id, with: { isHint: true } }));
      } else {
        dispatch(update({ id: id, with: { def: figure.def } }));
      }
    }
    // Else if mouse gets out of Paper, remove Figure
    else if (id) {
      if (!existing) {
        dispatch(remove(id));
      }
      id = undefined;
    }
  };
  // When mouse is clicked, settle Figure
  const settleFigure = () => {
    if (id) {
      dispatch(update({ id: id, with: { isHint: false } }));
      determinants.forEach((d) => {
        dispatch(update({ id: d[0], with: { isHint: false } }));
        d[1](undefined);
      });
      id = undefined;
      if (existing) {
        existing[1](undefined);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", settleFigure);
    window.addEventListener("mousemove", updateFigure);
    return () => {
      window.removeEventListener("click", settleFigure);
      window.removeEventListener("mousemove", updateFigure);
    };
  });
}

export default SetFigure;
