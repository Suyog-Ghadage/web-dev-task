import "./messages.css"
import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
function Message({message}){
    const {currentUser}=useContext(AuthContext);
    const {data}=useContext(ChatContext);
    const ref=useRef();
    // console.log("mesage",message)

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior: "smooth"})
    },[message]);
    return(
        <>
        <div ref={ref}
        className={`message ${message.senderId===currentUser.uid && "owner" }`}>
            <div className="chatinfo">
                <img src={message.senderId===currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="profile"/>
                <span>just now</span>
            </div>
            <div className="msg">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="image" />}
            </div>
        </div>
        </>
    )
}
export default Message;