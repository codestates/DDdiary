import { SET_ISLOGIN,SET_ISLOGOUT,SET_USERINFO } from '../actions/LoginAction';
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

        case SET_ISLOGOUT: 
            return {
                ...state,
                isLogin:action.payload
            }; 
            
        default:
            return state;
    }

}