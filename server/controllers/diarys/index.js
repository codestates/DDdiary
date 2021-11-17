const db = require('../../models');

module.exports = {
    createDiary: async(req, res) => {
        const {content, date} = req.body;
        try {
        await db.diarys.create({
            content: content, userId: req.userId, date: date
            })
            res.status(201).json({ "message": "create diary"});
        } catch {
            if(err) {
                console.log(err);
                res.status(500).json({ "message": "Server Error"});
                return;
            }
        }
    },
    getDiary: async(req, res) => {
            //!const myDiary = await db.diarys.findOne({
            const myDiary = await db.diarys.findAll({
                //!where: { userId: req.userId, date: req.query.date}
                where: { userId: req.userId}
            })
            //!if(myDiary) {
                if(myDiary.length === 0) {
                //!res.status(200).json(myDiary);
                res.status(200).json({"message":"myDiary not find"})
                return ;
            }
            //res.status(404).json({"message":"myDiary not find"})
            res.status(200).json(myDiary);
            return ;
    },
    deleteDiary: async(req, res) => {
        try{
        await db.diarys.destroy({
            where: {userId: req.userId, date: req.query.date}
        })
        res.status(200).json({ "message": "diary delete"})
        }
        catch (err) {
            res.status(500).json({ "message": "Server Error"})
        }
    }
}