import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCAQTulfpmxoqOfR7k-stCBq6kPbtKrjE",
  authDomain: "vuegram-973b2.firebaseapp.com",
  projectId: "vuegram-973b2",
  storageBucket: "vuegram-973b2.appspot.com",
  messagingSenderId: "1004151395001",
  appId: "1:1004151395001:web:bc24e282062e221b70c168",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils and refs
export {
  db,
  auth,
  usersCollection,
  postCollection,
  commentsCollection,
  likesCollection,
};
