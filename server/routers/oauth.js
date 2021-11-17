const express = require('express');
const router = express.Router();
const google = require('../controllers/oauths/oauthGoogle');
const index = require('../controllers/oauths/index');
const auth = require('../middleware/verifyToken');

router.post('/password', index.password);
router.get('/google', google.oauthGoogle)
router.post('/signup', index.signUp);
router.post('/login', index.login);
router.post('/logout', auth,index.logout);
module.exports = router