import "../css/BackButton.css";
import { useNavigate } from "react-router-dom"

function BackButton({ className, text = "" }) {
  let navigate = useNavigate();

  return (
    <button className={`${className}`} onClick={() => navigate(-1)}>
      <i class="fa-solid fa-arrow-left"></i>
      {text && <span>{text}</span>}
    </button>
  );
}

export default BackButton;
