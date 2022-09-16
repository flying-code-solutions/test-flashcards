import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { handleLogin, isAuthenticated, removeCookie } from "../../utils/auth";
import baseUrl from "../../utils/baseUrl";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

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
        const syncLogout = event => {
            if (event.key === "logout") {
                setUser("");
                setIsAdmin(false);
                router.push("/");
            }
        }
        window.addEventListener("storage", syncLogout);
        loadUserFromCookies();
        return function cleanup() {
            window.removeEventListener("storage", syncLogout);
        }
    }, []);

    async function login(user) {
        const url = `${baseUrl}/api/login`;
        const payload = { ...user };
        const { data: token } = await axios.post(url, payload);
        await getUserFromToken(token);
        handleLogin(token);
    }

    const getUserFromToken = async (token) => {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const { data } = await axios.get(url, payload);
        const isAdmin = data && data.role === "admin";
        setUser(data);
        setIsAdmin(isAdmin);
    } 

    function logout() {
        setUser("");
        setIsAdmin(false);
        removeCookie();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);