import axios from "axios"

export const GetBooksService = async () => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.get(`https://localhost:44326/api/Book/Books`, config);
}

export const GetOneBookService = async (id) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.get(`https://localhost:44326/api/Book/book?bookId=${id}`, config);
}
export const BooksFromCartService = async () => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.get(`https://localhost:44326/api/Cart/cart`, config);
}

export const AddReviewService = async (review) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.post(`https://localhost:44326/api/Reviews/add`, review, config);
}

export const GetReviewService = async (id) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.get(`https://localhost:44326/api/Book/reviews?bookId=${id}`, config);
}






