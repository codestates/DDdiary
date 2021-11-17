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
    position: absolute;
    border: 0.5px solid gray;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* height: 70%; */
    /* width: 52%; */
`;
const MainContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 35rem;
    width: 25rem;
    border: 0.5px solid gray;
`;
const SocialloginContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.5px solid gray;
    height: 7rem;
    width: 25rem;
`;
const LoginContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.5px solid gray;
    height: 25rem;
    width: 25rem;
    
    & .input_container{
        font-size: small;
        
    };
    & .input_email{
       
    };
    & .input_password{
        
    };
`
const Button = styled.button`
    position: relative;
    color: blue;
`;
const LogoImageTmp = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    background-color: greenyellow;
    height: 30%;
    width: 50%;
`;


export default function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, SetEmail] = useState(''); //단순 이메일,비밀번호 입력감지용
    const [password, SetPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const LoginState = useSelector(state => state.LoginReducer);

    const emailHandler = (e) => {
        SetEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        SetPassword(e.target.value);
    };

    const signupHandleer = () => {
        history.push('/Signup')
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password
        }
        try {
            //id,email.nickname,manager
            const response = await axios.post('http://localhost:4000/oauth/login', body, { accept: "application/json", withCredentials: true })
            //비밀번호 안보이게
            console.log('response:',response.data)
            const { id, email, nickname, socialType, manager } = response.data
            const loginResult = response.data ? response.data : "Invalid email or password" //이거 수정 필요
            //data로 오는지 확인해서 바꿘야함
            if (loginResult === "Invalid email or password") {
                setErrMessage('아이디 또는 비밀번호를 확인해 주세요')
                return;
            }
            dispatch(setUserInfo({ id, email, nickname, socialType, manager }));
            //id,email.nickname,manager가 userInfo로 들어감
            dispatch(setIsLogin(true));
            history.push('/mainpage')

            // return loginResult

        } catch (err) {
            console.log('에러발생:', err)
        }
        // console.log('LoginState:',LoginState)
    };

    const socialLoginHandler = async (e) => {
        e.preventDefault();
        const response = await axios.get('http://localhost:4000/oauth/google', { accept: "application/json", withCredentials: true })
        // console.log(response)
    }


    return (
        // <Container>
        <MainContainer>
            <LogoImageTmp>
                로고이미지
            </LogoImageTmp>
            <LoginContainer>
                <form className='input_container' onSubmit={submitHandler} >
                    <div className='input_email'>
                    <span className='input_container_text'>이메일</span>
                    <input placeholder='이메일' onChange={emailHandler} required></input><br />
                    </div>
                    <div className='input_password'>
                    <span className='input_container_text'>비밀번호</span>
                    <input className='input_password' type='password' placeholder='비밀번호' onChange={passwordHandler} required></input><br />
                    </div>
                    <span>{errMessage}</span>
                    <Button type='submit'>로그인</Button>
                </form>
                <div>
                    <Button onClick={signupHandleer}>아이디가 없으세요? (회원가입)</Button> {/*회원가입페이지 연결 필요 */}
                </div>
            </LoginContainer>
            <SocialloginContainer>
                <Button onClick={socialLoginHandler} >구글로그인</Button>
            </SocialloginContainer>
        </MainContainer>
        /* </Container> */
    )
}