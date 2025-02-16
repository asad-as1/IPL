const {Router} = require('express')
const router = Router();
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/user.controllers");

router.post('/login', login);
router.post('/register', register);
router.post('/getCurrentUser', getCurrentUser);

module.exports = router
