export const getChannelNumberByArrow = (
  key: string,
  activeChannelNumber: number,
  numbers: number[]
) => {
  const indexOfActiveChannelNumber = numbers.findIndex(
    (numberUsed) => numberUsed === activeChannelNumber
  );

  const newIndex =
    key === "ArrowRight" && indexOfActiveChannelNumber + 1 <= numbers.length - 1
      ? indexOfActiveChannelNumber + 1
      : key === "ArrowRight" &&
        indexOfActiveChannelNumber + 1 > numbers.length - 1
      ? 0
      : key === "ArrowLeft" && indexOfActiveChannelNumber - 1 < 0
      ? numbers.length - 1
      : indexOfActiveChannelNumber - 1;

  return newIndex;
};
