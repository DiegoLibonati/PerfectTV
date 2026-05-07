export const getChannelIndexByArrows = (
  key: "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown",
  currentIndex: number,
  lastIndex: number,
  className = ""
): number => {
  if (key === "ArrowRight") return currentIndex + 1 > lastIndex ? 0 : currentIndex + 1;
  if (key === "ArrowLeft") return currentIndex - 1 < 0 ? lastIndex : currentIndex - 1;
  if (!className) return currentIndex;

  const elements = Array.from(document.querySelectorAll<HTMLElement>(`.${className}`));
  const currentElement = elements[currentIndex];

  if (!currentElement) return currentIndex;

  const currentRect = currentElement.getBoundingClientRect();
  const isArrowDown = key === "ArrowDown";

  const candidates = elements.filter((element, index) => {
    if (index === currentIndex) return false;

    const rect = element.getBoundingClientRect();
    const isSameColumn = rect.left < currentRect.right && rect.right > currentRect.left;
    const isCorrectDirection = isArrowDown
      ? rect.top >= currentRect.bottom
      : rect.bottom <= currentRect.top;

    return isSameColumn && isCorrectDirection;
  });

  const closest = candidates
    .map((candidate) => ({
      element: candidate,
      distance: Math.abs(candidate.getBoundingClientRect().top - currentRect.top),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  const closestIndex = elements.findIndex((el) => el === closest?.element);
  return closestIndex !== -1 ? closestIndex : currentIndex;
};
