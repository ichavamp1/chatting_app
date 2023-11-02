import TextField from "./assets/input_fields/TextField";
import PasswordField from "./assets/input_fields/PasswordField";

export default function Login(){
    return (
        <div className="page-container">
            <div id="login-page-container">
                <span className="header-text">LOGIN</span>
                <TextField label="Username"/>
                <PasswordField label="Password"/>
            </div>
        </div>
    )
}