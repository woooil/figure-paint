function clickJudge(figures, point, className = undefined) {
  const elements = document.elementsFromPoint(point.x, point.y);
  const paddings = elements.filter(
    (e) =>
      e.classList.contains("figure-wrapper") &&
      (className === undefined || e.classList.contains(className))
  );
  const id = paddings.map((p) => p.id);
  const figuresSelcted = id.map((i) => figures.find((f) => f.id === i));
  figuresSelcted.filter((f) => f.isInPadding(point));
  figuresSelcted.sort((a, b) => a.distanceFrom(point) - b.distanceFrom(point));
  return figuresSelcted[0];
}

export default clickJudge;
