import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/MissingPage.css";

const STUDY_EXCUSES = [
  "This card was suspended due to excessive forgetting.",
  "The spaced repetition algorithm pushed this page into 2035.",
  "404: Brain cache miss. Please take a coffee break.",
  "Error 404: The knowledge was so advanced it transcended HTTP.",
  "Vite hot-reloaded this route straight into another multiverse.",
  "Your dog ate this URL's route parameters.",
  "You've discovered the mythical hidden deck of unfinished chores.",
  "The flashcard flipped over, but both sides were completely blank.",
  "SIPON! YTTA...",
  "Anjay! Ada Indonesianya cuy!!",
  "Do you wanna talk about Sylveon~?",
];

function MissingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [excuseIndex, setExcuseIndex] = useState(0);

  const handleNextExcuse = () => {
    setExcuseIndex((prev) => {
      if (STUDY_EXCUSES.length === 1) return 0;
      const newIndex = Math.floor(Math.random() * (STUDY_EXCUSES.length));
      return newIndex === prev ? (newIndex + 1) % STUDY_EXCUSES.length : newIndex;
    });
  };

  return (
    <div className="missing-page">
      <section className="missing-page__hero">
        <div className="missing-page__glitch-wrapper">
          <h2 className="missing-page__code">404</h2>
          <i className="fa-solid fa-satellite-dish missing-page__icon"></i>
        </div>

        <div className="missing-page__path-badge">
          <span>Requested Route:</span>
          <code>{location.pathname}</code>
        </div>

        <p className="missing-page__description">
          Looks like this coordinate does not exist or has been shifted in your study schedule.
          Don&apos;t panic — we&apos;ve got a quick way back!
        </p>

        <div className="missing-page__actions">
          <Link to="/dashboard" className="missing-page__btn missing-page__btn--primary">
            <i className="fa-solid fa-chart-line"></i>
            Return to Dashboard
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="missing-page__btn missing-page__btn--secondary"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Go Back
          </button>
        </div>
      </section>

      <section className="missing-page__excuse-card">
        <div className="missing-page__excuse-header">
          <h3 className="missing-page__excuse-title">
            <i className="fa-solid fa-lightbulb"></i>
            Official 404 Excuse
          </h3>
          <button
            onClick={handleNextExcuse}
            className="missing-page__excuse-btn"
            title="Generate new excuse"
          >
            <i className="fa-solid fa-rotate-right"></i>
            Reroll Excuse
          </button>
        </div>
        <div className="missing-page__excuse-content">
          &ldquo;{STUDY_EXCUSES[excuseIndex]}&rdquo;
        </div>
      </section>
    </div>
  );
}

export default MissingPage;