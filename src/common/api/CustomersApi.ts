import { HttpService } from "../services/HttpService";

class CustomersApi extends HttpService {
    constructor() {
        super('/customers');
    }

    getAll() {
        return this.get('');
    }
}

const customersApi = new CustomersApi();

export default customersApi;