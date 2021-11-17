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
    // const { email } = LoginState.user
    // const { id } = LoginState.user
    const [isChangeable, setIsChangeable] = useState(false)
    const [id, setId] = useState(LoginState.user.id);
    const [email, setEmail] = useState(LoginState.user.email);
    const [nickname, setNickname] = useState(LoginState.user.nickname);
    const [manager, setManager] = useState(LoginState.user.manager);
    const [password, setPassword] = useState('');
    const [changePassword, setChangePassword] = useState('');
    const [checkChangePassword, setcheckChangePassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);

    if (LoginState.isLogin !== true) {
        console.log('로그인 해주시기 바랍니다')
        history.push('/')
    }

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
        //서버랑 통신해서 비밀번호 확인거침->맞으면 실행, 틀리면 catch에러
        //비밀번호랑 확인이랑 맞아야 함
        //지금비밀번호 비밀번호 수정에 작성된거 있으면 비밀번호 변경 ->완료

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
                
                const body = {id:id, email:email, nickname:nickname};
                const passwordCheckResp = await axios.post('http://localhost:4000/oauth/password', {email,password}, { accept: "application/json", withCredentials: true })
                console.log('내용:',passwordCheckResp.data.message)

                const changeUserData = await axios.patch('http://localhost:4000/users', body, { accept: "application/json", withCredentials: true })
                //console.log('changeUserData내용:',changeUserData) //미완성확인
                //유저정보를 서버로 보내 입력 -> 응답 뭐오는지 확인 필요. 에러 오면 그거 반영 할 수 있게
                //패치는 데이터 안돌려줌. 겟으로 다시 받아와서 최신화.
                const getUserData = await axios.get(`http://localhost:4000/users/${id}`,{ accept: "application/json", withCredentials: true })
                //실제로 응답 받으면 거기 맞춰 수정
                //const {id, email, nickname, manager} = getUserData
                dispatch(setUserInfo({id, email, nickname, manager}))
                // if (changeUserDataResp.data.data.password !== true) { //changeUserDataResp에서 찾아야 함
                //     console.log('비밀번호가 다릅니다')
                //     return;
                // }
                // const changednickname = changeUserDataResp.data.data.nickname
                // if (changednickname) { setNickName(changednickname) }


                //비번이랑 바꾼 비번이랑 동일하면 안됨
                //보내야 하는게 다 채워지지 않으면 안보내지게 해야 함.
                //리덕스에도 보내서 바꾼거 최종 적용.
                //바뀐 정보들은 일단 상태로 처리하다가 최종적으로 리덕스로 보내 다 공유 가능하게끔.
                //닉네임을 바꿨다? 그거 보내고 정보 받아야 함.
                // const changedUserInfo = { email: email, password: changePassword, nickName: nickName }
                // console.log('변경전 email:', email, 'password:', password, 'nickName:', nickName)
                // dispatch(setUserInfo(changedUserInfo));
                setIsChangeable(false);
                initializeHandler()
            }
        } 
        catch (err) {
            console.log(err)
            if(err.response.status === 401) {
                setErrMessage('비밀번호를 확인해주세요')
                return ;
            }
        }
    };
    //테스트용 지워도 무관
    // const test = useSelector(state => state.LoginReducer);
    // console.log('변경후:', test)
    //테스트용 지워도 무관

    const logOutHandler = async () => {
        try {
            const logoutResult = await axios.post('http://localhost:4000/oauth/logout', { accept: "application/json", withCredentials: true })
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

    // const userDeleteHandler = async (e) => {
    //     try {
    //         e.stopPropagation()
    //         console.log(password)
    //         const getUserData = await axios.get(`http://localhost:4000/users/${id}`,{ accept: "application/json", withCredentials: true })
    //         const body = email // 유저 누군지 알려줘야 함. 유저아이디나 토큰, 이메일로 판단
    //         //body 보내면 이상생김
    //         const logoutResult = await axios.delete('http://localhost:4000/users', { accept: "application/json", withCredentials: true })
    //         console.log(logoutResult)
    //         console.log('initializeHandler작동')
    //         initializeHandler()
    //         dispatch(setUserInfo(null))
    //         dispatch(setIsLogin(false))
    //         history.push('/');
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }



    return (
        // <div>{email ? email:'데이터 들어오지 않았음'}</div>
        <Container>
            {!openModal ? null : <Modal closeModal={closeModal} initializeHandler={initializeHandler} />}
            <div className='userinfo_text'>
                회원정보
            </div>
            {/* <Modal onClick={modalHandler} /> */}
            {isChangeable ?
                <Button onClick={changeCompleteHandler}>회원정보 수정완료</Button> :
                <Button onClick={changeHandler}>회원정보 수정</Button>}
            <UserInfoContainer> {/* isChangeable로직 정리필요.  */}

                {!isChangeable ? /*isChangeable = False */
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
                    : //isChangeable = true
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