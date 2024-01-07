import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0,
    username: "",
    pfp: "default.png",
    authToken: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.pfp = action.payload.pfp;
            state.authToken = action.payload.authToken;
            localStorage.setItem("authToken", action.payload.authToken);
        },
        resetUser: (state) => {
            state.userId = 0;
            state.username = "";
            state.pfp = "default.png";
            state.authToken = null;
        }
    }
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;