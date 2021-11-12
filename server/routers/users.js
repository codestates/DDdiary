const express = require('express');
const router = express.Router();
const userPatch = require('../controllers/users/userPatch')
const userInfo = require('../controllers/users/userInfo')
const userDelete = require('../controllers/users/userDelete')
router.get('/', (req, res)=> {
    res.send('/routers.users')
})
router.get('/:id', userInfo.userInfo)
router.patch('/',userPatch.userPatch);
router.delete('/',userDelete.userDelete)


module.exports = router