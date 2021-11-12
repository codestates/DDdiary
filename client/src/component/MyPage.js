//마이페이지 구현. 정보수정창 겸-> 회원탈퇴 모달창
import React from 'react';
import { useDispatch, useSelector } from "react-redux";



export default function MyPage(props) {
    
const LoginState = useSelector(state=>state.LoginReducer);
const {email} = LoginState.user
console.log(email)

    return (
        <div>{email ? email:'데이터 들어오지 않았음'}</div>
        
        
    )
}