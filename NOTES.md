I already have the Snake game working with the existing `index.html`, `style.css`, and `script.js` files in my workspace. I want to modify the current game with two new features.

Please read the existing files and update the code to implement the following:

1. **Screen Wrapping (Pass through walls)**: Update the movement and collision logic in `script.js`. The snake should no longer die when hitting the canvas boundaries. Instead, if it moves off one edge of the canvas, it must instantly wrap around and appear on the opposite edge. The game over condition should now ONLY trigger if the snake hits its own body.
2. **Purple Snake**: Change the rendering logic (likely in `script.js` or `style.css`) so that the snake's body is colored a vibrant purple.

If you have permission to edit files directly, please apply these changes and overwrite the existing files. If not, please output the completely updated `script.js` (and any other modified files) so I can copy-paste and overwrite them myself. Do not generate a completely new project, just modify the current implementation.