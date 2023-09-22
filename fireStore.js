import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAnt-e0lckaGo0yOmb5LoIvR1EYHqZ8-uM",
    authDomain: "cndemo-164b6.firebaseapp.com",
    projectId: "cndemo-164b6",
    storageBucket: "cndemo-164b6.appspot.com",
    messagingSenderId: "250579447634",
    appId: "1:250579447634:web:c7b3e7d5bdab485b99148b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();

export { db, storage }