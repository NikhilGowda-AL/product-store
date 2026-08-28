import {
  useCallback,
  useEffect,
  useState
} from "react"
import api from "../api/axiosInstance"

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get(url)
      setData(response.data)
    } catch (err) {
      setError(
        err.message ?? "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    load()
  }, [load])

  return {
    data,
    loading,
    error,
    refetch: load
  }
}