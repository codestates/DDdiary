require('dotenv').config()
const { sign } = require('jsonwebtoken');
const DOMAIN = process.env.DOMAIN || 'localhost'

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
        domain: DOMAIN,
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: 'none'
    }).json(userData);
    return ;
    }
};