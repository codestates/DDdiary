const db = require('../../models');

module.exports = {
    createDiary: async(req, res) => {
        const {content, date} = req.body;
        const check = await db.diarys.findOne({
            where: {userId: req.userId, date: date}
        })
        if(check) {
            console.log(date)
            console.log(check)
            res.status(200).json({"message": "diary already exists"});
        }
        else if(!check) {
            await db.diarys.create({
            content: content, userId: req.userId, date: date
            })
            res.status(201).json({ "message": "create diary"});
            return ;
        }
        else {
                res.status(500).json({ "message": "Server Error"});
                return;
        }
    },
    getDiary: async(req, res) => {

            const myDiary = await db.diarys.findAll({
                where: { userId: req.userId}
            })

            console.log('myDiary내용:',myDiary)

                if(myDiary.length === 0) {
                res.status(200).json({"message":"myDiary not find"})
                return ;
            }
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
