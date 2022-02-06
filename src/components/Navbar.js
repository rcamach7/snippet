import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      <Link className="link" to="/snippet">
        <h1 className="pattern-checks-sm sm-mint white text-pattern">
          Snippet
        </h1>
      </Link>
      <Link className="link" to="/snippet">
        <FontAwesomeIcon icon={faHome} />
      </Link>
    </nav>
  );
}

export default Navbar;
