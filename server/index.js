const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const HOST = 'localhost';
const userRouter = require('./routers/users');
const todolistRouter = require('./routers/todolist');
const oauthRouter = require('./routers/oauth');
const comentRouter = require('./routers/coment');
const diaryRouter = require('./routers/diary');
const sequelize = require('sequelize');
const models = require('./models');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE' ,'OPTIONS']
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req, res) =>{
    res.send('index')
})

app.get('/coment', comentRouter);
app.use('/users', userRouter);
app.use('/todolist', todolistRouter);
app.use('/oauth', oauthRouter);
app.use('/diary', diaryRouter);


// let aaa = async() => {
//     let aaa = await models.users.create({email:'aaa@naver.com',password:'aaa!',
//     nickname:'mo'
//     })
//     let bbb = await models.notToDoList.create({
//         notToDoListContent:'나는 아직배가고프다!',date:20111116
//     })
//     .then(async()=> {
//         await models.userNotToDoList.create({
//         userId:1,notToDoListId:1
//         })
//     }
//     )
//     let ccc = await models.users.findOne({
//         where:{id:1},
//         include:models.notToDoList
//     })
//     console.log(ccc)
// }
// aaa()
app.listen(PORT,HOST,()=> {
    console.log(`http://${HOST}:${PORT} 로 실행`)
})