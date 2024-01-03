const express = require("express")
const authController = require("../controllers/authController")

const router = express.Router()

router.route("/").post(authController.login)
router.route("/create-admin").get(authController.createUser)

module.exports = router