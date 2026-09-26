import "../css/EmptyList.css";
import { Link } from "react-router-dom";

function EmptyList({ icon, message, CTA_text, CTA_link, title }) {
    return (
        <div className="empty-list">
            <i className={icon}></i>
            <div className="empty-list__body">
                <div className="empty-list__message">
                    {title && <h1>{title}</h1>}
                    <p>{message}</p>
                </div>
                {CTA_link && <Link to={CTA_link} className="empty-list__cta-button">{CTA_text}</Link>}
            </div>
        </div>
    );
}

export default EmptyList;
