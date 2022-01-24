import React, { useState, useEffect } from 'react'
import './BookDetails.css'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ReviewsComponent from '../Reviews/ReviewsComponent';
import { AddReviewService, GetOneBookService, GetReviewService } from '../../services/BookServices'
import { AddToFavoriteService } from '../../services/WishListService';
import { AddToCartService } from '../../services/CartServices';

function BookDetailsComponent({ UserCart }) {
    const { id } = useParams()


    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const [review, setReview] = useState({
        bookId: parseInt(id),
        rating: '',
        comment: ''
    })

    const AddtToFavorite = (bookId) => {
        AddToFavoriteService(bookId).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    }
    const AddtTocart = (bookId, price) => {
        AddToCartService(bookId, price).then((res) => {
            UserCart()
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    }
    useEffect(() => {
        AllBooks()
        AllReviews()
    }, [])
    const AllBooks = () => {
        GetOneBookService(id).then((res) => {
            setBook(res.data.data)
            console.log(res.data.data)
        }).catch((e) => {
            console.log(e)
        })
    }
    const AllReviews = () => {
        GetReviewService(id).then((res) => {
            setReviews(res.data.data)
            console.log(res.data.data)
        }).catch((e) => {
            console.log(e)
        })
    }
    const SubmitReview = () => {
        AddReviewService(review).then((res) => {
            AllReviews()
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    }

    const Ratings = (e) => {
        setReview({ ...review, rating: parseFloat(e.target.defaultValue) })
    }
    const ReviewComment = (e) => {
        setReview({ ...review, comment: e.target.value })
    }
    return (
        <>
            <div className='mainbookdetails'>
                <div>
                    <span style={{ color: '#9D9D9D' }}>Home/</span><span>Book({book.bookId})</span>
                </div>
                <div className='bookdetailspart'>
                    <div className='bookdetailsimagepart'>
                        <div className='smimages'>
                            <img src={book.bannerImg} alt="" />
                        </div>
                        <div className='lgimageandbtns'>
                            <div className='lgimage'>
                                <img src={book.bannerImg} alt="" style={{ height: '350px' }} />
                            </div>
                            <div className='bookdetailsbtns'>
                                <button onClick={() => AddtTocart(book.bookId, book.price)}>ADD TO BAG</button>
                                <button onClick={() => AddtToFavorite(book.bookId)}><span style={{ fontSize: '18px' }} className="material-icons-outlined">
                                    favorite
                                </span>WISHLIST</button>
                            </div>
                        </div>
                    </div>
                    <div className='bookdetailsotherpart'>
                        <span style={{ fontSize: '28px', display: 'block' }}>{book.title}</span>
                        <span style={{ fontSize: '18px', color: '#878787' }}>by {book.author}</span>
                        <div>
                            <div className="bookdetailsrate">{parseFloat(book.rating).toFixed(1)}<span style={{ fontSize: '10px', textAlign: 'center' }} className="material-icons-outlined">
                                star
                            </span>
                            </div>
                        </div>
                        <div className='bookdetailsprice'>
                            <span style={{ fontSize: '30px', fontWeight: '500' }}>Rs.{book.price}</span><strike style={{ marginLeft: '15px', fontSize: '15px', color: '#878787' }}>Rs.2000</strike>
                        </div>
                        <div className='bookdetaildesc'>
                            <span style={{ display: 'block', fontSize: '15px', color: '#878787' }}>Book Details</span>
                            {book.details}
                        </div>
                        <p style={{ fontSize: '18px', marginTop: '10px' }}>Customer Feedback</p>
                        <div className='detailscommentbox'>
                            <span style={{ display: 'block', marginBottom: '7px' }}>Overall rating</span>
                            <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={0} onChange={Ratings} />
                            </Stack>
                            <textarea onChange={ReviewComment} style={{ resize: 'none' }} className='bookdetailscomment' name="comment" placeholder='Write your review'></textarea>
                            <button onClick={SubmitReview} className='submitreview' style={{ float: 'right', marginTop: '7px' }}>Submit</button>
                        </div>
                        <div className='bookdetailsreviews'>
                            {reviews.map((e) => <ReviewsComponent key={e.reviewId} reviews={e} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookDetailsComponent
