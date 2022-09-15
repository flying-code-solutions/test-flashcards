import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../../utils/auth";
import baseUrl from "../../utils/baseUrl";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = isAuthenticated();
            if (token) {
                try {
                    getUserFromToken(token);
                } catch (error) {
                    console.error("Error fetching current user: ", error);
                    removeCookie();
                }
            }
        }
        loadUserFromCookies();
    }, []);

    const getUserFromToken = async (token) => {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const { data } = await axios.get(url, payload);
        const isAdmin = data && data.role === "admin";
        setUser(data);
        setIsAdmin(isAdmin);
    } 

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);