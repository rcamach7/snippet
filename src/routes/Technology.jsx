import "../css/Technology.css";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../data/config";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Technology() {
  const [snippets, setSnippets] = useState([]);
  const firebaseApp = initializeApp(getFirebaseConfig());
  let params = useParams();

  useEffect(() => {
    loadDatabase();
  }, []);

  const loadDatabase = async () => {
    const data = [];
    // Query our database for all documents in a specific collection
    const querySnapshot = await getDocs(
      query(collection(getFirestore(), `${params.technology}`))
    );
    // Traverse and add data to out component state
    querySnapshot.forEach((snippet) => {
      data.push(snippet.data());
    });
    setSnippets(data);
  };

  return (
    <div className="Technology">
      <h1>{params.technology.toUpperCase()}</h1>
    </div>
  );
}

export default Technology;
