import { SET_ISLOGIN, SET_USERINFO, SET_NOTTODOLIST, SET_DIARY } from '../actions/LoginAction';
import { initialState } from './InitialState';

const loginReducer = (state = initialState, action)=>{

    switch (action.type) {
        case SET_USERINFO: 
            return {
                ...state,
                user: {...action.payload},
            };

        case SET_ISLOGIN: 
            return {
                ...state,
                isLogin:action.payload
            };  

        case SET_NOTTODOLIST: 
            return {
                ...state,
                notToDoList:action.payload
            };  

        case SET_DIARY: 
            return {
                ...state,
                diary:action.payload
            };  

        default:
            return state;
    }

}

export default loginReducer