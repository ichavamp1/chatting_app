import axios from "axios";

const server_url = "http://localhost:3001/api";

export const baseApi = axios.create({
    baseURL: server_url,
    headers: {
        "Content-Type" : "multipart/form-data"
    }
});

export const authApi = axios.create({
    baseURL: server_url,
    headers: {
        Authorization: localStorage.getItem("authToken")
    }
});