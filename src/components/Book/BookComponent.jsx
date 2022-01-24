import React from 'react'
import './Book.css'
import { useNavigate } from "react-router-dom";

function BookComponent({ book }) {
    const navigate = useNavigate()
    const ToBookDetails = (id) => {
        navigate(`/bookdetails/${id}`)
        console.log(id)
    }
    console.log(book);
    return (
        <>
            <div className={book.quantity === 0 ? 'onebookmain outofstock' : 'onebookmain'} onClick={() => ToBookDetails(book.bookId)}>
                <div className="bookpart">
                    <img src={book.bannerImg} alt="" className='onebookimg' />
                </div>
                <div className="onebookdetails">
                    <span style={{ display: 'block', fontWeight: '500', fontSize: '14px' }}>{book.title}</span>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: '500', color: '#878787' }}>by {book.author}</span>
                    <div className='reviewrate'>
                        <div className="onerate">{parseFloat(book.rating).toFixed(1)}
                            <span style={{ fontSize: '12px', textAlign: 'center' }} className="material-icons-outlined">
                                star
                            </span>
                        </div>
                        <span style={{ fontSize: '10px', textAlign: 'center', color: '#878787', marginLeft: '4px' }}>({book.reviews})</span>
                    </div>
                    <div><span style={{ fontWeight: 'bold', fontSize: '12px' }}>{book.price}</span> <strike style={{ fontSize: '10px', color: '#878787' }}>Rs.2000</strike></div>
                </div>
            </div>
        </>
    )
}

export default BookComponent
