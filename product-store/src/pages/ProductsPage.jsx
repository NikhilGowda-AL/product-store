import { useCallback, useEffect, useMemo, useState } from "react"
import { Copy, X } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import api from "../api/axiosInstance"
import FilterBar from "../components/FilterBar"
import ProductCard from "../components/ProductCard"
import StateBlock from "../components/StateBlock"
import BackToTop from "../components/BackToTop"
import useCartStore from "../store/useCartStore"
import { useDebounce } from "../hooks/useDebounce"
import { toTitleCase } from "../utils/format"
import { makeComparator } from "../utils/sorting"

const LIMIT = 12

export default function ProductsPage() {
  const [searchParams, setSearchParams] =
    useSearchParams()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState("loading")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const query =
    searchParams.get("q") ?? ""

  const category =
    searchParams.get("category") ?? ""

  const sort =
    searchParams.get("sort") ?? ""

  const minPrice =
    searchParams.get("minPrice") ?? ""

  const maxPrice =
    searchParams.get("maxPrice") ?? ""

  const page = Number(
    searchParams.get("page") ?? 1
  )

  const debouncedQuery = useDebounce(
    query,
    400
  )

  const addItem = useCartStore(
    (state) => state.addItem
  )

  const updateParam = (
    key,
    value,
    replace = true
  ) => {
    setSearchParams(
      (previous) => {
        const next =
          new URLSearchParams(previous)

        if (
          !value ||
          (key === "category" &&
            value === "all")
        ) {
          next.delete(key)
        } else {
          next.set(key, value)
        }

        next.delete("page")

        return next
      },
      { replace }
    )
  }

  const loadCategories =
    useCallback(async () => {
      const response = await api.get(
        "/products/categories"
      )

      setCategories(response.data)
    }, [])

  const loadProducts =
    useCallback(async () => {
      setStatus("loading")
      setError("")

      try {
        let response

        const skip = (page - 1) * LIMIT

        if (category) {
          response = await api.get(
            `/products/category/${category}?limit=${LIMIT}&skip=${skip}`
          )
        } else if (debouncedQuery) {
          response = await api.get(
            `/products/search?q=${encodeURIComponent(
              debouncedQuery
            )}&limit=${LIMIT}&skip=${skip}`
          )
        } else {
          response = await api.get(
            `/products?limit=${LIMIT}&skip=${skip}`
          )
        }

        setProducts(response.data.products)
        setStatus("success")
      } catch {
        setError(
          "We could not load the products right now."
        )
        setStatus("error")
      }
    }, [
      category,
      debouncedQuery,
      page
    ])

  useEffect(() => {
    loadCategories().catch(() => {
      setCategories([])
    })
  }, [loadCategories])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const visibleProducts = useMemo(() => {
    let result = [...products]

    if (minPrice) {
      result = result.filter(
        (product) =>
          product.price >=
          Number(minPrice)
      )
    }

    if (maxPrice) {
      result = result.filter(
        (product) =>
          product.price <=
          Number(maxPrice)
      )
    }

    if (sort === "price-asc") {
      result.sort(
        makeComparator("price", "asc")
      )
    }

    if (sort === "price-desc") {
      result.sort(
        makeComparator("price", "desc")
      )
    }

    if (sort === "rating-desc") {
      result.sort(
        makeComparator("rating", "desc")
      )
    }

    return result
  }, [
    products,
    minPrice,
    maxPrice,
    sort
  ])

  const activeFilters = []

  if (query) {
    activeFilters.push({
      key: "q",
      label: `Search: ${query}`
    })
  }

  if (category) {
    activeFilters.push({
      key: "category",
      label: `Category: ${toTitleCase(category)}`
    })
  }

  if (sort) {
    activeFilters.push({
      key: "sort",
      label: `Sort: ${sort}`
    })
  }

  if (minPrice) {
    activeFilters.push({
      key: "minPrice",
      label: `Over ₹${minPrice}`
    })
  }

  if (maxPrice) {
    activeFilters.push({
      key: "maxPrice",
      label: `Under ₹${maxPrice}`
    })
  }

  const resetFilters = () => {
    setSearchParams({})
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      window.location.href
    )

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Discover
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Products
        </h1>

        <p className="mt-2 text-slate-600">
          Find something you will love.
        </p>
      </div>

      <FilterBar
        search={query}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={(value) =>
          updateParam("q", value, true)
        }
        onCategoryChange={(value) =>
          updateParam(
            "category",
            value,
            true
          )
        }
        onSortChange={(value) =>
          updateParam("sort", value, true)
        }
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={(value) =>
          updateParam(
            "minPrice",
            value,
            true
          )
        }
        onMaxPriceChange={(value) =>
          updateParam(
            "maxPrice",
            value,
            true
          )
        }
        onReset={resetFilters}
        onCopy={copyLink}
        copied={copied}
      />

      {activeFilters.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() =>
                updateParam(
                  filter.key,
                  "",
                  true
                )
              }
              className="flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800"
            >
              {filter.label}
              <X size={14} />
            </button>
          ))}
        </div>
      )}

      {status === "success" && (
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            {visibleProducts.length} products
            {query
              ? ` for "${query}"`
              : " found"}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Reset filters
            </button>

            <button
              type="button"
              onClick={copyLink}
              className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              <Copy size={16} />
              {copied
                ? "Copied"
                : "Copy link"}
            </button>
          </div>
        </div>
      )}

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

      {status === "success" &&
        visibleProducts.length === 0 && (
          <StateBlock
            type="empty"
            message="Try another search, category or price range."
          />
        )}

      {status === "success" &&
        visibleProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addItem}
                />
              )
            )}
          </div>
        )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => {
            const next =
              new URLSearchParams(
                searchParams
              )

            next.set(
              "page",
              String(page - 1)
            )

            setSearchParams(next)
          }}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm font-medium text-slate-600">
          Page {page}
        </span>

        <button
          type="button"
          disabled={
            products.length < LIMIT
          }
          onClick={() => {
            const next =
              new URLSearchParams(
                searchParams
              )

            next.set(
              "page",
              String(page + 1)
            )

            setSearchParams(next)
          }}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <BackToTop />
    </div>
  )
}