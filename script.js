(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  const GRID_SIZE = 20;
  const TILE_COUNT = canvas.width / GRID_SIZE;
  const MOVE_INTERVAL_MS = 120;
  const HIGH_SCORE_KEY = 'snake-high-score';

  const scoreEl = document.getElementById('score');
  const highScoreEl = document.getElementById('high-score');
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayMessage = document.getElementById('overlay-message');
  const restartBtn = document.getElementById('restart-btn');

  const DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  const KEY_MAP = {
    ArrowUp: 'up', KeyW: 'up',
    ArrowDown: 'down', KeyS: 'down',
    ArrowLeft: 'left', KeyA: 'left',
    ArrowRight: 'right', KeyD: 'right',
  };

  const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };

  let snake;
  let direction;
  let pendingDirection;
  let food;
  let score;
  let highScore = Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  let running;
  let started;
  let lastTick;
  let rafId;

  highScoreEl.textContent = highScore;

  function resetState() {
    snake = [
      { x: Math.floor(TILE_COUNT / 2), y: Math.floor(TILE_COUNT / 2) },
    ];
    direction = null;
    pendingDirection = null;
    score = 0;
    running = false;
    started = false;
    scoreEl.textContent = score;
    placeFood();
    draw();
  }

  function placeFood() {
    let candidate;
    do {
      candidate = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT),
      };
    } while (snake.some(seg => seg.x === candidate.x && seg.y === candidate.y));
    food = candidate;
  }

  function showOverlay(title, message, { isGameOver = false, showRestart = false } = {}) {
    overlayTitle.textContent = title;
    overlayTitle.classList.toggle('game-over', isGameOver);
    overlayMessage.textContent = message;
    restartBtn.classList.toggle('hidden', !showRestart);
    overlay.classList.remove('hidden');
  }

  function hideOverlay() {
    overlay.classList.add('hidden');
  }

  function handleDirectionInput(key) {
    const requested = KEY_MAP[key];
    if (!requested) return false;

    const currentDir = direction;
    if (currentDir && OPPOSITE[requested] === currentDir) {
      return true;
    }

    pendingDirection = requested;

    if (!started) {
      started = true;
      running = true;
      direction = requested;
      pendingDirection = null;
      hideOverlay();
      lastTick = performance.now();
      rafId = requestAnimationFrame(loop);
    }

    return true;
  }

  function update() {
    if (pendingDirection) {
      direction = pendingDirection;
      pendingDirection = null;
    }

    const dir = DIRECTIONS[direction];
    const head = snake[0];
    const newHead = { x: head.x + dir.x, y: head.y + dir.y };

    if (
      newHead.x < 0 || newHead.x >= TILE_COUNT ||
      newHead.y < 0 || newHead.y >= TILE_COUNT ||
      snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
    ) {
      gameOver();
      return;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      score += 1;
      scoreEl.textContent = score;
      if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = highScore;
        localStorage.setItem(HIGH_SCORE_KEY, String(highScore));
      }
      placeFood();
    } else {
      snake.pop();
    }
  }

  function gameOver() {
    running = false;
    cancelAnimationFrame(rafId);
    showOverlay('Game Over', `Final score: ${score}`, { isGameOver: true, showRestart: true });
  }

  function draw() {
    ctx.fillStyle = '#010409';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff4d4d';
    ctx.shadowColor = '#ff4d4d';
    ctx.shadowBlur = 8;
    ctx.fillRect(food.x * GRID_SIZE + 2, food.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);
    ctx.shadowBlur = 0;

    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#39ff14' : '#22c40f';
      ctx.fillRect(seg.x * GRID_SIZE + 1, seg.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    });
  }

  function loop(timestamp) {
    if (!running) return;
    rafId = requestAnimationFrame(loop);

    if (timestamp - lastTick < MOVE_INTERVAL_MS) return;
    lastTick = timestamp;

    update();
    if (running) draw();
  }

  function startNewGame() {
    resetState();
    showOverlay('Snake', 'Press an arrow key or WASD to start');
  }

  document.addEventListener('keydown', (e) => {
    if (KEY_MAP[e.code]) {
      e.preventDefault();
      handleDirectionInput(e.code);
    }
  });

  restartBtn.addEventListener('click', startNewGame);

  startNewGame();
})();
