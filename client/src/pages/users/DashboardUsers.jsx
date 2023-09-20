import { Outlet, redirect, useLoaderData } from "react-router-dom"
import HeaderComponent from "../../components/headers/Header"
import NavbarMobile from "../../components/footers/NavbarMobile"

import axios from "axios"

//styles
import { Main } from "../../Styles/Styles"
import Sidebar from "../../components/headers/Sidebar"

export const loader = async ({ request }) => {
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get("search") || ""
  const token = localStorage.getItem("token")

  try {
    const {
      data: { user },
    } = await axios(
      "https://blog-api-wzi4.onrender.com/api/v1/users/current-user",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const { data } = await axios(
      `https://blog-api-wzi4.onrender.com/api/v1/article?search=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const { data: favoris } = await axios(
      `https://blog-api-wzi4.onrender.com/api/v1/favoris`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return {
      user,
      data,
      searchTerm,
      favoris,
    }
  } catch (error) {
    console.log(error?.response?.data?.msg)
    return redirect("/")
  }
}
const DashboardUsers = ({ themeToggle }) => {
  const { user, data, searchTerm, favoris } = useLoaderData()

  return (
    <Main>
      <Sidebar themeToggle={themeToggle} searchTerm={searchTerm} user={user} />

      <HeaderComponent user={user} themeToggle={themeToggle} />

      <Outlet context={[user, data, favoris]} />
      <NavbarMobile user={user} searchTerm={searchTerm} />
    </Main>
  )
}
export default DashboardUsers
