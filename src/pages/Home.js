
import styles from "../styles/home.module.css"
import ChatContainer from "../components/ChatContainer/chatContainer";
import Sidebar from "../components/Sidebar/sidebar";


function Home(){
    return(
        <>
        <div className={styles.home}>
            <div className={styles.containers}>
                <Sidebar/>
                <ChatContainer/>
            </div>
        </div>
        </>
    )
}

export default Home;