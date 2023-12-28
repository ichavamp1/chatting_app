import { useParams } from "react-router-dom";
import { authApi } from "../../../../api";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../../../socket";

function Message({ content, sender }){
    return (
        <div className={`message ${sender}`}>
            {content}
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
    const [messagesList, setMessagesList] = useState([]);
    const containerRef = useRef(null);
    const [scrollBehavior, setScrollBehavior] = useState("auto");

    useEffect(() => {
        if (roomId == null) setMessagesList([]);
        else authApi.get(`/room_messages/${roomId}`).then(res => {
            const temp = res.data.map((item, index) => (item.user_id == userState.userId) ? <Message key={item.id} content={item.content} sender={"local"}/> : <Message key={item.id} content={item.content} sender={"foreign"}/>);
            setMessagesList(temp);
        });


        socket.on("render-message", data => {
            setScrollBehavior("smooth");
            setMessagesList(prevState => [...prevState, <Message key={data.messageId} content={data.content} sender={data.userId == userState.userId ? "local" : "foreign"}/>])
        });
    }, [roomId]);

    useEffect(() => {
        containerRef.current?.lastChild?.scrollIntoView({behavior: scrollBehavior});
    }, [messagesList])

    return (
        <div id="chat">
            <div id="messages-container" ref={containerRef}>
                {messagesList.map(message => message)}
            </div>
            <MessageInput />
        </div>
    )
}