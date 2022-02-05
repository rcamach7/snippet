import "../css/AddSnippet.css";

function AddSnippet(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="AddSnippet" onSubmit={(e) => handleSubmit(e)}>
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
  );
}

export default AddSnippet;
