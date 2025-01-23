import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // URL de base pour l'API REST Symfony
});

export default api;
