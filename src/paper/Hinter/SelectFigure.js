import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, setDep, remove } from "../../Figure/figureSlice";
import clickJudge from "../clickJudge";

function SelectFigure({
  type,
  exclude = [],
  setId = () => {},
  withCreate = undefined,
}) {
  const dispatch = useDispatch();

  // Id of Figure instance; undefined if not exists
  var id = undefined;
  var idCreated = undefined;
  // When mouse is moved, update Figure
  const updateFigure = (event) => {
    const idUnder = clickJudge(event, type);
    // If mouse is on Figure, make Figure hint
    if (idUnder && id !== idUnder && !exclude.includes(idUnder)) {
      id = idUnder;
      dispatch(update({ id: id, with: { isHint: true } }));
      // If new figure is created
      if (withCreate) {
        const figure = withCreate.generator(id);
        idCreated = figure.id;
        dispatch(create(figure));
        (withCreate.determinants ? withCreate.determinants : []).forEach((d) =>
          dispatch(setDep({ determinant: d[0], dependant: idCreated }))
        );
        dispatch(setDep({ determinant: id, dependant: idCreated }));
        dispatch(update({ id: idCreated, with: { isHint: true } }));
      }
    }
    // Else if mouse gets out of Figure, make Figure non-hint
    else if (id && !idUnder) {
      if (!exclude.includes(id)) {
        dispatch(update({ id: id, with: { isHint: false } }));
        if (withCreate) {
          dispatch(remove(idCreated));
        }
      }
      id = undefined;
      idCreated = undefined;
    }
  };
  // When mouse is clicked, select Figure
  const selectFigure = () => {
    if (id) {
      if (withCreate) {
        dispatch(update({ id: idCreated, with: { isHint: false } }));
        (withCreate.determinants ? withCreate.determinants : []).forEach(
          (d) => {
            dispatch(update({ id: d[0], with: { isHint: false } }));
            d[1](undefined);
          }
        );
        dispatch(update({ id: id, with: { isHint: false } }));
        id = undefined;
      }
      setId(id);
      id = undefined;
    }
  };

  useEffect(() => {
    window.addEventListener("click", selectFigure);
    window.addEventListener("mousemove", updateFigure);
    return () => {
      window.removeEventListener("click", selectFigure);
      window.removeEventListener("mousemove", updateFigure);
    };
  });
}

export default SelectFigure;
