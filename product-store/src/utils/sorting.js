export const makeComparator =
  (key, direction = "asc") =>
  (a, b) => {
    const multiplier = direction === "asc" ? 1 : -1
    const left = a[key]
    const right = b[key]

    if (typeof left === "string") {
      return (
        left.localeCompare(right) * multiplier
      )
    }

    return (left - right) * multiplier
  }