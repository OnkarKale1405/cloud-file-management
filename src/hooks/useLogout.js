import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
