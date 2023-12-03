import axios from "./apiConfig";

class AuthService {
    async login(email, password) {
        try {
            const response = await axios.post("/auth/login", {
                email,
                password
            })
            localStorage.setItem("aToken", response.data.accessToken);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async register(userName, email, password){
        try {
            const response = await axios.post("/auth/register", {
                userName,
                email,
                password
            })
            localStorage.setItem("aToken", response.data.accessToken);
            return response;
        } catch (error) {
            return error;
        }
    }

    logout(){
        localStorage.removeItem("aToken");
    }
}

export const authService = new AuthService();
