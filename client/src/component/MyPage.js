//마이페이지 구현. 정보수정창 겸-> 회원탈퇴 모달창
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setIsLogin, setNotToDoList, setDiary } from "../actions/LoginAction";
import { useHistory } from 'react-router-dom';
import { Modal } from './MypageModal'
import axios from 'axios';
import styled from 'styled-components'

const Container = styled.div`
   box-sizing: border-box;
    display: grid;
    grid-template-areas: 
     "nav nav nav"
     ". center ."
     "foot foot foot";
     & .logo-title {
        position: relative;
    width: 10rem;
    bottom: 0.5rem;
    ;
    }
`;

const UserInfoContainer = styled.div`
position: relative;
    margin: 0rem 0rem 1rem 0rem;
    font-size: 2rem;
    grid-area: center;
    margin: 2rem 0rem 0rem 0rem;
    line-height: 2rem;
    bottom: 1.5rem;

    > .input_container {
        font-weight: bold;
        font-size: 17px;
        letter-spacing:0.2rem;
      }

      & .text_line {
        text-align: left;
        font-size: 17px;
        padding: 0rem 0rem 0rem 3rem;
        position: relative;
        left: 0.7rem;
    }

    & .field {
        margin: 0rem 0rem 1rem 0rem;
    }

    & .mypageInput {
    width: 16rem;
    height: 2rem;
    font-size: 16px;
    }

    & .title_container {
        position: relative;
        bottom: 0.5rem;
        left: 2.5rem;
    }

    & .userinfo_submit_button {
        position: relative;
        left: 2.5rem;
    }

    &.out_button_container{
        margin-left: 2rem;
    }
`
const Button = styled.button`
    color: blue;
`;

const ErrMessage = styled.span`
    color: red;
    font-size: small;
`

const PasswordAlert = styled.span`
    
    font-size: smaller;
`


