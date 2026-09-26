import { useState, useEffect, useRef, useCallback } from "react";
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

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function MissingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Easter Egg States
  const [excuseIndex, setExcuseIndex] = useState(0);
  const [showArcade, setShowArcade] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);

  // Arcade Mini-Game State
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("idle"); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("anki_minibreak_highscore") || "0", 10);
  });
  const [timeLeft, setTimeLeft] = useState(30);

  // Next Excuse Generator
  const handleNextExcuse = () => {
    setExcuseIndex((prev) => (prev + 1) % STUDY_EXCUSES.length);
  };

  // Konami Code Key Listener
  useEffect(() => {
    let keyBuffer = [];

    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keyBuffer.push(key);
      if (keyBuffer.length > KONAMI_CODE.length) {
        keyBuffer.shift();
      }

      const isMatch = KONAMI_CODE.every(
        (codeKey, idx) => keyBuffer[idx] && keyBuffer[idx].toLowerCase() === codeKey.toLowerCase()
      );

      if (isMatch) {
        setKonamiUnlocked(true);
        setShowArcade(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mini-Game Loop using Canvas
  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameState("playing");
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("gameover");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Canvas render & animation loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    const width = (canvas.width = 600);
    const height = (canvas.height = 260);

    // Player basket
    const player = {
      x: width / 2 - 35,
      y: height - 32,
      width: 70,
      height: 18,
      speed: 8,
    };

    // Falling items
    let items = [];
    let lastSpawn = Date.now();

    const keysPressed = {};
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysPressed["left"] = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysPressed["right"] = true;
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysPressed["left"] = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysPressed["right"] = false;
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * width;
      player.x = Math.max(0, Math.min(width - player.width, mouseX - player.width / 2));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Move player with keys
      if (keysPressed["left"]) {
        player.x = Math.max(0, player.x - player.speed);
      }
      if (keysPressed["right"]) {
        player.x = Math.min(width - player.width, player.x + player.speed);
      }

      // Spawn items
      if (Date.now() - lastSpawn > 550) {
        lastSpawn = Date.now();
        const randType = Math.random();
        let itemType = "flashcard";
        let points = 10;
        let color = "#eb3678";
        let label = "🎴";

        if (randType > 0.8) {
          itemType = "coffee";
          points = 20;
          color = "#fb773c";
          label = "☕";
        } else if (randType < 0.25) {
          itemType = "doomscroll";
          points = -15;
          color = "#999999";
          label = "📱";
        }

        items.push({
          x: Math.random() * (width - 40) + 10,
          y: -20,
          speed: 2.5 + Math.random() * 2,
          type: itemType,
          points,
          color,
          label,
        });
      }

      // Clear canvas
      ctx.fillStyle = "#0d0720";
      ctx.fillRect(0, 0, width, height);

      // Grid background effect
      ctx.strokeStyle = "rgba(79, 23, 135, 0.2)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw player basket (Binder / Tray)
      ctx.fillStyle = "#fb773c";
      ctx.beginPath();
      ctx.roundRect(player.x, player.y, player.width, player.height, 8);
      ctx.fill();

      // Basket glow & label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("STUDY TRAY", player.x + player.width / 2, player.y + 13);

      // Update and draw items
      items.forEach((item, index) => {
        item.y += item.speed;

        // Draw item
        ctx.font = "20px serif";
        ctx.textAlign = "center";
        ctx.fillText(item.label, item.x, item.y);

        // Check collision with basket
        if (
          item.y >= player.y - 10 &&
          item.y <= player.y + player.height &&
          item.x >= player.x - 10 &&
          item.x <= player.x + player.width + 10
        ) {
          setScore((prev) => {
            const nextScore = Math.max(0, prev + item.points);
            setHighScore((currentHigh) => {
              if (nextScore > currentHigh) {
                localStorage.setItem("anki_minibreak_highscore", nextScore.toString());
                return nextScore;
              }
              return currentHigh;
            });
            return nextScore;
          });
          items.splice(index, 1);
        } else if (item.y > height + 20) {
          items.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gameState]);

  return (
    <div className="missing-page">
      {/* Secret Konami Banner */}
      {konamiUnlocked && (
        <div className="missing-page__konami-banner">
          <div className="missing-page__konami-text">
            <i className="fa-solid fa-trophy"></i>
            <span>SECRET KONAMI CODE UNLOCKED! Spaced Repetition God-Mode Activated!</span>
          </div>
          <button
            className="missing-page__konami-close"
            onClick={() => setKonamiUnlocked(false)}
            aria-label="Dismiss banner"
          >
            ×
          </button>
        </div>
      )}

      {/* Failsafe Hero Section */}
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
            <i className="fa-solid fa-house"></i>
            Return to Dashboard
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="missing-page__btn missing-page__btn--secondary"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Go Back
          </button>

          <button
            onClick={() => setShowArcade((prev) => !prev)}
            className="missing-page__btn missing-page__btn--easter-egg"
          >
            <i className="fa-solid fa-gamepad"></i>
            {showArcade ? "Hide Arcade" : "Play Mini-Break Game"}
          </button>
        </div>
      </section>

      {/* Easter Egg 1: Random Study Excuse */}
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

      {/* Easter Egg 2: Retro Arcade Mini-Game */}
      {showArcade && (
        <section className="missing-page__arcade">
          <div className="missing-page__arcade-header">
            <h3 className="missing-page__arcade-title">
              <i className="fa-solid fa-ghost"></i>
              Flashcard Catcher: Mini-Break Challenge
            </h3>
            <div className="missing-page__arcade-stats">
              <div className="missing-page__arcade-stat">
                <span>⏱️ Time:</span>
                <strong>{timeLeft}s</strong>
              </div>
              <div className="missing-page__arcade-stat">
                <span>⭐ Score:</span>
                <strong>{score}</strong>
              </div>
              <div className="missing-page__arcade-stat">
                <span>🏆 Best:</span>
                <strong>{highScore}</strong>
              </div>
            </div>
          </div>

          <div className="missing-page__canvas-wrapper">
            <canvas ref={canvasRef} className="missing-page__canvas" />

            {gameState === "idle" && (
              <div className="missing-page__arcade-overlay">
                <h3>Ready for a 30s Study Break?</h3>
                <p>
                  Move the tray with <strong>Mouse</strong> or <strong>← / → Arrow Keys</strong>.
                  Catch Flashcards (🎴 +10) and Coffee (☕ +20). Avoid Doomscrolling (📱 -15)!
                </p>
                <button onClick={startGame} className="missing-page__arcade-btn">
                  Start Game
                </button>
              </div>
            )}

            {gameState === "gameover" && (
              <div className="missing-page__arcade-overlay">
                <h3>Break Time&apos;s Up!</h3>
                <p>
                  Final Score: <strong>{score}</strong>! Brain refreshed and ready to study.
                </p>
                <button onClick={startGame} className="missing-page__arcade-btn">
                  Play Again
                </button>
              </div>
            )}
          </div>

          <div className="missing-page__arcade-instructions">
            <span>Controls: Move mouse or use Left/Right arrow keys.</span>
            <span>Legend: 🎴 (+10) | ☕ (+20) | 📱 (-15)</span>
          </div>
        </section>
      )}

      <div className="missing-page__footer-hint">
        💡 Pro-tip: The classic Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) unlocks hidden superpowers.
      </div>
    </div>
  );
}

export default MissingPage;