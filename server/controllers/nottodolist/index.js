const db = require('../../models')

module.exports= {
    getNotToDoList: async(req, res) => {
        
        const list = await db.notToDoList.findAll({
                where: {userId: req.userId}
        })
        if(list.length === 0) {
            res.status(200).json({"message": "not find notToDoList"});
            return;
        }
        res.status(200).json(list);
        return;
    },
    postNotToDoList: async(req, res) => {
            let id = req.userId || 1
            await db.notToDoList.destroy({
            where: {userId: id, date: req.body.todolist[0].date}
            })
            for(let i = 0; i < req.body.todolist.length; i++) {
                    await db.notToDoList.create({
                    userId: id, date: req.body.todolist[i].date, checked: req.body.todolist[i].checked, notToDoListContent: req.body.todolist[i].content
                })
            }
    //     const list = await db.notToDoList.findAll({
    //         where: {userId: 1, date:111111}
    // })
        res.status(200).json({"message": "create ok"})
    }
    // patchNotToDoList: async(req, res) => {
        
    // },
    // deleteNotToDoList: async(req, res) => {
        
    // }
}