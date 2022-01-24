import axios from "axios"

export const AddToFavoriteService = async (bookId) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        }
    }
    console.log(config)
    return await axios.post(`https://localhost:44326/api/Favorite/add?bookId=${bookId}`, null, config);
}
export const AllFavoriteService = async () => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        }
    }
    console.log(config)
    return await axios.get(`https://localhost:44326/api/Favorite/all`, config);
}
export const RemoveFavoriteService = async (id) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        }
    }
    console.log(config)
    return await axios.delete(`https://localhost:44326/api/Favorite/delete?wishId=${id}`, config);
}






