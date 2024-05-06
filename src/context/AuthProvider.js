import { createContext, useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken"

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                if (!auth?.accessToken) {
                    await refresh();
                }
            } catch (err) {
                console.error("Error on refresh token", err);
            }
        };

        verifyRefreshToken();
    }, [auth.accessToken, refresh]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
