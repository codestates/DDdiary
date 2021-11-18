const db = require('../../models')

module.exports= {
    getNotToDoList: async(req, res) => {
        
        const list = await db.notToDoList.findAll({
                where: {userId: req.userId}
        })
        console.log('list내용:',list)
        if(list.length === 0) {

            res.status(200).json({"message": "not find notToDoList"});
            return;
        }
        res.status(200).json(list);
        return;
    },
    postNotToDoList: async(req, res) => {
            await db.notToDoList.destroy({
            where: {userId: req.userId, date: req.body.date}
            })
            for(let i = 0; i < req.body.todolist.length; i++) {
                const {date, content, checked} = req.body.todolist[i];
                    await db.notToDoList.create({
                    userId: req.userId, date: date, checked: checked, notToDoListContent: content
                })
            }

        res.status(200).json({"message": "create ok"})
    }
}