export default function MyPage(props) {
    const dispatch = useDispatch();
    const LoginState = useSelector(state => state.LoginReducer);

    const history = useHistory();
    const [isChangeable, setIsChangeable] = useState(false)
    const [id, setId] = useState(LoginState.user.id);
    const [email, setEmail] = useState(LoginState.user.email);
    const [nickname, setNickname] = useState(LoginState.user.nickname);
    const [manager, setManager] = useState(LoginState.user.manager);
    const [socialType, setSocialType] = useState(LoginState.user.socialType);
    const [password, setPassword] = useState('');
    const [changePassword, setChangePassword] = useState('');
    const [checkChangePassword, setcheckChangePassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [warningTextPassword, setwarningTextPassword] = useState('');
    const [warningTextPasswordC, setwarningTextPasswordC] = useState('');
    const [warningNickname, setwarningNickname] = useState('');
    const [valid, setvalid] = useState({
        password: false,
        passwordConfirm: false,
        nickname: false,
    });

    if (LoginState.isLogin !== true) {
        console.log('로그인 해주시기 바랍니다')
        history.push('/')
    }

    console.log(LoginState.user)

    const changeHandler = () => {
        setIsChangeable(true);

    };
    const inputPasswordHandler = (e) => {
        setPassword(e.target.value);

        
    };
    const passwordChangeHandler = (e) => {
        setChangePassword(e.target.value);
    };

    const passwordChangeCheckHandler = (e) => {
        setcheckChangePassword(e.target.value);
    }
    const inputNicknameHandler = (e) => {
        setNickname(e.target.value);
        const { value } = e.target;
        if (value !== ''){
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
        
    }

    const changePasswordChecker = (password1, password2, password3) => {
        const originalPassword = String(password1);
        const changedPassword = String(password2);
        const checkChangedPassword = String(password3);
        if (changedPassword === checkChangedPassword) {
            if (originalPassword !== changedPassword) {
                return true
            } else if (originalPassword === changedPassword) {
                return 'originalPassword === changedPassword'
            }
        } else if (changedPassword !== checkChangedPassword) {
            return 'changedPassword !== checkChangedPassword'
        }
    }

    const initializeHandler = () => {
        setPassword('')
        setChangePassword('')
        setcheckChangePassword('')
        dispatch(setDiary({}))
        dispatch(setNotToDoList({}))

    }

    const changeCompleteHandler = async () => {

        try {
            const checkeResult = changePasswordChecker(password, changePassword, checkChangePassword);
            if (checkeResult !== true) {
                if (checkeResult === 'changedPassword !== checkChangedPassword') {
                    console.log('수정된 비밀번호와 비밀번호 확인이 같아야 합니다')
                    setErrMessage('수정된 비밀번호와 비밀번호 확인이 같아야 합니다')
                    return;
                } else if (checkeResult === 'originalPassword === changedPassword') {
                    console.log('변경된 비밀번호는 원래 비밀번호와 달라야 합니다')
                    setErrMessage('변경된 비밀번호는 원래 비밀번호와 달라야 합니다')
                    return;
                }

            } else if (checkeResult === true) {
                const body = { userId: id, email: email, password: changePassword, nickname: nickname };
                const passwordCheckResp = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/password`, { email, password }, { accept: "application/json", withCredentials: true })
                // const passwordCheckResp = await axios.post('http://localhost:4000/oauth/password', {email,password}, { accept: "application/json", withCredentials: true })
                console.log('passwordCheckResp내용:', passwordCheckResp)

                const changeUserData = await axios.patch(`${process.env.REACT_APP_API_URL}/users`, body, { accept: "application/json", withCredentials: true })
                // const changeUserData = await axios.patch('http://localhost:4000/users', body, { accept: "application/json", withCredentials: true })
                console.log('changeUserData내용:', changeUserData) //미완성확인

                const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}/users/`, { accept: "application/json", withCredentials: true })
                // const getUserData = await axios.get(`http://localhost:4000/users/`,{ accept: "application/json", withCredentials: true })
                console.log('getUserData내용:', getUserData)

                dispatch(setUserInfo({ id, email, nickname, socialType, manager }))
                setIsChangeable(false);
                initializeHandler()
            }
        }
        catch (err) {
            console.log(err)
        }
    };
    const logOutHandler = async () => {
        try {
            const logoutResult = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/logout`, { accept: "application/json", withCredentials: true })
            // const logoutResult = await axios.post('http://localhost:4000/oauth/logout', { accept: "application/json", withCredentials: true })
            console.log('logoutResult:', logoutResult)
            dispatch(setUserInfo(null))
            dispatch(setIsLogin(false))
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    const openModalHandler = () => {
        setOpenModal(!openModal)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    // const handleInputValue = (key) => (e) => {
    //     setuserinfo({ ...userinfo, [key]: e.target.value });
    //   //   console.log(`${[key]}: ${e.target.value}`);

    //     const { value } = e.target;

    //     // 비밀번호 유효성검사
    //     if (key === 'password' && value !== ''){
    //       const chkNum = value.search(/[0-9]/g);
    //       const chkEng = value.search(/[a-zA-Z]/ig);
    //       const spe = value.search(/[!@#$%^*+=-]/gi);

    //       if (!/^[a-zA-Z0-9!@#$%^*+=-]{8,16}$/.test(value) || chkNum < 0 || chkEng < 0 || spe < 0){
    //         if (/(\w)\1\1\1/.test(value)){
    //           if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
    //             setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
    //           }
    //           else {
    //             setwarningTextPasswordC('');
    //           }
    //           setwarningTextPassword("같은 문자를 4번 이상 사용하실 수 없습니다.");
    //           setvalid({ ...valid, 'password': false });
    //         }
    //         else {
    //           if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
    //             setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
    //           }
    //           else {
    //             setwarningTextPasswordC('');
    //           }
    //           setwarningTextPassword("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    //           setvalid({ ...valid, 'password': false });
    //         }
    //       }
    //       else {
    //         if (/(\w)\1\1\1/.test(value)){
    //           if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
    //             setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
    //           }
    //           else {
    //             setwarningTextPasswordC('');
    //           }  
    //           setwarningTextPassword("같은 문자를 4번 이상 사용하실 수 없습니다.");
    //           setvalid({ ...valid, 'password': false });
    //         }
    //         else {
    //           if(value !== userinfo.passwordConfirm && userinfo.passwordConfirm !== '') {
    //             setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
    //           }
    //           else {
    //             setwarningTextPasswordC('');
    //           }
    //           setwarningTextPassword('');
    //           setvalid({ ...valid, 'password': true });
    //         }
    //       }
    //     }

    //     // 비밀번호 재확인 유효성검사
    //     if (key === 'passwordConfirm' && value !== '') {
    //       if (value !== userinfo.password) {
    //         setwarningTextPasswordC('비밀번호가 일치하지 않습니다.');
    //         setvalid({ ...valid, 'passwordConfirm': false });
    //       }
    //       else {
    //         setwarningTextPasswordC('');
    //         setvalid({ ...valid, 'passwordConfirm': true });
    //       }
    //     }

    //     // 닉네임 유효성검사
    //     if (key === 'nickname' && value !== ''){
    //       const chkKor = value.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
    //       const chkEngNinck = value.search(/[a-zA-Z]/ig);
    //       if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,16}$/.test(value)) {
    //         if(chkKor < 0 && chkEngNinck < 0){
    //           setwarningNickname('한글 혹은 영문 대 소문자를 사용하세요.');
    //           setvalid({ ...valid, 'nickname' : false });
    //         }
    //         else {
    //           setwarningNickname('길이는 2~16자 이내로 사용하세요.');
    //           setvalid({ ...valid, 'nickname' : false });
    //         }
    //       }
    //       else {
    //           setwarningNickname('');
    //           setvalid({ ...valid, 'nickname' : true });
    //       }
    //     }
    //   };
    console.log(LoginState)

    return (

        <Container>
            {!openModal ? null : <Modal closeModal={closeModal} initializeHandler={initializeHandler} />}
            <UserInfoContainer>
            <img className='logo-title' alt='logo' src='/로고onlyTITLE.png' />
        
            <div className='title_container'>
                <span className='userinfo_text'>회원정보</span>
                <span className='userinfo_submit_button'>
                   
                    {isChangeable ?
                        <Button onClick={changeCompleteHandler}>회원정보 수정완료</Button> :
                        <Button onClick={changeHandler}>회원정보 수정</Button>}
                </span>
            </div>
                
                <div className='input_container'>
                    <div className='text_line'>닉네임</div><span>{warningNickname}</span>
                    {!isChangeable ? <input className='input_nickname field mypageInput' type='text' value={nickname} onChange={inputNicknameHandler} disabled required></input>
                        : <input className='input_nickname field mypageInput' type='text' value={nickname} onChange={inputNicknameHandler} required></input>}<br />

                    <div className='text_line'>이메일</div>
                    {!isChangeable ? <input className='input_email field mypageInput' type='text' value={email} disabled required></input>
                        : <input className='input_email field mypageInput' type='text' value={email} disabled required></input>}<br />

                    <div className='password_container'>
                        <div className='text_line'>비밀번호</div>
                        <ErrMessage>{errMessage}</ErrMessage>
                        {!isChangeable ? <input className='input_password field mypageInput' type='password' value={password} onChange={inputPasswordHandler} disabled required></input>
                            : <input className='input_password field mypageInput' type='password' value={password} onChange={inputPasswordHandler} required></input>}<br />
                        <PasswordAlert>사용자 정보 수정시 비밀번호 확인이 필요합니다</PasswordAlert>
                    </div>

                    <div className='text_line'>비밀번호 수정</div>
                    {!isChangeable ? <input className='input_change_password field mypageInput' type='password' value={changePassword} onChange={passwordChangeHandler} disabled></input>
                        : <input className='input_change_password field mypageInput' type='password' value={changePassword} onChange={passwordChangeHandler}></input>}<br />


                    <div className='text_line'>비밀번호 수정 확인</div>
                    {!isChangeable ? <input className='input_check_password field mypageInput' type='password' value={checkChangePassword} onChange={passwordChangeCheckHandler} disabled></input>
                        : <input className='input_check_password field mypageInput' type='password' value={checkChangePassword} onChange={passwordChangeCheckHandler}></input>}<br />
                    <br />

                    <div className='out_button_container'>
                        <Button onClick={logOutHandler}>로그아웃 버튼</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={openModalHandler/*userDeleteHandler*/}>회원탈퇴 버튼</Button>
                    </div>
                </div>
            </UserInfoContainer>

        </Container>


    )
}