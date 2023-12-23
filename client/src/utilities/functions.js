import { baseApi } from "../api";

export function checkToken(token){
    return new Promise((resolve, reject) => {
        if (token == null) reject("No token provided");

        baseApi.post(`/api/auth/is_token_valid`, {authToken: token}).then(res => resolve(res)).catch(error => reject(error));
    })

}