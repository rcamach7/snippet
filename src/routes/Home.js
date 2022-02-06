import "../css/Home.css";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Home() {
  const technologies = ["css", "javascript", "firebase"];

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
          Select technology from the options below or upload and add to a new
          technology code snippet!
        </h3>

        {technologies.map((name) => {
          return (
            <Link to={`/snippet/${name}`} className="Folder" key={v4()}>
              <p>{name}</p>
            </Link>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
