// 회원가입 완료하면 보이는 페이지
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

axios.defaults.withCredentials = true;


export const PageContainer = styled.div`
  background-size: 58px;
  background-color: white;
  width: 27rem;
  height: 40rem;
  border-radius: 10px 10px 10px 10px;
  padding: 1rem;
`;

export const ConfirmBtn = styled.button`
  font-weight: bold;
  font-size: 15px;
  float: right;
  background-color: #FA5858;
  padding: 0.7rem 1.5rem;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 1rem 1.5rem;

  & .isLogin {
    background-color: #53D0DB;
    color: black;
  }
`;

export const IntroContainer = styled.div`
  background-color: white;
  display: flex;
  width: 24rem;
  border-radius: 10px;
  margin: 1rem auto;
  flex-direction:column;
`;

export const IntroductionText = styled.div`
  font-weight: bold;
  font-size: 35px;
  margin: 2rem auto;
`;

export const IntroductionTextContent = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 25rem;
`;

export const SignUpSuccess = () => {

  const [isLogin, setIsLogin] = useState(false);
  
  const LoginState = useSelector(state => state.LoginReducer);

  const loginHandler = () => {
    setIsLogin(!isLogin)
  };

  return (
    <>
        <IntroContainer>
          <IntroductionTextContent>회원가입이 완료되었습니다!</IntroductionTextContent>
          <Link exact to ="/loginpage"><ConfirmBtn onClick={loginHandler}>
        확인
        </ConfirmBtn></Link>
        </IntroContainer>
    </>
  );
};
