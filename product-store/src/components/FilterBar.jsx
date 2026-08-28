export default function FilterBar({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  onCopy,
  copied
}) {
  return (
    <div className="sticky top-[72px] z-30 mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <input
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search products"
          className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value
            )
          }
          className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">
            All categories
          </option>

          {categories.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={minPrice}
          onChange={(event) =>
            onMinPriceChange(
              event.target.value
            )
          }
          placeholder="Minimum price"
          className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={(event) =>
            onMaxPriceChange(
              event.target.value
            )
          }
          placeholder="Maximum price"
          className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <select
          value={sort}
          onChange={(event) =>
            onSortChange(
              event.target.value
            )
          }
          className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">
            Sort products
          </option>
          <option value="price-asc">
            Price low to high
          </option>
          <option value="price-desc">
            Price high to low
          </option>
          <option value="rating-desc">
            Rating high to low
          </option>
        </select>

        <button
          type="button"
          onClick={onReset}
          className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={onCopy}
          className="min-h-11 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  )
}