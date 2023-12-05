import { Suspense, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function TextField({label}){
    return (
        <div className="text-field">
            <label className="input-label">{label}</label>
            <input />
        </div>
    );
}

function PasswordField({label}){
    const [isTextVisible, setIsTextVisible] = useState(false);
    
    return (
        <div className="password-field">
            <label className="input-label">{label}</label>
            <input type={isTextVisible ? "text" : "password"}/>
            {isTextVisible ? 
            <AiFillEye className="eye-icon" size="18px" onClick={() => setIsTextVisible(false)}/>
            :
            <AiFillEyeInvisible className="eye-icon" size="18px" onClick={() => setIsTextVisible(true)}/>
            }
        </div>
    );
}

export default function Login(){
    const [isAuth, setIsAuth] = useState(false);

    return (
        <div className="page-container">
            <div id="login-page-container">
                <span className="header-text">AUTHENTICATE</span>
                <TextField label="Username"/>
                <PasswordField label="Password"/>
                <Suspense>
                    <button className="auth-button">Sign In</button> {/*NOTE TO SELF: ADD ACTIVE/INACTIVE color to button once they have been come up with*/}
                </Suspense>
            </div>
        </div>
    )
}