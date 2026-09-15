# Snake

The classic Snake game, playable in the browser.

## Status

There is no code here yet — this repository is currently just the starting
point for the project.

## Goal

Build a game of Snake that runs entirely client-side:

- Open `index.html` directly in a browser and play — no server, no build
  step, no dependencies to install.
- Plain HTML, CSS, and JavaScript (e.g. rendered on a `<canvas>`).

## Planned gameplay

- The snake moves continuously in a grid and grows each time it eats food.
- Controls: arrow keys (or WASD) to change direction.
- The game ends when the snake hits a wall or itself.
- Score is tracked and shown on screen (e.g. current score / high score).

## Getting started (once implemented)

```
git clone <repo-url>
cd snake
# open index.html in your browser
```

No installation or build tools required.

## Project structure (planned)

```
index.html   Page markup and canvas
style.css    Styling
script.js    Game logic (input, movement, collisions, scoring)
```