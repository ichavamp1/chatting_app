import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../userSlice";
import { useParams } from "react-router-dom";

function TopBar(props){
    const { username } = props;
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(resetUser());
    }

    return (
        <div id="topbar">
            <span id="username" onClick={logout}>Helloooo {username} :3333</span>
        </div>
    )
}

function SideBar(){
    return (
        <div id="sidebar">
            <div id="rooms-list">
                <Room />
                <Room />
                <Room />
                <Room /><Room />
                <Room />
                <Room />
                <Room /><Room />
                <Room /><Room />
                <Room /><Room />
                <Room /><Room />
                <Room /><Room />
                
            </div>
            <button id="create-room">Create new room</button>
        </div>
    )
}

function Room(){
    return (
        <div className="room">
            <span className="room-name">Ballss</span>
            <span className="room-online text-red">0/10</span>
        </div>
    )
}

function MessagesContainer(props){
    const { roomId } = props;

    return (
        <div id="chat">
            {roomId && "data here"}
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