import axios from "axios";

const server_url = "http://localhost:3001/api";

export const baseApi = axios.create({
    baseURL: server_url,
    headers: {
        "Content-Type" : "application/json"
    }
});

export const authApi = axios.create({
    baseURL: server_url,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type" : "application/json"
    }
});