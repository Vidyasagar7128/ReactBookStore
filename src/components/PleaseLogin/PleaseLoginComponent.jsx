import React from 'react'
import './PleaseLogin.css'
import { useNavigate } from 'react-router-dom'
import PleaseLoginImage from '../../assets/pleaselogin.png'

function PleaseLoginComponent() {
    const navigate = useNavigate()
    return (
        <>
            <div className="mainpleaselogin">
                <span style={{ display: 'block', fontSize: '25px', fontWeight: '500' }}>PLEASE LOG IN</span>
                <span style={{ display: 'block', fontSize: '15px', color: '#9D9D9D' }}>Login to view items in your wishlist.</span>
                <img style={{ height: '72px', width: '66px' }} src={PleaseLoginImage} alt="" />
                <button onClick={() => navigate('/signin')}>LOGIN/SIGNUP</button>
            </div>
        </>
    )
}

export default PleaseLoginComponent
