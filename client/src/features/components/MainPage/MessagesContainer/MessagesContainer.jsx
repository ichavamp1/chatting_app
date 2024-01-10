import { useParams } from "react-router-dom";
import { authApi } from "../../../../api";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../../../socket";
import { setRoom } from "../../../roomSlice";

function Message({ content, sender, pfp }){
    return (
        <div className={`message ${sender}`}>
            <img src={`http://localhost:3001/pictures/${pfp}`} className="pfp"/>
            <div className="message-content">
                {content}
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
        if (roomId == null) return;
        authApi.get(`/room/users/${roomId}`).then(res => {
            const users = res.data;
        
            dispatch(setRoom({roomId: roomId, name: roomState.name, members: [...users]}));
        });
    }, []);

    useEffect(() => {
        if (roomId == null) setMessagesList([]);
        else authApi.get(`/room_messages/${roomId}`).then(res => {
            const temp = res.data.map((item, index) => (item.user_id == userState.userId) ? <Message key={item.id} content={item.content} sender={"local"} pfp={item.pfp}/> : <Message key={item.id} content={item.content} sender={"foreign"} pfp={item.pfp}/>);
            setMessagesList(temp);
        });

        if (roomId == null) dispatch(setRoom({roomId: 0, name: "", members: []}))
        else authApi.get(`/room/users/${roomId}`).then(res => {
            const users = res.data;
        
            dispatch(setRoom({roomId: roomId, name: roomState.name, members: [...users]}));
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