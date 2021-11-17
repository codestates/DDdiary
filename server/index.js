const https = require('https')
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const HOST = 'localhost';
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/users');
const todolistRouter = require('./routers/todolist');
const oauthRouter = require('./routers/oauth');
const diaryRouter = require('./routers/diary');
// const fs = require('fs')
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE' ,'OPTIONS']
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/users', userRouter);
app.use('/todolist', todolistRouter);
app.use('/oauth', oauthRouter);
app.use('/diarys', diaryRouter);

let server;
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//     const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
//     const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
//     const credentials = { key: privateKey, cert: certificate };
// //!__dirname = 현재 폴더이름 + / =현재폴더 key.pem이라는 파일
//     server = https.createServer(credentials, app);
//   //! 파일이 있으면 서버는 https 로 생성
//     server.listen(PORT,HOST, () => console.log(`https://${HOST}:${PORT} 로 실행`));
// //!server.listen = 서버(포트, (기능하고싶은 함수))로 실행
// } else {
    server = app.listen(PORT,HOST, () => console.log(`http://${HOST}:${PORT} 로 실행`));
  //!없으면 서버는 http
// }