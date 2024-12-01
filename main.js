const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

const leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

const rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

const ball = {
    x: canvas.width / 2 - ballSize / 2,
    y: canvas.height / 2 - ballSize / 2,
    width: ballSize,
    height: ballSize,
    dx: 4,
    dy: 4
};

function drawRect(x, y, width, height) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, size, size);
}

function moveLeftPaddle() {
    if (ball.y < leftPaddle.y + leftPaddle.height / 2) {
        leftPaddle.y -= leftPaddle.dy;
    } else {
        leftPaddle.y += leftPaddle.dy;
    }
}

function moveRightPaddle(event) {
    const key = event.keyCode;
    if (key === 38 && rightPaddle.y > 0) {
        rightPaddle.y -= rightPaddle.dy;
    } else if (key === 40 && rightPaddle.y < canvas.height - rightPaddle.height) {
        rightPaddle.y += rightPaddle.dy;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y + ball.height >= canvas.height) {
        ball.dy *= -1;
    }

    if (ball.x <= leftPaddle.x + leftPaddle.width && ball.y + ball.height >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.width >= rightPaddle.x && ball.y + ball.height >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.height) {
        ball.dx *= -1;
    }
}

function update() {
    moveLeftPaddle();
    moveBall();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    drawBall(ball.x, ball.y, ball.width);
    requestAnimationFrame(update);
}

document.addEventListener('keydown', moveRightPaddle);
update();
