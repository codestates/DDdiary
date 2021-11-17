const express = require('express');
const router = express.Router();
const getMyTodo = require('../controllers/todolists/getMyTodo')
const postMyTodo = require('../controllers/todolists/postMyTodo')
const patchMyTodo = require('../controllers/todolists/patchMyTodo')
const deleteMyTodo = require('../controllers/todolists/deleteMyTodo')

router.get('/', getMyTodo.getMyTodo)
router.post('/', postMyTodo.postMyTodo)
router.patch('/', patchMyTodo.patchMyTodo)
router.delete('/', deleteMyTodo.deleteMyTodo)

module.exports = router
