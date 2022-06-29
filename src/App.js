import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from "firebase/auth"
import "./App.css";
import { auth } from "./fire";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Auctions from "./pages/Auctions";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";





function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

   const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };



  return (
    <div className="App">

      {/* REGISTER */}
      {/*
      <div>
        <h3 id="signup-form"> Register User </h3>
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
          //type="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

        */}
        

        <Router>
        
          <Routes>
            <Route path="/" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
            <Route path="/auctions" element = {<Auctions />} />
          </Routes>
        </Router>

        {/* LOGIN */}
      {/*
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>
          */}
      {/* <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button> */}
    </div>
        
  );
}

export default App;