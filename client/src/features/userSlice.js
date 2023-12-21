import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0,
    username: "",
    authToken: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.authToken = action.payload.authToken;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;