function clickJudge(figures, event, type = undefined) {
  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  const paddings = elements.filter(
    (e) =>
      e.classList.contains("figure-wrapper") &&
      (type === undefined || e.classList.contains(type.name))
  );
  const id = paddings.map((p) => p.id);
  const figuresSelcted = id.map((i) => figures.find((f) => f.id === i));
  return figuresSelcted.length > 0 ? figuresSelcted[0].id : undefined;
}

export default clickJudge;
