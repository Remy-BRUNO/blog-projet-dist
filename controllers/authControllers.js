const { BadRequestError } = require("../errors")
const db = require("../db")
const { StatusCodes } = require("http-status-codes")
const { createJWT } = require("../utils/tokenUtils.js")
const { hashPassword, comparePassword } = require("../utils/passwordUtils.js")

const register = async (req, res) => {
  //recuperation des infos du formulaire
  const { name, email, password } = req.body

  // 1er inscription pour l'admin
  const {
    rows: [{ count }],
  } = await db.query("SELECT COUNT(*) FROM users")
  const isFirstAccount = Number(count) === 0
  const role = isFirstAccount ? "admin" : "user"

  //cryptage du password
  const hashedPassword = await hashPassword(password)

  const {
    rows: [user],
  } = await db.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashedPassword, role]
  )

  //creation du token
  const token = createJWT({
    userId: user.user_id,
    name: user.name,
    role: user.role,
  })

  res.status(StatusCodes.CREATED).json({ msg: "Utilisateur enregistré", token })
}

const login = async (req, res) => {
  //recuperation des infos du formulaire
  const { email, password } = req.body

  //recherche de l'utilisateur via l'email
  const {
    rows: [user],
  } = await db.query("SELECT * FROM users WHERE email = $1", [email])

  if (!user) {
    throw new BadRequestError("Identifiants invalides")
  }
  //Compare le password avec la basse de donnée
  const isPasswordCorrect = await comparePassword(password, user.password)

  if (!isPasswordCorrect) {
    throw new BadRequestError("Identifiants invalides")
  }

  //creation du token
  const token = createJWT({
    userId: user.user_id,
    name: user.name,
    role: user.role,
  })

  res
    .status(StatusCodes.OK)
    .json({ msg: "Utilisateur connecté", token, role: user.role })
}

module.exports = { register, login }
