import { Suspense, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../userSlice";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../../api";
import { checkToken } from "../../../utilities/functions";

import UsernameField from "./Inputs/UsernameField";
import PasswordField from "./Inputs/PasswordField";

//dlwlrma22
//Wqu6wWYE
export default function Login(){
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        checkToken(userState.authToken).then(res => {
            dispatch(setUser({userId: res.data.userId, username: res.data.username, authToken: userState.authToken}));
            nav("/r");
        }).catch(error => console.log(error));;
    }, []);

    const onLogIn = event => {
        const formData = new FormData(event.target)
        baseApi.post("/auth/login", formData).then(res => {
            const sessionData = res.data;
            dispatch(setUser({userId: sessionData.userId, username: sessionData.username, authToken: sessionData.accessToken}));
            nav("/r");
        }).catch(error => console.log(error.response.data.message));
    }

    return (
        <div className="page-container">
            <form id="login-page-container" onSubmit={onLogIn}>
                <span className="header-text">AUTHENTICATE</span>
                <UsernameField label="Username"/>
                <PasswordField label="Password"/>
                <Suspense>
                    <button className="auth-button">Sign In</button> {/*NOTE TO SELF: ADD ACTIVE/INACTIVE color to button once they have been come up with*/}
                </Suspense>
            </form>
        </div>
    )
}