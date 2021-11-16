const express = require('express');
const router = express.Router();
const deleteDiary = require('../controllers/diarys/deleteDiary');
const getDiary = require('../controllers/diarys/getDiary');
const patchDiary = require('../controllers/diarys/patchDiary');
const postDiary = require('../controllers/diarys/postDiary');

router.get('/', (req, res)=> {
    res.send('/router.diary')
})
router.get('/:id', getDiary.getDiary)
router.post('/', postDiary.postDiary)
router.patch('/', patchDiary.parchDiary)
router.delete('/', deleteDiary.deleteDiary)
module.exports = router