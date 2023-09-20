const db = require("../db")
const { StatusCodes } = require("http-status-codes")
//ajouter un article au favoris
const addFavorisArticles = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params

  const {
    rows: [articleFavoris],
  } = await db.query(
    "INSERT INTO favoris (user_id,article_id) VALUES ($1,$2) RETURNING *",
    [userId, id]
  )
  res.status(StatusCodes.OK).json({ articleFavoris })
}
//supprimer un article au favoris
const deleteFavorisArticles = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params

  const {
    rows: [articleFavorisDeleted],
  } = await db.query(
    "DELETE FROM favoris WHERE user_id=$1 and article_id = $2 RETURNING *",
    [userId, id]
  )
  res.status(StatusCodes.OK).json({ articleFavorisDeleted })
}

//recupere les articles favoris
const getFavorisArticles = async (req, res) => {
  const { userId } = req.user

  const { rows: article } = await db.query(
    "SELECT * FROM articles join favoris fa  USING(article_id) WHERE fa.user_id=$1",
    [userId]
  )

  res.status(StatusCodes.OK).json({ article })
}

module.exports = {
  getFavorisArticles,

  addFavorisArticles,
  deleteFavorisArticles,
}
