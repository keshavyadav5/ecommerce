const express = require('express');
const { register, login, logout, authMiddleware } = require('../controllers/auth/auth-controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'You are authenticated',
    user: req.user
  });
})
module.exports = router; 