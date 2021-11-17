const db = require('../../models');
const {generateAccessToken, sendAccessToken} = require('../../controllers/tokenFuntions');
//!const bcrypt = require('bcrypt');
//!왜 install이 안되는것인가..
module.exports = {
    login: async(req, res) => {   
    let {email, password} = req.body;
    let userInfo = await db.users.findOne({
        where: {email: email, password: password}
    })
    if(!userInfo) {
        res.status(401).json({"message": "Invalid email or password"})
        return ;
    }
    else {
        const {id, email, nickname, socialType, manager} = userInfo;
        const userData = {
            id:id,
            email:email,
            nickname:nickname,
            socialType:socialType,
            manager:manager
        }
        const token = generateAccessToken(userData)
        sendAccessToken(res, token, userData);
    }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie('jwt');
            res.status(200);
            return;
        } catch (err) {
            console.log(err);
            return res.status(500).json({ "message": "Server Error"});
        }
    },
    signUp: async(req, res) => {
        const {email, password, nickname} = req.body;
        const emailCheck = await db.users.findOne({
            where: {email: email}
        })
        if (emailCheck) {
            res.status(409).json({ "message": "Email already exists"});
            return;
        }
        else if (!emailCheck) {
            await db.users.create({
                email: email, password:password, nickname:nickname
            })
            res.status(201).json({ "message": "signUp!"});
            return;
        }
        else{
        res.status(500).json({ "message": "Server Error"});
        return;
        }
    },
    password: async(req, res) => {
        
        const {email, password} = req.body;
        const checkPassword = await db.users.findOne({
            where: {email: email, password: password}
        })
        if(!checkPassword) {
            res.status(401).json({ "message": "Invalid password"});
            return ;
        }
        else if(checkPassword) {
            res.status(200).json({ "message": "Check the password ok"});
            return ;
        }
        else {
            res.status(500).json({ "message": "Server Error"})
        }
    }
}