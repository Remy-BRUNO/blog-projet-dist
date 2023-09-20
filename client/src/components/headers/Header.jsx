import { NavLink, Link, useNavigate } from "react-router-dom"
import { logo, logoutIcon } from "../../Index"
import { toast } from "react-toastify"
import DarkModeToggle from "react-dark-mode-toggle"
import { useEffect, useState } from "react"

// styles
import { HeaderTheme, LinkTheme } from "../../Styles/Theme"
import styled from "styled-components"
import { Icon, Button, devices } from "../../Styles/Styles"

const StyledHeader = styled(HeaderTheme)`
  display: flex;
  height: 78px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 0 12px 12px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: sticky;
  top: 0;
  @media ${devices.laptop} {
    display: none;
  }
`
const Img = styled.img`
  width: 4rem;
`
const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`

const StyledLink = styled(LinkTheme)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 69px;
  height: 28px;

  border-radius: 20px;
  border: 2px solid #27ae60;

  box-shadow: 0px 5px 15px 0px rgba(37, 44, 97, 0.15),
    0px 2px 4px 0px rgba(136, 144, 194, 0.2);
  color: #27ae60;
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

const HeaderComponent = ({ user, themeToggle }) => {
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

  return (
    <StyledHeader className="headerBar">
      <NavLink to="/">
        <Img src={logo} alt="logo lien vers l'accueil" />
      </NavLink>

      <DarkModeToggle onChange={handleChange} checked={isDarkMode} size={80} />

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
    </StyledHeader>
  )
}
export default HeaderComponent
