var nextName = "A";
const getNextName = () => {
  const result = nextName;
  if (nextName.at(-1) !== "Z") {
    nextName =
      nextName.slice(0, -1) +
      String.fromCharCode(nextName.at(-1).charCodeAt(0) + 1);
  } else {
    nextName = nextName.slice(0, -1) + "AA";
  }
  return result;
};

export default getNextName;
