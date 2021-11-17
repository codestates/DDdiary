//마이페이지 구현. 정보수정창 겸-> 회원탈퇴 모달창
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setIsLogin, setLogout } from "../actions/LoginAction";
import { useHistory } from 'react-router-dom';
import { Modal } from './MypageModal'
import axios from 'axios';
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    border: 0.5px solid gray;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40rem;
    width: 27rem;
`;

const UserInfoContainer = styled.div`
    border: 0.5px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 33rem;
    width: 24rem;
    font-size: small;
    & .isChangeable_true {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
                const body = {userId:id, email:email, password:changePassword, nickname:nickname};
                const passwordCheckResp = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/password`, {email,password}, { accept: "application/json", withCredentials: true })
                // const passwordCheckResp = await axios.post('http://localhost:4000/oauth/password', {email,password}, { accept: "application/json", withCredentials: true })
                console.log('passwordCheckResp내용:',passwordCheckResp)

                const changeUserData = await axios.patch(`${process.env.REACT_APP_API_URL}/users`, body, { accept: "application/json", withCredentials: true })
                // const changeUserData = await axios.patch('http://localhost:4000/users', body, { accept: "application/json", withCredentials: true })
                console.log('changeUserData내용:',changeUserData) //미완성확인
                
                const getUserData = await axios.get(`${process.env.REACT_APP_API_URL}/users/`,{ accept: "application/json", withCredentials: true })
                // const getUserData = await axios.get(`http://localhost:4000/users/`,{ accept: "application/json", withCredentials: true })
                console.log('getUserData내용:',getUserData)
                
                dispatch(setUserInfo({id, email, nickname, socialType, manager}))
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
            console.log('logoutResult:',logoutResult)
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

    return (
       
        <Container>
            {!openModal ? null : <Modal closeModal={closeModal} initializeHandler={initializeHandler} />}
            <div className='userinfo_text'>
                회원정보
            </div>
            {isChangeable ?
                <Button onClick={changeCompleteHandler}>회원정보 수정완료</Button> :
                <Button onClick={changeHandler}>회원정보 수정</Button>}
            <UserInfoContainer> 

                {!isChangeable ? 
                    <div className='isChangeable_false'>
                        <span>닉네임</span>
                        <input type='text' value={nickname} disabled></input><br />
                        <span>이메일</span>
                        <input type='text' value={email} disabled></input>
                        <div>
                            <Button onClick={logOutHandler}>로그아웃 버튼</Button>
                            <Button onClick={openModalHandler/*userDeleteHandler*/}>회원탈퇴 버튼</Button>
                        </div>
                    </div>
                    : 
                    <div className='isChangeable_true'>
                       <div>
                        <span>닉네임</span>
                        <input className='input_nickname' type='text' value={nickname} onChange={inputNicknameHandler}></input><br />
                       </div>
                        <div className='password_container'>
                            <div>
                            <span>비밀번호</span>
                            <ErrMessage>{errMessage}</ErrMessage>
                                <input className='input_password' type='password' value={password} onChange={inputPasswordHandler}></input><br />
                                <PasswordAlert>사용자 정보 수정시 비밀번호 확인이 필요합니다</PasswordAlert>
                            </div>

                        </div>
                        <div>
                        <span>비밀번호 수정</span>
                        <input className='change_password' type='password' value={changePassword} onChange={passwordChangeHandler}></input><br />
                        </div>
                        <div>
                        <span>비밀번호 수정 확인</span>
                        <input className='check_change_password' type='password' value={checkChangePassword} onChange={passwordChangeCheckHandler}></input><br />
                        </div>
                        <div>
                        <span>이메일</span>
                        <input type='text' value={email} disabled></input>
                        </div>
                    </div>
                }

            </UserInfoContainer>

        </Container>


    )
}