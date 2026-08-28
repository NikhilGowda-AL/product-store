export const productLookup = (products) =>
  products.reduce(
    (result, product) => ({
      ...result,
      [product.id]: product
    }),
    {}
  )

export const totalRevenue = (carts) =>
  carts.reduce(
    (sum, cart) =>
      sum + Number(cart.discountedTotal ?? 0),
    0
  )

export const totalOrders = (carts) =>
  carts.length

export const averageOrderValue = (carts) => {
  if (!carts.length) {
    return 0
  }

  return totalRevenue(carts) / carts.length
}

export const totalItemsSold = (carts) =>
  carts.reduce(
    (sum, cart) =>
      sum + Number(cart.totalQuantity ?? 0),
    0
  )

export const totalDiscountGiven = (carts) =>
  carts.reduce(
    (sum, cart) =>
      sum +
      Number(cart.total ?? 0) -
      Number(cart.discountedTotal ?? 0),
    0
  )

export const revenueByCategory = (
  carts,
  products
) => {
  const lookup = productLookup(products)

  return carts
    .flatMap((cart) => cart.products ?? [])
    .reduce((result, line) => {
      const category =
        lookup[line.id]?.category ??
        "unknown"

      const revenue =
        Number(line.total ?? 0)

      return {
        ...result,
        [category]:
          (result[category] ?? 0) +
          revenue
      }
    }, {})
}

export const topProductsByQuantity = (
  carts,
  limit = 10
) => {
  const grouped = carts
    .flatMap((cart) => cart.products ?? [])
    .reduce((result, line) => {
      const existing =
        result[line.id] ?? {
          id: line.id,
          title: line.title,
          quantity: 0
        }

      return {
        ...result,
        [line.id]: {
          ...existing,
          quantity:
            existing.quantity +
            Number(line.quantity ?? 0)
        }
      }
    }, {})

  return Object.values(grouped)
    .sort(
      (a, b) => b.quantity - a.quantity
    )
    .slice(0, limit)
}

export const topCustomersBySpend = (
  carts,
  users,
  limit = 10
) => {
  const userLookup = users.reduce(
    (result, user) => ({
      ...result,
      [user.id]: user
    }),
    {}
  )

  const grouped = carts.reduce(
    (result, cart) => ({
      ...result,
      [cart.userId]:
        (result[cart.userId] ?? 0) +
        Number(cart.discountedTotal ?? 0)
    }),
    {}
  )

  return Object.entries(grouped)
    .map(([userId, spend]) => {
      const user =
        userLookup[userId] ?? {}

      return {
        id: Number(userId),
        name:
          `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
          "Unknown customer",
        spend
      }
    })
    .sort((a, b) => b.spend - a.spend)
    .slice(0, limit)
}

export const ordersByCity = (
  carts,
  users
) => {
  const userLookup = users.reduce(
    (result, user) => ({
      ...result,
      [user.id]: user
    }),
    {}
  )

  return Object.entries(
    carts.reduce((result, cart) => {
      const city =
        userLookup[cart.userId]?.address
          ?.city ?? "Unknown"

      return {
        ...result,
        [city]:
          (result[city] ?? 0) + 1
      }
    }, {})
  )
    .map(([city, orders]) => ({
      city,
      orders
    }))
    .sort(
      (a, b) => b.orders - a.orders
    )
}

export const categoryShare = (carts, products) => {
  const revenue = revenueByCategory(
    carts,
    products
  )

  const total = Object.values(revenue).reduce(
    (sum, value) => sum + value,
    0
  )

  return Object.entries(revenue)
    .map(([category, value]) => ({
      category,
      revenue: value,
      share:
        total > 0
          ? (value / total) * 100
          : 0
    }))
    .sort(
      (a, b) => b.revenue - a.revenue
    )
}