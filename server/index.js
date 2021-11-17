const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/users');
const nottodolistRouter = require('./routers/nottodolist');
const oauthRouter = require('./routers/oauth');
const diaryRouter = require('./routers/diary');
const userDate = require('./routers/userDate');
const dateRouter = require('./routers/dateStorage')
const dotenv = require('dotenv');
// const models = require('./models')
dotenv.config();

app.use(cors({
    origin: [true],
    credentials: true,
    //methods: ['GET', 'POST', 'PATCH', 'DELETE' ,'OPTIONS']
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/users', userRouter);
app.use('/nottodolist', nottodolistRouter);
app.use('/oauth', oauthRouter);
app.use('/diarys', diaryRouter);
app.use('/userDate', userDate);
app.use('/date', dateRouter);

// models.sequelize.sync({ force: false }).then(() => {
//   console.log('success');
// });

app.listen(PORT,() => console.log(`http://${PORT} 로 실행`));

