import "./search.css";
import searchIcon from "../../img/searchIcon.png";
import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

function Search() {
  const [userName, setuserName] = useState();
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // console.log("user", user);
  const findUser = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", userName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  //create chat room to the clicked user with us
  const handleSelectuser = async () => {
    //if chat grop is not present in firebase create group
    const combineID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineID));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineID), {
          messages: [],
        });
        //create users chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combineID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setuserName("");
    setError(true);
  };
  return (
    <>
      <div className="search">
        <div className="searchbar">
          <input
            type="text"
            placeholder="find new friend"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          ></input>
          <img src={searchIcon} alt="search-icon" onClick={findUser} />
        </div>
        {err && <span>User not Found !</span>}
        {user && (
          <div className="userChat" onClick={handleSelectuser}>
            <img src={user.photoURL} alt="profilePic" />
            <div className="userCahtInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Search;
