import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./app/store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import "./styles/index.scss";

import Redirect from "./features/components/RedirectComponent";
import AuthenticatedRoute from './AuthenticatedRoute';
import Login from './features/components/Login';
import MainPage from './features/components/MainPage';

const persistor = persistStore(store);

export default function App(){
    return (
        <Provider store={store}>
        <PersistGate persistor={persistor}/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Redirect path={"/r"}/>}/>
                <Route path="*" element={<h1>Page not found</h1>}/>
                
                <Route path="/login" element={<Login />}/>

                {/*protected routes*/}
                <Route element={<AuthenticatedRoute />}>
                    <Route index path="/r" element={<MainPage />}/>
                    <Route path="/r/:roomId" element={<MainPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </Provider>
    );
}