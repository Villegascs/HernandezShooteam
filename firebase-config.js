// ============================================================
// firebase-config.js
// Configuración de Firebase para Hernández Shoteam
// ============================================================
// IMPORTANTE: Reemplaza los valores de abajo con los de tu
// proyecto en Firebase Console > Configuración del proyecto
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    arrayUnion 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Tu configuración de Firebase (hernandez-shooteam)
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "hernandez-shooteam.firebaseapp.com",
    projectId: "hernandez-shooteam",
    storageBucket: "hernandez-shooteam.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
    auth, 
    db, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    arrayUnion 
};
