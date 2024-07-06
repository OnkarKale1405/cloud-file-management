import { Outlet } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/auth/authSlice";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const auth = useSelector(selectCurrentUser);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!auth?.token) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [auth, refresh]);

    useEffect(() => {
        console.log(`isLoding ${isLoading}`);
        console.log(`at: ${JSON.stringify(auth.token)}`);
    },[isLoading])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    );
};

export default PersistLogin;