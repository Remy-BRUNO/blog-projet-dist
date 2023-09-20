import { Form, Link, redirect } from "react-router-dom"
import FormRow from "../components/FormRow.jsx"
import axios from "axios"
import { toast } from "react-toastify"
import {
  AtroposStyled,
  Card,
  LogButton,
  StyledLink,
} from "../Styles/Styles.jsx"
import { urlApi } from "../App.jsx"

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const resp = await axios.post(`${urlApi}/api/v1/api/v1/auth/register`, data)
    localStorage.setItem("token", resp.data.token)
    toast.success("Inscription réussie")
    return redirect("/user")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  return (
    <Card>
      <Form method="POST" className="form">
        <AtroposStyled
          className="my-atropos"
          activeOffset={20}
          shadowScale={1.05}
          highlight={false}
          // onRotate={(x, y) => console.log("Rotate", x, y)}
        >
          <h2 data-atropos-offset="-3">Registration</h2>
          <FormRow type="text" name="name" labelText="Name" />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            data-atropos-offset="5"
          />
          <FormRow
            type="password"
            name="password"
            labelText="PassWord"
            data-atropos-offset="-1"
          />
          <LogButton className="btn btn-block" data-atropos-offset="3">
            Register
          </LogButton>
          <p data-atropos-offset="1">
            Have an Account? <StyledLink to="/login">Login Here</StyledLink>
          </p>
        </AtroposStyled>
      </Form>
    </Card>
  )
}
export default Register
