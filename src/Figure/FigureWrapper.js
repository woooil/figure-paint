function FigureWrapper({ type, component, ...props }) {
  return (
    <div
      style={{ ...component.wrapperStyle, position: "absolute" }}
      className={`${type.name} figure-wrapper`}
      {...props}
    >
      <div style={{ ...component.figureStyle, position: "absolute" }}>
        {component.child !== undefined ? component.child : ""}
      </div>
    </div>
  );
}

export default FigureWrapper;
