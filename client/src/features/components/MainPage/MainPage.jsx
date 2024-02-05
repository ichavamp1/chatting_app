import { useSelector, useDispatch } from "react-redux";
import { resetUser, addRoom } from "../../userSlice";

import LeftSideBar from "./SideBar/LeftSideBar";
import RightSideBar from "./SideBar/RightSideBar";
import MessagesContainer from "./MessagesContainer/MessagesContainer";
import { useEffect, useState } from "react";
import { baseApi, authApi } from "../../../api";
import { setRoom } from "../../roomSlice";
import { useParams } from "react-router-dom";

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

export default function MainPage(){
    const userState = useSelector(state => state.user);
    const roomState = useSelector(state => state.room);
    const dispatch = useDispatch();
    const params = useParams();
    const roomId = isNaN(parseInt(params.roomId)) ? 0 : parseInt(params.roomId);

    useEffect(() => {
        console.log(userState);
        if (roomId == 0) return;
        const isInRoom = userState.roomsIn.includes(roomId);
        if (isInRoom){
            authApi.get(`/room/${roomId ?? 0}`).then(res => {
                dispatch(setRoom({roomId: res.data.id, name: res.data.name, members: res.data.members}));
            }).catch(err => console.log(err.response.data.message));
        }else{
            authApi.post(`/join_room/${roomId}`, {userId: userState.userId}).then(res => {
                dispatch(addRoom(roomId));
                // dispatch(setRoom({roomId: res.data.id, name: res.data.name, members: res.data.members}));
                console.log(res.data);
                //add to check if the room requries a apssword
            }).catch(err => console.log(err.response.data.message));
        }

    }, [params.roomId]);

    return (
        <div id="main-page-container">
            <TopBar username={userState.username}/>
            <div id="main-container">
                <LeftSideBar />
                <MessagesContainer />
                <RightSideBar />
            </div>
        </div>
    )
}