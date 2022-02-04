import "../css/Home.css";
import "pattern.css/dist/pattern.css";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

function Home() {
  const technologies = ["css", "javascript", "firebase"];

  return (
    <div className="Home pattern-dots-sm">
      <main>
        <h1 className="pattern-checks-sm sm-mint white text-pattern">
          Snippet
        </h1>
        <p>
          <strong>
            Hello! Welcome to my modest collection of code snippet cheat sheets
            i've collected!
          </strong>
        </p>
        <input type="text" placeholder="Search collection..." />

        <h3>
          <strong>Documented Technologies</strong>
        </h3>
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
