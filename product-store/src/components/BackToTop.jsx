import { ArrowUp } from "lucide-react"
import { useScrollPosition } from "../hooks/useScrollPosition"

export default function BackToTop() {
  const scrollPosition = useScrollPosition()

  if (scrollPosition <= 400) {
    return null
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
    >
      <ArrowUp size={20} />
    </button>
  )
}