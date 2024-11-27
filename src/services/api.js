// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/", // Your base API URL
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
