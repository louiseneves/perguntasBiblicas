// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs,addDoc,deleteDoc,doc,where } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBji9UEJUORodfPXpzHbjlLMkxIRKsWZ9g",
  authDomain: "perguntabiblicajogo.firebaseapp.com",
  projectId: "perguntabiblicajogo",
  storageBucket: "perguntabiblicajogo.appspot.com",
  messagingSenderId: "254542110950",
  appId: "1:254542110950:web:ce6bad456b44bcdf179b27"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app);
export {database,collection,getDocs,addDoc,deleteDoc,doc,auth,storage,where};