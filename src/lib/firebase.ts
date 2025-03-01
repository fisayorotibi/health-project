import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXTNuD7rzRqJiwV6Htceb21dEESy_IPaw",
  authDomain: "lavender-a4519.firebaseapp.com",
  projectId: "lavender-a4519",
  storageBucket: "lavender-a4519.firebasestorage.app",
  messagingSenderId: "1070824196551",
  appId: "1:1070824196551:web:d6ae8f2a0e600cb89eb1e2",
  measurementId: "G-C02HS0E5DD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 