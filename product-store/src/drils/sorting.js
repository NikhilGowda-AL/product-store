const results = []

function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected)

  results.push(pass)

  console.log(
    pass
      ? `PASS  ${name}`
      : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`
  )
}

const products = [
  {
    id: 1,
    title: "Phone",
    price: 500,
    rating: 4.5,
    discountPercentage: 10
  },
  {
    id: 2,
    title: "Laptop",
    price: 900,
    rating: 4.8,
    discountPercentage: 15
  },
  {
    id: 3,
    title: "Chair",
    price: 150,
    rating: 4.5,
    discountPercentage: 5
  },
  {
    id: 4,
    title: "Lamp",
    price: 150,
    rating: 3.9,
    discountPercentage: 20
  }
]

const byPriceAsc = (list) =>
  [...list].sort((a, b) => a.price - b.price)

const byPriceDesc = (list) =>
  [...list].sort((a, b) => b.price - a.price)

const byTitle = (list) =>
  [...list].sort((a, b) =>
    a.title.localeCompare(b.title)
  )

const byRatingThenPrice = (list) =>
  [...list].sort(
    (a, b) =>
      b.rating - a.rating ||
      a.price - b.price
  )

const getDiscountedPrice = (product) =>
  product.price *
  (1 - product.discountPercentage / 100)

const byDiscountedPrice = (list) =>
  [...list].sort(
    (a, b) =>
      getDiscountedPrice(a) -
      getDiscountedPrice(b)
  )

const makeComparator =
  (key, direction = "asc") =>
  (a, b) => {
    const multiplier = direction === "asc" ? 1 : -1
    const left = a[key]
    const right = b[key]

    if (typeof left === "string") {
      return (
        left.localeCompare(right) *
        multiplier
      )
    }

    return (left - right) * multiplier
  }

check(
  "default sort",
  [10, 9, 100, 1].sort(),
  [1, 10, 100, 9]
)

const original = [...products]

check(
  "price asc",
  byPriceAsc(products).map((item) => item.price),
  [150, 150, 500, 900]
)

check(
  "price desc",
  byPriceDesc(products).map((item) => item.price),
  [900, 500, 150, 150]
)

check(
  "title",
  byTitle(products).map((item) => item.title),
  ["Chair", "Lamp", "Laptop", "Phone"]
)

check(
  "rating then price",
  byRatingThenPrice(products).map(
    (item) => item.title
  ),
  ["Laptop", "Chair", "Phone", "Lamp"]
)

check(
  "discounted price",
  byDiscountedPrice(products).map(
    (item) => item.title
  ),
  ["Lamp", "Chair", "Phone", "Laptop"]
)

check(
  "original untouched",
  products,
  original
)

check(
  "comparator string asc",
  [...products]
    .sort(makeComparator("title", "asc"))
    .map((item) => item.title),
  ["Chair", "Lamp", "Laptop", "Phone"]
)

check(
  "comparator string desc",
  [...products]
    .sort(makeComparator("title", "desc"))
    .map((item) => item.title),
  ["Phone", "Laptop", "Lamp", "Chair"]
)

check(
  "comparator number asc",
  [...products]
    .sort(makeComparator("price", "asc"))
    .map((item) => item.price),
  [150, 150, 500, 900]
)

check(
  "comparator number desc",
  [...products]
    .sort(makeComparator("price", "desc"))
    .map((item) => item.price),
  [900, 500, 150, 150]
)

const brokenComparator = [...products].sort(
  (a, b) => a.price > b.price
)

check(
  "boolean comparator fails",
  JSON.stringify(
    brokenComparator.map((item) => item.price)
  ) !==
    JSON.stringify(
      products
        .map((item) => item.price)
        .sort((a, b) => b - a)
    ),
  true
)

console.log(
  `\n${results.filter(Boolean).length}/${results.length} passing`
)