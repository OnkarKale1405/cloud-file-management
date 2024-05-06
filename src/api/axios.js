import axios from "axios";

export default axios.create({
    // baseURL: 'https://fantasyleague-pl7o.onrender.com/user'
    baseURL: 'http://localhost:8000/api/users'
});

export const axiosPrivate = axios.create({
    // baseURL: 'https://fantasyleague-pl7o.onrender.com/user'
    baseURL:"http://localhost:8000/api/users"
});
