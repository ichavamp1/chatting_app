import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../features/userSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducers = combineReducers({
    user: userReducer
});

const persistReducers = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistReducers
})