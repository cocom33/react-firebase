// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// import 'firebase/auth';
// import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//  pertama
// const firebaseConfig = {
//   apiKey: "AIzaSyAuGTLPlunctBCdh_hTww8JnS5hDVSR5n4",
//   authDomain: "simples-notes-firebases.firebaseapp.com",
//   projectId: "simples-notes-firebases",
//   storageBucket: "simples-notes-firebases.appspot.com",
//   messagingSenderId: "558374266348",
//   appId: "1:558374266348:web:bff99ec93058600f954cc9",
//   measurementId: "G-1M5Q8JWJQQ",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBuMI_QazebRE-xZ_0sNRPJqfQM0h_zsvc",
  authDomain: "simples-notes.firebaseapp.com",
  projectId: "simples-notes",
  storageBucket: "simples-notes.appspot.com",
  messagingSenderId: "1088076657544",
  appId: "1:1088076657544:web:febd234fab49f0278a803d",
  measurementId: "G-0X8NCVV33C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getDatabase(app);

export default app;