import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authApi } from "../../../../api";

import Room from "./Room";

export default function LeftSideBar(){
    const userState = useSelector(state => state.user);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        authApi.get(`/user_rooms/${userState.userId}`).then(res => setRooms(res.data));
    }, []);

    return (
        <div id="left-sidebar" className="sidebar">
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