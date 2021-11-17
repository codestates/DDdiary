//맨처음 보이는 페이지
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setIsLogin } from "../actions/LoginAction";

axios.defaults.withCredentials = true;

export const MainContainer = styled.div`
  background-color: #D8D8D8;
  height: 55rem;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction:column;
  font-weight: bold;
  font-size: 35px;
`;

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
  background-color: #53D0DB;
  display: flex;
  width: 24rem;
  height: 33rem;
  border-radius: 10px;
  margin: 1rem auto;
  flex-direction:column;
`;

export const IntroductionText = styled.div`
  font-weight: bold;
  font-size: 35px;
  margin: 3.5rem 0rem 2rem 0rem;
`;

export const IntroductionTextContent = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 2rem;
  text-align: justify;
  margin: 0.5rem 2rem 2rem 2rem;
  & .line {
    font-weight: bold;
    text-align: center;
    font-size: 26px;
    line-height: 5rem;
  }
`;

export const Intro = () => {

  const [isLogin, setIsLogin] = useState(false);
  
  const LoginState = useSelector(state => state.LoginReducer);

  const loginHandler = () => {
    setIsLogin(!isLogin)
  };

  return (
    <>
        {LoginState.isLogin ? <ConfirmBtn className='isLogin'>
        로그인 상태입니다
        </ConfirmBtn> :
        <Link exact to ="/loginpage"><ConfirmBtn onClick={loginHandler}>
        로그인
        </ConfirmBtn></Link>}
        <IntroContainer>
          <IntroductionText>DDdiary</IntroductionText>
          <IntroductionTextContent>
          <div className='line'>일기로 기록하는 낫투두리스트</div>
          <div>DDdiary는 낫투두리스트를 기반으로 하는 일기 자동생성 기능을 제공합니다.</div>
          <div>메모처럼 간단하게 기록되지만, 약간의 동기부여 코멘트가 추가되어서 기억 한켠에 조금 더 깊은 인상을 줄 수 있습니다.
이 일기는 언젠가 오늘을 되돌아보고 싶을 때 리스트가 아니라 다짐을 떠올릴 수 있도록 도와줄 수 있습니다.</div>
            </IntroductionTextContent>
        </IntroContainer>
    </>
  );
};
