import "./inputchat.css";
import attach from "../../img/attachment.png";
import add from "../../img/addImg.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
function InputChat() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const[err,setError]=useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const uploadTask =await  uploadBytesResumable(ref(storage, uuid()), img);
      uploadTask.on(
        (error) => {
            // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL
              })
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId +".lastMsg"]: text,
        [data.chatId +".date"]: serverTimestamp(),

    });
    await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId +".lastMsg"]: text,
        [data.chatId +".date"]: serverTimestamp(),

    });
    
    setText("");
    setImg(null);
  };
  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Type something ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="sendIcons">
          <img src={attach} alt="attachment" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            // value={img}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={add} alt="Add img" />
          </label>
          <button onClick={handleSend}>Send</button>
          
        </div>
      </div>
    </>
  );
}
export default InputChat;
