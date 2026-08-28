import { AlertCircle, LoaderCircle, PackageSearch } from "lucide-react"

export default function StateBlock({
  type,
  message,
  actionLabel,
  onAction
}) {
  if (type === "loading") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center">
        <LoaderCircle
          size={32}
          className="animate-spin text-teal-700"
        />
        <p className="mt-4 text-slate-600">
          Loading products...
        </p>
      </div>
    )
  }

  if (type === "error") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-red-200 bg-white p-8 text-center">
        <AlertCircle size={32} className="text-red-600" />

        <p className="mt-4 font-semibold text-slate-900">
          {message}
        </p>

        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-5 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {actionLabel || "Try again"}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center">
      <PackageSearch size={32} className="text-slate-400" />

      <p className="mt-4 font-semibold text-slate-900">
        {message || "Try another search or category."}
      </p>
    </div>
  )
}