import { Suspense, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../userSlice";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../../api";

import UsernameField from "./Inputs/UsernameField";
import PasswordField from "./Inputs/PasswordField";

export default function Register(){
    const userState = useSelector(state => state.user);
    const form = useRef(null);

    const onLogIn = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log([...data]);

        baseApi.post("/auth/register", data, {headers: {"Content-Type": "multipart/form-data"}});
    }

    return (
        <div className="page-container">
            <form id="login-page-container" ref={form} onSubmit={onLogIn} encType="multipart/form-data">
                <span className="header-text">REGISTER</span>
                <UsernameField label="Username" name="username"/>
                <PasswordField label="Password" name="password"/>
                <PasswordField label="Password" name="rep_pass"/>
                <input type="file" name="pfp"/>
                <Suspense>
                    <button type="submit" className="auth-button">Create Account</button> {/*NOTE TO SELF: ADD ACTIVE/INACTIVE color to button once they have been come up with*/}
                </Suspense>
            </form>
        </div>
    )
}