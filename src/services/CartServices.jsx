import axios from "axios";

// export const AddToCartService = async (bookId) => {
//     let config = {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//             Accept: 'application/json, text/plain, */*'
//         }
//     }
//     return await axios.post(`https://localhost:44326/api/Favorite/add?bookId=${bookId}`, null, config);
// }

export const QtyIncCartService = async (qty) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        }
    }
    return await axios.put(`https://localhost:44326/api/Cart/increase`, qty, config);
}
export const AddToCartService = async (bookId, price) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        }
    }
    return await axios.post(`https://localhost:44326/api/Cart/add?bookId=${bookId}&price=${price}`, null, config);
}

export const DeleteFromCartService = async (cartId) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        }
    }
    return await axios.delete(`https://localhost:44326/api/Cart/remove?cartId=${cartId}`, config);
}

