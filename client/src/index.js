import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store";
import { Provider } from 'react-redux';
import "./styles/index.scss";
import Login from './features/components/Login';

const routes = createBrowserRouter([
    {
        path: "*",
        element: <h1>Page not found</h1>
    },
    {
        path: "/",
        element: <h1>Hello root</h1>
    },
    {
        path: "/register",
        element: <Login />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={routes}><Provider store={store}/></RouterProvider>);