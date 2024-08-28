export function getPercentage(current, max) {
  if (
    current === 0 ||
    max === 0 ||
    Number.isNaN(current) ||
    Number.isNaN(max)
  ) {
    return 0;
  }

  return ((current / max) * 100).toFixed(2);
}
