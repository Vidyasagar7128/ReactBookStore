import React, { useState } from 'react'
import './Header.css'
import Book from '../../assets/book.png'
import Cart from '../../assets/cart.png'
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { Popover } from 'antd';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { useLocation } from 'react-router-dom';

function HeaderComponent({ username, cartLength }) {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false)
    var name = username
    var names = []
    const token = localStorage.getItem('token')
    if (token && username) {
        names = name.split(' ')
    }
    const location = useLocation()
    const handleVisibleChange = visible => {
        setShowProfile({
            visible
        });
    };
    const LogOut = () => {
        localStorage.removeItem('token')
        setShowProfile({
            visible: false
        })
    }
    const ProfilePage = () => {
        navigate('/profile')
        setShowProfile({
            visible: false
        })
    }
    const LoginPage = () => {
        setShowProfile({
            visible: false
        })
        navigate('/signin')
    }
    const GoToWishlist = () => {
        navigate('/favorite')
        setShowProfile({
            visible: false
        })
    }
    const GoToOrders = () => {
        navigate('/orders')
        setShowProfile({
            visible: false
        })
    }
    const content = (
        <div>
            {token ? <span style={{ display: 'block', fontSize: '14px', fontWeight: '500' }} className="wlc">Hello {names[0]},</span>
                : <span style={{ display: 'block', fontSize: '14px', fontWeight: '500' }} className="wlc">Welcome</span>}
            {token ?
                <div className="menubtns">
                    <button className='shopbag' onClick={ProfilePage}>
                        <span style={{ fontSize: '14px' }} className="material-icons-outlined">
                            person_outline
                        </span>
                        <span style={{ marginLeft: '5px' }}>Profile</span>
                    </button>
                    <button className='shopbag' onClick={GoToOrders}>
                        <span style={{ fontSize: '14px' }} className="material-icons-outlined">
                            shopping_bag
                        </span>
                        <span style={{ marginLeft: '5px' }}>My orders</span>
                    </button>
                    <button className='favorite' onClick={GoToWishlist}>
                        <span style={{ fontSize: '14px' }} className="material-icons-outlined">
                            favorite_border
                        </span>
                        <span style={{ marginLeft: '5px' }}>Wishlist</span>
                    </button>
                    <button style={{ cursor: 'pointer' }} className='logoutbtn' onClick={LogOut}>
                        Logout
                    </button>
                </div>
                : <span style={{ fontSize: '13px', color: '#878787', display: 'block', }}>To access account and manage orders</span>}
            {token ? '' : <button className='menubtn' onClick={LoginPage}>LOGIN/SIGNUP</button>}
            {token ? '' : <div className="menubtns">
                <button className='shopbag'>
                    <span style={{ fontSize: '14px' }} className="material-icons-outlined">
                        shopping_bag
                    </span>
                    <span style={{ marginLeft: '5px' }}>My orders</span>
                </button>
                <button className='favorite'>
                    <span style={{ fontSize: '14px' }} className="material-icons-outlined">
                        favorite_border
                    </span>
                    <span style={{ marginLeft: '5px' }}>Wishlist</span>
                </button>
            </div>}
        </div>
    );
    return (
        <>
            <div className="header">
                <img src={Book} alt="" style={{ height: '23px', width: '31px', cursor: 'pointer' }} className='bookimg' onClick={() => navigate('/home')} />
                <span style={{ marginLeft: '10px', fontSize: '20px', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/home')}>Bookstore</span>
                <div className="search">
                    <span className="material-icons-outlined">search</span>
                    <input type="text" placeholder='search...' style={{ width: '100%' }} />
                </div>
                <div className='headerright'>
                    <div className='headerrighticon' style={{ cursor: 'pointer' }}>
                        <Popover content={content}
                            trigger="click"
                            visible={showProfile.visible}
                            onVisibleChange={handleVisibleChange}>
                            <button style={{ width: '70px', height: '100%', backgroundColor: '#A03037', border: 'none', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                <span style={{ display: 'block', fontSize: '20px' }} className="material-icons-outlined">
                                    person_outline
                                </span>
                                <span style={{ fontSize: '12px' }}>{token ? names[0] : 'Profile'}</span>
                            </button>
                        </Popover>
                    </div>
                    <div className='headerrighticon' style={{ cursor: 'pointer' }} onClick={() => navigate('/cart')}>
                        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                            {token ? location.pathname === '/cart' ? <img style={{ display: 'block', height: '20px' }} src={Cart} alt="" /> : <Badge color="primary" badgeContent={cartLength}>
                                <img style={{ display: 'block', height: '20px' }} src={Cart} alt="" />
                            </Badge> : <img style={{ display: 'block', height: '20px' }} src={Cart} alt="" />}
                        </Stack>
                        <span style={{ fontSize: '12px' }}>Cart</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderComponent
