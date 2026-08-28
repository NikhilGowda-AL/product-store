import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
        Page not found
      </p>

      <h1 className="mt-2 font-display text-5xl font-bold tracking-tight">
        404
      </h1>

      <p className="mt-3 text-slate-600">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/products"
        className="mt-6 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
      >
        Back to products
      </Link>
    </div>
  )
}