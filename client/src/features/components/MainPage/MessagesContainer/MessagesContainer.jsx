import { useParams } from "react-router-dom";

function Message({ content, sender }){
    return (
        <div className={`message ${sender}`}>
            {content}
        </div>
    )
}

export default function MessagesContainer(){
    const { roomId } = useParams();

    return (
        <div id="chat">
            <Message content={"Hi"} sender={"local"}/>
            <Message content={"Hello worldd"} sender={"foreign"}/>
            <Message content={"BAALSSSS"} sender={"local"}/>
            <Message content={"How are you today my fellow friends"} sender={"local"}/>
            <Message content={"Hello worldd"} sender={"foreign"}/>
            <Message content={"Hello worldd"} sender={"foreign"}/>
            <Message content={"Hello worldd"} sender={"foreign"}/>
            <Message content={"Hello worldd"} sender={"foreign"}/>
            <Message content={"Hello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worldd"} sender={"foreign"}/>
            <Message content={"Hello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worldd"} sender={"foreign"}/>
            <Message content={"Hello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worldd"} sender={"foreign"}/>
            <Message content={"Hello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worldd"} sender={"foreign"}/>
            <Message content={"Hello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worldd"} sender={"foreign"}/>
            <Message content={"Hello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worldd"} sender={"foreign"}/>
            <Message content={"Hello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worlddHello worldd"} sender={"foreign"}/>
        </div>
    )
}