const { auth } = require("../middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const express = require('express');
const router = express.Router();

//Users
router.get("/resource/servers", [auth.verifyToken, authController.permission("website.resource.servers")], userController.getServers);


//Auth
router.post("/auth/login", authController.login);
router.post("/auth/refresh", authController.refresh);

module.exports = router;