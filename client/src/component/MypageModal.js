import React, { useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setIsLogin } from "../actions/LoginAction";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//디자인페이지. 기능은 마이페이지에서



export const ModalContainer = styled.div`
  display:grid;
  justify-items: center;
  //justify-content:center;
  //align-items:center;
  //align-self:center;
  //align-content:center;
  
`;

export const ModalBackdrop = styled.div`
 position:absolute;
 top:0;
 left:0;
 z-index: 999;
 background-color: rgba(117, 190, 218, 0.3);
 
 width: 100%;
 height: 100%;
 
`;


export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`

position:absolute;
top:50%;
left:50%;
transform: translate(-50%, -50%);
background-color: white;
padding:40px;
width: 10em;
height: 10em;
border-radius: 10px;
text-align: center;
border: solid 1px black;

.close-btn{
  position:relative;
  color:red;
  bottom:3rem;
  left:6rem;
}

& .modal_text{
  position:relative;
  bottom: 3rem;
  font-size:1.5rem;
  line-height:7rem
  
}
& .modal_title{
  position:relative;
  bottom:2rem;
}

& .long{
  position:relative;
  line-height:2.5rem
}

& .modal_text_password{
  position:relative;
  font-size:2rem;
}

& .input_password{
  position:relative;
  right:0.5rem;
  height: 18px;
  bottom:1px
}


`;

export const Modal = (props) => {
  const LoginState = useSelector(state => state.LoginReducer);
  const closeModal = props.closeModal
  const initializeHandler = props.initializeHandler
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [id, setId] = useState(LoginState.user.id);
  const [email, setEmail] = useState(LoginState.user.email);

  



  const openModalHandler = () => {
    setIsOpen(!isOpen)
    closeModal()
  };

  const inputPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const userDeleteHandler = async (e) => {

    try {
      e.stopPropagation()

      const passwordCheckResp = await axios.post('http://localhost:4000/oauth/password', { email, password }, { accept: "application/json", withCredentials: true })
      if (passwordCheckResp.message === "Invalid password") {
        console.log('비밀번호를 확인해주세요')
        return;
      }
      //아직 서버 미구현

      //const getUserData = await axios.get(`http://localhost:4000/users/${id}`,{ accept: "application/json", withCredentials: true })
      const body = { email: email, password: password } // 유저 누군지 알려줘야 함. 유저아이디나 토큰, 이메일로 판단
      //body 보내면 이상생김
      const userDeleteResult = await axios.delete(`http://localhost:4000/users/${id}`, body, { accept: "application/json", withCredentials: true })
      console.log('userDeleteResult_detail:', userDeleteResult)
      initializeHandler()
      dispatch(setUserInfo(null))
      dispatch(setIsLogin(false))
      history.push('/');
    } catch (err) {
      console.log(err)
      if (err.response.status === 401) {
        setErrMessage('비밀번호를 확인해주세요')
        return;
      }
    }
  }




  return (
    <>

      {!isOpen ? null :
        <ModalContainer>
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>

              <div>
                <span className='modal_title'>회원탈퇴 확인</span>
                <span className="close-btn" onClick={openModalHandler}>&times;</span>
              </div>
              <div className='modal_text'>정말로 회원 탈퇴 하시겠습니까?</div>
              <div className='modal_text long'>회원탈퇴와 동시에 모든 유저정보가 삭제되며 복구할 수 없습니다</div>
              <div className='password_submit'>
              <div className='modal_text_password'>비밀번호 확인</div>
              <div className='submit_container'>
               <input className='input_password' type='text' value={password} onChange={inputPasswordHandler}></input>
               <button onClick={userDeleteHandler}>회원탈퇴</button>
              </div>
               
              </div>
            </ModalView>
          </ModalBackdrop>
        </ModalContainer>
      }
    </>
  );
};
