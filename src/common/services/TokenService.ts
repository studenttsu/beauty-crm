import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'accessToken';

class TokenService {
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    getToken(): string | undefined {
        return localStorage.getItem(TOKEN_KEY);
    }

    removeToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    isTokenValid(): boolean {
        const token = this.getToken();

        if (!token) {
            return false;
        }

        const parsedToken = jwtDecode(token);

        return tokenValid(parsedToken);
    }
}

function tokenValid(token: any = {}) {
    const now = Date.now() / 1000;
    return token.exp > now;
}

const tokenService = new TokenService();

export default tokenService;