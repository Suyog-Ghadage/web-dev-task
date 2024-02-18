import {  useState } from "react";
import styles from "../styles/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [err, setError] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.registerWrapper}>
          <span className={styles.logo}>ChatPat</span>
          <span className={styles.title}>Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>Sign In</button>
            {err && <span>Something went wrong..</span>}
          </form>
          <p>
            you don't have an acount? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
