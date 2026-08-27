import Modal from "./components/Modal";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-teal-700">
          Product Store
        </h1>
        <p className="mt-3 text-slate-600">
          Your product store is ready.
        </p>
        <Modal/>
      </div>
    </div>
  )
}