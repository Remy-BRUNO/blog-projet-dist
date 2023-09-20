import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useState } from "react"

// pages
import {
  Home,
  DashboardAdmin,
  DashboardUsers,
  Favoris,
  Login,
  Register,
  CreateArticle,
  EditArticle,
  UsersList,
  ErrorPage,
} from "./pages"

// loaders
import { loader as dashboardAdminLoader } from "./pages/admin/DashboardAdmin"
import { loader as dashboardUserLoader } from "./pages/users/DashboardUsers"
import { loader as homeLoader } from "./pages/Home"
import ArticlesLayout from "./layouts/ArticlesLayout"
import { loader as userListLoader } from "./pages/admin/UsersList"
import { loader as favorisLoader } from "./pages/users/Favoris"

// actions
import { action as registerAction } from "./pages/Register.jsx"
import { action as loginAction } from "./pages/Login.jsx"
import { action as addArticleAction } from "./pages/admin/CreateArticle"
import {
  action as editAction,
  loader as editLoader,
} from "./pages/admin/EditArticle"
import { action as deleteAction } from "./pages/admin/DeleteArticle"
import { action as addFavorisAction } from "./pages/users/AddFavoris"
import { action as deleteFavorisAction } from "./pages/users/DeleteFavoris"

//darkMode
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "./Styles/Theme"

// export const urlApi = "https://blog-api-wzi4.onrender.com"
// export const urlApi = "http://localhost:5000"
export const urlApi = ""

const App = () => {
  const localTheme = JSON.parse(localStorage.getItem("dark")) ? "dark" : "light"
  const [theme, setTheme] = useState(localTheme)
  const themeToggle = (isDarkMode) => {
    isDarkMode ? setTheme("dark") : setTheme("light")
  }
  //routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home themeToggle={themeToggle} />,
      loader: homeLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <ArticlesLayout />,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
      ],
    },

    {
      path: "/admin",
      element: <DashboardAdmin themeToggle={themeToggle} />,
      loader: dashboardAdminLoader,
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          element: <ArticlesLayout />,
        },
        {
          path: "/admin/addarticle",
          element: <CreateArticle />,
          action: addArticleAction,
        },
        {
          path: "/admin/edit/:id",
          element: <EditArticle />,
          loader: editLoader,
          action: editAction,
        },
        {
          path: "/admin/delete/:id",
          action: deleteAction,
        },
        {
          path: "/admin/userslist",
          element: <UsersList />,
          loader: userListLoader,
        },
      ],
    },

    {
      path: "/user",
      element: <DashboardUsers themeToggle={themeToggle} />,
      loader: dashboardUserLoader,
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          element: <ArticlesLayout />,
        },
        {
          path: "/user/favoris",
          element: <Favoris />,
          loader: favorisLoader,
        },
        {
          path: "/user/addfavoris/:id",
          action: addFavorisAction,
        },
        {
          path: "/user/deletefavoris/:id",
          action: deleteFavorisAction,
        },
      ],
    },
  ])

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
export default App
