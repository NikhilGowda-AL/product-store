import { useState } from "react"
import { useForm } from "react-hook-form"
import api from "../api/axiosInstance"

const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting"
]

export default function CreateProductForm({ onSuccess }) {
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    setServerError("")

    try {
      const response = await api.post("/products/add", {
        title: data.title,
        price: Number(data.price),
        category: data.category,
        description: data.description
      })

      onSuccess(response.data.id)
    } catch {
      setServerError(
        "The product could not be created. Please try again."
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Title
        </label>

        <input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters"
            }
          })}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3"
          placeholder="Product title"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Price
        </label>

        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            validate: (value) =>
              Number(value) > 0 || "Price must be positive"
          })}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3"
          placeholder="0.00"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Category
        </label>

        <select
          {...register("category", {
            required: "Category is required"
          })}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3"
        >
          <option value="">Choose a category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Description
        </label>

        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters"
            }
          })}
          rows="5"
          className="w-full rounded-lg border border-slate-300 px-3 py-3"
          placeholder="Describe the product"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-11 w-full rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating product..." : "Create product"}
      </button>
    </form>
  )
}