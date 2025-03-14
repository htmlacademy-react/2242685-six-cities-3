function groupBy<T extends Record<string, unknown>>(
  arr: readonly T[],
  keyProperty: (item: T) => string
): T[] {
  const grouped = arr.reduce((output: Record<string, T[]>, item: T) => {
    const key = keyProperty(item);
    if (!output[key]) {
      output[key] = [];
    }
    output[key].push(item);
    return output;
  }, {} as Record<string, T[]>);

  return Object.values(grouped).flat();
}

function percentsRating(rating: number) {
  return Math.round(rating) * 20;
}

export {percentsRating, groupBy};
