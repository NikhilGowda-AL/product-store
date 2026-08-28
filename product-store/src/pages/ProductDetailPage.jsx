import { useEffect, useState } from "react"
import { ArrowLeft, ShoppingCart, Star } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axiosInstance"
import StateBlock from "../components/StateBlock"
import useCartStore from "../store/useCartStore"

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [status, setStatus] = useState("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    const loadProduct = async () => {
      setStatus("loading")
      setError("")

      try {
        const response = await api.get(`/products/${id}`)
        setProduct(response.data)
        setSelectedImage(response.data.images?.[0] || response.data.thumbnail)
        setStatus("success")
      } catch {
        setError("We could not find that product.")
        setStatus("error")
      }
    }

    loadProduct()
  }, [id])

  if (status === "loading") {
    return <StateBlock type="loading" />
  }

  if (status === "error") {
    return (
      <StateBlock
        type="error"
        message={error}
        actionLabel="Back to products"
        onAction={() => navigate("/products")}
      />
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-[360px] w-full object-cover sm:h-[500px]"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images?.slice(0, 4).map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <img
                  src={image}
                  alt={`${product.title} preview`}
                  className="h-20 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            {product.category}
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {product.brand || "Store brand"}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="font-display text-3xl font-bold text-slate-900">
              ${product.price}
            </span>

            <span className="flex items-center gap-1 text-slate-600">
              <Star size={18} fill="currentColor" />
              {product.rating}
            </span>
          </div>

          <p className="mt-5 leading-relaxed text-slate-600">
            {product.description}
          </p>

          <p className="mt-4 text-sm font-medium text-slate-600">
            {product.stock} items available
          </p>

          <button
            type="button"
            onClick={() => addItem(product)}
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
          >
            <ShoppingCart size={20} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}