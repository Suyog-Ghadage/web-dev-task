import "./users.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";
function Users() {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);

  useEffect(() => {
    const getfriends = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setFriends(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getfriends();
  }, [currentUser.uid]);

  const handleSelect=(user)=>{
    dispatch({type:"CHANGE_USER", payload:user})
  }
  return (
    <>
      <div className="chats">
        {Object.entries(friends)?.sort((a,b)=>b[1].date-a[1].date).map((friend) => (
          <div className="userchat" key={friend[0]} onClick={()=>handleSelect(friend[1].userInfo)}>
            <img src={friend[1].userInfo.photoURL} alt="profile picture" />
            <div className="userChatinfo">
              <span>{friend[1].userInfo.displayName}</span>
              <p>{friend[1]?.lastMsg}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Users;
