import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function PasswordField({label, name}){
    const [isTextVisible, setIsTextVisible] = useState(false);
    
    return (
        <div className="password-field">
            <label htmlFor={name} className="input-label">{label}</label>
            <input type={isTextVisible ? "text" : "password"} name={name}/>
            {isTextVisible ? 
            <AiFillEye className="eye-icon" size="18px" onClick={() => setIsTextVisible(false)}/>
            :
            <AiFillEyeInvisible className="eye-icon" size="18px" onClick={() => setIsTextVisible(true)}/>
            }
        </div>
    );
}