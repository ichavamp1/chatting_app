import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "../../api";
import { setRoom } from "../roomSlice";

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
    const { roomId, name } = props;
    const params = useParams();
    const nav = useNavigate(); const dispatch = useDispatch();
    const classList = (params.roomId == roomId) ? "room current" : "room";

    const navToRoom = () => {
        dispatch(setRoom({roomId: roomId, name: name}))
        nav(`/r/${roomId}`);
    }

    return (
        <div className={classList} onClick={navToRoom}>
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
                {rooms.map(room => <Room key={room.id} roomId={room.id} name={room.name}/>)}
            </div>
            <div id="room-controller">
                <button className="room-control">Create room</button>
                <button className="room-control">Join room</button>
            </div>
        </div>
    )
}

function MessagesContainer(){
    const { roomId } = useParams();

    return (
        <div id="chat">
            {roomId && `data here for room ${roomId}`}
        </div>
    )
}

export default function MainPage(){
    const userState = useSelector(state => state.user);
    
    return (
        <div id="main-page-container">
            <TopBar username={userState.username}/>
            <div id="main-container">
                <SideBar />
                <MessagesContainer />
            </div>
        </div>
    )
}