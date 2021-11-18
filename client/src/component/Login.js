import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { setUserInfo, setIsLogin, setNotToDoList, setDiary } from "../actions/LoginAction";
import axios from 'axios';
import styled from 'styled-components'
import dotenv from "dotenv";
dotenv.config();


//로그인 액션에서 타입,페이로드 관리
//로그인 리듀셔에서 상태 변경하는 로직 관리
//이니셜 스테이트에서 디폴트 상태 관리
//리듀셔-인덱스에서 리듀서들 연결
//콘솔로그 정리할 것


const Container = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-areas: 
     "nav nav nav"
     ". center ."
     "foot foot foot";
`;
const MainContainer = styled.div`
    margin: 0rem 0rem 1rem 0rem;
    font-size: 2rem;
    grid-area: center;
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
    margin: 4rem 0rem 0rem 0rem;
    line-height: 2rem;
    > .input_container {
        font-weight: bold;
        font-size: 17px;
        letter-spacing:0.2rem;
    }
    & .text_line {
        text-align: left;
        font-size: 17px;
        padding: 0rem 0rem 0rem 3rem;
    }
    & .field {
        margin: 0rem 0rem 0rem 0rem;
    }
    & .input_password {
        width: 16rem;
        height: 2rem;
        font-size: 16px;
        margin: 0rem 0rem 0.5rem 0rem;
    }
    & .input_email {
        width: 16rem;
        height: 2rem;
        font-size: 16px;
        margin: 0rem 0rem 0.5rem 0rem;
    }
`
const Button = styled.button`
    position: relative;
    color: black;
    font-size: 15px;
    min-width: 5rem;
    height: 2rem;
    margin: 1rem 0 0 0 ;
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
            //console.log(process.env.REACT_APP_API_URL)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/login`, body, { accept: "application/json", withCredentials: true })

            // const response = await axios.post('http://localhost:4000/oauth/login', body, { accept: "application/json", withCredentials: true })
            //비밀번호 안보이게
            //console.log('response:',response.data)
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
            const getDairy = await axios.get(`${process.env.REACT_APP_API_URL}/diarys`, { accept: "application/json", withCredentials: true })
            const getNotToDoList = await axios.get(`${process.env.REACT_APP_API_URL}/nottodolist`, { accept: "application/json", withCredentials: true })
            {getDairy.data.message === "myDiary not find"? dispatch(setDiary({id: id, diaryContent: null, userId: null, date: null})):dispatch(setDiary(getDairy.data))}
            {getNotToDoList.data.message === "not find notToDoList"? dispatch(setNotToDoList({id: id, content: null, checked: null, userId: null, date: null})):dispatch(setNotToDoList(getNotToDoList.data))}
            
           
            history.push('/mainpage')

            // return loginResult

        } catch (err) {
            console.log('에러발생:', err)
        }
        // console.log('LoginState:',LoginState)
    };

    const socialLoginHandler = async (e) => {
        e.preventDefault();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/oauth/google`, { accept: "application/json", withCredentials: true })
        // const response = await axios.get('http://localhost:4000/oauth/google', { accept: "application/json", withCredentials: true })
        // console.log(response)
    }


    return (
        <Container>
        <MainContainer>
            <img className='logo-title' alt='logo' src='/로고onlyTITLE.png' />
            <div>로그인</div>
            <LoginContainer>
                <form className='input_container' onSubmit={submitHandler} >
                    <input placeholder='이메일' className='input_email field' onChange={emailHandler} required></input><br />
                    <input className='input_password' type='password' placeholder='비밀번호' onChange={passwordHandler} required></input><br />
                    <span>{errMessage}</span>
                    <Button type='submit'>로그인</Button>
                </form>
                <div>
                    <Button onClick={signupHandleer}>아이디가 없으세요? (회원가입)</Button> {/*회원가입페이지 연결 필요 */}
                </div>
            </LoginContainer>
            {/* <SocialloginContainer>
                <Button onClick={socialLoginHandler} >구글로그인</Button>
            </SocialloginContainer> */}
        </MainContainer>
        </Container>
    )
}