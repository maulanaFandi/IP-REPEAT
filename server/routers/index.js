const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authentication");
const errHandle = require("../middlewares/errorHandler");
const Controller = require("../controllers/controller");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);
router.post("/payment", Controller.processTransaction);
router.post("/payment/upgrade", Controller.upgradeToPremium);

router.use(auth);
router.use(errHandle);
module.exports = router;