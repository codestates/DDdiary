const express = require('express');
const router = express.Router();
const index = require('../controllers/users')
const auth = require('../middleware/verifyToken');

router.get('/checkToken', index.userToken)
router.use(auth)
router.get('/', index.userInfo);
router.patch('/', index.userPatch);
router.delete('/',index.userDelete);


module.exports = router