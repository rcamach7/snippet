import "../css/AddSnippet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AddSnippet(props) {
  const [performs, setPerforms] = useState("");
  const [snippet, setSnippet] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAddSnippet(performs, snippet);
    props.toggleForm();
  };

  return (
    <div className="AddSnippet">
      <form className="AddSnippet-form" onSubmit={(e) => handleSubmit(e)}>
        <FontAwesomeIcon
          className="closeForm-btn"
          icon={faWindowClose}
          onClick={() => props.toggleForm()}
        />
        <p className="formTitle">New {props.technology} Snippet</p>
        <textarea
          className="snippet"
          cols="30"
          rows="2"
          value={performs}
          onChange={(e) => setPerforms(e.target.value)}
        />
        <p>Paste formatted code below:</p>
        <textarea
          cols="30"
          rows="10"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
        />

        <input type="submit" value="Submit Snippet" />
      </form>
    </div>
  );
}

export default AddSnippet;
