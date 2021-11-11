const express = require('express');
const router = express.Router();
const getComent = require('../controllers/coments/getComent')

router.get('/', getComent.getComent)

module.exports = router