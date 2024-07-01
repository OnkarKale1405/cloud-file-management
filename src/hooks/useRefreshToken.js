import axios from "../api/axios";
import useAuth from "./useAuth";

const RefreshUrl= "https://cloud-file-management.onrender.com/api/users/refresh-token"
const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(RefreshUrl);
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accesstoken);
            return {
                ...prev,
                roles: response.data.roles,
                accesstoken: response.data.ascessToken
            }
        })
        return response.data.accesstoken;
    }

    return refresh;
}

export default useRefreshToken;
