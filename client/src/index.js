import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./app/store";
import { Provider } from 'react-redux';

import "./styles/index.scss";

import AuthenticatedRoute from './AuthenticatedRoute';
import Login from './features/components/Login';
import MainPage from './features/components/MainPage/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<h1>Page not found</h1>}/>
            
            <Route path="/login" element={<Login />}/>

            {/*protected routes*/}
            <Route element={<AuthenticatedRoute />}>
                <Route path="/" element={<MainPage />}/>
            </Route>
        </Routes>
    </BrowserRouter>
</Provider>);