import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  // timeout: 1000,
});

export default axiosInstance;
