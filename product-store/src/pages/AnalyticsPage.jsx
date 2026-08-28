import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CircleDollarSign,
  Package,
  ShoppingBag,
  Users
} from "lucide-react"
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useSearchParams } from "react-router-dom"
import api from "../api/axiosInstance"
import StateBlock from "../components/StateBlock"
import {
  averageOrderValue,
  categoryShare,
  ordersByCity,
  topCustomersBySpend,
  topProductsByQuantity,
  totalDiscountGiven,
  totalItemsSold,
  totalOrders,
  totalRevenue
} from "../utils/analytics"
import {
  formatPrice,
  toTitleCase
} from "../utils/format"

const StatCard = ({
  label,
  value,
  icon
}) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-500">
        {label}
      </span>

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        {icon}
      </div>
    </div>

    <p className="mt-4 font-display text-2xl font-bold tabular-nums text-slate-900">
      {value}
    </p>
  </div>
)

export default function AnalyticsPage() {
  const [searchParams, setSearchParams] =
    useSearchParams()

  const [data, setData] = useState(null)
  const [status, setStatus] =
    useState("loading")
  const [error, setError] = useState("")

  const sort =
    searchParams.get("sort") ??
    "quantity"

  const direction =
    searchParams.get("dir") ??
    "desc"

  const limit = Number(
    searchParams.get("limit") ?? 10
  )

  const loadDashboard =
    useCallback(async () => {
      setStatus("loading")
      setError("")

      try {
        const [
          cartsRes,
          usersRes,
          productsRes
        ] = await Promise.all([
          api.get("/carts"),
          api.get("/users?limit=100"),
          api.get("/products?limit=100")
        ])

        setData({
          carts: cartsRes.data.carts,
          users: usersRes.data.users,
          products:
            productsRes.data.products
        })

        setStatus("success")
      } catch {
        setError(
          "Analytics data could not be loaded."
        )
        setStatus("error")
      }
    }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const metrics = useMemo(() => {
    if (!data) {
      return null
    }

    const {
      carts,
      users,
      products
    } = data

    return {
      revenue: totalRevenue(carts),
      orders: totalOrders(carts),
      average:
        averageOrderValue(carts),
      items: totalItemsSold(carts),
      discount:
        totalDiscountGiven(carts),
      categories:
        categoryShare(
          carts,
          products
        ),
      products:
        topProductsByQuantity(
          carts,
          limit
        ),
      customers:
        topCustomersBySpend(
          carts,
          users,
          limit
        ),
      cities:
        ordersByCity(carts, users)
    }
  }, [data, limit])

  const sortedProducts = useMemo(() => {
    if (!metrics) {
      return []
    }

    return [...metrics.products].sort(
      (a, b) => {
        if (sort === "title") {
          const result =
            a.title.localeCompare(
              b.title
            )

          return direction === "asc"
            ? result
            : -result
        }

        return direction === "asc"
          ? a.quantity - b.quantity
          : b.quantity - a.quantity
      }
    )
  }, [
    metrics,
    sort,
    direction
  ])

  const sortedCustomers = useMemo(() => {
    if (!metrics) {
      return []
    }

    return [...metrics.customers].sort(
      (a, b) => {
        if (sort === "name") {
          const result =
            a.name.localeCompare(
              b.name
            )

          return direction === "asc"
            ? result
            : -result
        }

        return direction === "asc"
          ? a.spend - b.spend
          : b.spend - a.spend
      }
    )
  }, [
    metrics,
    sort,
    direction
  ])

  const changeSort = (key) => {
    const next =
      new URLSearchParams(
        searchParams
      )

    if (sort === key) {
      next.set(
        "dir",
        direction === "asc"
          ? "desc"
          : "asc"
      )
    } else {
      next.set("sort", key)
      next.set("dir", "asc")
    }

    setSearchParams(next, {
      replace: true
    })
  }

  if (status === "loading") {
    return <StateBlock type="loading" />
  }

  if (status === "error") {
    return (
      <StateBlock
        type="error"
        message={error}
        actionLabel="Retry"
        onAction={loadDashboard}
      />
    )
  }

  if (!metrics) {
    return (
      <StateBlock
        type="empty"
        message="No analytics data available."
      />
    )
  }

  const maxRevenue = Math.max(
    ...metrics.categories.map(
      (item) => item.revenue
    ),
    1
  )

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Analytics
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Store performance
        </h1>

        <p className="mt-2 text-slate-600">
          A quick view of revenue, orders and customers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Revenue"
          value={formatPrice(
            metrics.revenue
          )}
          icon={
            <CircleDollarSign size={20} />
          }
        />

        <StatCard
          label="Orders"
          value={metrics.orders}
          icon={
            <ShoppingBag size={20} />
          }
        />

        <StatCard
          label="Average order"
          value={formatPrice(
            metrics.average
          )}
          icon={
            <BarChart3 size={20} />
          }
        />

        <StatCard
          label="Items sold"
          value={metrics.items}
          icon={<Package size={20} />}
        />

        <StatCard
          label="Discount given"
          value={formatPrice(
            metrics.discount
          )}
          icon={<Users size={20} />}
        />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold">
            Revenue by category
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Category contribution to total revenue.
          </p>
        </div>

        <div className="space-y-5">
          {metrics.categories.map(
            (item) => (
              <div
                key={item.category}
                className="group relative"
              >
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span className="truncate font-medium">
                    {toTitleCase(
                      item.category
                    )}
                  </span>

                  <span className="shrink-0 tabular-nums text-slate-600">
                    {formatPrice(
                      item.revenue
                    )}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-teal-600 transition-all duration-500"
                    style={{
                      width: `${
                        (item.revenue /
                          maxRevenue) *
                        100
                      }%`
                    }}
                  />
                </div>

                <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs text-white group-hover:block">
                  {item.share.toFixed(1)}%
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-bold">
          Top performers
        </h2>

        <select
          value={limit}
          onChange={(event) => {
            const next =
              new URLSearchParams(
                searchParams
              )

            next.set(
              "limit",
              event.target.value
            )

            setSearchParams(next, {
              replace: true
            })
          }}
          className="min-h-10 rounded-lg border border-slate-300 px-3 text-sm"
        >
          <option value="5">
            Top 5
          </option>
          <option value="10">
            Top 10
          </option>
          <option value="20">
            Top 20
          </option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="font-display text-lg font-bold">
              Top products
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <button
                      type="button"
                      onClick={() =>
                        changeSort(
                          "title"
                        )
                      }
                      className="flex items-center gap-1"
                    >
                      Product
                      {sort ===
                        "title" &&
                        (direction ===
                        "asc" ? (
                          <ArrowUp
                            size={14}
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                          />
                        ))}
                    </button>
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <button
                      type="button"
                      onClick={() =>
                        changeSort(
                          "quantity"
                        )
                      }
                      className="ml-auto flex items-center gap-1"
                    >
                      Qty
                      {sort ===
                        "quantity" &&
                        (direction ===
                        "asc" ? (
                          <ArrowUp
                            size={14}
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                          />
                        ))}
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedProducts.map(
                  (product) => (
                    <tr
                      key={product.id}
                      className="even:bg-slate-50 hover:bg-teal-50"
                    >
                      <td className="px-4 py-3 text-sm">
                        {product.title}
                      </td>

                      <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums">
                        {product.quantity}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="font-display text-lg font-bold">
              Top customers
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <button
                      type="button"
                      onClick={() =>
                        changeSort(
                          "name"
                        )
                      }
                      className="flex items-center gap-1"
                    >
                      Customer
                      {sort ===
                        "name" &&
                        (direction ===
                        "asc" ? (
                          <ArrowUp
                            size={14}
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                          />
                        ))}
                    </button>
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <button
                      type="button"
                      onClick={() =>
                        changeSort(
                          "spend"
                        )
                      }
                      className="ml-auto flex items-center gap-1"
                    >
                      Spend
                      {sort ===
                        "spend" &&
                        (direction ===
                        "asc" ? (
                          <ArrowUp
                            size={14}
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                          />
                        ))}
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedCustomers.map(
                  (customer) => (
                    <tr
                      key={customer.id}
                      className="even:bg-slate-50 hover:bg-teal-50"
                    >
                      <td className="px-4 py-3 text-sm">
                        {customer.name}
                      </td>

                      <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums">
                        {formatPrice(
                          customer.spend
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="font-display text-xl font-bold">
            Orders by city
          </h2>
        </div>

        <div className="space-y-3">
          {metrics.cities.map(
            (item) => {
              const maxOrders =
                metrics.cities[0]
                  ?.orders ?? 1

              return (
                <div
                  key={item.city}
                  className="grid grid-cols-[100px_1fr_auto] items-center gap-3"
                >
                  <span className="truncate text-sm font-medium">
                    {item.city}
                  </span>

                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-teal-600 transition-all duration-500"
                      style={{
                        width: `${
                          (item.orders /
                            maxOrders) *
                          100
                        }%`
                      }}
                    />
                  </div>

                  <span className="text-sm font-semibold tabular-nums">
                    {item.orders}
                  </span>
                </div>
              )
            }
          )}
        </div>
      </section>
    </div>
  )
}