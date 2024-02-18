import styles from "./sidebar.module.css"
import Navbar from "../Navbar/navbar";
import Search from "../Search/Search";
import Users from "../users/Users";
function Sidebar(){
    return(
        <>
        <div className={styles.sidebar}>
            <Navbar/>
            <Search/>
            <Users/>
        </div>
        </>
    )
}

export default Sidebar;