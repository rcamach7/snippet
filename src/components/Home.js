import "../css/Home.css";
import "pattern.css/dist/pattern.css";
import Navbar from "./Navbar";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../data/config";
import { useEffect, useState } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { v4 } from "uuid";

function Home() {
  const [folders, setFolders] = useState([]);
  const firebaseApp = initializeApp(getFirebaseConfig());

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    const data = [];
    // Request Data from our database.
    const querySnapshot = await getDocs(
      query(collection(getFirestore(), "technologies"))
    );

    querySnapshot.forEach((techFolder) => {
      data.push(techFolder.data());
    });

    setFolders(data);
  };

  return (
    <div className="Home pattern-dots-sm">
      <Navbar />

      <main>
        <h1 className="pattern-checks-sm sm-mint white text-pattern">
          Snippet
        </h1>
        <p>
          <strong>
            Hello! Welcome to my modest collection of code snippet cheat sheets
            i've collected!
          </strong>
        </p>
        <input type="text" placeholder="Search collection..." />
        {/* <button onClick={() => console.log(folders)}>Print State</button> */}

        <h3>
          <strong>Documented Technologies</strong>
        </h3>
        {folders.map((folder) => {
          return <Folder key={v4()} name={folder.name} />;
        })}
      </main>
    </div>
  );
}

function Folder(props) {
  return (
    <div className="Folder pattern-vertical-lines-sm">
      <p>{props.name}</p>
    </div>
  );
}

export default Home;
