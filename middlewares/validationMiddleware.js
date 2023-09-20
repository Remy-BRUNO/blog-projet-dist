const { body, param, validationResult } = require("express-validator")
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors/index.js")
const db = require("../db/index.js")

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, _res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0].startsWith("Pas d'article")) {
          throw new NotFoundError(errorMessages)
        }

        if (errorMessages[0].startsWith("Accès non")) {
          throw new UnauthorizedError(errorMessages)
        }

        throw new BadRequestError(errorMessages)
      }

      next()
    },
  ]
}

//Chaine de validation des donnée envoyer par le formulaire Register

const validateRegisterInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Le nom est requis").escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape()
    .custom(async (email) => {
      const {
        rows: [user],
      } = await db.query("SELECT * FROM users WHERE email = $1", [email])

      if (user) {
        throw new Error("L'email existe déjà")
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .escape(),
])

//Chaine de validation des donnée envoyer par le formulaire login
const validateLoginInput = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .escape(),
])

// validation de l'id des article
const validateIdParam = withValidationErrors(
  param("id").custom(async (id, { req }) => {
    if (isNaN(Number(id))) {
      throw new Error("Id non valide")
    }

    const {
      rows: [item],
    } = await db.query("SELECT * FROM articles WHERE article_id = $1", [id])

    if (!item) {
      throw new Error(`Pas d'article avec l'id ${id}`)
    }
  })
)

module.exports = {
  validateLoginInput,
  validateRegisterInput,
  validateIdParam,
}
