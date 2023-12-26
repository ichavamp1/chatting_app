import { useParams } from "react-router-dom";
import { authApi } from "../../../../api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Message({ content, sender }){
    return (
        <div className={`message ${sender}`}>
            {content}
        </div>
    )
}

export default function MessagesContainer(){
    const { roomId } = useParams();
    const userState = useSelector(state => state.user);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        authApi.get(`/room_messages/${roomId}`).then(res => setMessages(res.data));
    }, [roomId]);

    return (
        <div id="chat">
            {messages.map(message => (message.user_id == userState.userId) ? <Message key={message.id} content={message.content} sender={"local"}/> : <Message key={message.id} content={message.content} sender={"foreign"}/>)}
        </div>
    )
}