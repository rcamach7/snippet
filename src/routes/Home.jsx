import "../css/Home.css";
import { Link } from "react-router-dom";
import AddTechnologyForm from "../components/AddTechnologyForm";
import { v4 } from "uuid";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../data/config";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWindowClose } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const welcomeText =
    "console.log('Hello World');\n\n/*\nSelect a technology from the\noptions below or create\na new category\nand add a snippet!\n*/";
  initializeApp(getFirebaseConfig());

  // Load all current technology folders in our database on homepage component first mount
  useEffect(() => {
    const loadTechFolders = async () => {
      try {
        const docRef = doc(getFirestore(), "root", "websiteData");
        const docSnap = await getDoc(docRef);
        setTechnologies(docSnap.data().technologyFolders);
      } catch (error) {
        console.log(error);
      }
    };
    loadTechFolders();
  }, []);

  const toggleForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  const handleAddTechnology = async (
    technologyIn,
    performsIn,
    snippetIn,
    languageIn
  ) => {
    const generatedId = v4();
    try {
      // Create new collection, then add first document given the values user entered.
      await setDoc(doc(getFirestore(), technologyIn, generatedId), {
        id: generatedId,
        language: languageIn,
        performs: performsIn,
        snippet: snippetIn,
      });
    } catch (error) {
      console.log(error);
    }

    // Add new technology folder into out root collection, so homepage loads new category on first mount
    const docReference = doc(getFirestore(), "root", "websiteData");
    await updateDoc(docReference, {
      technologyFolders: [...technologies, technologyIn],
    });

    // Update state of new addition, without having to query our DB again for better load time
    setTechnologies([...technologies, technologyIn]);
  };

  const handleDeleteTechnology = async (name) => {
    try {
      let updatedTechnologies = [...technologies];
      updatedTechnologies.splice(updatedTechnologies.indexOf(name), 1);
      setTechnologies(updatedTechnologies);

      // Update Database to remove loading of this specific collection (does not delete collection from DB)
      const documentReference = doc(getFirestore(), "root", "websiteData");
      await updateDoc(documentReference, {
        technologyFolders: updatedTechnologies,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Home pattern-dots-sm">
      {/* Add Technology Toggled Form */}
      {showForm ? (
        <AddTechnologyForm
          toggleForm={toggleForm}
          handleAddTechnology={handleAddTechnology}
        />
      ) : null}
      <main>
        <div className="titleContainer">
          <SyntaxHighlighter
            language="javascript"
            style={a11yDark}
            showLineNumbers={true}
            className="homeTitle"
          >
            {welcomeText}
          </SyntaxHighlighter>
        </div>

        {technologies.map((name) => {
          return (
            <div to={`/snippet/${name}`} className="Folder" key={v4()}>
              <FontAwesomeIcon
                className="delete-btn"
                icon={faWindowClose}
                onClick={() => handleDeleteTechnology(name)}
              />
              <Link className="folder-link" to={`/snippet/${name}`}>
                {name}
              </Link>
            </div>
          );
        })}

        <FontAwesomeIcon
          icon={faPlus}
          className="addTechIcon"
          style={{
            fontSize: "50px",
            position: "absolute",
            bottom: "5",
            right: "5",
          }}
          onClick={() => toggleForm()}
        />
      </main>
    </div>
  );
}

export default Home;
