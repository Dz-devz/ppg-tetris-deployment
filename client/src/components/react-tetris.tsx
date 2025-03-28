import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Tetris from "react-tetris";

interface TetrisController {
  moveDown: () => void;
  // Add other methods as needed
  restart: () => void;
}

const ReactTetris = () => {
  const [start, setStart] = useState<boolean>(false);
  const [gameLevel, setGameLevel] = useState<number>(1);
  const gameStartTimeRef = useRef<number | null>(null);
  const levelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tetrisControllerRef = useRef<TetrisController | null>(null);
  const [text, setText] = useState("PVP");
  const [textPro, setTextPro] = useState("PVP Pro");

  async function createTetrisCount({ tetrisCount }: { tetrisCount: number }) {
    await axios.post("https://ppg-server.onrender.com/players-count", {
      tetrisCount,
    });
  }

  useEffect(() => {
    // Prevent default behavior for game control keys
    const handleKeyDown = (event: KeyboardEvent) => {
      const blockedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
      ];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle game speed increase
  useEffect(() => {
    if (start && !gameStartTimeRef.current) {
      gameStartTimeRef.current = Date.now();

      // Set interval to increase level every 30 seconds
      levelTimerRef.current = setTimeout(function increaseLevel() {
        setGameLevel((prevLevel) => {
          const newLevel = prevLevel + 1;
          console.log(`Speed increased to level ${newLevel}`);

          // If we have access to the controller, send more frequent drops
          if (tetrisControllerRef.current) {
            // Simulate more frequent drops as level increases
            triggerFasterDrops();
          }

          return newLevel;
        });

        // Set the next timer
        levelTimerRef.current = setTimeout(increaseLevel, 30000);
      }, 30000); // 30 seconds
    }

    // Clear interval when game stops
    if (!start && levelTimerRef.current) {
      clearTimeout(levelTimerRef.current);
      levelTimerRef.current = null;
      gameStartTimeRef.current = null;
      setGameLevel(1);
    }

    return () => {
      if (levelTimerRef.current) {
        clearTimeout(levelTimerRef.current);
      }
    };
  }, [start]);

  // Function to trigger faster drops based on current level
  const triggerFasterDrops = () => {
    if (!tetrisControllerRef.current) return;

    // Calculate drop interval based on level
    const baseInterval = 1000; // 1 second
    const reducedInterval = Math.max(baseInterval - (gameLevel - 1) * 100, 100);

    // Clear any existing auto-drop interval
    if (window.autoDropInterval) {
      clearInterval(window.autoDropInterval);
    }

    // Create a new auto-drop interval
    window.autoDropInterval = setInterval(() => {
      if (tetrisControllerRef.current && tetrisControllerRef.current.moveDown) {
        tetrisControllerRef.current.moveDown();
      }
    }, reducedInterval);
  };

  // Function to handle game restart
  const handleRestart = (controller: TetrisController) => {
    // Reset level
    setGameLevel(1);

    // Reset timer
    if (levelTimerRef.current) {
      clearTimeout(levelTimerRef.current);
    }

    // Clear auto-drop interval
    if (window.autoDropInterval) {
      clearInterval(window.autoDropInterval);
    }

    gameStartTimeRef.current = Date.now();

    // Start new timer
    levelTimerRef.current = setTimeout(function increaseLevel() {
      setGameLevel((prevLevel) => {
        const newLevel = prevLevel + 1;
        triggerFasterDrops();
        return newLevel;
      });

      // Set the next timer
      levelTimerRef.current = setTimeout(increaseLevel, 30000);
    }, 30000);

    // Restart the game
    controller.restart();
  };

  // Save the controller reference when it's available
  const captureController = (controller: TetrisController) => {
    tetrisControllerRef.current = controller;

    // Start the auto-drop when the game starts
    if (start && gameLevel > 1) {
      triggerFasterDrops();
    }
  };

  return (
    <div className="flex flex-col items-center font-pixelify text-gray-600">
      <h1 className="text-2xl font-bold text-gray-700">Tetris</h1>

      {!start ? (
        <button
          onClick={() => {
            setStart(true);
            createTetrisCount({ tetrisCount: 1 });
          }}
          className="relative px-6 py-2 mt-4 text-white font-semibold bg-green-500 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out
          before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
          hover:before:scale-x-100 hover:text-green-900 hover:border-green-500 hover:border-2"
        >
          Start Game
        </button>
      ) : (
        <div className="relative">
          <Tetris
            keyboardControls={{
              down: "MOVE_DOWN",
              left: "MOVE_LEFT",
              right: "MOVE_RIGHT",
              space: "HARD_DROP",
              z: "FLIP_COUNTERCLOCKWISE",
              x: "FLIP_CLOCKWISE",
              up: "FLIP_CLOCKWISE",
              c: "HOLD",
              shift: "HOLD",
            }}
          >
            {({
              HeldPiece,
              Gameboard,
              PieceQueue,
              points,
              linesCleared,
              state,
              controller,
            }) => {
              // Capture the controller reference
              captureController(controller);

              return (
                <div className="flex flex-col items-center">
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <p className="text-lg mt-6 uppercase mb-2">Hold</p>
                      <div className="bg-gray-100 p-2 rounded">
                        <HeldPiece />
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition"
                        onClick={() => setText("Coming Soon")}
                      >
                        {text}
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 mt-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={() => setTextPro("Coming Soon")}
                      >
                        {textPro}
                      </button>
                    </div>
                    <div
                      className="bg-gray-100 p-2 rounded relative"
                      style={{ transform: "scale(0.85)" }}
                    >
                      <Gameboard />
                      {state === "LOST" && (
                        <div
                          className="absolute mt-2 inset-0 bg-black flex flex-col items-center justify-center"
                          style={{ height: "100%" }}
                        >
                          <h2 className="text-xl font-semibold text-white mb-4">
                            Game Over
                          </h2>
                          <button
                            onClick={() => handleRestart(controller)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                          >
                            New Game
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-lg mt-6 uppercase mb-2">Next</p>
                      <div
                        className="bg-gray-100 p-2 rounded overflow-hidden"
                        style={{ height: "300px" }}
                      >
                        <PieceQueue />
                      </div>
                      <div className="mt-2 bg-gray-100 p-2 rounded w-full">
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-lg uppercase tracking-wide">
                              Points
                            </span>
                            <span className="text-lg font-semibold text-gray-500">
                              {points.toString().padStart(4, "0")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-lg uppercase tracking-wide">
                              Lines
                            </span>
                            <span className="text-lg font-semibold text-gray-500">
                              {linesCleared.toString().padStart(4, "0")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg uppercase tracking-wide">
                              Level
                            </span>
                            <span className="text-lg font-semibold text-green-500">
                              {gameLevel}
                            </span>
                          </div>
                          <div className="mt-6 max-w-md text-[16px] text-gray-500">
                            <h3 className="font-semibold mb-2">Controls:</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <div>← → : Move</div>
                              <div>↓ : Soft Drop</div>
                              <div>↑ or X : Rotate CW</div>
                              <div>Z : Rotate CCW</div>
                              <div>Space : Hard Drop</div>
                              <div>C or Shift : Hold</div>
                              <div>P : Pause</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Tetris>
        </div>
      )}
    </div>
  );
};

// Add a global declaration for our custom interval
declare global {
  interface Window {
    autoDropInterval: ReturnType<typeof setInterval> | null;
  }
}

// Initialize the global variable
if (typeof window !== "undefined") {
  window.autoDropInterval = null;
}

export default ReactTetris;
