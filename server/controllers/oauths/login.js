
exports.login = (req, res) => {
    console.log('login작동:',req.body)
    const dummyData = {
        id: 1,
        email:'abc@google.com',
        nickname:'abc',
        socialtype: null,
        manager: false,
        createAt: '2019-02-26T16:17:47.000Z',
        updateAt: '2019-02-26T16:17:47.000Z'
      }
    //req.body => { email: '123', password: '1111' }형식
    res.json({data:dummyData})
}