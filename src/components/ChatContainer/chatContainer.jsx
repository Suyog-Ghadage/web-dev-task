
import "./chatContainer.css"
import video from "../../img/video.png";
import more from "../../img/more.png";
import Messages from "../Messages/Messages";
import InputChat from "../InputChat/inputchat";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
// import Messages from "../Messages/Messages";
function ChatContainer(){
    const {data}=useContext(ChatContext);
    return(
        <>
        
        <div className="chatContainer">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={video} alt="videoBtn"/>
                    <img src={more} alt="more"/>
                </div>
            </div>
            <Messages/>
            <InputChat/>
        </div>
        </>
    )
}

export default ChatContainer;