require('dotenv').config()
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateAccessToken: (data) => {
        // TODO: Access token으로 sign합니다.
        let Access = sign(data, process.env.ACCESS_SECRET, { expiresIn:'2d'})
       
    
    // HINT: 토큰을 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
    return Access
    
    },
    sendAccessToken: (res, token, userData) => {
    
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
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    // HINT: jsonwebtoken 라이브러리의 verify 함수를 사용하여 decode된 payload를 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
    let token = req.cookies.jwt;
    
    let data = verify(token, process.env.ACCESS_SECRET)

    return data;
    }
};