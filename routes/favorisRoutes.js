const { Router } = require("express")
const router = Router()

const {
  authenticateUser,
} = require("../middlewares/authenticationMiddleware.js")
const {
  getFavorisArticles,
  addFavorisArticles,
  deleteFavorisArticles,
} = require("../controllers/favorisController.js")

router.use(authenticateUser)
router.route("/").get(getFavorisArticles)
router.route("/:id").post(addFavorisArticles).delete(deleteFavorisArticles)

module.exports = router
