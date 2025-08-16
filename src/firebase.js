import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBbrq6RTPYyG57tOYf-XdoAisjSqiHD8xc",
    authDomain: "netflix-clone-38225.firebaseapp.com",
    projectId: "netflix-clone-38225",
    storageBucket: "netflix-clone-38225.firebasestorage.app",
    messagingSenderId: "728581462336",
    appId: "1:728581462336:web:34797984b17fc46f8502a5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout }