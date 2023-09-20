import axios from "axios"
import { customFetch } from "../../utils/customFetch"
import { redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { urlApi } from "../../App"

export const action = async ({ params }) => {
  const { id } = params
  const token = localStorage.getItem("token")

  try {
    await axios.delete(`${urlApi}/api/v1/favoris/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    toast.success("Favoris supprimé")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }

  return redirect("/user/favoris")
}
