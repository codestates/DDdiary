import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';
//import { Link } from 'react-router-dom';
// import { setUserInfo, setIsLogin, setLogout } from "../actions/LoginAction";
// import axios from 'axios';
import styled from 'styled-components'
//import NavBar from './NavBar';

//로그인 액션에서 타입,페이로드 관리
//로그인 리듀셔에서 상태 변경하는 로직 관리
//이니셜 스테이트에서 디폴트 상태 관리
//리듀셔-인덱스에서 리듀서들 연결
//콘솔로그 정리할 것


const Container = styled.div`
    border: 0.5px solid gray;
    box-sizing: border-box;
    display: grid;
    grid-template-areas: 
     "nav nav nav"
     ". center ."
     "foot foot foot";
   
`;
const MainContainer = styled.div`
    border: 0.5px solid gray;
    grid-area: center;
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
    // const history = useHistory();
    // const dispatch = useDispatch();
    const [email, setEmail] = useState(''); //단순 이메일,비밀번호 입력감지용
    const [password, setPassword] = useState('');

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler_test = (e)=>{
        e.preventDefault();
        const body = {
            email,
            password
        }
        console.log(body)
    };

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     const body = {
    //         email,
    //         password
    //     }
    //     try{
    //         const response = await axios.post(/*api입력, body, { accept: "application/json", withCredentials: true }*/)
    //         console.log(response)
    //         return response
    //     } catch (err) {
    //         console.log(err)
    //     }
    //             /*이하를 트라이 캐치로 구현
    //             .then((res) => res.data)
    //             .then((data) => {
    //              if (data.message === "login successfully") {
    //                 dispatch(setIsLogin());
    //                 dispatch(setUserInfo());
    //                 dispatch(axiosData("https://localhost:5000/user/record", setRecords));
    //                 history.push("/main");
    //             } else {
    //                 history.push("/login");
    //                 alert("no member");
    //              }
    //             }); 
    //       */
    // };


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
                        <Button type='submit'>로그인</Button>
                    </form>
                    <div>
                        <Button>아이디가 없으세요? (회원가입)</Button> {/*회원가입페이지 연결 필요 */}
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