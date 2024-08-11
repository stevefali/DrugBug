import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date(Date.now()).getFullYear();
  return (
    <footer className="drugbug-footer">
      <p className="drugbug-footer__year">{`${year} DrugBug`}</p>
      <nav className="drugbug-footer__nav">
        <Link to={"/"} className="drugbug-footer__link">
          Home
        </Link>
        <Link to={"/medication"} className="drugbug-footer__link">
          Add Medication
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
