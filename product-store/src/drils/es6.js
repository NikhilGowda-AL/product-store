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
    category: "tech",
    tags: ["new", "sale"]
  },
  {
    id: 2,
    title: "Laptop",
    price: 900,
    rating: 4.8,
    category: "tech",
    tags: ["sale"]
  },
  {
    id: 3,
    title: "Chair",
    price: 150,
    rating: 4.5,
    category: "home",
    tags: []
  },
  {
    id: 4,
    title: "Lamp",
    price: 150,
    rating: 3.9,
    category: "home",
    tags: ["new"]
  }
]

const titleById = (list, id) =>
  list.find((product) => product.id === id)?.title ?? "Not found"

const titles = (list) =>
  list.map(({ title }) => title)

const totalValue = (list) =>
  list.reduce((sum, product) => sum + product.price, 0)

const countByCategory = (list) =>
  list.reduce(
    (result, product) => ({
      ...result,
      [product.category]:
        (result[product.category] ?? 0) + 1
    }),
    {}
  )

const priceByCategory = (list) =>
  list.reduce(
    (result, product) => ({
      ...result,
      [product.category]:
        (result[product.category] ?? 0) + product.price
    }),
    {}
  )

const allTags = (list) =>
  [...new Set(list.flatMap((product) => product.tags))]

const hasCheaperThan = (list, limit) =>
  list.some((product) => product.price < limit)

const describe = ({ title, price }) =>
  `${title} costs ${price}`

const withMarkup = (product, percent) => ({
  ...product,
  price: product.price * (1 + percent / 100)
})

const stripTags = ({ tags, ...product }) => product

const cityOf = (user) =>
  user?.address?.city ?? "Unknown"

const stockLabel = (product) =>
  product.stock ?? "Out of stock"

const categoryTotals = (list) =>
  Object.entries(priceByCategory(list))
    .map(([category, total]) => ({
      category,
      total
    }))
    .sort((a, b) => b.total - a.total)

const topRatedTitles = (list, min) =>
  list
    .filter((product) => product.rating > min)
    .map((product) => product.title)
    .join(", ")

const averagePrice = (list) =>
  Number(
    (
      totalValue(list) / list.length
    ).toFixed(2)
  )

check(
  "titleById",
  titleById(products, 2),
  "Laptop"
)

check(
  "titleById miss",
  titleById(products, 99),
  "Not found"
)

check(
  "titles",
  titles(products),
  ["Phone", "Laptop", "Chair", "Lamp"]
)

check(
  "totalValue",
  totalValue(products),
  1700
)

check(
  "countByCategory",
  countByCategory(products),
  { tech: 2, home: 2 }
)

check(
  "priceByCategory",
  priceByCategory(products),
  { tech: 1400, home: 300 }
)

check(
  "allTags",
  allTags(products).sort(),
  ["new", "sale"]
)

check(
  "hasCheaperThan",
  hasCheaperThan(products, 200),
  true
)

check(
  "describe",
  describe(products[0]),
  "Phone costs 500"
)

check(
  "withMarkup",
  withMarkup(products[0], 10).price,
  550
)

check(
  "no mutation",
  products[0].price,
  500
)

check(
  "stripTags",
  "tags" in stripTags(products[0]),
  false
)

check(
  "cityOf",
  cityOf({ address: { city: "Pune" } }),
  "Pune"
)

check(
  "cityOf empty",
  cityOf({}),
  "Unknown"
)

check(
  "stockLabel zero",
  stockLabel({ stock: 0 }),
  0
)

check(
  "stockLabel none",
  stockLabel({}),
  "Out of stock"
)

check(
  "categoryTotals",
  categoryTotals(products),
  [
    { category: "tech", total: 1400 },
    { category: "home", total: 300 }
  ]
)

check(
  "topRatedTitles",
  topRatedTitles(products, 4.4),
  "Phone, Laptop, Chair"
)

check(
  "averagePrice",
  averagePrice(products),
  425
)

console.log(
  `\n${results.filter(Boolean).length}/${results.length} passing`
)