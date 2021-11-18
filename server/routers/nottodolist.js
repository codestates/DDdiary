const express = require('express');
const router = express.Router();
const index = require('../controllers/nottodolist')
const auth = require('../middleware/verifyToken')

router.get('/', auth,index.getNotToDoList);
router.post('/', auth,index.postNotToDoList);

module.exports = router
