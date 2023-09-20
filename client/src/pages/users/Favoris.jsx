import axios from "axios"
import { redirect, useLoaderData } from "react-router-dom"
import ArticlesLayout from "../../layouts/ArticlesLayout"
import { urlApi } from "../../App"

export const loader = async () => {
  const token = localStorage.getItem("token")
  try {
    const { data } = await axios(`${urlApi}/api/v1/favoris`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return { data }
  } catch (error) {
    console.log(error?.response?.data?.msg)
    return redirect("/")
  }
}

const Favoris = () => {
  const { data } = useLoaderData()
  const articlesFav = data.article

  return (
    <div>
      {articlesFav && <ArticlesLayout articlesFav={articlesFav} />}
      {!articlesFav && <div></div>}
    </div>
  )
}
export default Favoris
