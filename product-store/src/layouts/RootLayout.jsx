import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}