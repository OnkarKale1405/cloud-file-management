// import axios from "../api/axios";
// // import useAuth from "../hooks/useAuth";

// const useRefreshToken = () => {
//     // const { setAuth } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('https://fantasyleague-pl7o.onrender.com/user/userLogin');
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.accesstoken);
//             return {
//                 ...prev,
//                 roles: response.data.roles,
//                 accesstoken: response.data.ascessToken
//             }
//         })
//         return response.data.accesstoken;
//     }

//     return refresh;
// }

// export default useRefreshToken;
