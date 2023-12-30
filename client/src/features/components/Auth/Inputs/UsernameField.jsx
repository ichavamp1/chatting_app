export default function UsernameField({label, name}){
    return (
        <div className="text-field">
            <label htmlFor={name} className="input-label">{label}</label>
            <input name={name}/>
        </div>
    );
}