const express = require('express');
const router = express.Router();
const index = require('../controllers/dateStorage');


router.post('/', index.date)

module.exports = router