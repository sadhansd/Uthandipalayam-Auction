// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnyDBZ9wGUvINM1hMzm5JTRj0ONQMid04",
  authDomain: "auction-a9408.firebaseapp.com",
  projectId: "auction-a9408",
  storageBucket: "auction-a9408.appspot.com",
  messagingSenderId: "1082936554782",
  appId: "1:1082936554782:web:04dadc87dc52286722450f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
