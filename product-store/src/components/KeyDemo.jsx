import { useState } from "react"

const initialProducts = [
  { id: 1, title: "Phone", price: 500 },
  { id: 2, title: "Laptop", price: 1200 },
  { id: 3, title: "Watch", price: 300 },
  { id: 4, title: "Headphones", price: 150 },
  { id: 5, title: "Tablet", price: 700 }
]

function ProductRow({ product }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-slate-500">${product.price}</p>
      </div>

      <button
        type="button"
        onClick={() => setQuantity((value) => value + 1)}
        className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
      >
        Quantity: {quantity}
      </button>
    </div>
  )
}

export default function KeyDemo() {
  const [products, setProducts] = useState(initialProducts)

  const sortProducts = () => {
    setProducts((items) =>
      [...items].sort((a, b) => a.price - b.price)
    )
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={sortProducts}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Sort by price
      </button>

      <div className="space-y-3">
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}