import { LoaderCircle } from "lucide-react"

const variants = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-500",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
}

const sizes = {
  small: "min-h-9 px-3 text-xs",
  medium: "min-h-11 px-4 text-sm",
  large: "min-h-12 px-5 text-base"
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  type = "button",
  onClick,
  className = ""
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <LoaderCircle
          size={18}
          className="animate-spin"
        />
      ) : (
        icon
      )}

      {children}
    </button>
  )
}