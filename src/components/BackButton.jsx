import "../css/BackButton.css";
import { useNavigate } from "react-router-dom"

function BackButton({ className, text = "" }) {
  let navigate = useNavigate();

  return (
    <button className={`back-button ${className}`} onClick={() => navigate(-1)}>
      <i className="back-button__icon fa-solid fa-arrow-left"></i>
      {text && <span>{text}</span>}
    </button>
  );
}

export default BackButton;
