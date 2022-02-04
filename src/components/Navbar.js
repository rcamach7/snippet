import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="Navbar">
      <p>
        <FontAwesomeIcon icon={faHome} />
      </p>
    </nav>
  );
}

export default Navbar;
