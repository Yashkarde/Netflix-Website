import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDN2bL3_T9bmiVZ3hFw0m0iQQYrXg3ZCdQ",
  authDomain: "netflix-clone-50e70.firebaseapp.com",
  projectId: "netflix-clone-50e70",
  storageBucket: "netflix-clone-50e70.firebasestorage.app",
  messagingSenderId: "904195912843",
  appId: "1:904195912843:web:624723a0c383d7a7d3108e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "Local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.message.split('/')[1].split('-').join(" "));  // Display error message
    throw new Error(error.message);  // Throw error to propagate to calling function
  }
};

// Signin
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.message.split('/')[1].split('-').join(" "));  // Display error message
    throw new Error(error.message);  // Throw error to propagate to calling function
  }
};

// Logout
const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
