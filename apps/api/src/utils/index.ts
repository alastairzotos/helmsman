export const modifyRecord = <T = string>(record: Record<string, T>, modifier: (value: T) => T) =>
  Object.entries(record || {})
    .map(([key, value]) => ({
      key,
      value: modifier(value),
    }))
    .reduce((acc, { key, value }) => ({
      ...acc,
      [key]: value
    }), {} as Record<string, T>)
