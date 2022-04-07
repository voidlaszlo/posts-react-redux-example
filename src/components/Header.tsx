import { useLocation, useNavigate } from "react-router-dom";
import "../css/header.styles.css";
import { navigateBack, navigateToStart } from "../utils";

const Header = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const anyPath = /\/[a-zA-Z0-9]/;

  return (
    <header>
      <h1 onClick={navigateToStart(navigate)}>ExampleApp</h1>
      {location.pathname.match(anyPath) && (
        <button className="cta" onClick={navigateBack(navigate)}>
          Back
        </button>
      )}
    </header>
  );
};

export default Header;
