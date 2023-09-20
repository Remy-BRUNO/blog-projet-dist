import { Outlet, redirect, useLoaderData } from "react-router-dom"
import HeaderComponent from "../../components/headers/Header"
import axios from "axios"
import NavbarMobile from "../../components/footers/NavbarMobile"

//styles
import { Main } from "../../Styles/Styles"
import Sidebar from "../../components/headers/Sidebar"
import { urlApi } from "../../App"

export const loader = async ({ request }) => {
  const token = localStorage.getItem("token")
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get("search") || ""

  try {
    const {
      data: { user },
    } = await axios(`${urlApi}/api/v1/users/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const { data } = await axios(
      `${urlApi}/api/v1/article?search=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return {
      user,
      data,
      searchTerm,
    }
  } catch (error) {
    console.log(error?.response?.data?.msg)
    return redirect("/")
  }
}
const DashboardAdmin = ({ themeToggle }) => {
  const { user, data, searchTerm } = useLoaderData()

  return (
    <Main>
      <Sidebar themeToggle={themeToggle} searchTerm={searchTerm} user={user} />

      <HeaderComponent user={user} themeToggle={themeToggle} />

      <Outlet context={[user, data]} />
      <NavbarMobile user={user} searchTerm={searchTerm} />
    </Main>
  )
}
export default DashboardAdmin
