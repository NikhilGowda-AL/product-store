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

const state = {
  user: {
    name: "Asha",
    address: {
      city: "Pune",
      pin: "411001"
    }
  },
  cart: {
    items: [
      {
        id: 1,
        title: "Phone",
        price: 500,
        qty: 1
      },
      {
        id: 2,
        title: "Chair",
        price: 150,
        qty: 3
      }
    ]
  },
  selectedTags: ["new"]
}

const addItem = (state, item) => ({
  ...state,
  cart: {
    ...state.cart,
    items: [...state.cart.items, item]
  }
})

const removeItem = (state, id) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.filter(
      (item) => item.id !== id
    )
  }
})

const incrementQty = (state, id) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  }
})

const decrementQty = (state, id) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.map((item) =>
      item.id === id
        ? {
            ...item,
            qty: Math.max(1, item.qty - 1)
          }
        : item
    )
  }
})

const setCity = (state, city) => ({
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city
    }
  }
})

const toggleTag = (state, tag) => ({
  ...state,
  selectedTags: state.selectedTags.includes(tag)
    ? state.selectedTags.filter((item) => item !== tag)
    : [...state.selectedTags, tag]
})

const discountAll = (state, percent) => ({
  ...state,
  cart: {
    ...state.cart,
    items: state.cart.items.map((item) => ({
      ...item,
      price: item.price * (1 - percent / 100)
    }))
  }
})

const moveItem = (state, from, to) => {
  const items = [...state.cart.items]
  const [moved] = items.splice(from, 1)

  items.splice(to, 0, moved)

  return {
    ...state,
    cart: {
      ...state.cart,
      items
    }
  }
}

const original = JSON.parse(JSON.stringify(state))

const added = addItem(state, {
  id: 3,
  title: "Lamp",
  price: 100,
  qty: 1
})

check(
  "add item",
  added.cart.items.length,
  3
)

check(
  "add no mutation",
  state,
  original
)

const removed = removeItem(state, 1)

check(
  "remove item",
  removed.cart.items.map((item) => item.id),
  [2]
)

check(
  "remove no mutation",
  state,
  original
)

const incremented = incrementQty(state, 1)

check(
  "increment",
  incremented.cart.items[0].qty,
  2
)

check(
  "increment no mutation",
  state,
  original
)

const decremented = decrementQty(state, 1)

check(
  "decrement",
  decremented.cart.items[0].qty,
  1
)

const decrementedAgain = decrementQty(decremented, 1)

check(
  "never below one",
  decrementedAgain.cart.items[0].qty,
  1
)

const cityChanged = setCity(state, "Mumbai")

check(
  "city",
  cityChanged.user.address.city,
  "Mumbai"
)

check(
  "city no mutation",
  state,
  original
)

const tagAdded = toggleTag(state, "sale")

check(
  "tag added",
  tagAdded.selectedTags,
  ["new", "sale"]
)

const tagRemoved = toggleTag(tagAdded, "new")

check(
  "tag removed",
  tagRemoved.selectedTags,
  ["sale"]
)

const discounted = discountAll(state, 10)

check(
  "discount",
  discounted.cart.items[0].price,
  450
)

check(
  "discount no mutation",
  state,
  original
)

const moved = moveItem(state, 0, 1)

check(
  "move item",
  moved.cart.items.map((item) => item.id),
  [2, 1]
)

check(
  "move no mutation",
  state,
  original
)

console.log(
  `\n${results.filter(Boolean).length}/${results.length} passing`
)