const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const HOST = 'localhost';
const userRouter = require('./routers/users');
const todolistRouter = require('./routers/todolist');
const oauthRouter = require('./routers/oauth');
const diaryRouter = require('./routers/diary');


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
app.use('/users', userRouter);
app.use('/todolist', todolistRouter);
app.use('/oauth', oauthRouter);
app.use('/diary', diaryRouter);


app.listen(PORT,HOST,()=> {
    console.log(`http://${HOST}:${PORT} 로 실행`)
})