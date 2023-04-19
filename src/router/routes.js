const express = require("express"), router = express.Router(); 

const { signUp, login } = require("../controllers/userController");

const { accessChat } = require("../controllers/chatController");

const { protect } = require("../middleware/auth");





//   < USSER ENDPOINTS >

router.post("/signup", signUp);  //SIGNUP
router.post("/login", login);  //SIGNIN


//   <  CHAT ENDPOINTS  >

router.post('/chat', protect, accessChat);   //Fetch chat by ID








module.exports = router;
