import "../css/Technology.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";
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
import AddSnippetForm from "../components/AddSnippetForm";
import Snippet from "../components/Snippet";

function Technology() {
  const [showForm, setShowForm] = useState(false);
  const [snippets, setSnippets] = useState([]);
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

  return (
    <div className="Technology">
      <h2>
        {params.technology.substring(0, 1).toUpperCase() +
          params.technology.substring(1)}{" "}
        Collection
      </h2>
      {showForm ? (
        <AddSnippetForm
          technology={params.technology.toUpperCase()}
          toggleForm={toggleForm}
          handleAddSnippet={handleAddSnippet}
        />
      ) : null}
      {/* Map through our snippets and return Snippet components with their relative data */}
      <div className="SnippetContainer">
        {snippets.map((curSnippet) => {
          return (
            <Snippet
              performs={curSnippet.performs}
              snippet={curSnippet.snippet}
              key={v4()}
              language={curSnippet.language}
            />
          );
        })}
      </div>

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
