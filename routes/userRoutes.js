const { Router } = require("express")
const router = Router()

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware.js")

const {
  getUser,
  updatUser,
  deleteUser,
  getAllUser,
} = require("../controllers/userController.js")

router.use(authenticateUser)
router.route("/current-user").get(getUser).put(updatUser).delete(deleteUser)
router
  .route("/current-user/admin")
  .get(authorizePermissions("admin"), getAllUser)

module.exports = router
