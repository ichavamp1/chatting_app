import { Suspense, useRef, useState, forwardRef, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../api";
import { checkToken } from "../../utilities/functions";

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
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        checkToken(userState.authToken).then(res => {
            dispatch(setUser({userId: res.data.userId, username: res.data.username, authToken: userState.authToken}));
            nav("/");
        }).catch(error => console.log(error));;
    }, []);

    const onLogIn = () => {
        baseApi.post("/api/auth/login", {
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