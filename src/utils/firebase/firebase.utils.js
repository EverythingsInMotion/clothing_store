// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUwDvQFlA7xvJTFVawVJhfdR2EeZD5Jew",
    authDomain: "clothing-store-bba51.firebaseapp.com",
    projectId: "clothing-store-bba51",
    storageBucket: "clothing-store-bba51.appspot.com",
    messagingSenderId: "277551684730",
    appId: "1:277551684730:web:c93cc1aa3adb7d19896fc3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())


    // If user data does not exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            })
        } catch (err) {
            console.log('Error creating user', err.message)
        }
    }


    // If user data exists
    return userDocRef;

}