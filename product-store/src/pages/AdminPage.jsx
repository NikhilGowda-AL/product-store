import { useState } from "react"
import { Plus } from "lucide-react"
import Modal from "../components/Modal"
import CreateProductForm from "../components/CreateProductForm"

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSuccess = (id) => {
    setIsOpen(false)
    setSuccessMessage(`Product created successfully with id ${id}.`)
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Admin
          </p>

          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Product management
          </h1>

          <p className="mt-2 text-slate-600">
            Create a new product using the store API.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSuccessMessage("")
            setIsOpen(true)
          }}
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
        >
          <Plus size={18} />
          Add product
        </button>
      </div>

      {successMessage && (
        <div className="mt-6 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm font-medium text-teal-800">
          {successMessage}
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create product"
      >
        <CreateProductForm onSuccess={handleSuccess} />
      </Modal>
    </div>
  )
}