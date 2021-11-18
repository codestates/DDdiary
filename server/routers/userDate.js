const express = require('express');
const router = express.Router();
const index = require('../controllers/userdate/index');
const auth = require('../middleware/verifyToken');

router.post('/', auth,index.postDate);
router.get('/', auth,index.getDate)

module.exports = router