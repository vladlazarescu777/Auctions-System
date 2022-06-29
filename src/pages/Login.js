import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Navigate} from "react-router-dom";
import validator from "validator";
import background from "../register.jpg";
import { useNavigate } from "react-router-dom";

import App from "../App";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { getDatabase, ref, set } from 'firebase/database';
  import { getAuth } from "firebase/auth"
  import "../App.css";
  import { auth } from "../fire";

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);

    });

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
    };

    // const login = async () => {
    //     console.log('cristos')
    //     try {
    //     const user = await signInWithEmailAndPassword(
    //         auth,
    //         loginEmail,
    //         loginPassword
    //     );
    //     console.log(user);
    //     } catch (error) {
    //     if (validator.isEmail(loginEmail)) {
    //         if (error.message == "Firebase: Error (auth/user-not-found).") {
    //             setErrorMessage("user not registered yet.");
    //         }
    //         if (error.message == "Firebase: Error (auth/wrong-password).") {
    //             setErrorMessage("wrong password");
    //         }
    //     } else {
    //         setErrorMessage("invalid email");
    //     }
    //     }

    //     console.log('cristos2');
    //     //let email = document.getElementById("login-email").value;
    //     //console.log(email);
    //     //console.log(loginEmail);
    // };

    const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/auctions");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    
  };

    return (
    <div>
        <div className="Login">
            <h3>
                Login page
            </h3>

          <div>
            <h3> Login </h3>
                <input
                id="login-email"
                className="emailbox"
                placeholder="Email..."
                onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
                />
                <input
                className="passwordbox"
                placeholder="Password..."
                type="password"
                onChange={(event) => {
                    setLoginPassword(event.target.value);
                }}
                />

                <button className="button" onClick={login}> Login </button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
            

            </div>
            
            <div>
                <h4> User Logged In: </h4>
                {user?.email}

                <h6>Need an account?<Link to="/register"> Register</Link></h6>
                <h5><button onClick={logout}> Sign Out </button></h5>
            </div>
            <img className="fundal" src={background}/>
        </div>
        
    </div>
    )
};
export default Login;