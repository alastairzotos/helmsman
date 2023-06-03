type ValueFn<T> = (v: T | undefined) => T;

export const replaceIndex = <T>(array: T[], index: number, value: T | ValueFn<T>) => {
  const copy = [...array];

  let theValue = typeof value === "function"
    ? (value as ValueFn<T>)(copy.at(index))
    : value;

  if (index >= 0) {
    copy[index] = theValue;
  } else {
    copy[copy.length + index] = theValue;
  }

  return copy;
}
