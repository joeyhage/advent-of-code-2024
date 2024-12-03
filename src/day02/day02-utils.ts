export function areListSiblingsWithinDistance(
  values: Array<number>,
  minThreshold: number,
  maxThreshold: number
): boolean {
  return values.every((value, idx) => {
    const isFirst = idx === 0;
    const difference = isFirst ? 0 : Math.abs(value - values[idx - 1]);
    return (
      isFirst || (difference >= minThreshold && difference <= maxThreshold)
    );
  });
}

export function hasConsistentChangeDirection(values: Array<number>) {
  const reportCopy = [...values];
  return (
    String(values) === String(reportCopy.sort((a, b) => a - b)) ||
    String(values) === String(reportCopy.reverse())
  );
}
