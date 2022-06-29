import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import validator from "validator";
import background from "../register.jpg";

import App from "../App";
import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { getDatabase, ref, set, onValue } from 'firebase/database';
  import { getAuth } from "firebase/auth"
  import "../App.css";
  import { auth } from "../fire";
  import { useNavigate } from "react-router-dom";
  import {getStorage, getDownloadURL} from "firebase/storage";

//

function Auctions() {
    const [user, setUser] = useState({});
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [price, setPrice] = useState("");
    const [lista_licitatii, setLista_licitatii] = useState([]);
    const [url, setUrl] = useState("");

    var Data;

    const handleTodoChange = (e) => {
        setTodo(e.target.value);
      };

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);

    });
    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("/");
    };

     const db = getDatabase();
    
    

    //read

    

    useEffect(() => {
        onValue(ref(db, '/Auctions'), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
        //   if (data !== null) {
        //     Object.values(data).map((todo) => {
        //       setTodos((oldArray) => [...oldArray, todo]);
        //     });
        //   }
          const lista_licitatii = Object.values(data);
          Data = data;
          setLista_licitatii(lista_licitatii);
          const licitatie = Object.values(lista_licitatii[0]);
          console.log(lista_licitatii);
          const price = licitatie[0];
          setPrice(price);
          const str = "auctions/";
            const func = async () => {
                console.log('da');
                const storage = getStorage();
                const ref1 = ref(storage, "auctions");
                
                const reference = ref(storage, "auctions/dxqVNaHqwXM9RZDn4PRjTkykKI02THE VERY LAST OFFSET.jpg");
                await getDownloadURL(reference).then((x) => {
                    setUrl(x);
                })
            }
            func();
            

        });

      }, []);



    return (
        <div className="auctionPage">
            hello
            <h4> User Logged In: </h4>
                {user?.email}
            <h5><button onClick={logout}> Sign Out </button></h5>
            {lista_licitatii.map((licitatie) => {
                return <div className="auction">
                <h1>
                    {licitatie.title} 
                </h1>
                <h2>
                    {licitatie.description}
                </h2>
                <h3>
                    {licitatie.currentPrice}
                </h3>
                <h4>
                    {licitatie.image}
                </h4>
                
                </div>;
            })}
        </div>
        )
};

export default Auctions;