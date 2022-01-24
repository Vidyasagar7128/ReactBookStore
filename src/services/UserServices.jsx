import axios from 'axios'

export const SignUpService = async (user) => {
    return await axios.post(`https://localhost:44326/api/User/SignUp`, user);
}
export const LoginService = async (user) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.post(`https://localhost:44326/api/User/Login`, user, config);
}
export const GetAddressService = async () => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.get(`https://localhost:44326/api/User/useraddress`, config);
}