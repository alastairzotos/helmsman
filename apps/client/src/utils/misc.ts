export const replaceIndex = <T>(array: T[], index: number, value: T) => {
  const copy = [...array];

  if (index >= 0) {
    copy[index] = value;
  } else {
    copy[copy.length + index] = value;
  }

  return copy;
}
