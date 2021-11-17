const express = require('express');
const router = express.Router();
const index = require('../controllers/nottodolist')
const auth = require('../middleware/verifyToken')

router.get('/', auth,index.getNotToDoList);
router.post('/', index.postNotToDoList);
// router.patch('/', patchMyTodo.patchMyTodo)

module.exports = router
