const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;

const snake = [
    {x: 10, y: 10},
    {x: 9, y: 10},
    {x: 8, y: 10},
];

function snakeDraw() {
    for (let i = 0; i < snake.length; i++) {
        const SNAKE_X = snake[i].x;
        const SNAKE_Y = snake[i].y

        const SNAKE_X_DRAW = SNAKE_X * GRID_SIZE + 1;
        const SNAKE_Y_DRAW = SNAKE_Y * GRID_SIZE + 1;

        ctx.fillStyle = "green"
        ctx.fillRect(SNAKE_X_DRAW, SNAKE_Y_DRAW, GRID_SIZE - 1, GRID_SIZE - 1);
    }
}

function moveSnake() {
    const newHead = {x: snake[0].x + 1, y: snake[0].y};
    snake.unshift(newHead)
    snake.pop()
    ctx.clearRect(0, 0, 600, 600)
    snakeDraw()
}

snakeDraw();
setInterval(() => {
    moveSnake()
}, 1000);