export const getChannelIndexByArrows = (
  key: "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown",
  currentIndex: number,
  lastIndex: number,
  idClassElements: string = ""
): number => {
  let newIndex: number = -1;

  if (key === "ArrowLeft" || key === "ArrowRight") {
    newIndex =
      key === "ArrowRight" && currentIndex + 1 <= lastIndex
        ? currentIndex + 1
        : key === "ArrowRight" && currentIndex + 1 > lastIndex
        ? 0
        : key === "ArrowLeft" && currentIndex - 1 < 0
        ? lastIndex
        : currentIndex - 1;
  }

  if ((key === "ArrowUp" || key === "ArrowDown") && idClassElements) {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(`.${idClassElements}`)
    );

    const currentElement = elements[currentIndex];
    const currentElementRect = currentElement.getBoundingClientRect();

    const candidates = elements.filter((element, index) => {
      if (index === currentIndex) return false;

      const rect = element.getBoundingClientRect();
      const isSameColumn =
        rect.left < currentElementRect.right &&
        rect.right > currentElementRect.left;

      if (key === "ArrowDown")
        return rect.top >= currentElementRect.bottom && isSameColumn;
      if (key === "ArrowUp")
        return rect.bottom <= currentElementRect.top && isSameColumn;

      return false;
    });

    const closest = candidates
      .map((candidate) => {
        const rect = candidate.getBoundingClientRect();

        return {
          element: candidate,
          distance: Math.abs(rect.top - currentElementRect.top),
        };
      })
      .sort((a, b) => a.distance - b.distance)[0];

    newIndex = elements.findIndex((element) => element === closest?.element);
  }

  return newIndex !== -1 ? newIndex : currentIndex;
};
