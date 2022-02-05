import "../css/Snippet.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Snippet(props) {
  return (
    <div className="Snippet">
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
