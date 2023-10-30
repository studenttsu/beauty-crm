import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthData } from "../common/interfaces/AuthData";
import AppService from "../common/api/ApiService";
import TokenService from "../common/services/TokenService";
import PubSub from "../common/services/PubSub";

interface AuthContextValue {
    isLoggedIn: boolean;
    login: (authData: AuthData) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>(null);

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(TokenService.isTokenValid());

    const login = async (authData: AuthData) => {
        try {
            const token = await AppService.login(authData);
            TokenService.setToken(token.access_token);
            setIsLoggedIn(true);
        } catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        TokenService.removeToken();
        setIsLoggedIn(false);
    };

    const checkAuth = async () => {
        try {
            const token = await AppService.refresh();
            TokenService.setToken(token.access_token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    PubSub.on('logout', logout);

    const value: AuthContextValue = {
        isLoggedIn,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };