import { create } from "zustand"

const useAuthStore = create((set) => ({
  isAdmin: false,
  toggleAdmin: () =>
    set((state) => ({
      isAdmin: !state.isAdmin
    }))
}))

export default useAuthStore