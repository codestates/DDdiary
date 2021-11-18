export const SET_ISLOGIN = 'SET_ISLOGIN';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_NOTTODOLIST = 'SET_NOTTODOLIST';
export const SET_DIARY = 'SET_DIARY';

const axios = require('axios');


// export function setUserInfo() {
//     const response = axios.get(/*api필요, { withCredentials: true }).then((resp) => resp.data )*/)
//     return{
//         type:SET_USERINFO,
//         payload: response.data,
//     };
// }

export function setUserInfo(data) {
    
    return{
        type:SET_USERINFO,
        payload: data,
    };
}

export function setIsLogin(data) {
    return{
        type:SET_ISLOGIN,
        payload: data,
    };
}

export function setNotToDoList(data) {
    return{
        type:SET_NOTTODOLIST,
        payload: data,
    };
}

export function setDiary(data) {
    return{
        type:SET_DIARY,
        payload: data,
    };
}



