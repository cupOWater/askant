import axios from 'axios';

const instance = axios.create(
    {
        baseURL: "http://localhost:2222",
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    }
)

instance.interceptors.request.use(
    config => {

        const token = localStorage.getItem("aToken");
        if (token) {
            config.headers["x-access-token"] = token;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {
        return response;
    },
    async function (error) {
        const originalReq = error.config;
        if (error.response.status === 401 && !originalReq._retry) {
            originalReq._retry = true;
            try {
                const aToken = await axios.post("http://localhost:2222/auth/refresh", {}, { withCredentials: true })
                localStorage.setItem("aToken", aToken.data);
                return instance(originalReq);
            } catch (err) {
                localStorage.removeItem("aToken");
            }
        }
        return Promise.reject(error);
    }
)


export default instance;
