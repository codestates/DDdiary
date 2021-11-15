import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';

axios.defaults.withCredentials = true;

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

const LoginContainer = styled.div`
    border: 0.5px solid gray;
    > .input_container {
        font-weight: bold;
        font-size: 15px;
        letter-spacing:0.2rem;
      }
    & .text_line {
        text-align: left;
        font-size: 15px;
        padding: 0rem 0rem 0rem 3rem;
    }
    & .field {
        margin: 0rem 0rem 1rem 0rem;
    }
    & .warning_text {
        font-size: 13px;
        color: red;
    }
`
const Button = styled.button`
    color: blue;
`;


export default function SignUp() {

    const [userinfo, setuserinfo] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        checkbox: false,
      });
    const [errorMessage, setErrorMessage] = useState('');
    const [warningTextEmail, setwarningTextEmail] = useState('');
    const [warningTextPassword, setwarningTextPassword] = useState('');
    const [warningTextPasswordC, setwarningTextPasswordC] = useState('');
    const [warningNickname, setwarningNickname] = useState('');
    const history = useHistory();

    let passC = false;

    const handleInputValue = (key) => (e) => {
        setuserinfo({ ...userinfo, [key]: e.target.value });
        
        // 이메일 유효성검사
        if (userinfo.email !== '') {
            if (userinfo.email.includes('@') && userinfo.email.includes('.') && userinfo.email[userinfo.email.length-1] !== '.'){
                setwarningTextEmail('');
            }
            else {
                setwarningTextEmail('이메일 형식이 잘못되었습니다.');
            }
        }
        else {
            setwarningTextEmail('');
        }

        // 비밀번호 유효성검사
        const chkNum = userinfo.password.search(/[0-9]/g);
        const chkEng = userinfo.password.search(/[a-z]/ig);
        const spe = userinfo.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if (!/^[a-zA-Z0-9]{8,16}$/.test(userinfo.password) || chkNum < 0 || chkEng < 0 || spe < 0){
            if (/(\w)\1\1\1/.test(userinfo.password)){
              setwarningTextPassword("같은 문자를 4번 이상 사용하실 수 없습니다.");
            }
            else {
              setwarningTextPassword("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
            }
        }
        else {
            setwarningTextPassword('');
        }

        // 비밀번호 재확인 유효성검사
        if (userinfo.passwordConfirm !== '') {
          if (/^[a-zA-Z0-9]{8,16}$/.test(userinfo.passwordConfirm) || userinfo.passwordConfirm !== userinfo.password) {
            setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
            passC = false;
          }
          else {
            setwarningTextPasswordC('');
            passC = true;
          }
        }

        // 닉네임 유효성검사
        const chkKor = userinfo.nickname.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
        const chkEngNinck = userinfo.nickname.search(/[a-z]/ig);
        if (userinfo.nickname !== ''){
          if (!/^[a-zA-Z0-9]{2,16}$/.test(userinfo.nickname) || chkKor >= 0 || chkEngNinck >= 0 ){
            setwarningNickname('2~16자 한글 혹은 영문 대 소문자를 사용하세요.')
          }
        }
    };

    const handleSignup = () => {
      if(userinfo.email === '' || userinfo.password === '' || passC || userinfo.nickname === '' || userinfo.checkbox === false ){
        setErrorMessage('모든 항목은 필수입니다');
      }
      else{
        axios.post('https://localhost:3000/signup',userinfo,
      { withCredentials: true });
      history.push("/loginpage");
      };
    };


    return (
        <Container>
            <MainContainer>
                회원가입창
                <div className='Logo_Space'>
                    로고이미지
                </div>
                <LoginContainer>
                    <form className='input_container' onSubmit={(e) => e.preventDefault()} >
                        <div className='text_line'>이메일</div>
                        {warningTextEmail !== '' ? <div className='warning_text'>{warningTextEmail}</div> : null}
                        <input className='input_email field' placeholder='이메일'
                        type='email' onChange={handleInputValue('email')} required></input><br />

                        <div className='text_line'>비밀번호</div>
                        {warningTextPassword !== '' ? <div className='warning_text'>{warningTextPassword}</div> : null}
                        <input className='input_password' placeholder='비밀번호'
                        type='password' onChange={handleInputValue('password')} required></input><br />

                        <div className='text_line'>비밀번호 확인</div>
                        {warningTextPasswordC !== '' ? <div className='warning_text'>{warningTextPasswordC}</div> : null}
                        <input className='input_password field' placeholder='비밀번호 다시 한 번'
                        type='password' onChange={handleInputValue('passwordConfirm')} required></input><br />

                        <div className='text_line'>닉네임</div>
                        {warningNickname !== '' ? <div className='warning_text'>{warningNickname}</div> : null}
                        <input className='input_email field' placeholder='닉네임'
                        type='text' onChange={handleInputValue('nickname')} required></input><br />

                        <div className='text_line'>개인정보 수집에 동의하십니까?</div>
                        <label className='item_line'><input type="checkbox"></input> 동의</label>
                    </form>
                    <div>
                      <Button type='submit' className='field'
                      onClick={handleSignup}>회원가입</Button> {/*잘 연결되면 캘린더 페이지로 연결 필요*/}
                    </div>
                    <div className='alert-box'>{errorMessage}</div>
                </LoginContainer>
            </MainContainer>
        </Container>
    );
};

