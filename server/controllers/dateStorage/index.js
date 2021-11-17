const db = require('../../models');

module.exports = {
    date : async (req, res) => {
        
        if(req.body.date) {
            await db.dateStorage.create({
                date: req.body.date
            })
            res.status(200).json({"message": "date ok"});
            return ;
        }
        res.status(400).json({"message": "bad request"});
        return ;
    }
}