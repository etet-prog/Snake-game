const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext('2d');

const GRID_SIZE = 25;

let direction = null;
let gameLoop = false;

let snake = [
    {x: 4, y: 11},
    {x: 3, y: 11},
    {x: 2, y: 11}
];

const colors = ["#15803D", "#22C55E", "#4ADE80"];

function drawSnake(reset=false) {
    if (reset) {
        snake = [
            {x: 4, y: 11},
            {x: 3, y: 11},
            {x: 2, y: 11}
        ];
    }
    for (let i = 0; i < snake.length; i++) {
        const SNAKE_X = snake[i].x;
        const SNAKE_Y = snake[i].y;

        const SNAKE_X_DRAW = SNAKE_X * GRID_SIZE + 1;
        const SNAKE_Y_DRAW = SNAKE_Y * GRID_SIZE + 1;

        ctx.fillStyle = colors[i];
        ctx.fillRect(SNAKE_X_DRAW, SNAKE_Y_DRAW, GRID_SIZE - 1, GRID_SIZE - 1);
    }
}

function directionEvent() {
    document.addEventListener("keydown", (e) => {
        switch(e.key) {
            case "w":
                if (direction !== "DOWN") {
                    direction = "UP";
                } break
            case "a":
                if (direction !== "RIGHT") {
                    direction = "LEFT";
                } break
            case "s":
                if (direction !== "UP") {
                    direction = "DOWN";
                } break
            case "d":
                if (direction !== "LEFT") {
                    direction = "RIGHT";
                } break
        }
    })
}

function moveSnake() {
    const newHead = {x: snake[0].x, y: snake[0].y};
    switch (direction) {
        case "UP":
            newHead.y -= 1;
            newHead.x = snake[0].x; break;
        case "LEFT":
            newHead.x -= 1;
            newHead.y = snake[0].y; break;
        case "DOWN":
            newHead.y += 1;
            newHead.x = snake[0].x; break;
        case "RIGHT":
            newHead.x += 1;
            newHead.y = snake[0].y; break;
    }
    snake.unshift(newHead);
    snake.pop();
    ctx.clearRect(0, 0, 600, 600);
    drawSnake();
}

function collision() {
    gameLoop = false
    ctx.clearRect(0, 0, 600, 600);
    direction = null;
    drawSnake(reset=true)
}

drawSnake();
document.addEventListener("keydown", (e) => {
    if (['w', 's', 'd'].includes(e.key)) {
        gameLoop = true
        switch(e.key) {
            case "w":
                if (direction !== "DOWN") {
                    direction = "UP"
                } break
            case "s":
                if (direction !== "UP") {
                    direction = "DOWN"
                } break
            case "d":
                if (direction !== "LEFT") { 
                    direction = "RIGHT"
                } break
         }
    }
})
setInterval(() => {
    if (gameLoop) {
        moveSnake()
        directionEvent()
    }
    if (snake[0].x > 23 || snake[0].x < 0 || snake[0].y > 23 || snake[0].y < 0) {
        collision();
        alert("Game Over!")
    }
}, 90);