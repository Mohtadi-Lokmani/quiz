import { Link } from "react-router-dom";
import "./Create.css";

export default function Create() {
  return (
    <div className="cta-container">
      <h2 className="cta-text">
         Got a great idea? <br /> Create your own quiz !
      </h2>
      <Link to="/create-quiz" className="cta-button">
        Create Quiz
      </Link>
    </div>
  );
}
