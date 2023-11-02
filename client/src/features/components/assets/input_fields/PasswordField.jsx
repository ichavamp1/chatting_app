import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function PasswordField({label}){
    const [isTextVisible, setIsTextVisible] = useState(false);
    
    return (
        <div className="password-field">
            <label>{label}</label>
            <input type={isTextVisible ? "text" : "password"}/>
            {isTextVisible ? 
            <AiFillEye className="eye-icon" onClick={() => setIsTextVisible(false)}/>
            :
            <AiFillEyeInvisible className="eye-icon" onClick={() => setIsTextVisible(true)}/>
            }
        </div>
    );
}