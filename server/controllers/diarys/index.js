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

        res.status(200).json({"a":"a"})
    },
    deleteDiary: async(req, res) => {
        res.status(200).json({"b":"b"})
    }
}