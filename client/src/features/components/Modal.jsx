export default function CreateRoom({ open, children }){
    return open && (
        <div className="modal">{children}</div>
    );
}