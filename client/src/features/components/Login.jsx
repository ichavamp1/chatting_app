import { Suspense, useRef, useState, forwardRef } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TextField = forwardRef(function({label}, ref){
    return (
        <div className="text-field">
            <label className="input-label">{label}</label>
            <input ref={ref}/>
        </div>
    );
})

const PasswordField = forwardRef(function({label}, ref){
    const [isTextVisible, setIsTextVisible] = useState(false);
    
    return (
        <div className="password-field">
            <label className="input-label">{label}</label>
            <input ref={ref} type={isTextVisible ? "text" : "password"}/>
            {isTextVisible ? 
            <AiFillEye className="eye-icon" size="18px" onClick={() => setIsTextVisible(false)}/>
            :
            <AiFillEyeInvisible className="eye-icon" size="18px" onClick={() => setIsTextVisible(true)}/>
            }
        </div>
    );
})

export default function Login(){
    const username = useRef(""); const password = useRef("");
    const dispatch = useDispatch();
    const nav = useNavigate();
    useSelector(state => console.log(state));

    const onLogIn = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
            username: username.current.value,
            password: password.current.value
        }).then(res => {
            const sessionData = res.data;
            dispatch(setUser({userId: sessionData.userId, username: sessionData.username, authToken: sessionData.accessToken}));
            nav("/");
        }).catch(error => console.log(error.response.data.message));
    }

    return (
        <div className="page-container">
            <div id="login-page-container">
                <span className="header-text">AUTHENTICATE</span>
                <TextField ref={username} label="Username"/>
                <PasswordField ref={password} label="Password"/>
                <Suspense>
                    <button className="auth-button" onClick={onLogIn}>Sign In</button> {/*NOTE TO SELF: ADD ACTIVE/INACTIVE color to button once they have been come up with*/}
                </Suspense>
            </div>
        </div>
    )
}