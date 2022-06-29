import * as firebase from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBzRurYz9bxIQmskXuec7tee94u3DvfXcY",
    authDomain: "sistem-licitatii.firebaseapp.com",
    databaseURL: "https://sistem-licitatii-default-rtdb.firebaseio.com",
    projectId: "sistem-licitatii",
    storageBucket: "sistem-licitatii.appspot.com",
    messagingSenderId: "654169734835",
    appId: "1:654169734835:web:c514f757642b2b2c97fac6",
    measurementId: "G-2CXM7003G0"
  };
const fire = firebase.initializeApp(firebaseConfig);
const database = getDatabase(fire);
export const auth = getAuth(fire);
export default fire;