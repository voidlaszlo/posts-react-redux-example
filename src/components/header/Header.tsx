import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigateBack } from "../utils/utils";
import "./css/header.styles.css";

const Header = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const anyPath = /\/[a-zA-Z0-9]/;

  const navigateToStart = () => () => navigate("../");

  return (
    <header>
      <h1 onClick={navigateToStart()}>ExampleApp</h1>
      {location.pathname.match(anyPath) && (
        <button className="cta" onClick={navigateBack(navigate)}>
          Back
        </button>
      )}
    </header>
  );
};

export default Header;
