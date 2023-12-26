import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../userSlice";
import { useParams } from "react-router-dom";
import { authApi } from "../../api";

function TopBar(props){
    const { username } = props;
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(resetUser());
        window.location.reload();
    }

    return (
        <div id="topbar">
            <span id="username" onClick={logout}>Helloooo {username} :3333</span>
        </div>
    )
}

function Room(props){
    const { name } = props;
    return (
        <div className="room">
            <span className="room-name">{name}</span>
            <span className="room-online text-red">0/10</span>
        </div>
    )
}

function SideBar(){
    const userState = useSelector(state => state.user);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        authApi.get(`/user_rooms/${userState.userId}`).then(res => setRooms(res.data));
    }, []);

    return (
        <div id="sidebar">
            <div id="rooms-list">
                {rooms.map(room => <Room key={room.id} name={room.name}/>)}
            </div>
            <button id="create-room">Create new room</button>
        </div>
    )
}

function MessagesContainer(props){
    const { roomId } = props;

    return (
        <div id="chat">
            {roomId && `data here for room ${roomId}`}
        </div>
    )
}

export default function MainPage(){
    const userState = useSelector(state => state.user);
    const { roomId } = useParams();
    console.log(userState);
    
    return (
        <div id="main-page-container">
            <TopBar username={userState.username}/>
            <div id="main-container">
                <SideBar />
                <MessagesContainer roomId={roomId}/>
            </div>
        </div>
    )
}