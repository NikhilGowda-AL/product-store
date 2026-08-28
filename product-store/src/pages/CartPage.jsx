import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import Modal from "../components/Modal"
import useCartStore from "../store/useCartStore"
import { formatPrice, timeAgo } from "../utils/format"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)
  const removeItem = useCartStore((state) => state.removeItem)

  const [itemToRemove, setItemToRemove] = useState(null)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
          <ShoppingCart size={42} className="text-slate-400" />
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-slate-600">
          Add a few products and they will appear here.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Your cart
        </h1>

        <p className="mt-2 text-slate-600">
          Review your selected products.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[72px_1fr] gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[88px_1fr_auto]"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-20 w-20 rounded-lg object-cover"
            />

            <div className="min-w-0">
              <h2 className="truncate font-semibold">
                {item.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {formatPrice(item.price)} each
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Added {timeAgo(item.addedAt)}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decrement(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100"
                >
                  <Minus size={16} />
                </button>

                <span className="min-w-8 text-center font-semibold tabular-nums">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => increment(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100"
                >
                  <Plus size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setItemToRemove(item)}
                  className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>

            <div className="col-span-2 text-right sm:col-span-1">
              <p className="font-display text-lg font-bold tabular-nums">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
        <span className="text-slate-600">
          Order total
        </span>

        <span className="font-display text-2xl font-bold tabular-nums">
          {formatPrice(total)}
        </span>
      </div>

      <Modal
        isOpen={Boolean(itemToRemove)}
        onClose={() => setItemToRemove(null)}
        title="Remove product?"
      >
        <p className="text-slate-600">
          Are you sure you want to remove {itemToRemove?.title} from your cart?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setItemToRemove(null)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              removeItem(itemToRemove.id)
              setItemToRemove(null)
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </Modal>
    </div>
  )
}