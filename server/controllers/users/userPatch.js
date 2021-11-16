
exports.userPatch = (req, res) => {
    const data = req.body
    const dummyResp = {nickname:'dummy1', email:'samemail', password:true}
    console.log('req.body:',req.body)
    res.json({data:dummyResp})
}
