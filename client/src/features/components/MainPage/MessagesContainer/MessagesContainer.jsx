import { useParams } from "react-router-dom";
import { authApi } from "../../../../api";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";

function Message({ content, sender }){
    return (
        <div className={`message ${sender}`}>
            {content}
        </div>
    )
}

function MessageInput(){
    const messageRef = useRef();

    const inputKeyDown = (event) => {
        const content = messageRef.current.value;
        if (event.key !== "Enter") return;
        
        messageRef.current.value = "";
    }
    return (
        <div id="chat-input">
            <input ref={messageRef} onKeyDown={inputKeyDown}/>
            <button><AiOutlineSend size={20}/></button>
        </div>
    )
}

export default function MessagesContainer(){
    const { roomId } = useParams();
    const userState = useSelector(state => state.user);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId == null) setMessages([]);
        else authApi.get(`/room_messages/${roomId}`).then(res => setMessages(res.data));
    }, [roomId]);

    return (
        <div id="chat">
            <div id="messages-container">
                {messages.map(message => (message.user_id == userState.userId) ? <Message key={message.id} content={message.content} sender={"local"}/> : <Message key={message.id} content={message.content} sender={"foreign"}/>)}
            </div>
            <MessageInput />
        </div>
    )
}