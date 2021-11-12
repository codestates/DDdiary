export const SET_ISLOGIN = 'SET_ISLOGIN';
export const SET_ISLOGOUT = 'SET_ISLOGOUT';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
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

export function setIsLogin() {
    return{
        type:SET_ISLOGIN,
        payload: true,
    };
}

export function setLogout() {
    return{
        type:SET_ISLOGOUT,
        payload: false,
    };
}

export function setEmail(data) {
    return{
        type:SET_EMAIL,
        payload: data,
    };
}

export function setPassword(data) {
    return{
        type:SET_PASSWORD,
        payload: data,
    };
}
