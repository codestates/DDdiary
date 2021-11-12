const express = require('express');
const router = express.Router();
const emailCheck = require('../controllers/oauths/emailCheck')
const login = require('../controllers/oauths/login')
const logout = require('../controllers/oauths/logouut')
const google = require('../controllers/oauths/oauthGoogle')
const signup = require('../controllers/oauths/signup')

router.get('/', (req, res)=> {
    res.send('/rotuer.todolist')
})
router.post('/email', emailCheck.emailCheck)
router.post('/login', login.login)
router.post('/logout', logout.logout)
router.get('/google', google.oauthGoogle)
router.post('/signup', signup.signUp)

module.exports = router