require('dotenv').config()
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateAccessToken: (data) => {
    // TODO: Access token으로 sign합니다.
    let Access = sign(data, process.env.ACCESS_SECRET, { expiresIn:'2d'})
    
    return Access
    
    },
    sendAccessToken: (res, token, userData) => {
        userData = userData || {data: null}
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    res.status(200).cookie("jwt", token,{
        domain: 'localhost',
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite:'Strict'
    }).json(userData);
    return ;
    },
    isAuthorized: (req) => {

    let token = req.cookies.jwt;
    
    let data = verify(token, process.env.ACCESS_SECRET)

    return data;
    }
};