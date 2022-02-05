import "../css/Home.css";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Home() {
  const technologies = ["css", "javascript", "firebase"];
  const hello =
    "if ( coffee.isEmpty() ) {\n  coffee.refill();\n} else {\n  coffee.drink();\n}";

  return (
    <div className="Home pattern-dots-sm">
      <main>
        <h1>console.log("Hello World");</h1>
        <h3>
          <strong>
            A modest collection of frequently used code blocks available to copy
            and paste!
          </strong>
        </h3>
        <SyntaxHighlighter
          language="javascript"
          style={a11yDark}
          showLineNumbers={true}
          className="SyntaxHighlighter"
        >
          {hello}
        </SyntaxHighlighter>

        <h4>Select from the options below or use the searchbar</h4>
        <input type="text" placeholder="Search technology..." />
        {technologies.map((name) => {
          return (
            <Link
              to={`/tech/${name}`}
              className="Folder pattern-vertical-lines-sm"
              key={v4()}
            >
              <p>{name}</p>
            </Link>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
