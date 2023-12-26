import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../userSlice";
import { useParams } from "react-router-dom";

import LeftSideBar from "./SideBar/LeftSideBar";
import RightSideBar from "./SideBar/RightSideBar";
import MessagesContainer from "./MessagesContainer/MessagesContainer";

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