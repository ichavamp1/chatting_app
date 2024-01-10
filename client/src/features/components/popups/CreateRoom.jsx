export default function CreateRoom({ open, setOpen }){
    return open && (
        <div id="create-room">
            <form id="container">
                <button id="close" onClick={() => setOpen(false)}>X</button>
                <input />
                <input />
                <input type="submit" />
            </form>
        </div>
    );
}