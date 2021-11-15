import React, { useState } from 'react';
import styled from 'styled-components';

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
top:100%;
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
  bottom:35px;
  left:100px;
}


`;

export const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState('');
  const closeModal = props.closeModal
  const userDeleteHandler = props.userDeleteHandler
   
  
  const openModalHandler = () => {
    setIsOpen(!isOpen)
    closeModal()
  };

  const inputPasswordHandler = (e) => {
    setPassword(e.target.value);
};



  return (
    <>
      
        {!isOpen? null : 
          <ModalContainer>
          <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e)=>e.stopPropagation()}>
            
            <div>
            <span>회원탈퇴 확인</span>
            <span className="close-btn" onClick={openModalHandler}>&times;</span>
            </div>
            <div>정말로 회원 탈퇴 하시겠습니까?</div>
            <div >회원탈퇴와 동시에 모든 유저정보가 삭제되며 복구할 수 없습니다</div>
            <div className='password_submit'>
            <input className='input_password' type='text' value={password} onChange={inputPasswordHandler}></input>
              <button onClick={userDeleteHandler}>회원탈퇴</button>
            </div>
          </ModalView>
          </ModalBackdrop>
        </ModalContainer>
      }
    </>
  );
};
