import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="Navbar">
      <h1 className="pattern-checks-sm sm-mint white text-pattern">Snippet</h1>
      <Link className="link" to="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
    </nav>
  );
}

export default Navbar;
