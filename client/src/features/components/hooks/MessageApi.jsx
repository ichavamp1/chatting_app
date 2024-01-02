import { useEffect, useState } from "react";

export default function MessageApi(props){
    const [isVisible, setIsVisible] = useState(true);
    
    return [isVisible, setIsVisible, <div className="message-api"></div>]
}