const db = require('../../models')

module.exports= {
    getNotToDoList: async(req, res) => {
        
        const list = await db.notToDoList.findAll({
                where: {userId: req.userId}
        })
        if(list.length === 0) {
            res.status(404).json({"message": "not find notToDoList"});
            return;
        }
        res.status(200).json(list);
        return;
    },
    postNotToDoList: async(req, res) => {
            await db.notToDoList.destroy({
            where: {userId:1, date:111111}
            })
            for(let i = 0; i < req.body.todolist.length; i++) {
                await db.notToDoList.create({
                    userId: req.userId, date: req.body.date, checked: req.body.todolist[i].checked, notToDoListContent: req.body.todolist[i].content
                })
            }
    //     const list = await db.notToDoList.findAll({
    //         where: {userId: 1, date:111111}
    // })
        res.status(200).json(list)
    }
    // patchNotToDoList: async(req, res) => {
        
    // },
    // deleteNotToDoList: async(req, res) => {
        
    // }
}