import { Suspense, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../userSlice";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../../api";
import { checkToken } from "../../../utilities/functions";

import UsernameField from "./Inputs/UsernameField";
import PasswordField from "./Inputs/PasswordField";
import axios from "axios";

//dlwlrma22
//Wqu6wWYE
export default function Login(){
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        checkToken(userState.authToken).then(res => {
            console.log(res);
            dispatch(setUser({userId: res.data.userId, username: res.data.username, pfp: res.data.pfp, authToken: userState.authToken, roomsIn: res.data.roomsIn}));
            nav("/r");
        }).catch(error => console.log(error));;
    }, []);

    const onLogIn = event => {
        event.preventDefault();
        const formData = new FormData(event.target);

        baseApi.post("/auth/login", formData)
            .then(res => {
            const sessionData = res.data;
                dispatch(setUser({userId: sessionData.userId, username: sessionData.username, pfp: res.data.pfp, authToken: sessionData.accessToken, roomsIn: sessionData.roomsIn}));
                nav("/r");
            }).catch(error => console.log(error));
    }

    return (
        <div className="page-container">
            <form id="login-page-container" onSubmit={onLogIn}>
                <span className="header-text">AUTHENTICATE</span>
                <UsernameField label="Username" name="username"/>
                <PasswordField label="Password" name="password"/>
                <Suspense>
                    <button className="auth-button">Sign In</button> {/*NOTE TO SELF: ADD ACTIVE/INACTIVE color to button once they have been come up with*/}
                </Suspense>
            </form>
        </div>
    )
}