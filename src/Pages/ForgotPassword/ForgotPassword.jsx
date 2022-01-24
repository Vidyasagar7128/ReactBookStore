import React, { useState } from 'react'
import './ForgotPassword.css'
import Book from '../../assets/book.png'
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const SubmitEmail = () => {
        console.log(email);
    }
    return (
        <>
            <div className='mainforgotpass'>
                <p className='fpass'>Forgot your Password</p>
                <div className='forgotdetails'>
                    <p style={{ color: '#878787' }}>Enter your email address and we'll send you a link to reset your password.</p>
                    <label htmlFor="email" className='forgotemaillabel'>Email Id</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} type="text" id='email' style={{ display: 'block' }} autoComplete='off' />
                    <button className='btn' onClick={SubmitEmail}>Reset Password</button>
                </div>
                <div className='forgotfooter'>
                    <p onClick={() => navigate('/')}>CREATE ACCOUNT</p>
                </div>

            </div>
        </>
    )
}

export default ForgotPassword
