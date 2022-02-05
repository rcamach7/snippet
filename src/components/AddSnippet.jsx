import "../css/AddSnippet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function AddSnippet(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          placeholder="Description of what this snippet of code performs"
        />
        <p>Paste formatted code below:</p>
        <textarea cols="30" rows="10" />

        <input type="submit" value="Submit Snippet" />
      </form>
    </div>
  );
}

export default AddSnippet;
