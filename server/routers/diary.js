const express = require('express');
const router = express.Router();
const deleteDiary = require('../controllers/diarys/deleteDiary');
const getDiary = require('../controllers/diarys/getDiary');
const postDiary = require('../controllers/diarys/postDiary');

router.get('/', getDiary.getDiary)
router.post('/', postDiary.postDiary)
router.delete('/', deleteDiary.deleteDiary)
module.exports = router