import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;