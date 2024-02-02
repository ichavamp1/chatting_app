import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../userSlice";

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
        console.log(userState.roomsIn.includes(roomId))
        console.log(userState.roomsIn, roomId)

        if (roomId == 0) return;
        authApi.get(`/room/${roomId ?? 0}`).then(res => {
            dispatch(setRoom({roomId: res.data.id, name: res.data.name, members: res.data.members}))
        });
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