
import styles from "./navbar.module.css"
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


function Navbar(){
    const {currentUser}=useContext(AuthContext);
    return(
        <>
        <div className={styles.navbar}>
            <span className={styles.logo}>ChatPat</span>
            <div className={styles.user}>
                <img src={currentUser.photoURL} alt="Profile Picture"/>
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
        </>
    )
}

export default Navbar;