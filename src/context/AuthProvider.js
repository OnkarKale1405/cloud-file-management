import { createContext, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken"
// import useAuth from "../hooks/useAuth"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    // const PersistLogin = () => {
    //     const [isLoading, setIsLoading] = useState(true);
    //     const refresh = useRefreshToken();

    //     useEffect(() => {
    //         const verifyRefreshToken = async () => {
    //             try {
    //                 await refresh();
    //             } catch (err) {
    //                 console.error(err)
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         }

    //         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    //     }, [])
    // }

    return (
        <AuthContext.Provider value={{
            auth, setAuth
        }}>
            {/* <PersistLogin /> */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;