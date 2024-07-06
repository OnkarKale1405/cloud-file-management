import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRefreshToken, setCredentials } from "../redux/auth/authSlice";
import { useRefreshMutation } from "../redux/auth/authApiSlice";
import { useCallback } from "react";

const useRefreshToken = () => {
    const dispatch = useDispatch();
    const refreshToken = useSelector(selectCurrentRefreshToken);
    const [refreshQuery] = useRefreshMutation();

    const refresh = useCallback(async () => {
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }
        
        const response = await refreshQuery({ refreshToken }).unwrap();
        const accessToken = response.data.accessToken;
        dispatch(setCredentials({ accessToken }));
        return accessToken;
    }, [dispatch, refreshToken, refreshQuery]);

    return refresh;
};

export default useRefreshToken;