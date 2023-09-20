import Article from "../components/contents/Article"

import { useOutletContext } from "react-router-dom"

//style
import { styled } from "styled-components"

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
`

const ArticlesLayout = ({ articlesFav }) => {
  const [user, data, favoris] = useOutletContext()
  const articles = data.articles

  //controle des favoris
  const favArticle = favoris?.article
  const favoriId = []
  if (favArticle) {
    favArticle.map((article) => {
      favoriId.push(article.article_id)
    })
  }

  // const fav = true
  return (
    <div>
      {articlesFav && (
        <ArticleContainer>
          {articlesFav.map((article, index) => {
            return (
              <Article
                key={index}
                article={article}
                role={user.role}
                fav={favoriId.includes(article.article_id)}
              />
            )
          })}
        </ArticleContainer>
      )}
      {!articlesFav && (
        <ArticleContainer>
          {articles.map((article) => {
            return (
              <Article
                key={article.article_id}
                article={article}
                role={user ? user.role : ""}
                fav={favoriId.includes(article.article_id)}
              />
            )
          })}
        </ArticleContainer>
      )}
    </div>
  )
}
export default ArticlesLayout
