import { Navigate } from 'react-router-dom';

import { AuthForm } from "../../components/AuthForm";
import { useAuth } from "../../contexts/AuthContext";

function LoginPage() {
    const { isLoggedIn, login } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <h1>LoginPage</h1>
            <AuthForm onLogin={login} />
        </>
    );
}

export default LoginPage;