import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { checkToken } from "./utilities/functions";
import { resetUser } from "./features/userSlice";

export default function AuthenticatedRoute(){
    const authToken = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        checkToken(authToken.authToken).then(res => setIsValid(true)).catch(err => setIsValid(false));
    }, []);

    if (isValid == null) return;

    if (isValid){
        return <Outlet />;
    } else {
        dispatch(resetUser());
        return <Navigate to="/login"/>
    }

}