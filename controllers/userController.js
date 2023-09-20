const db = require("../db")
const { StatusCodes } = require("http-status-codes")
const { hashPassword } = require("../utils/passwordUtils.js")

const getAllUser = async (req, res) => {
  const { rows: users } = await db.query("SELECT name, email, role FROM users")

  res.status(StatusCodes.OK).json({ users: users })
}

const getUser = async (req, res) => {
  const {
    rows: [user],
  } = await db.query("SELECT * FROM users WHERE user_id = $1", [
    req.user.userId,
  ])
  delete user.password
  res.status(StatusCodes.OK).json({ user })
}

const updatUser = async (req, res) => {
  const { name, email, password } = req.body
  const { userId } = req.user

  //cryptage du password
  const hashedPassword = await hashPassword(password)
  const {
    rows: [updatedUser],
  } = await db.query(
    "UPDATE users set name=$1, email=$2, password=$3 where user_id=$4 RETURNING *",
    [name, email, hashedPassword, userId]
  )
  delete updatedUser.password
  res.status(StatusCodes.OK).json({ msg: "Profil modifié", user: updatedUser })
}

const deleteUser = async (req, res) => {
  const { userId } = req.user

  const {
    rows: [deletedUser],
  } = await db.query("DELETE FROM users where user_id=$1 RETURNING *", [userId])
  res.status(StatusCodes.OK).json({ msg: "Profil supprimé", user: deletedUser })
}

module.exports = { getAllUser, getUser, updatUser, deleteUser }
