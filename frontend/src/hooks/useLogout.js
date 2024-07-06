import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authSlice";
import { useLogoutMutation } from "../redux/auth/authApiSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const [logoutQuery] = useLogoutMutation();

    const logout = async () => {
        try {
            await logoutQuery();
            dispatch(logOut());
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
