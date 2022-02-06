import "../css/AddSnippet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AddSnippetForm(props) {
  const [performs, setPerforms] = useState("");
  const [snippet, setSnippet] = useState("");
  const [language, setLanguage] = useState("css");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAddSnippet(performs, snippet, language);
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
        <textarea
          className="snippet"
          cols="30"
          rows="1"
          value={performs}
          placeholder="What does this snippet perform?"
          onChange={(e) => setPerforms(e.target.value)}
          style={{ padding: "5px" }}
          required
        />
        <p style={{ margin: "5px 0 2.5px 0" }}>Paste formatted code below:</p>
        <textarea
          cols="30"
          rows="10"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          required
        />

        <label htmlFor="selectLanguage" style={{ margin: "5px 0 2.5px 0" }}>
          Select language
        </label>
        <select
          id="selectLanguage"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="css">css</option>
          <option value="javascript" defaultValue>
            javascript
          </option>
        </select>

        <input type="submit" value="Submit Snippet" />
      </form>
    </div>
  );
}

export default AddSnippetForm;
