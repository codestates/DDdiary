// 회원가입 완료 후 모달창 구현 필요
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import { SignUpSuccess } from '../pages/SignUpSuccess';

axios.defaults.withCredentials = true;

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
    border-radius: 10px;
    background-color: #ffffff;
    width: 300px;
    height: 100px;

    > div.close_btn {
      margin-top: 5px;
      cursor: pointer;
    }

    > div.desc {
      margin-top: 25px;
      color: #4000c7;
    }
`;


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


export default function SignUpComponent() {

    const [userinfo, setuserinfo] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        checkbox: false,
        manager: false
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [warningTextEmail, setwarningTextEmail] = useState('');
    const [warningTextPassword, setwarningTextPassword] = useState('');
    const [warningTextPasswordC, setwarningTextPasswordC] = useState('');
    const [warningNickname, setwarningNickname] = useState('');

    const [checkedInputs, setCheckedInputs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [valid, setvalid] = useState({
        email: false,
        password: false,
        passwordConfirm: false,
        nickname: false,
        checkbox: false
    });
    const history = useHistory();

    const handleInputValue = (key) => (e) => {
      setuserinfo({ ...userinfo, [key]: e.target.value });
    //   console.log(`${[key]}: ${e.target.value}`);

      const { value } = e.target;

        // 이메일 유효성검사
      if (key === 'email' && value !== '') {
        if (value.includes('@') && value.includes('.') && value[value.length-1] !== '.'){
          setwarningTextEmail('');
          setvalid({ ...valid, 'email': true });
        }
        else {
          setwarningTextEmail('이메일 형식이 잘못되었습니다.');
          setvalid({ ...valid, 'email': false });
        }
      }

      // 비밀번호 유효성검사
      if (key === 'password' && value !== ''){
        const chkNum = value.search(/[0-9]/g);
        const chkEng = value.search(/[a-zA-Z]/ig);
        const spe = value.search(/[!@#$%^*+=-]/gi);

        if (!/^[a-zA-Z0-9!@#$%^*+=-]{8,16}$/.test(value) || chkNum < 0 || chkEng < 0 || spe < 0){
          if (/(\w)\1\1\1/.test(value)){
            if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
              setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
            }
            else {
              setwarningTextPasswordC('');
            }
            setwarningTextPassword("같은 문자를 4번 이상 사용하실 수 없습니다.");
            setvalid({ ...valid, 'password': false });
          }
          else {
            if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
              setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
            }
            else {
              setwarningTextPasswordC('');
            }
            setwarningTextPassword("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
            setvalid({ ...valid, 'password': false });
          }
        }
        else {
          if (/(\w)\1\1\1/.test(value)){
            if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
              setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
            }
            else {
              setwarningTextPasswordC('');
            }  
            setwarningTextPassword("같은 문자를 4번 이상 사용하실 수 없습니다.");
            setvalid({ ...valid, 'password': false });
          }
          else {
            if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
              setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
            }
            else {
              setwarningTextPasswordC('');
            }
            setwarningTextPassword('');
            setvalid({ ...valid, 'password': true });
          }
        }
      }

      // 비밀번호 재확인 유효성검사
      if (key === 'passwordConfirm' && value !== '') {
        if (value !== userinfo.password) {
          setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
          setvalid({ ...valid, 'passwordConfirm': false });
        }
        else {
          setwarningTextPasswordC('');
          setvalid({ ...valid, 'passwordConfirm': true });
        }
      }

      // 닉네임 유효성검사
      if (key === 'nickname' && value !== ''){
        const chkKor = value.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
        const chkEngNinck = value.search(/[a-zA-Z]/ig);
        if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,16}$/.test(value)) {
          if(chkKor < 0 && chkEngNinck < 0){
            setwarningNickname('한글 혹은 영문 대 소문자를 사용하세요.');
            setvalid({ ...valid, 'nickname' : false });
          }
          else {
            setwarningNickname('길이는 2~16자 이내로 사용하세요.');
            setvalid({ ...valid, 'nickname' : false });
          }
        }
        else {
            setwarningNickname('');
            setvalid({ ...valid, 'nickname' : true });
        }
      }
    };

    // 체크박스 상태 반영
    const changeHandler = (checked, id) => {
      if (checked) {
        setCheckedInputs([...checkedInputs, id]);
        setuserinfo({ ...userinfo, 'checkbox': true });
        setvalid({ ...valid, 'checkbox': true });
        console.log('체크 반영 완료');
      } else {
        setCheckedInputs(checkedInputs.filter(el => el !== id));
        setuserinfo({ ...userinfo, 'checkbox': false });
        setvalid({ ...valid, 'checkbox': false });
        console.log('체크 해제 반영 완료');
      }
    };

    // 회원가입 버튼 관련 함수
    const handleSignup = async (e)=>{
      e.preventDefault();
      const body = {
        email: userinfo.email,
        password: userinfo.password,
        nickname: userinfo.nickname
      }
      try {
        if(!valid.email || !valid.password || !valid.passwordConfirm || !valid.nickname|| !valid.checkbox ){
          setErrorMessage('모든 항목은 필수입니다');
        }
        else{ // 회원가입에 필요한 정보를 다 입력했을 경우
          // setIsOpen(!isOpen);
          const resp = await axios.post('http://localhost:4000/oauth/signup',body,
          { accept: "application/json", withCredentials: true });
          // 아래는 서버에 회원정보 전송해서 받을 값에 대한 코드임.
          // TODO 받는 게 무엇이냐에 다라 수정 필요하며, 이메일이 중복되어 거부될 경우 경고 메시지 보내야 함.
          const reqResult = resp.data ? resp.data : false;
          if( reqResult.message === 'signUp!' ) { // 전달받은 값이 승인될 경우
            console.log(reqResult.message);
            setIsOpen(!isOpen);
            history.push("/signup/success");
          }
          else { // 승인되지 않을 경우 = 이메일 중복됨
            setErrorMessage('이미 가입된 이메일입니다.');
            console.log(reqResult);
          }
        };
      }
      catch (err) {
        console.log('에러발생:',err)
      }
    };


    return (
      <>
      {isOpen ? <SignUpSuccess /> :
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
                        <label className='item_line'><input type='checkbox'
                        onChange={e => {
                            changeHandler(e.currentTarget.checked, 'check');
                          }}
                          checked={checkedInputs.includes('check') ? true : false} required></input> 동의</label>
                    </form>
                    <div>
                      <Button type='submit' className='field'
                      onClick={handleSignup}>회원가입</Button>
                    </div>
                    <div className='alert-box' className='warning_text'>{errorMessage}</div>
                </LoginContainer>
            </MainContainer>
        </Container>
                        }
                        </>
    );
};

