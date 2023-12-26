import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect({ path }){
    const nav = useNavigate();

    useEffect(() => nav(path), []);

    return null;
}