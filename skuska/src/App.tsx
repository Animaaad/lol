import React, { useRef, useEffect, useState } from "react";
import eatSoundFile from "./eat.ogg";
import collisionSoundFile from "./collision.ogg";
import hohohoSoundFile from "./hohoho.mp3";

const CELL_SIZE = 20;
const BOARD_WIDTH = 57 * CELL_SIZE;
const BOARD_HEIGHT = 30 * CELL_SIZE;
const SOCKET_URL = "wss://worm-backend.onrender.com";

const WORM_HEAD_SIZE = (CELL_SIZE / 5) * 4; // triangle size
const WORM_BODY_SIZE = WORM_HEAD_SIZE / 2; // circle size
const FOOD_SIZE = WORM_HEAD_SIZE / 2; // circle size
const TREE_SIZE = WORM_HEAD_SIZE / 2; // Christmas tree size

type Point = { x: number; y: number };

type Direction = "up" | "down" | "left" | "right";

function drawWorm(
  ctx: CanvasRenderingContext2D,
  worm: Point[],
  color: string,
  direction: Direction,
  alive: boolean = true
) {
  ctx.fillStyle = color;
  if(alive) {
      
  }
    ctx.beginPath();
    ctx.moveTo(worm[0].x * CELL_SIZE + (CELL_SIZE - WORM_HEAD_SIZE), worm[0].y * CELL_SIZE + (CELL_SIZE - WORM_HEAD_SIZE)); // Starting point (x, y)
    ctx.lineTo(worm[0].x + WORM_HEAD_SIZE, worm[0].y + WORM_HEAD_SIZE / 2); // Second point (x, y)
    ctx.lineTo(worm[0].x, worm[0].y + WORM_HEAD_SIZE); // Third point (x, y)
    ctx.closePath();
    for (var i = 1; i < worm.length; i++) {
      ctx.arc(worm[i].x * CELL_SIZE, worm[i].y * CELL_SIZE, WORM_BODY_SIZE, 0, 2 * Math.PI);
    }
    ctx.arc(200, 200, 100, 0, Math.PI * 2);
}

const wormColors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
  "Teal",
  "Magenta",
];

type Worm = {
  id: string;
  color: string;
  segments: Point[];
  direction: Direction;
  alive: boolean;
  username: string;
  score: number;
};

type GameState = {
  worms: Record<string, Worm>;
  food: Point[];
  walls: Point[];
  bushes: Point[];
  christmasTree: Point;
  running: boolean;
};

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [color, setColor] = useState(wormColors[0]);
  const [roomId, setRoomId] = useState("default");
  const [players, setPlayers] = useState<
    { id: string; username: string; color: string }[]
  >([]);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [lastScore, setLastScore] = useState<number>(0);
  const [wasAlive, setWasAlive] = useState<boolean>(true);
  const eatSound = useRef<HTMLAudioElement | null>(null);
  const collisionSound = useRef<HTMLAudioElement | null>(null);
  const hohohoSound = useRef<HTMLAudioElement | null>(null);

  // doplnit


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

      
      

      requestAnimationFrame(render);
    }

    render();
  }, [gameState]);

  if (!joined) {
    return (
      <div className="app-center">
        <h1>Join Multiplayer Worm Game</h1>
        <form onSubmit={handleJoin} className="form-container">
          {/* doplnit  */}
        </form>
      </div>
    );
  }

  return (
    <div className="app-center">
      <h1>Multiplayer Worm Game</h1>
      <div className="room-info">
        <div className="room-title">
          Players in Room: <span className="room-id">{roomId}</span>
        </div>
        {/* doplnit */}
      </div>
      <canvas
        ref={canvasRef}
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        className="game-canvas"
      />
      <audio ref={eatSound} src={eatSoundFile} preload="auto" />
      {/* doplnit */}
    </div>
  );
};

export default App;
