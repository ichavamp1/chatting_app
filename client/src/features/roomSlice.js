import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId: 0,
    name: "",
    members: []
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.roomId = action.payload.roomId;
            state.name = action.payload.name;
            state.members = [...action.payload.members];
        }
    }
});

export const { setRoom } = roomSlice.actions;
export default roomSlice.reducer;