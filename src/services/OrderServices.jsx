import axios from "axios";

export const AddOrderService = async (order) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.post(`https://localhost:44326/api/Order/add`, order, config);
}

export const AllOrdersService = async () => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.get(`https://localhost:44326/api/Order/orders`, config);
}


