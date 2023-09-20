import { Outlet, redirect, useLoaderData } from "react-router-dom"
import axios from "axios"
import NavbarMobile from "../components/footers/NavbarMobile"
import HeaderComponent from "../components/headers/Header"

import { Main } from "../Styles/Styles"
import Sidebar from "../components/headers/Sidebar"
import { urlApi } from "../App"

export const loader = async ({ request }) => {
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get("search") || ""

  try {
    const { data } = await axios(
      `${urlApi}/api/v1/article?search=${searchTerm}`
    )

    return {
      data,
      searchTerm,
    }
  } catch (error) {
    console.log(error?.response?.data?.msg)
    return redirect("/")
  }
}
const Home = ({ themeToggle }) => {
  const { user, data, searchTerm } = useLoaderData()

  return (
    <Main>
      <Sidebar themeToggle={themeToggle} searchTerm={searchTerm} />
      <HeaderComponent themeToggle={themeToggle} />
      <Outlet context={[user, data]} />
      <NavbarMobile searchTerm={searchTerm} />
    </Main>
  )
}
export default Home
