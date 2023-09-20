import axios from "axios"

export const customFetch = axios.create({
  baseURL: "https://blog-api-wzi4.onrender.com/api/v1/",
})
customFetch.interceptors.request.use(
  (config) => {
    if (config.authorization !== false) {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = "Bearer " + token
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
