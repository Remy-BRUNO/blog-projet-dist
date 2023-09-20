import axios from "axios"
import { redirect, useLoaderData } from "react-router-dom"
import { styled } from "styled-components"
import { urlApi } from "../../App"

//styles
const Ol = styled.ol`
  background-color: #b3b4b6;
  display: flex;
  flex-direction: column;
  max-width: 420px;
  padding: 32px;
  margin: 60px auto;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.06);
  padding-left: 50px;
  li:nth-child(odd):before {
    border-color: #0bad02;
  }
  li:nth-child(even):before {
    border-color: #2378d5;
  }
`
const Li = styled.li`
  color: #4f4f4f;
  padding-left: 16px;
  margin-top: 24px;
  position: relative;
  font-size: 16px;
  line-height: 20px;

  &:before {
    content: "";
    display: block;
    height: 42px;
    width: 42px;
    border-radius: 50%;
    border: 2px solid #ddd;
    position: absolute;
    top: -12px;
    left: -33px;
  }
`

const Section = styled.section`
  height: calc(100vh - 78px - 78px);
`

export const loader = async () => {
  const token = localStorage.getItem("token")

  try {
    const { data } = await axios(`${urlApi}/api/v1/users/current-user/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { data }
  } catch (error) {
    console.log(error?.response?.data?.msg)
    return redirect("/admin")
  }
}

const UsersList = () => {
  const {
    data: { users },
  } = useLoaderData()

  return (
    <Section>
      <Ol>
        <h2>Users List</h2>
        {users.map((user, index) => (
          <Li key={index}>
            <h3>Name: {user.name}</h3> <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </Li>
        ))}
      </Ol>
    </Section>
  )
}
export default UsersList
