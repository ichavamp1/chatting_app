import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthenticatedRoute({ children }){
    const authToken = useSelector(state => state.authToken);

    return (authToken == null) ? <Navigate to="/login"/> : <Outlet />;
}