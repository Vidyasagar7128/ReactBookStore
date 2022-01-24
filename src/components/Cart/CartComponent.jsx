import React, { useState } from 'react'
import { DeleteFromCartService, QtyIncCartService } from '../../services/CartServices'
import './Cart.css'
import { Collapse } from 'antd';
import { AddOrderService } from '../../services/OrderServices';
import OrderDone from '../../assets/orderSuccess.svg'

const { Panel } = Collapse;

function CartComponent({ cart, UserCart, user }) {
    console.log(cart)
    console.log(user)
    const [order, setOrder] = useState({
        bookId: 0,
        quantity: 0,
        price: 0,
        addressId: ''
    })
    const [CartAddressEdit, setCartAddressEdit] = useState({
        status: false
    })
    const [orderPlace, setOrderPlace] = useState(false)
    const DecQuantity = (cartid, bookid, quantity) => {
        const cartObj = { cartId: cartid, bookId: bookid, quantity: quantity - 1 }
        QtyIncCartService(cartObj).then((res) => {
            console.log(res)
            UserCart()
        }).catch((e) => {
            console.log(e)
        })
        console.log(cartObj)
    }
    const IncQuantity = (cartid, bookid, quantity) => {
        const cartObj = { cartId: cartid, bookId: bookid, quantity: quantity + 1 }
        QtyIncCartService(cartObj).then((res) => {
            console.log(res)
            UserCart()
        }).catch((e) => {
            console.log(e)
        })
        console.log(cartObj)
    }
    const RemoveFromCart = (cartId) => {
        DeleteFromCartService(cartId).then((res) => {
            console.log(res)
            UserCart()
        }).catch(() => {
            return
        })
    }
    const EditCartAddress = () => {
        setCartAddressEdit({ status: true })
    }
    const SaveCartAddress = () => {
        setCartAddressEdit({ status: false })
    }
    const AddOrder = () => {
        AddOrderService(order).then((res) => {
            console.log(res)
            setOrderPlace(true)
            UserCart()
        }).catch((e) => {
            console.log(e)
        })

    }
    return (
        <>
            {!orderPlace ? <div className='maincart'>
                <div className="cartpath">
                    <span style={{ fontSize: '12px', color: '#9D9D9D' }}>Home/</span><span style={{ fontSize: '12px' }}>My cart</span>
                    {cart.map(data => {
                        return <div className="cartitem" key={data.cartId}>
                            <p style={{ fontSize: '18px', fontWeight: '500' }}>My cart(1)</p>
                            <div className="cartcontent">
                                <div className="cartimg">
                                    <img src={data.bannerImg} alt="" style={{ height: '85px', width: '65px' }} />
                                </div>
                                <div className="cartdetails">
                                    <span style={{ display: 'block', fontSize: '14px', fontWeight: '500' }}>{data.title}</span>
                                    <span style={{ display: 'block', fontSize: '10px', color: '#9D9D9D' }}>by {data.author}</span>
                                    <span style={{ fontSize: '15px', fontWeight: '500' }}>Rs.{data.price} <strike style={{ fontSize: '10px', color: '#9D9D9D' }}>Rs.2000</strike></span>
                                    <div className="qtyandremove">
                                        <button onClick={() => DecQuantity(data.cartId, data.bookId, data.quantity)} className="minus" style={{ border: '1px solid #DBDBDB', color: data.quantity === 1 ? '#DBDBDB' : 'black', cursor: data.quantity === 1 ? 'context-menu' : 'pointer' }} disabled={data.quantity === 1 ? 'disabled' : ''}>
                                            <span className="material-icons-outlined incdec">
                                                remove
                                            </span>
                                        </button>
                                        <div className="qty">{data.quantity}</div>
                                        <button onClick={() => IncQuantity(data.cartId, data.bookId, data.quantity)} className="plus" style={{ border: '1px solid #DBDBDB', color: data.quantity === data.bookQuantity ? '#DBDBDB' : 'black', cursor: data.quantity === data.bookQuantity ? 'context-menu' : 'pointer' }} disabled={data.quantity === data.bookQuantity ? 'disabled' : ''}>
                                            <span className="material-icons-outlined incdec">
                                                add
                                            </span>
                                        </button>
                                        <button className='removefromcart' onClick={() => RemoveFromCart(data.cartId)}>Remove</button>
                                    </div>
                                </div>

                            </div>
                            <div className='placeordercart'>
                                <button onClick={() => setOrder({ ...order, bookId: data.bookId, quantity: data.quantity, price: data.price })}>PLACE ORDER</button>
                            </div>
                        </div>
                    })}
                </div>
                {order.bookId ? <Collapse style={{ marginTop: '15px' }}
                    defaultActiveKey={'0'}
                    className="site-collapse-custom-collapse">
                    <Panel header="Customer Details" key="1" className="site-collapse-custom-panel">
                        <div className="cartaddress">
                            <div className="caddheading">
                                <span>Customer Details</span>
                                <button>New Address</button>
                            </div>
                            <div className="cartnames">
                                <div className='cartaddresscitystate'>
                                    <div style={{ marginRight: '5px' }}>
                                        <label style={{ fontWeight: '500', fontSize: '12px' }} htmlFor="city" className='cartcityst'>Full Name</label>
                                        <input className='cartcitystateinput' defaultValue={user.name} type="text" id='city' />
                                    </div>
                                    <div style={{ marginLeft: '5px' }}>
                                        <label style={{ fontWeight: '500', fontSize: '12px' }} htmlFor="state" className='cartcityst'>Mobile Number</label>
                                        <input className='cartcitystateinput' defaultValue={user.mobile} type="text" id='state' />
                                    </div>
                                </div>
                            </div>
                            <div className='cartaddresstitle'>
                                <span style={{ fontSize: '17px', fontWeight: '500' }}>Work</span>{CartAddressEdit.status ? <button onClick={SaveCartAddress}>Save</button> : <button onClick={EditCartAddress}>Edit</button>}
                            </div>
                            <div className="addr">
                                <div className="addressinputs">
                                    <label htmlFor="address" style={{ fontWeight: '500', fontSize: '12px' }}>Address</label>
                                    <textarea style={{ resize: 'none' }} defaultValue={user.address} id='address' className='fulladdress' name="comment" placeholder='Write your Address' disabled={CartAddressEdit.status ? '' : 'disabled'}></textarea>
                                </div>
                            </div>
                            <div className="cartleftadd">
                                <div className='cartaddresscitystate'>
                                    <div style={{ marginRight: '5px' }}>
                                        <label style={{ fontWeight: '500', fontSize: '12px' }} htmlFor="city" className='cartcityst'>City/Town</label>
                                        <input className='cartcitystateinput' defaultValue={user.city} type="text" id='city' disabled={CartAddressEdit.status ? '' : 'disabled'} />
                                    </div>
                                    <div style={{ marginLeft: '5px' }}>
                                        <label style={{ fontWeight: '500', fontSize: '12px' }} htmlFor="state" className='cartcityst'>State</label>
                                        <input className='cartcitystateinput' defaultValue={user.state} type="text" id='state' disabled={CartAddressEdit.status ? '' : 'disabled'} />
                                    </div>
                                </div>
                            </div>
                            <div className='placeordercartcontinue'>
                                {user.addressId ? <button onClick={() => setOrder({ ...order, addressId: user.addressId })}>CONTINUE</button> : ''}
                            </div>
                        </div>
                    </Panel>
                </Collapse> : ''}
                {order.addressId ? <Collapse style={{ marginTop: '15px' }}
                    defaultActiveKey={'0'}
                    className="site-collapse-custom-collapse">
                    <Panel header="Order Summery" key="1" className="site-collapse-custom-panel">
                        <div className='placeordercartdone'>
                            <button onClick={AddOrder}>Order</button>
                        </div>
                    </Panel>
                </Collapse> : ''}
            </div> :
                <div className='orderdonemain'>
                    <div className="orderdoneimg">
                        <span>Order placed successfully</span>
                        <img style={{ height: '170px' }} src={OrderDone} alt="" />
                        <span style={{ width: '325px', textAlign: 'center' }}>hurray!!! your order is confirmed the order id is #123456 save the order id for further communication..</span>
                    </div>
                    <div className="cartsupport">
                        <div className="helpemail">
                            <div>Email Us</div>
                            <div>Contact Us</div>
                            <div>Address</div>
                        </div>
                        <div className="helpcontact">
                            <div>admin@bookstore.com</div>
                            <div>+91 8163475881</div>
                            <div>42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default CartComponent
