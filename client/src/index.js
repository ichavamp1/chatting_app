import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./styles/index.scss";

const routes = createBrowserRouter([
    {
        path: "*",
        element: <h1>Page not found</h1>
    },
    {
        path: "/",
        element: <h1>Hello root</h1>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={routes}/>);