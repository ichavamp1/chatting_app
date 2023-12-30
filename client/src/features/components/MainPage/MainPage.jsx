import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../userSlice";

import LeftSideBar from "./SideBar/LeftSideBar";
import RightSideBar from "./SideBar/RightSideBar";
import MessagesContainer from "./MessagesContainer/MessagesContainer";
import { useEffect, useState } from "react";
import { baseApi } from "../../../api";

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
    const [images, setImages] = useState([]);
    const userState = useSelector(state => state.user);
    const roomState = useSelector(state => state.room);

    useEffect(() => {
        baseApi.get("/users").then(res => setImages(res.data.map(user => user.pfp)));
    }, []);
    
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