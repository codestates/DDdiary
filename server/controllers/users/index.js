const db = require('../../models');
const {isAuthorized} = require('../../controllers/tokenFuntions')



module.exports = {
    userInfo: async (req, res) => {
        const jwt = req.cookies.jwt;
        if (!jwt) {
            res.status(401).json({"message": "not authorized"});
            return ;
        }
        else if(jwt) {
        const userData = isAuthorized(jwt);
        if(userData) {
            //하는중
        }
        }
    },
    userPatch: async (req, res) => {

    },
    userDelete: async (req, res) => {

    }
}