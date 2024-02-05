import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0,
    username: "",
    pfp: "default.png",
    roomsIn: [],
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
            state.roomsIn = [...action.payload.roomsIn];
            state.authToken = action.payload.authToken;
            localStorage.setItem("authToken", action.payload.authToken);
        },
        resetUser: (state) => {
            state.userId = 0;
            state.username = "";
            state.pfp = "default.png";
            state.roomsIn = [];
            state.authToken = null;
        },
        addRoom: (state, action) => {
            state.roomsIn.push(action.payload);
        }
    }
});

export const { setUser, resetUser, addRoom } = userSlice.actions;
export default userSlice.reducer;