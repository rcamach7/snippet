import "../css/Technology.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../data/config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddSnippet from "../components/AddSnippet";
import Snippet from "../components/Snippet";

function Technology() {
  const [showForm, setShowForm] = useState(false);
  const [snippets, setSnippets] = useState([]);
  initializeApp(getFirebaseConfig());
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

  const toggleForm = () => {
    console.log(showForm);
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleAddSnippet = async (performsIn, snippetIn) => {
    try {
      await setDoc(doc(getFirestore(), params.technology, v4()), {
        performs: performsIn,
        snippet: snippetIn,
      });
    } catch (error) {
      console.log(error);
    }

    const updatedSnippets = [...snippets];
    updatedSnippets.push({ performs: performsIn, snippet: snippetIn });
    setSnippets(updatedSnippets);
  };

  return (
    <div className="Technology">
      <h2>
        {params.technology.substring(0, 1).toUpperCase() +
          params.technology.substring(1)}{" "}
        Collection
      </h2>
      <button style={{ width: "200px" }} onClick={() => console.log(snippets)}>
        Print State
      </button>
      {showForm ? (
        <AddSnippet
          technology={params.technology.toUpperCase()}
          toggleForm={toggleForm}
          handleAddSnippet={handleAddSnippet}
        />
      ) : null}
      {/* Map through our snippets and return Snippet components with their relative data */}
      {snippets.map((curSnippet) => {
        return (
          <Snippet
            performs={curSnippet.performs}
            snippet={curSnippet.snippet}
            key={v4()}
          />
        );
      })}

      <FontAwesomeIcon
        onClick={() => toggleForm()}
        className="add-btn"
        icon={faPlus}
        style={{
          fontSize: "50px",
          position: "absolute",
          bottom: "5",
          right: "5",
        }}
      />
    </div>
  );
}

export default Technology;
