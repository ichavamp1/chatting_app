import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authApi } from "../../../../api";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUnlock } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";

import Room from "./Room";
import Modal from "../../Modal";
import TextField from "../../TextField";

export default function LeftSideBar(){
    const userState = useSelector(state => state.user);
    const [rooms, setRooms] = useState([]);
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [joinRoomModal, setJoinRoomModal] = useState(false);

    useEffect(() => {
        authApi.get(`/user_rooms/${userState.userId}`).then(res => setRooms(res.data));
    }, []);

    const createRoomEvent = event => {
        event.preventDefault();

        const data = new FormData(event.target);
        data.append("adminId", userState.userId);
        
        authApi.post("/room/create", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => setCreateRoomModal(false));
    }

    return (
        <div id="left-sidebar" className="sidebar">
            <div id="rooms-list">
                {rooms.map(room => <Room key={room.id} roomId={room.id} name={room.name} usersCount={room.users_count}/>)}
            </div>
            <div id="room-controller">
                <button className="room-control" onClick={() => setCreateRoomModal(true)}>Create room</button>
                <button className="room-control" onClick={() => setJoinRoomModal(true)}>Join room</button>
            </div>
            <Modal open={createRoomModal}>
                <form id="create-room" onSubmit={createRoomEvent}>
                    <button className="close-modal" onClick={() => setCreateRoomModal(false)}>X</button>
                    <TextField id="room-name" name="name" label="Name"/>
                    <TextField id="room-password" name="password" label="Password (optional)"/>
                    <div id="actions">
                        <input onClick={() => setCreateRoomModal(false)} type="submit" value="Cancel"/>
                        <input onClick={event => event.target.actionType = "create"} type="submit" value="Create Room"/>
                    </div>
                </form>
            </Modal>
            <Modal open={joinRoomModal}>
                <div id="join-room">
                    <button className="close-modal" onClick={() => setCreateRoomModal(false)}>X</button>
                    <div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div>
                    <div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div>
                    <div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div>
                    <div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div>
                    <div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div>
                    <div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div><div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div><div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div><div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div><div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div><div className="join-room-item">
                        <div className="join-room-name">
                            <AiOutlineUnlock/> roomname
                        </div>
                        <div className="users-count">
                            <AiOutlineUser/> 20
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}