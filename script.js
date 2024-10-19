const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });
}

function update() {
    // Move snake
    const head = { x: snake[0].x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0), y: snake[0].y + (direction === 'up' ? -1 : direction === 'down' ? 1 : 0) };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * (canvas.width / cellSize)), y: Math.floor(Math.random() * (canvas.height / cellSize)) };
    } else {
        snake.pop();
    }
}

function loop() {
    update();
    draw();
    setTimeout(loop, 100); // Adjust speed here
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

loop();
