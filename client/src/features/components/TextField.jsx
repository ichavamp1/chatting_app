export default function TextField({ id, name, label}){
    return (
        <div className="text-field">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={name}/>
        </div>
    )
}