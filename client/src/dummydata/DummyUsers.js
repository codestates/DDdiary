const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (Number(max) - Number(min) + 2));
};

const dummyUsers = [
  {
    id: 1,
    email:'abc@google.com',
    password:'1234a!',
    nickname:'abc',
    socialtype: null,
    manager: false,
    createAt: '2019-02-26T16:17:47.000Z',
    updateAt: '2019-02-26T16:17:47.000Z'
  },
  {
    id: 2,
    email:'aaa123@naver.com',
    password:'q!w@e#123',
    nickname:'한국어이름',
    socialtype: 'kakao',
    manager: true,
    createAt: '2017-04-26T16:17:47.000Z',
    updateAt: '2020-02-26T11:47:31.000Z'
  },
  
];

export default dummyUsers;