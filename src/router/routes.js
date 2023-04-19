const express = require("express");
const router = express.Router();

const { signUp, login } = require("../controllers/userController");

const { accessChat } = require("../controllers/chatController");

const { protect } = require("../middleware/auth");

//-------------->USER<--------------//
//SIGNUP
router.post("/signup", signUp);

//SIGNIN
router.post("/login", login);

router.post('/chat', protect, accessChat)

module.exports = router;
