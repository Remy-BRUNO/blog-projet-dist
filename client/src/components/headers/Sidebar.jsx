import { NavLink, useNavigate, useSubmit, Form } from "react-router-dom"
import {
  logo,
  logoutIcon,
  cube,
  heart,
  search,
  add,
  eye,
  heartCompleted,
} from "../../Index"
import { toast } from "react-toastify"
import DarkModeToggle from "react-dark-mode-toggle"
import { useEffect, useState, useRef } from "react"

// styles
import { HeaderTheme, LinkTheme } from "../../Styles/Theme"
import styled from "styled-components"
import { Icon, Button, devices } from "../../Styles/Styles"

const SidebarStylded = styled(HeaderTheme)`
  display: none;
  @media ${devices.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100vh;
    width: 200px;
    padding: 1rem;
    position: sticky;
    top: 0;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`

const FormStyled = styled(Form)`
  display: flex;
  gap: 0.5rem;
`

const Input = styled.input`
  display: ${(props) => props.$displayValue};
  width: 7rem;
`

const Img = styled.img`
  width: 4rem;
`
const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
`

const StyledLink = styled(LinkTheme)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 69px;
  height: 28px;
  border-radius: 20px;
  border: 2px solid var(--main-green, #27ae60);
  box-shadow: 0px 5px 15px 0px rgba(37, 44, 97, 0.15),
    0px 2px 4px 0px rgba(136, 144, 194, 0.2);
  color: var(--main-green, #27ae60);
  font-family: "Montserrat";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-decoration: none;
`
const UserName = styled.span`
  text-transform: capitalize;
  font-size: 1.5rem;
`
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`
const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #27ae60;
  fill: #27ae60;
`
const ToggleStyled = styled(DarkModeToggle)`
  margin: 0 auto;
`
const Bar = styled.div`
  width: 150px;
  height: 1px;
  border: 1px solid #7f7f7f;
`

const Sidebar = ({ user, searchTerm, themeToggle }) => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsDarkMode(JSON.parse(localStorage.getItem("dark")))
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    toast.success("Déconnexion...")
    navigate("/")
  }

  const handleChange = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("dark", !isDarkMode)
    themeToggle(!isDarkMode)
  }
  const submit = useSubmit()
  const inputRef = useRef(null)
  const role = user?.role
  const [visible, setVisible] = useState("none")

  const handleSearch = () => {
    visible === "inline" ? setVisible("none") : setVisible("inline")
  }
  return (
    <SidebarStylded>
      <StyledNavLink to="/">
        <Img src={logo} alt="logo link to homePage" />
        <h1>ByGeek</h1>
      </StyledNavLink>

      {role === "user" && (
        <>
          <StyledNavLink
            to={"/user/favoris"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon src={heart} alt="favoris" className="heart" />
            <Icon
              src={heartCompleted}
              alt="favoris"
              className="heartCompleted"
            />
            <p>Favoris</p>
          </StyledNavLink>

          <StyledNavLink to={"/user"}>
            <Icon src={cube} alt="All articles" />
            <p>All Articles</p>
          </StyledNavLink>
        </>
      )}

      {role === "admin" && (
        <>
          <StyledNavLink to={"/admin/addarticle"}>
            <Icon src={add} alt="add article" />
            <p>Add Articles</p>
          </StyledNavLink>

          <StyledNavLink to={"/admin/userslist"}>
            <Icon src={eye} alt="view all users" />
            <p>View all Users</p>
          </StyledNavLink>
          <StyledNavLink to={"/admin"}>
            <Icon src={cube} alt="Dashboard Admin" />
            <p>All Articles</p>
          </StyledNavLink>
        </>
      )}

      {!user && (
        <StyledNavLink to={"/"}>
          <Icon src={cube} alt="All articles" />
          <p>All Articles</p>
        </StyledNavLink>
      )}
      <Bar></Bar>
      <FormStyled>
        <Button>
          <Icon src={search} alt="Search" onClick={handleSearch} />
        </Button>
        <Input
          $displayValue={visible}
          type="search"
          name="search"
          id="search-sidebar"
          ref={inputRef}
          defaultValue={searchTerm}
          onChange={(e) => {
            const isFirstSearch = searchTerm === null
            submit(e.currentTarget.form, { replace: !isFirstSearch })
          }}
        />
      </FormStyled>

      <ToggleStyled onChange={handleChange} checked={isDarkMode} size={80} />

      {user && (
        <UserInfo className="nav-user-info">
          <UserName className="username">{user.name} </UserName>
          <Button type="button" className="btn" onClick={logout}>
            <Icon src={logoutIcon} alt="logout" />
          </Button>
        </UserInfo>
      )}
      {!user && (
        <Links>
          <StyledLink to="/register">Sign Up</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
        </Links>
      )}
    </SidebarStylded>
  )
}
export default Sidebar
