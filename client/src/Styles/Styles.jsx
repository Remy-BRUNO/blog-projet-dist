import Atropos from "atropos/react"
import { Link, Form } from "react-router-dom"
import { styled } from "styled-components"

const sizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
}
export const devices = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
}

export const Main = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  @media ${devices.laptop} {
    grid-template-columns: auto 1fr;
  }
`
export const Button = styled.button`
  background: none;
  color: white;
  border: none;
  cursor: pointer;
`
export const Icon = styled.img`
  width: 24px;
`

export const AtroposStyled = styled(Atropos)`
  width: 400px;
  height: 500px;
  margin: 0 auto;
  color: white;
  text-align: center;
  & .atropos-inner {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    background-color: #514f4f;
    padding: 2rem;
  }
  & img {
    width: 50%;
  }
`
export const Card = styled.section`
  height: calc(100vh - 156px);
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${devices.laptop} {
    height: 100%;
  }
`
export const LogButton = styled(Button)`
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 2px solid #27ae60;
  box-shadow: 6px 9px 18px 0px rgba(0, 0, 0, 0.2);
  color: var(--main-green, #27ae60);

  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 600;
`
export const Input = styled.input`
  border-radius: 8px;
  background: #242525;
  padding: 0.5rem 1rem;
  color: #7f8080;
  font-family: Josefin Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const StyledLink = styled(Link)`
  color: #27ae60;
`
export const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  text-transform: capitalize;
  padding: 1rem;
  height: 300px;
  border-radius: 1rem;
  background-color: #514f4f;
  padding: 2rem;
  box-shadow: 6px 9px 18px 0px rgba(0, 0, 0, 0.2);
`

export const TextArea = styled.textarea`
  border-radius: 8px;
  background: #242525;
  padding: 0.5rem 1rem;
  color: #7f8080;
  font-family: Josefin Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
