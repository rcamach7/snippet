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

      <h2>Add New Technology</h2>
      <input
        type="text"
        placeholder="Enter new technology category"
        onChange={(e) => setTechnology(e.target.value)}
        required
      />

      <p style={{ margin: "5px 0 2.5px 0" }}>What does the snippet perform?</p>
      <textarea
        className="performsInput"
        cols="30"
        rows="2"
        value={performs}
        onChange={(e) => setPerforms(e.target.value)}
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
