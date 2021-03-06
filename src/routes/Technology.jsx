import "../css/Technology.css";
import { v4 } from "uuid";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { connectFirebase } from "../data/config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddSnippetForm from "../components/AddSnippetForm";
import Snippet from "../components/Snippet";

function Technology() {
  const [showForm, setShowForm] = useState(false);
  const [snippets, setSnippets] = useState([]);
  let params = useParams();
  connectFirebase();

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
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleAddSnippet = async (performsIn, snippetIn, languageIn) => {
    const generatedId = v4();
    try {
      await setDoc(doc(getFirestore(), params.technology, generatedId), {
        id: generatedId,
        language: languageIn,
        performs: performsIn,
        snippet: snippetIn,
      });
    } catch (error) {
      console.log(error);
    }

    const updatedSnippets = [...snippets];
    updatedSnippets.push({
      performs: performsIn,
      snippet: snippetIn,
      id: generatedId,
    });
    setSnippets(updatedSnippets);
  };

  const handleDeleteSnippet = async (id) => {
    const updatedSnippets = [...snippets];

    let indexToDelete = -1;
    updatedSnippets.forEach((snippet, i) => {
      if (snippet.id === id) {
        indexToDelete = i;
      }
    });
    updatedSnippets.splice(indexToDelete, 1);
    setSnippets(updatedSnippets);

    // Reflect deletion in database
    try {
      await deleteDoc(doc(getFirestore(), params.technology, id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Technology pattern-grid-sm">
      <div className="page-title">
        <h2>
          {" "}
          {params.technology.substring(0, 1).toUpperCase() +
            params.technology.substring(1)}{" "}
          Collection
        </h2>
        <button onClick={() => toggleForm()} className="addTechFolder-btn">
          Add Snippet
        </button>
      </div>
      {/* Map through our snippets and return Snippet components with their relative data */}
      <div className="SnippetContainer">
        {snippets.map((curSnippet) => {
          return (
            <Snippet
              performs={curSnippet.performs}
              id={curSnippet.id}
              snippet={curSnippet.snippet}
              key={v4()}
              language={curSnippet.language}
              handleDeleteSnippet={handleDeleteSnippet}
            />
          );
        })}
      </div>

      {showForm ? (
        <AddSnippetForm
          technology={params.technology.toUpperCase()}
          toggleForm={toggleForm}
          handleAddSnippet={handleAddSnippet}
        />
      ) : null}
    </div>
  );
}

export default Technology;
