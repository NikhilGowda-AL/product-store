export default function FilterBar({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange
}) {
  return (
    <div className="sticky top-[72px] z-30 mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products"
          className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400"
        />

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
        >
          <option value="">All categories</option>

          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
        >
          <option value="">Sort products</option>
          <option value="price-asc">Price low to high</option>
          <option value="price-desc">Price high to low</option>
          <option value="rating-desc">Rating high to low</option>
        </select>
      </div>
    </div>
  )
}