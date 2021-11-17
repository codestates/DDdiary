const express = require('express');
const router = express.Router();
const index = require('../controllers/diarys');
const auth = require('../middleware/verifyToken')

router.get('/', auth,index.getDiary)
router.post('/', index.createDiary);
router.delete('/', index.deleteDiary);
module.exports = router