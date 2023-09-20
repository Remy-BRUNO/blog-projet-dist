const { Router } = require("express")
const router = Router()

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware.js")

const { validateIdParam } = require("../middlewares/validationMiddleware.js")

const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleControllers.js")
const uploadImage = require("../controllers/uploadControllers.js")

router.route("/").get(getAllArticles)
router.route("/:id").get(validateIdParam, getSingleArticle)

router.use(authenticateUser)
router.route("/uploads").post(uploadImage)
router.route("/admin").post(authorizePermissions("admin"), createArticle)
router
  .route("/admin/:id")
  .put(authorizePermissions("admin"), validateIdParam, updateArticle)
  .delete(authorizePermissions("admin"), validateIdParam, deleteArticle)

module.exports = router
