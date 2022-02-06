import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AddTechnologyForm(props) {
  const [technology, setTechnology] = useState("");
  const [performs, setPerforms] = useState("");
  const [snippet, setSnippet] = useState("");
  const [language, setLanguage] = useState("css");

  const handleSubmission = (e) => {
    e.preventDefault();
    props.handleAddTechnology(technology, performs, snippet, language);
    props.toggleForm();
  };

  return (
    <form className="AddTechnologyForm" onSubmit={(e) => handleSubmission(e)}>
      {/* Form Close Button Icon */}
      <FontAwesomeIcon
        className="closeForm-btn"
        icon={faWindowClose}
        onClick={() => props.toggleForm()}
      />

      <h2 style={{ textAlign: "center" }}>
        Add new technology, and first snippet.
      </h2>
      <input
        type="text"
        placeholder="Enter new technology category"
        onChange={(e) => setTechnology(e.target.value)}
        required
      />

      <input
        className="performsInput"
        value={performs}
        placeholder="What does this snippet perform?"
        onChange={(e) => setPerforms(e.target.value)}
        style={{ padding: "5px", marginTop: "10px" }}
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
      <select id="selectLanguage" onChange={(e) => setLanguage(e.target.value)}>
        <option value="css">css</option>
        <option value="javascript" defaultValue>
          javascript
        </option>
      </select>

      <input type="submit" className="submit-btn" value="Submit" />
    </form>
  );
}

export default AddTechnologyForm;
