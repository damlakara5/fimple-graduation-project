const express = require("express")
const applicationController = require("../controllers/applicationController")
const authController = require("../controllers/authController")
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Configures multer to save files in "uploads" directory

const router = express.Router()

router.route("/").post(  upload.single('file'), applicationController.createApplication)
router.route("/").get( applicationController.getAllAplications)
router.route("/details/:appCode").get( applicationController.getStatusDetails)
router.route("/:appCode").get(applicationController.getApplicationByAppCode).delete(applicationController.deleteAppByAppCode)
router.route("/update").post( applicationController.updateApplicationStatus)

module.exports = router