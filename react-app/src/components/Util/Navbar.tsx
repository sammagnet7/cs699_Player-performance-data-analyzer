import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Assuming you're using Font Awesome for icons
import { faHome } from "@fortawesome/free-solid-svg-icons";
function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="justify-content-center">
        <Navbar.Brand>
          <FontAwesomeIcon icon={faHome} />
          <span className="ms-2">Player Performance Visualiser</span>
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default NavBar;
