import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const axiosInstance = axios.create({
//   baseURL: "https://b568-116-110-40-63.ngrok-free.app", // chỉnh lại cho đúng
//   timeout: 10000,
// });

const axiosInstance = axios.create({
  baseURL: "https://b2c4-171-232-109-183.ngrok-free.app/api", // chỉnh lại cho đúng
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
