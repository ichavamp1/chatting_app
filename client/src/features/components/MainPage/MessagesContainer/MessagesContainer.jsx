import { useParams } from "react-router-dom";
import { authApi } from "../../../../api";
import { useEffect, useState, useRef, useContext, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../../../socket";

function Message({ content, sender, pfp }){
    const [contextMenu, setContextMenu] = useState({open: false, x: 0, y: 0});
    // const handleMessageContextMenu = event => {
    //     event.preventDefault();
    //     const { clientX, clientY } = event;
    //     setContextMenu({open: true, x: clientX, y: clientY});
    //     // setTimeout(() => setContextMenu(false), 1000);
    //     //TODO: add event listener to close context menu if clicked outside it
    //     console.log(event);
    // }

    return (
        <div className={`message ${sender}`}>
            <img src={`http://localhost:3001/pictures/${pfp}`} className="pfp"/>
            <div className="message-content">
                {content}
            </div>
            <div className="message-context-container" style={(() => {
                let display = "block";
                if (!contextMenu.open) display = "none";

                return {display, top: contextMenu.y, left: contextMenu.x}
            })()}>
                <button>Unsend</button>
            </div>
        </div>
    )
}

function MessageInput(){
    const messageRef = useRef();
    const userState = useSelector(state => state.user);
    const roomState = useSelector(state => state.room);

    const inputKeyDown = (event) => {
        const content = messageRef.current.value;
        if (event.key !== "Enter") return;

        socket.emit("send-message", {
            content: content,
            userId: userState.userId,
            roomId: roomState.roomId
        });
        messageRef.current.value = "";
    }
    return (
        <div id="chat-input">
            <input ref={messageRef} onKeyDown={inputKeyDown}/>
            <button>Send</button>
        </div>
    )
}

export default function MessagesContainer(){
    const { roomId } = useParams();
    const userState = useSelector(state => state.user);
    const roomState = useSelector(state => state.room);
    const [messagesList, setMessagesList] = useState([]);
    const containerRef = useRef(null);
    const [scrollBehavior, setScrollBehavior] = useState("auto");
    const dispatch = useDispatch();

    useEffect(() => {
        if (roomId == null) setMessagesList([]);
        else authApi.get(`/room_messages/${roomId}`).then(res => {
            const temp = res.data.map((item, index) => (item.user_id == userState.userId) ? <Message key={item.id} content={item.content} sender={"local"} pfp={item.pfp}/> : <Message key={item.id} content={item.content} sender={"foreign"} pfp={item.pfp}/>);
            setMessagesList(temp);
        });

        socket.off("RENDER_MESSAGE").on("RENDER_MESSAGE", data => {
            setScrollBehavior("smooth");
            setMessagesList(prevState => [...prevState, <Message key={data.messageId} content={data.content} sender={data.userId == userState.userId ? "local" : "foreign"} pfp={userState.pfp}/>])
        });
    }, [roomId]);

    useEffect(() => {
        containerRef.current?.lastChild?.scrollIntoView({behavior: scrollBehavior});
    }, [messagesList])

    useEffect(() => {
        return () => {
            socket.off("RENDER_MESSAGE");
        }
    }, [])

    return (
        <div id="chat">
            <div id="messages-container" ref={containerRef}>
                {messagesList.map(message => message)}
            </div>
            <MessageInput />
        </div>
    )
}