const db = require('../../models');
const {sendAccessToken, generateAccessToken} = require('../../controllers/tokenFuntions')

module.exports = {
    userInfo: async (req, res) => {

        const userInfo = await db.users.findOne({
            where: { id: req.userId }
        })
        //console.log('userInfo내용:',userInfo)
        if(!userInfo) {
            res.status(500).json({ "messag": "Server Error"});
            return;
        }
        res.status(200).json({ "data": userInfo})
    },
    userPatch: async (req, res) => {
        const { nickname, password } = req.body;
        const userInfo = await db.users.findOne({
            where: {id: req.userId}
        })
        if(userInfo.socialType !== 'basic') {
            await db.users.update({
                nickname: nickname
            },
            {
                where: {id: req.userId }
            })
            res.status(200).json({ "message":"Patched"})
            return;
        }
        else {
            await db.users.update({
                nickname: nickname,
                password: password
            },
            {
                where: {id: req.userId}
            })
            res.status(200).json({ "message":"Patched"})
            return;
        }
    },
    userDelete: async (req, res) => {
        console.log('req.userId내용:',req.userId)
        try {
        await db.users.destroy({
            where: {id: req.userId}
        })
        res.clearCookie('jwt');
        res.status(200).json({ "message": "sign out!"});
        return ;
        } catch (err) {
        console.log(err);
        res.status(500).json({"message": "Server Error"});
        return ;
        }
    },
    userToken: async (req, res) => {
        const token = generateAccessToken({ id:1 });
        sendAccessToken(res, token, {"asd": "asd"});
    }
}
