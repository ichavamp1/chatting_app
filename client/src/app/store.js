import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../features/userSlice";
import roomReducer from "../features/roomSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducers = combineReducers({
    user: userReducer,
    room: roomReducer
});

const persistReducers = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistReducers
})