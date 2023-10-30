import { AuthData } from "../interfaces/AuthData";
import { HttpService } from "../services/HttpService";

interface TokenDto {
    access_token: string;
}

class AppService extends HttpService {
    login(authData: AuthData): Promise<TokenDto> {
        return this.post('login', authData);
    }

    refresh(): Promise<TokenDto> {
        return this.get('refresh');
    }
}

const appService = new AppService();

export default appService;
