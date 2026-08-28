import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../api/axiosInstance"
import FilterBar from "../components/FilterBar"
import ProductCard from "../components/ProductCard"
import StateBlock from "../components/StateBlock"
import BackToTop from "../components/BackToTop"
import useCartStore from "../store/useCartStore"

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState("loading")
  const [error, setError] = useState("")

  const search = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const sort = searchParams.get("sort") || ""

  const addItem = useCartStore((state) => state.addItem)

  const updateParam = (name, value) => {
    const next = new URLSearchParams(searchParams)

    if (value) {
      next.set(name, value)
    } else {
      next.delete(name)
    }

    setSearchParams(next)
  }

  const loadCategories = useCallback(async () => {
    const response = await api.get("/products/categories")
    setCategories(response.data)
  }, [])

  const loadProducts = useCallback(async () => {
    setStatus("loading")
    setError("")

    try {
      let response

      if (category) {
        response = await api.get(
          `/products/category/${category}?limit=12`
        )
      } else if (search) {
        response = await api.get(
          `/products/search?q=${encodeURIComponent(search)}&limit=12`
        )
      } else {
        response = await api.get("/products?limit=12&skip=0")
      }

      let result = response.data.products

      if (category && search) {
        result = result.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      }

      setProducts(result)
      setStatus("success")
    } catch {
      setError("We could not load the products right now.")
      setStatus("error")
    }
  }, [category, search])

  useEffect(() => {
    loadCategories().catch(() => {
      setCategories([])
    })
  }, [loadCategories])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const sortedProducts = useMemo(() => {
    const result = [...products]

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    }

    if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    }

    if (sort === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [products, sort])

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Discover
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Products
        </h1>

        <p className="mt-2 text-slate-600">
          Find something you will love.
        </p>
      </div>

      <FilterBar
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={(value) => updateParam("q", value)}
        onCategoryChange={(value) =>
          updateParam("category", value)
        }
        onSortChange={(value) => updateParam("sort", value)}
      />

      {status === "loading" && (
        <StateBlock type="loading" />
      )}

      {status === "error" && (
        <StateBlock
          type="error"
          message={error}
          actionLabel="Retry"
          onAction={loadProducts}
        />
      )}

      {status === "success" && sortedProducts.length === 0 && (
        <StateBlock
          type="empty"
          message="Try a different search or choose another category."
        />
      )}

      {status === "success" && sortedProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      )}

      <BackToTop />
    </div>
  )
}