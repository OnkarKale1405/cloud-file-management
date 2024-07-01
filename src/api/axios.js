import axios from "axios";

export default axios.create({
    // baseURL: 'https://fantasyleague-pl7o.onrender.com/user'
    baseURL: 'https://cloud-file-management.onrender.com/api/users'
});

export const axiosPrivate = axios.create({
    // baseURL: 'https://fantasyleague-pl7o.onrender.com/user'
    baseURL:"https://cloud-file-management.onrender.com/api/users"
});
