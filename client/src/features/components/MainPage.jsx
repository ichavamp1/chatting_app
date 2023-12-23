import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../userSlice";

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
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room /><Room />
            <Room />
            <Room /><Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
        </div>
    )
}

function Room(){
    return (
        <div className="room">
            <span className="room-name">Ballss</span>
            <span className="room-online">0/10</span>
        </div>
    )
}

function MessagesContainer(){
    return (
        <div id="chat"></div>
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