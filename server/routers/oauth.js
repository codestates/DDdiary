const express = require('express');
const router = express.Router();
const index = require('../controllers/oauths/index');
const auth = require('../middleware/verifyToken');

router.post('/password', index.password);
router.post('/signup', index.signUp);
router.post('/login', index.login);
router.post('/logout', auth,index.logout);
module.exports = router