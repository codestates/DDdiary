const express = require('express');
const router = express.Router();
const index = require('../controllers/dateStorage');
const auth = require('../middleware/verifyToken');

router.post('/', auth,index.date)

module.exports = router