import { createGlobalStyle, styled } from "styled-components"
import lightOn from "../assets/light-on.svg"
import lightOff from "../assets/light-off.svg"
import { Link } from "react-router-dom"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    background-attachment: fixed;
    background-size: cover;
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    font-family: Josefin Sans;
  }
`
export const HeaderTheme = styled.nav`
  background: ${({ theme }) => theme.background};
  transition: background 0.2s ease-in;
`
export const LinkTheme = styled(Link)`
  background: ${({ theme }) => theme.button};
  transition: background 0.2s ease-in;
`

export const lightTheme = {
  body: `no-repeat url(${lightOn})`,
  text: "#121620",
  background: "#F5F5F5",
  button: "#6d6d6d",
}
export const darkTheme = {
  body: `no-repeat url(${lightOff})`,
  text: "#f1f1f1",
  background: "#171918",
  button: "#3a3b3b",
}
