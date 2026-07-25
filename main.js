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
let food = {
    x: 20,
    y: 11
};

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

        ctx.fillStyle = "#22C55E";
        ctx.fillRect(SNAKE_X_DRAW, SNAKE_Y_DRAW, GRID_SIZE - 1, GRID_SIZE - 1);
    }
}

function drawFood(reset=false) {
    if (reset) {
        food = {x: 20, y: 11};
    }
    ctx.fillStyle = "red";  
    ctx.fillRect(food.x * GRID_SIZE + 1, food.y * GRID_SIZE + 1, GRID_SIZE - 1, GRID_SIZE - 1);
}

function randFoodGenerate() {
    let newFood = {x: Math.floor(Math.random() * 23) , y: Math.floor(Math.random() * 23)}
    food = newFood;
} 

function increaseBody() {
    const newBody = {x: snake[0].x , y: snake[0].y};
    snake.push(newBody);
    drawSnake();
}

function checkFoodEaten() {
    const SNAKE_HEAD = snake[0];
    if (SNAKE_HEAD.x === food.x && SNAKE_HEAD.y === food.y) {
        ctx.clearRect(0, 0, 600, 600);
        randFoodGenerate();
        increaseBody();
    }
}

function directionEvent() {
    document.addEventListener("keydown", (e) => {
        if (!gameLoop && ['w', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowRight'].includes(e.key)) {
            gameLoop = true;
        }
        if (gameLoop) {
            if (['w', 'ArrowUp'].includes(e.key) && direction !== "DOWN"){
                direction = "UP";
            }
            else if (['a', 'ArrowLeft'].includes(e.key) && direction !== "RIGHT") {
                direction = "LEFT";
            }
            else if (['s', 'ArrowDown'].includes(e.key) && direction !== "UP") {
                direction = "DOWN";
            }
            else if (['d', 'ArrowRight'].includes(e.key) && direction !== "LEFT") {
                direction = "RIGHT";
            }
            console.log("Direction:",direction)
        }
    })
}

function collision() {
    gameLoop = false;
    ctx.clearRect(0, 0, 600, 600);
    direction = null;
    drawSnake(reset=true);
    drawFood(reset=true);
    alert("Game Over!");
}

function moveSnake() {
    const newHead = {x: snake[0].x, y: snake[0].y};
    if (direction === "UP") {
        newHead.y -= 1
    }
    else if (direction === "LEFT") {
        newHead.x -= 1;
    }
    else if (direction === "DOWN") {
        newHead.y += 1;
    }
    else if (direction === "RIGHT") {
        newHead.x += 1;
    }

    snake.unshift(newHead);
    snake.pop();
    ctx.clearRect(0, 0, 600, 600);
    drawSnake();
    drawFood();
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            collision();
        }
    }
}

directionEvent();

drawSnake();
drawFood();

setInterval(() => {
    if (gameLoop) {
        moveSnake();
        checkFoodEaten();
        const checkFood = snake.some(seg => seg.x === food.x && seg.y === food.y);
        if (checkFood) {
            food.x = Math.floor(Math.random() * 23);
            food.y = Math.floor(Math.random() * 23);
        }
        if (snake[0].x > 23 || snake[0].x < 0 || snake[0].y > 23 || snake[0].y < 0) {
            collision();
        }
    }
}, 100);
