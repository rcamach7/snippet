import "../css/Home.css";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AddTechnologyForm from "../components/AddTechnologyForm";
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

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  initializeApp(getFirebaseConfig());

  // Load all current technology folders in our database on homepage component first mount
  useEffect(() => {
    const loadTechFolders = async () => {
      try {
        const docRef = doc(getFirestore(), "root", "websiteData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTechnologies(docSnap.data().technologyFolders);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadTechFolders();
  }, []);

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
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

  return (
    <div className="Home pattern-dots-sm">
      <main>
        <SyntaxHighlighter
          language="javascript"
          style={a11yDark}
          showLineNumbers={true}
          className="homeTitle"
        >
          console.log('Hello World');
        </SyntaxHighlighter>
        <h3>
          Select a technology from the options below or create a new category
          and add a snippet!
        </h3>

        {/* Add Technology Toggled Form */}
        {showForm ? (
          <AddTechnologyForm
            toggleForm={toggleForm}
            handleAddTechnology={handleAddTechnology}
          />
        ) : null}

        {technologies.map((name) => {
          return (
            <Link to={`/snippet/${name}`} className="Folder" key={v4()}>
              <p>{name}</p>
            </Link>
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
