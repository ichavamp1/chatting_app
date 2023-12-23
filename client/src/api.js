import axios from "axios";

const server_url = "http://localhost:3001";

export const baseApi = axios.create({
    baseURL: server_url,
    headers: {
        "Content-Length": "application/json"
    }
});

export const authApi = axios.create({
    baseURL: server_url,
    headers: {
        Authorization: localStorage.getItem("authToken")
    }
});