import { Link } from "react-router-dom"
import { ShoppingCart, Star } from "lucide-react"

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-52 w-full object-cover"
          />

          {product.discountPercentage > 10 && (
            <span className="absolute left-3 top-3 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">
              {Math.round(product.discountPercentage)}% off
            </span>
          )}
        </div>

        <div className="p-4">
          <h2 className="truncate font-semibold text-slate-900">
            {product.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {product.brand || "Store brand"}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-display text-lg font-bold text-slate-900">
              ${product.price}
            </span>

            <span className="flex items-center gap-1 text-sm text-slate-600">
              <Star size={16} fill="currentColor" />
              {product.rating}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onAddToCart(product)
          }}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          <ShoppingCart size={18} />
          Add to cart
        </button>
      </div>
    </article>
  )
}