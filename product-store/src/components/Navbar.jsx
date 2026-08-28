import { Link, NavLink } from "react-router-dom"
import { Boxes, ShoppingCart } from "lucide-react"

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-teal-50 text-teal-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2">
        <Link
          to="/products"
          className="flex items-center gap-2 text-teal-700"
        >
          <Boxes size={26} strokeWidth={2} />

          <span className="font-display text-xl font-bold tracking-tight">
            Store
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            Cart
          </NavLink>

          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>

          <Link
            to="/cart"
            className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
          </Link>
        </nav>
      </div>
    </header>
  )
}