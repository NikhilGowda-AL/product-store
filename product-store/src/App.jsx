import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import AdminPage from "./pages/AdminPage"
import NotFoundPage from "./pages/NotFoundPage"
import useAuthStore from "./store/useAuthStore"

function RequireAdmin({ children }) {
  const isAdmin = useAuthStore((state) => state.isAdmin)

  if (!isAdmin) {
    return <Navigate to="/products" replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={<Navigate to="/products" replace />}
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetailPage />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>
            }
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}