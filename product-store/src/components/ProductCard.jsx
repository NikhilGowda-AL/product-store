import { Link } from "react-router-dom"
import { ShoppingCart, Star } from "lucide-react"
import {
  formatPrice,
  getDiscountedPrice,
  toTitleCase
} from "../utils/format"

export default function ProductCard({ product, onAddToCart }) {
  const discountedPrice = getDiscountedPrice(product)

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.discountPercentage > 10 && (
            <span className="absolute left-3 top-3 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">
              {Math.round(product.discountPercentage)}% off
            </span>
          )}
        </div>

        <div className="p-4">
          <h2 className="truncate font-semibold text-slate-900 transition-colors duration-200 group-hover:text-teal-700">
            {product.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {toTitleCase(product.category)}
          </p>

          <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <span className="font-display text-lg font-bold text-slate-900">
                {formatPrice(discountedPrice)}
              </span>

              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

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
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-800 active:scale-95"
        >
          <ShoppingCart size={18} />
          Add to cart
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-3 transition-transform duration-200 group-hover:translate-y-0">
  <button
    type="button"
    onClick={(event) => {
      event.preventDefault()
      event.stopPropagation()
      onAddToCart(product)
    }}
    className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
  >
    <ShoppingCart size={17} />
    Quick add
  </button>
</div>
    </article>
  )
}