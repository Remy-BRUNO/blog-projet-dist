const db = require("../db")
const { StatusCodes } = require("http-status-codes")

//recupere tout les articles
const getAllArticles = async (req, res) => {
  const { search } = req.query

  let queryString = "SELECT * FROM articles"
  let orderred = " ORDER BY created_at desc"
  let parameters = []

  if (search) {
    queryString = `${queryString} WHERE title ILIKE $1`
    parameters.push(`%${search}%`)
  }

  const { rows: articles } = await db.query(queryString + orderred, parameters)
  res.status(StatusCodes.OK).json({ count: articles.length, articles })
}

// creer un article
const createArticle = async (req, res) => {
  const { title, image, description } = req.body
  const { userId } = req.user

  const {
    rows: [createdArticle],
  } = await db.query(
    "INSERT INTO articles (title, image,description,user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, image, description, userId]
  )

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Article créé", article: createdArticle })
}

//recupere un article
const getSingleArticle = async (req, res) => {
  const { id } = req.params

  const {
    rows: [article],
  } = await db.query("SELECT * FROM articles WHERE article_id = $1", [id])

  res.status(StatusCodes.OK).json({ article })
}

//Modifier un article
const updateArticle = async (req, res) => {
  const { id } = req.params
  const { title, image, description } = req.body

  const {
    rows: [updatedArticle],
  } = await db.query(
    "UPDATE articles SET title=$1, image=$2 ,description=$3 WHERE article_id = $4 RETURNING *",
    [title, image, description, id]
  )
  res
    .status(StatusCodes.OK)
    .json({ msg: "Article modifié", article: updatedArticle })
}

//supprimer un article
const deleteArticle = async (req, res) => {
  const { id } = req.params

  const {
    rows: [deletedArticle],
  } = await db.query("DELETE FROM articles WHERE article_id = $1 RETURNING *", [
    id,
  ])

  res
    .status(StatusCodes.OK)
    .json({ msg: "Article supprimé", article: deletedArticle })
}

module.exports = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
}
