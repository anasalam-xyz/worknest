import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Fetch user on initial load if token exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuthenticated(true); 
          fetchUser(); 
        }
    }, []);

    const fetchUser = async () => {
        try {
            const res = await API.post("/auth/profile");
            setUser(res.data);
        } catch(err) {
          console.log(err)
            logout();
        }
    };

    const login = (token) => {
        console.log(token)
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        fetchUser(); 
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
