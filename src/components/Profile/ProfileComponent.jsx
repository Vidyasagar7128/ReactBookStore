import React, { useState } from 'react'
import './Profile.css'
import "antd/dist/antd.css";
import { Popover } from 'antd';
import { Radio } from 'antd';
import { AddAddressService } from '../../services/AddressServices';

function ProfileComponent({ user, UserAddress }) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobile: ''
    })
    const [addAddress, setAddAddress] = useState({
        address: '',
        city: '',
        state: '',
        type: ''
    })
    const [editUser, setEditUser] = useState({
        status: false
    })
    const [editAddress, setEditAddress] = useState({
        status: false
    })
    const EditUserDetails = () => {
        setEditUser({
            status: !editUser.status
        })
    }
    const EditUserAddress = () => {
        setEditAddress({
            status: !editAddress.status
        })
    }
    const AddressType = e => {
        console.log('radio checked', e.target.value);
    };
    const NewUserData = () => {
        console.log(userData);
    }
    const ChangeAddress = (e) => {
        console.log(e);
    }
    const ChangeCity = (e) => {
        console.log(e);
    }
    const ChangeState = (e) => {
        console.log(e);
    }
    const [showProfile, setShowProfile] = useState(false)
    const handleVisibleChange = visible => {
        setShowProfile({
            visible
        });
    };
    const NewAddress = (e) => {
        setAddAddress({ ...addAddress, address: e.target.value })
    }
    const NewCity = (e) => {
        setAddAddress({ ...addAddress, city: e.target.value })
    }
    const NewState = (e) => {
        setAddAddress({ ...addAddress, state: e.target.value })
    }
    const NewAddressType = (e) => {
        setAddAddress({ ...addAddress, type: e.target.value })
    }
    const SaveNewAddress = () => {
        AddAddressService(addAddress).then((res) => {
            console.log(res)
            UserAddress()
            setShowProfile({
                visible: false
            })
        }).catch((e) => {
            console.log(e)
        })
    }
    const content = (
        <div className="addressdetails">
            <div className='newaddressheading'>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Address Details</span>
                <button onClick={SaveNewAddress}>Save Address</button>
            </div>
            <div className="addressinputs">
                <label htmlFor="address" style={{ fontWeight: '500', fontSize: '12px' }}>Address</label>
                <textarea onChange={NewAddress} style={{ resize: 'none' }} id='address' className='fulladdress' name="comment" placeholder='Write your Address'></textarea>
            </div>
            <div className='addresscitystate'>
                <div style={{ marginRight: '5px' }}>
                    <label htmlFor="city" className='cityst'>City/Town</label>
                    <input onChange={NewCity} className='citystateinput' type="text" id='city' />
                </div>
                <div style={{ marginLeft: '5px' }}>
                    <label htmlFor="state" className='cityst'>State</label>
                    <input onChange={NewState} className='citystateinput' type="text" id='state' />
                </div>
            </div>
            <p style={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }}>Type</p>
            <div className="addresstyperadios">
                <Radio.Group onChange={NewAddressType}>
                    <Radio value='Home'>Home</Radio>
                    <Radio value='Work'>Work</Radio>
                    <Radio value='Other'>Other</Radio>
                </Radio.Group>
            </div>
        </div>
    )

    return (
        <>
            <div className='mainprofile'>
                <p className='tree'>Home/</p>
                <p className='tree'>Profile</p>
                <div className='profilesize'>
                    <div className="userdetails">
                        <div className='editpersoaldetails'>
                            <div className='persoaldetails'>
                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Personal Details</span><span style={{ marginLeft: '10px', cursor: 'pointer', color: '#A03037', fontWeight: '500' }} onClick={EditUserDetails}>{editUser.status ? 'Cancel' : 'Edit'}</span>
                            </div>
                            {editUser.status ? <button onClick={NewUserData}>Save</button> : ''}
                        </div>
                        <div className='profileform'>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id='name' value={user.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} disabled={editUser.status ? '' : 'disabled'} />
                            <label htmlFor="email">Email Id</label>
                            <input type="text" id='email' value={user.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} disabled={editUser.status ? '' : 'disabled'} />
                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="text" id='mobile' value={user.mobile} onChange={(e) => setUserData({ ...userData, mobile: e.target.value })} disabled={editUser.status ? '' : 'disabled'} />
                        </div>
                    </div>
                    <div className="addressdetails">
                        <div className='newaddressheading'>
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Address Details</span>
                            <Popover content={content}
                                trigger="click"
                                placement="right"
                                visible={showProfile.visible}
                                onVisibleChange={handleVisibleChange}>
                                <button>Add New Address</button>
                            </Popover>
                        </div>
                        <div className="editaddressbtn">
                            <div className="addresstype">
                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>1.Work</span>
                                <span style={{ cursor: 'pointer', color: '#A03037', marginLeft: '10px', fontWeight: 'bold' }} onClick={EditUserAddress}>{editAddress.status ? 'Cancel' : 'Edit'}</span>
                            </div>
                            {editAddress.status ? <button>Save</button> : ''}
                        </div>
                        <div className="addressinputs">
                            <label htmlFor="address" style={{ fontWeight: '500', fontSize: '12px' }}>Address</label>
                            <textarea onChange={ChangeAddress} style={{ resize: 'none' }} id='address' className='fulladdress' name="comment" placeholder='Write your review' value={user.address} disabled={editAddress.status ? '' : 'disabled'}></textarea>
                        </div>
                        <div className='addresscitystate'>
                            <div>
                                <label htmlFor="city" className='cityst'>City/Town</label>
                                <input onChange={ChangeCity} className='citystateinput' type="text" id='city' value={user.city} disabled={editAddress.status ? '' : 'disabled'} />
                            </div>
                            <div>
                                <label htmlFor="state" className='cityst'>State</label>
                                <input onChange={ChangeState} className='citystateinput' type="text" id='state' value={user.state} disabled={editAddress.status ? '' : 'disabled'} />
                            </div>
                        </div>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }}>Type</p>
                        <div className="addresstyperadios">
                            <Radio.Group onChange={AddressType} value={editAddress.status ? '' : user.type}>
                                <Radio value='Home'>Home</Radio>
                                <Radio value='Work'>Work</Radio>
                                <Radio value='Other'>Other</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileComponent
