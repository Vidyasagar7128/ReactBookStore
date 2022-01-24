import React, { useEffect, useState } from 'react'
import './WishList.css'
import { AllFavoriteService, RemoveFavoriteService } from '../../services/WishListService'
import { useLocation } from 'react-router-dom';
import { AllOrdersService } from '../../services/OrderServices';

function WishListComponent() {
    const [favorite, setFavorite] = useState([])
    const location = useLocation()
    console.log(location.pathname)
    useEffect(() => {
        if (location.pathname === '/favorite') {
            GetFavorite()
        } OrdersApi()
    }, [location.pathname])
    const GetFavorite = () => {
        AllFavoriteService().then((res) => {
            setFavorite(res.data.data)
            console.log(res.data.data)
        }).catch((e) => {
            console.log(e)
        })
    }
    const RemoveFromList = (id) => {
        RemoveFavoriteService(id).then((res) => {
            console.log(res)
            GetFavorite()
        }).catch((e) => {
            console.log(e)
        })
    }
    const OrdersApi = () => {
        AllOrdersService().then((res) => {
            setFavorite(res.data.response)
            console.log(res.data.response)
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <>
            <div className="mainfavorite">
                <span style={{ color: '#9D9D9D', fontSize: '12px' }}>Home/</span><span style={{ fontSize: '12px' }}>{location.pathname === '/favorite' ? 'My Wishlist' : 'My Orders'}</span>
                {location.pathname === '/favorite' ? <div className="favoritecount">
                    My Wishlist ({favorite.length})
                </div> : ''}
                {
                    favorite.map(book => {
                        return <div key={location.pathname === '/favorite' ? book.favbookId : book.orderId} className="favcontent">
                            <div className="favimg">
                                <img style={{ height: '85px', width: '65px' }} src={book.bannerImg} alt="" />
                            </div>
                            <div className="favdetails">
                                <div className='titlenremovefav'>
                                    <span style={{ display: 'block', fontSize: '18px', fontWeight: '500' }}>{book.title}</span>
                                    {location.pathname === '/favorite' ? <button onClick={() => RemoveFromList(book.favbookId)} className='favdeliconbtn'><span style={{ fontSize: '14px' }} className="material-icons-outlined">
                                        delete_outline
                                    </span></button> : <div className='dotdate'><div className='orderdot' style={{ backgroundColor: 'green' }}></div><span style={{ marginLeft: '7px', fontWeight: '500' }}>Order Placed on {new Date(book.date).toLocaleDateString()}</span></div>}
                                </div>
                                <span style={{ display: 'block', color: '#9D9D9D', fontSize: '12px' }}>{book.author}</span>
                                <span style={{ fontSize: '15px', fontWeight: '500' }}>Rs.{book.price}</span><strike style={{ paddingLeft: '10px', color: '#9D9D9D', fontSize: '12px' }}>Rs.2000</strike>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default WishListComponent
