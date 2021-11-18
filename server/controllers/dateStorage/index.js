const db = require('../../models');

module.exports = {
    date : async (req, res) => {
        
        let check = await db.dateStorage.findOne({
            where: {pushDate : req.body.date}})
        if(check === null) {
            await db.dateStorage.create({
                pushDate: req.body.date
            })
            res.status(201).json({"message": "create date"});
            return ;
        }
        res.status(200).json({"message": "date already exists"});
        return ;
    }
}