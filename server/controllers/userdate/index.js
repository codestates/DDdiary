const db = require('../../models');

module.exports = {
    getDate: async(req, res) => {
        const list = await db.userDate.findAll({
        where : {userId: req.userId}
        })
        if(list.length === 0) {
            res.status(404).json({"message": "not find userDate"});
            return ;
        }
        res.status(200).json(list)
    },
    postDate: async(req, res) => {
        try {
            await db.userDate.create({
                userId: req.userId, pushDate: req.body.date
            })
            res.status(201).json({ "message": "create userDate"})
        }
        catch (err) {
            console.log(err);
            res.status(500).json({"message": "Server Error"})
        }
    }
}