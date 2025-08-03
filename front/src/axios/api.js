import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const token = localStorage.getItem("auth_token");
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default api;
