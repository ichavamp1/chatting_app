import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoom } from "../../../roomSlice";

export default function Room(props){
    const { roomId, name, usersCount } = props;
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
            <span className="room-online text-red">0/{usersCount}</span>
        </div>
    )
}
