import { Link, useRouteError } from "react-router-dom"
import notFound from "../assets/not-found.png"

//styles
import { styled } from "styled-components"
import { StyledLink } from "../Styles/Styles"

const Main = styled.main`
  background: url(${notFound}) no-repeat center/cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`
const ReturneLink = styled(StyledLink)`
  margin-bottom: 5rem;
  font-size: 2rem;
`

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <Main>
      <ReturneLink to="/">Retourner à l&apos;accueil</ReturneLink>
    </Main>
  )
}
export default ErrorPage
