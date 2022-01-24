import axios from "axios";

export const AddAddressService = async (address) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.post(`https://localhost:44326/api/Address/add`, address, config);
}


