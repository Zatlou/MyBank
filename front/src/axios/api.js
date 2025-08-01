import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// ► Quand l’app charge, on regarde le localStorage
const token = localStorage.getItem("auth_token");
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default api;
