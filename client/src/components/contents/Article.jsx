import { Link, Form } from "react-router-dom"
import { edit, deleteIcon, heart, heartCompleted } from "../../Index"

//style
import { styled } from "styled-components"
import { Icon, Button } from "../../Styles/Styles"

const Aside = styled.aside`
  display: flex;
  width: 90%;
  max-width: 900px;
  gap: 1rem;
  border-radius: 12px;
  background: #514f4f;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 1rem 0 1rem 0;
`
const Title = styled.h3`
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
`
const ImgArticle = styled.img`
  width: 90%;
  max-width: 810px;
  max-height: 1200px;
`

const Info = styled.p`
  width: 90%;
`
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 90%;
`

const Article = ({ article, role, fav }) => {
  const { image, title, description, article_id, created_at } = article
  const dateOfCreated = created_at.slice(0, 10)

  return (
    <Aside>
      <Title>{title}</Title>
      <ImgArticle src={image} alt={title} />
      <Info>{description}</Info>
      <Info>Créé le {dateOfCreated} </Info>
      {role == "admin" && (
        <ButtonContainer>
          <Button>
            <Link to={`/admin/edit/${article_id}`}>
              <Icon src={edit} alt="edit" />
            </Link>
          </Button>

          <Form method="POST" action={`/admin/delete/${article_id}`}>
            <Button type="submit">
              <Icon src={deleteIcon} alt="delete" />
            </Button>
          </Form>
        </ButtonContainer>
      )}
      {role == "user" && (
        <ButtonContainer>
          {fav ? (
            <Form method="DELETE" action={`/user/deletefavoris/${article_id}`}>
              <Button type="submit">
                <Icon src={heartCompleted} alt="edit" />
              </Button>
            </Form>
          ) : (
            <Form method="POST" action={`/user/addfavoris/${article_id}`}>
              <Button type="submit">
                <Icon src={heart} alt="edit" />
              </Button>
            </Form>
          )}
        </ButtonContainer>
      )}
    </Aside>
  )
}
export default Article
