import styles from "../styles/register.module.css";
import avtarImg from "../img/avtar_img.jpg";
import { auth, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [err, setError] = useState(false);
  const navigate = useNavigate();
  // event handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // console.log(e.target[2].value);
    const file = e.target[4].files[0];

    try {
      //create user authontatication/profile
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      //upload file/profilePic
      const storageRef =  ref(storage, displayName);
      const uploadTask =  uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setError(true,error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //update profile
            
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
             // Add a new document in collection "users"
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            // add a new doc in collections for userchats
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.registerWrapper}>
          <span className={styles.logo}>ChatPat</span>
          <span className={styles.title}>Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="Confirm-password" />
            <input style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={avtarImg} alt="avtar img" />
              <span>Add an Avtar</span>
            </label>
            <button type="submit">Sign Up</button>
            {err && <span>Somthing went wrong. please try again...</span>}
          </form>
          <p>
            you have an acount? <Link to="/login">Login</Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
export default Register;
