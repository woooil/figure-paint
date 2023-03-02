function clickJudge(event, type = undefined) {
  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  const paddings = elements.filter(
    (e) =>
      e.classList.contains("figure") &&
      !e.classList.contains("hint") &&
      (type === undefined || e.classList.contains(type.toLowerCase()))
  );
  const id = paddings.map((p) => p.id);
  return id.length > 0 ? id[0] : undefined;
}

export default clickJudge;
