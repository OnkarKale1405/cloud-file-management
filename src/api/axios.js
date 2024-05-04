import axios from "axios";

export default axios.create({
    baseURL: 'https://fantasyleague-pl7o.onrender.com/user'
});

export const axiosPrivate = axios.create({
    baseURL: 'https://fantasyleague-pl7o.onrender.com/user'
});
