import { NavLink, Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <div>
      <div className="mb-8 border-b border-slate-200">
        <div className="flex flex-wrap gap-2 pb-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-teal-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-teal-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Analytics
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  )
}