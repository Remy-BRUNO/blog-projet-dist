import { cube, heart, search, add, eye, heartCompleted } from "../../Index"
import { NavLink, Form, useSubmit } from "react-router-dom"
import { useRef, useState } from "react"

// styles
import styled from "styled-components"
import { HeaderTheme } from "../../Styles/Theme"
import { Button, Icon, devices } from "../../Styles/Styles"

const Nav = styled(HeaderTheme)`
  display: flex;
  height: 78px;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 0 12px 12px;
  width: 100%;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: sticky;
  bottom: 0;
  @media ${devices.laptop} {
    display: none;
  }
`
const FormStyled = styled(Form)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const Input = styled.input`
  display: ${(props) => props.$displayValue};
`

const NavbarMobile = ({ user, searchTerm }) => {
  const submit = useSubmit()
  const inputRef = useRef(null)
  const role = user?.role
  const [visible, setVisible] = useState("none")

  const handleSearch = () => {
    visible === "inline" ? setVisible("none") : setVisible("inline")
  }

  return (
    <Nav className="footerBar">
      {role === "user" && (
        <>
          <NavLink
            to={"/user/favoris"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon src={heart} alt="favoris" className="heart" />
            <Icon
              src={heartCompleted}
              alt="favoris"
              className="heartCompleted"
            />
          </NavLink>
          <div>|</div>
          <NavLink to={"/user"}>
            <Icon src={cube} alt="All articles" />
          </NavLink>
        </>
      )}

      {role === "admin" && (
        <>
          <NavLink to={"/admin/addarticle"}>
            <Icon src={add} alt="add article" />
          </NavLink>

          <NavLink to={"/admin/userslist"}>
            <Icon src={eye} alt="view all users" />
          </NavLink>
          <NavLink to={"/admin"}>
            <Icon src={cube} alt="Dashboard Admin" />
          </NavLink>
        </>
      )}

      {!user && (
        <NavLink to={"/"}>
          <Icon src={cube} alt="All articles" />
        </NavLink>
      )}

      <div>|</div>
      <FormStyled>
        <Button>
          <Icon src={search} alt="Search" onClick={handleSearch} />
        </Button>
        <Input
          $displayValue={visible}
          type="search"
          name="search"
          id="search"
          ref={inputRef}
          defaultValue={searchTerm}
          onChange={(e) => {
            const isFirstSearch = searchTerm === null
            submit(e.currentTarget.form, { replace: !isFirstSearch })
          }}
        />
      </FormStyled>
    </Nav>
  )
}
export default NavbarMobile
