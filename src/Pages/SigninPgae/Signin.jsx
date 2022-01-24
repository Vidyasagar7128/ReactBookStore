import React, { useState } from 'react'
import './Signin.css'
import LoginImg from '../../assets/LoginImg.png'
import { useNavigate } from "react-router-dom";
import { SignUpService, LoginService } from '../../services/UserServices'

function Signin() {
    const navigate = useNavigate();
    const [status, setStatus] = useState({
        login: true,
        signup: false
    })

    const nameRgx = /^[a-zA-Z\s]{1,40}$/
    const emailRgx = /^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+\.)+[a-z]{2,5}$/
    const passRgx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const mobileRgx = /^((\+91)?|91)?[789][0-9]{9}$/

    const [signupUserError, setSignupUserError] = useState({
        nameBorder: '',
        emailBorder: '',
        passwordBorder: '',
        mobileBorder: '',
    })
    const [NameSignUpError, setNameSignUpError] = useState('');
    const [EmailSignUpError, setEmailSignUpError] = useState('');
    const [PassSignUpError, setPassSignUpError] = useState('');
    const [MobileSignUpError, setMobileSignUpError] = useState('');

    const [signupUser, setSignupUser] = useState({
        name: '',
        email: '',
        password: '',
        mobile: ''
    })
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    })
    const [EmailLoginError, setEmailLoginError] = useState('')
    const [PasswordLoginError, setPasswordLoginError] = useState('')

    const ChangeStatusToLogin = () => {
        setStatus({
            login: true,
            signup: false
        })
    }
    const ChangeStatusToSignUp = () => {
        setStatus({
            login: false,
            signup: true
        })
    }
    const GetName = (e) => {
        setSignupUser({ ...signupUser, name: e.target.value })
    }
    const GetEmail = (e) => {
        setSignupUser({ ...signupUser, email: e.target.value })
    }
    const GetPassword = (e) => {
        setSignupUser({ ...signupUser, password: e.target.value })
    }
    const GetNumber = (e) => {
        setSignupUser({ ...signupUser, mobile: parseInt(e.target.value) })
    }
    const SubmitSignUpData = () => {
        console.log(signupUser)

        if (nameRgx.test(signupUser.name)) {
            setNameSignUpError('')
        } else {
            setNameSignUpError('1px solid red')
        }
        if (emailRgx.test(signupUser.email)) {
            setEmailSignUpError('')
        } else {
            setEmailSignUpError('1px solid red')
        }
        if (passRgx.test(signupUser.password)) {
            setPassSignUpError('')
        } else {
            setPassSignUpError('1px solid red')
        }
        if (mobileRgx.test(signupUser.mobile)) {
            setMobileSignUpError('')
        } else {
            setMobileSignUpError('1px solid red')
        }
        if (nameRgx.test(signupUser.name) && emailRgx.test(signupUser.email) && passRgx.test(signupUser.password) && mobileRgx.test(signupUser.mobile)) {
            SignUpService(signupUser).then((res) => {
                setStatus({
                    login: true,
                    signup: false
                })
                console.log(res)
            }).catch((e) => {
                console.log(e.response.data.errors)
            })
        }
    }
    const GetLoginId = (e) => {
        setLoginUser({ ...loginUser, email: e.target.value })
    }
    const GetLoginPassword = (e) => {
        setLoginUser({ ...loginUser, password: e.target.value })
    }
    const SubmitLogInData = () => {


        if (emailRgx.test(loginUser.email)) {
            setEmailLoginError('')
        } else {
            setEmailLoginError('1px solid red')
        }
        if (passRgx.test(loginUser.password)) {
            setPasswordLoginError('')
        } else {
            setPasswordLoginError('1px solid red')
        }
        if (emailRgx.test(loginUser.email) && passRgx.test(loginUser.password)) {
            LoginService(loginUser).then((res) => {
                localStorage.setItem('token', res.data.token)
                if (localStorage.getItem('token')) {
                    navigate("/home")
                }
                else {
                    navigate("/signin")
                }
            }).catch((e) => {
                console.log(e.response)
            })
        }
    }

    return (
        <>
            {<div className='loginbody'>
                <div className='mainlogin'>
                    <div className='leftimg'>
                        <img className='leftloginimg' src={LoginImg} alt="" style={{ height: '245px', width: '245px' }} />
                        <p style={{ fontWeight: '500', marginTop: '25px' }}>ONLINE BOOK SHOPPING</p>
                    </div>
                    <div className='rightpart'>
                        <div className='login'>
                            <div className='loginheader'>
                                <h3 style={{ fontSize: '25px', cursor: 'pointer', opacity: status.login === false ? '0.5' : '' }} onClick={ChangeStatusToLogin}>LOGIN
                                    <div style={{ height: '5px', width: '22px', backgroundColor: status.login ? '#A03037' : 'white', margin: '0 auto', borderRadius: '10px' }}></div>
                                </h3>
                                <h3 style={{ fontSize: '25px', cursor: 'pointer', opacity: status.signup === false ? '0.5' : '' }} onClick={ChangeStatusToSignUp}>SIGNUP
                                    <div style={{ height: '5px', width: '22px', backgroundColor: status.signup ? '#A03037' : 'white', margin: '0 auto', borderRadius: '10px' }}></div>
                                </h3>
                            </div>
                            <div className='logintextfields'>
                                {status.signup ? <div className='logininputs'>
                                    <label className='loginlabel' htmlFor="name">Full Name</label>
                                    <input onChange={GetName} style={{ display: 'block' }} type="text" name="name" id="name" className='emailinput' />
                                    {NameSignUpError ? <span style={{ color: 'red', fontSize: '10px', display: 'block' }}>Enter valid full name</span> : ''}
                                </div> :
                                    <div className='logininputs'>
                                        <label className='loginlabel' htmlFor="name">Email Id</label>
                                        <input onChange={GetLoginId} style={{ display: 'block', border: EmailLoginError ? EmailLoginError : null }} type="text" name="name" id="name" className='emailinput' />
                                        {EmailLoginError ? <span style={{ color: 'red', fontSize: '10px', display: 'block' }}>Invalid email Id</span> : ''}
                                    </div>
                                }
                                {status.signup ? <div className='logininputs'>
                                    <label className='loginlabel' htmlFor="email">Email Id</label>
                                    <input onChange={GetEmail} style={{ display: 'block' }} type="email" name="email" id="email" className='emailinput' />
                                    {EmailSignUpError ? <span style={{ color: 'red', fontSize: '10px', display: 'block' }}>Enter valid email</span> : ''}
                                </div> :
                                    <div className='logininputs'>
                                        <label className='loginlabel' htmlFor="password">Password</label>
                                        <input onChange={GetLoginPassword} style={{ display: 'block', border: PasswordLoginError ? PasswordLoginError : null }} type="password" name="password" id="password" className='emailinput' />
                                        <div className='forgotpass'>
                                            {PasswordLoginError ? <span style={{ color: 'red', fontSize: '10px', display: 'block' }}>Invalid password</span> : ''}
                                            <button style={{ cursor: 'pointer' }} onClick={() => navigate('/forgotpassword')}>Forgot password?</button>
                                        </div>
                                    </div>
                                }
                                {status.signup ? <div className='logininputs'>
                                    <label className='loginlabel' htmlFor="password">Password</label>
                                    <input onChange={GetPassword} style={{ display: 'block' }} type="password" name="password" id="password" className='emailinput' />
                                    {PassSignUpError ? <span style={{ color: 'red', fontSize: '10px', display: 'block' }}>Enter valid password</span> : ''}
                                </div> :
                                    <button onClick={SubmitLogInData} style={{ dispaly: 'block' }} className='signupbutton'>Login</button>
                                }
                                {status.signup ? <div className='logininputs'>
                                    <label className='loginlabel' htmlFor="number">Mobile Number</label>
                                    <input onChange={GetNumber} style={{ display: 'block' }} type="text" name="number" id="number" className='emailinput' />
                                    {MobileSignUpError ? <span style={{ color: 'red', fontSize: '10px', display: 'block' }}>Enter valid mobile number</span> : ''}
                                </div> :
                                    <p style={{ marginLeft: '130px', marginTop: '30px' }}>OR</p>
                                }
                                {status.signup ? <button onClick={SubmitSignUpData} style={{ dispaly: 'block' }} className='signupbutton'>Signup</button> :
                                    <div className='socialbtns'>
                                        <button className='socialbtn'>Facebook</button>
                                        <button style={{ marginRight: '47px' }} className='socialbtn'>Google</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            }
        </>
    )
}

export default Signin
