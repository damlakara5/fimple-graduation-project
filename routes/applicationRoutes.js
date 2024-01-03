const express = require("express")
const applicationController = require("../controllers/applicationController")
const authController = require("../controllers/authController")
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Configures multer to save files in "uploads" directory

const router = express.Router()

router.route("/").post(  upload.single('file'), applicationController.createApplication)
router.route("/").get( authController.protect, applicationController.getAllAplications)
router.route("/:appCode").get(applicationController.getApplicationByAppCode)
router.route("/update").post( authController.protect, applicationController.updateApplicationStatus)

module.exports = router