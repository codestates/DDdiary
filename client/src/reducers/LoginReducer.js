import { SET_ISLOGIN, SET_USERINFO, SET_EMAIL, SET_PASSWORD } from '../actions/LoginAction';
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

        case SET_EMAIL: 
            return {
                ...state,
                email:action.payload
            }; 
            
        case SET_PASSWORD: 
            return {
                ...state,
                password:action.payload
            }; 

            

        default:
            return state;
    }

}

export default loginReducer