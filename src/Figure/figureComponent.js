const component = (wrapperStyle, figureStyle, child = undefined) => {
  return {
    wrapperStyle: wrapperStyle,
    figureStyle: figureStyle,
    child: child,
  };
};

export default component;
