import { createContext, useContext, useState } from "react";
import { AuthData } from "../common/interfaces/AuthData";
import AppService from "../common/api/ApiService";
import TokenService from "../common/services/TokenService";
import PubSub from "../common/services/PubSub";

interface AuthContextValue {
    isLoggedIn: boolean;
    login: (authData: AuthData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null);

function AuthProvider({ children }) {
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

    PubSub.on('logout', logout);

    const value: AuthContextValue = {
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };