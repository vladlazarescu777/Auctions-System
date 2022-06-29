import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import background from "../register.jpg";
import App from "../App";
import validator from "validator";
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

function Register() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword,
            registerPhone,
            registerName
          );
          console.log(user);
        } catch (error) {
            if (error.message == "Firebase: Error (auth/internal-error).") {
                setErrorMessage("please complete all");
            } else {
            if (validator.isEmail(registerEmail)) {
                if (registerPassword.length() < 6) {
                    setErrorMessage("password longer than 6 characters");
                }
            } else {
                setErrorMessage("invalid email");
            }
        }
          console.log(error.message);
        }
    
        let email = document.getElementById("signup-email").value;
        let password = document.getElementById("signup-password").value;
        let phone = document.getElementById("signup-phone").value;
        let name = document.getElementById("signup-name").value;
        console.log(email, password, phone, name);
    
        const user = auth.currentUser;
    
        console.log(user.uid);
    
        const db = getDatabase();
        set(ref(db, 'Users/' + user.uid), {
            email: email,
            phone: phone,
            name:name});
      };

    return (
        <div className="Register"
        // style={{ backgroundImage: `url(${background})` }}
        >
            <h3>
                Register page!
            </h3>
            <div>
                <h3 id="signup-form"> Register User </h3>
                
                <form>
                <input
                id="signup-email"
                placeholder="Email..."
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
                />
                <input
                id="signup-phone"
                placeholder="Phone..."
                onChange={(event) => {
                    setRegisterPhone(event.target.value);
                }}
                />
                <input
                id="signup-name"
                placeholder="Fullname..."
                onChange={(event) => {
                    setRegisterName(event.target.value);
                }}
                />
                <input
                id="signup-password"
                placeholder="Password..."
                type="password"
                onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }}
                />
                </form>

            <button onClick={register}> Create User</button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
                <form>
                    Already have an account?<Link to="/"> Login </Link>
                </form>
            </div>
            
            

            <img className="fundal" src={background}/>

            

            
        </div>
        
    )
};
export default Register;