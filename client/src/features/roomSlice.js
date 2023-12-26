import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId: 0,
    name: ""
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.roomId = action.payload.roomId;
            state.name = action.payload.name;
        }
    }
});

export const { setRoom } = roomSlice.actions;
export default roomSlice.reducer;