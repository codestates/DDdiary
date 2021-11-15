import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { setUserInfo, setIsLogin, setLogout, setEmail, setPassword } from "../actions/LoginAction";
import axios from 'axios';
import styled from 'styled-components'


//로그인 액션에서 타입,페이로드 관리
//로그인 리듀셔에서 상태 변경하는 로직 관리
//이니셜 스테이트에서 디폴트 상태 관리
//리듀셔-인덱스에서 리듀서들 연결
//콘솔로그 정리할 것


const Container = styled.div`
    border: 0.5px solid gray;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   
`;
const MainContainer = styled.div`
    border: 0.5px solid gray;
`;
const SocialloginContainer = styled.div`
    border: 0.5px solid gray;
    
`;
const LoginContainer = styled.div`
    border: 0.5px solid gray;
`
const Button = styled.button`
    color: blue;
`;


export default function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, SetEmail] = useState(''); //단순 이메일,비밀번호 입력감지용
    const [password, SetPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const LoginState = useSelector(state=>state.LoginReducer);

    const emailHandler = (e) => {
        SetEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        SetPassword(e.target.value);
    };

    const signupHandleer = ()=>{
        history.push('/Signup')
    }

    const submitHandler_test = async (e)=>{
        e.preventDefault();
        const body = {
            email,
            password
        }
         try { // body:{ email: '123', password: '1111' } 형식으로 전송
            const response = await axios.post('http://localhost:4000/oauth/login', body, { accept: "application/json", withCredentials: true })
            const loginResult = response.data ? response.data : 'NoUser' //이거 수정 필요
            if(loginResult === 'NoUser'){
               setErrMessage('아이디 또는 비밀번호를 확인해 주세요')
            }
            //response.data에 유저정보 있으면 dispatch(setUserInfo('유저정보'))
            //로그인 응답오면 닉네임 등 양식 맞춰서 유저인포에 넣어야 함
            dispatch(setUserInfo(body));
            //로그인 응답오면 닉네임 등 양식 맞춰서 유저인포에 넣어야 함
            dispatch(setIsLogin());
            history.push('/mainpage')

            // return loginResult

        } catch (err) {
            console.log('에러발생:',err)
        }
    // console.log('LoginState:',LoginState)
    };


    return (
        <Container>
            <MainContainer>
                <div className='Logo_Space'>
                    로고이미지
                </div>
                <LoginContainer>
                    <form className='input_container' onSubmit={submitHandler_test} >
                        <input className='input_email' placeholder='이메일' onChange={emailHandler} required></input><br />
                        <input className='input_password' placeholder='비밀번호' onChange={passwordHandler} required></input><br />
                        <span>{errMessage}</span>
                        <Button type='submit'>로그인</Button>
                    </form>
                    <div>
                        <Button onClick={signupHandleer}>아이디가 없으세요? (회원가입)</Button> {/*회원가입페이지 연결 필요 */}
                    </div>
                </LoginContainer>
                <SocialloginContainer>
                    <Button>소셜로그인1</Button>
                    <Button>소셜로그인2</Button>
                    <Button>소셜로그인3</Button>
                </SocialloginContainer>
            </MainContainer>
        </Container>
    )
}