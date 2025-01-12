import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ROOT,
    headers: {
        "Content-Type": "application/json",
    }
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)



export default axiosInstance;