import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  

function updatePost() {
  const hardcodedId = "Bp8eiZfhR0l1pMJxNrYV";
  const postRef = doc(db, "posts", hardcodedId)
  const newPost = {
    description: "Finish Frontend Simplified",
    uid: "1",
    title: "Land a $300k job"
  };
  updateDoc(postRef, newPost);
}

  /*function createPost() {
    const post = {
      title: "Land a $100k job",
      description: "Finish Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }*/
    function createPost() {
      const post = {
        title: "Finish Interview Section",
        description: "Do Frontend Simplified",
        uid: user.uid,
      };
      addDoc(collection(db, "posts"), post)
    }

async function getAllPost() {
const { docs } = await getDocs(collection(db, "posts"));
const posts = docs.map((elem) => ({...elem.data(), id: elem.id}));
console.log(posts);
}

async function getPostById(id) {
 // const hardcodeId = "Bp8eiZfhR0l1pMJxNrYV";
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);
 return postSnap.data();
 

}

async function getPostByUid() {
  const postCollectionRef = await query(
    collection(db, "posts"),
    where ("uid", "==", user.uid)
  );
  const { docs } = await getDocs(postCollectionRef);
  console.log(docs.map(doc => doc.data()));
}


  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }
  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading..." : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPost}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
    </div>
  );
}

export default App;
