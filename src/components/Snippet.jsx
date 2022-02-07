import "../css/Snippet.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function Snippet(props) {
  return (
    <div className="Snippet">
      <FontAwesomeIcon
        className="deleteSnippet-btn"
        icon={faWindowClose}
        onClick={() => props.handleDeleteSnippet(props.id)}
      />
      <p>{props.performs}</p>
      <SyntaxHighlighter
        language={props.language}
        style={a11yDark}
        showLineNumbers={true}
      >
        {props.snippet}
      </SyntaxHighlighter>
    </div>
  );
}

export default Snippet;
