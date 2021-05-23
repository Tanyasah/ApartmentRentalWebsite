const express = require("express");
const router = express.Router();

const BrokerController = require('../controllers/broker');
const checkAuth = require('../middleware/check-auth');

//router.post("/signup", UserController.user_signup);

router.post("/login",BrokerController.broker_login);

//router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;