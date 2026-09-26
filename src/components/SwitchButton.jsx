import "../css/SwitchButton.css";
import { useLocation, useNavigate } from "react-router-dom";

function SwitchButton({ options }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="switch-button">
            <ul className="switch-button__list">
                {options.map((option) => (
                    <li
                        key={option.value}
                        onClick={() => navigate(option.value)}
                        className={`switch-button__option ${location.pathname === option.value ? "switch-button__option--active" : ""}`}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SwitchButton;