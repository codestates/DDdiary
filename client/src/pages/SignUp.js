//회원가입 구현. 회원가입 완료 모달창
import React from 'react'
import SignUp from '../component/SignUp'

export default function SignUpPage() { 
    console.log('페이지쪽 회원가입')
    return (
        <div>
            <div className='container'>
                <div className='content'>
                    <SignUp />
                </div>
            </div>
        </div>
    )
}