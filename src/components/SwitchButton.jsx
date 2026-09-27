import { useRef, useState, useLayoutEffect } from "react";
import "../css/SwitchButton.css";
import { useLocation, useNavigate } from "react-router-dom";

function SwitchButton({ options }) {
    const location = useLocation();
    const navigate = useNavigate();

    const itemsRef = useRef();
    const [activeTabOffset, setActiveTabOffset] = useState();

    useLayoutEffect(() => {
        if (!itemsRef.current) return;

        setActiveTabOffset({
            width: itemsRef.current.offsetWidth,
            left: itemsRef.current.offsetLeft,
        });
    }, [location.pathname]);

    function handleSwitch(value) {
        navigate(value);
    }

    return (
        <nav className="switch-button">
            {options.map((option) => (
                <div
                    key={option.value}
                    onClick={() => handleSwitch(option.value)}
                    className={`switch-button__option ${location.pathname === option.value ? "switch-button__option--active" : ""}`}
                    ref={location.pathname === option.value ? itemsRef : null}
                >
                    {option.label}
                </div>
            ))}
            <span
                className="switch-button__indicator"
                style={{
                    width: `${activeTabOffset?.width || 0}px`,
                    left: `${activeTabOffset?.left || 0}px`
                }}
            />
        </nav>
    );
}

export default SwitchButton;