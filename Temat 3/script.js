window.addEventListener("load", () => {
  let ctx = document.getElementById("game").getContext("2d");
  console.log(ctx.canvas);
  let snake, snakeLength, active, food, move, nextMove;

  addKeydownListener();
  setInterval(renderFrame, 100);
  setDefault();

  function setDefault() {
    snake = [{ x: 10, y: 10 }];
    snakeLength = 2;
    active = false;
    food = generateFoodLocation();
    move = { x: 0, y: 0 };
    nextMove = { x: 0, y: 0 };
  }

  function renderFrame() {
    if (active) {
      if (nextMove.x !== -move.x || nextMove.y !== -move.y) {
        move = nextMove;
      }
      snake.push({
        x: processBound(getHead().x + move.x),
        y: processBound(getHead().y + move.y),
      });
      if (
        snake.filter(
          (square) => square.x === getHead().x && square.y === getHead().y
        ).length >= 2
      ) {
        setDefault();
      } else {
        if (getHead().x === food.x && getHead().y === food.y) {
          console.log(getHead());
          snakeLength++;
          food = generateFoodLocation();
        }
      }

      while (snake.length > snakeLength) {
        snake.shift();
      }
    }

    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "green";
    snake.forEach((square) =>
      ctx.fillRect(square.x * 30, square.y * 30, 28, 28)
    );

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 30, food.y * 30, 28, 28);
  }

  function processBound(number, type) {
    if (number >= 20) {
      return 0;
    } else if (number < 0) {
      return 20;
    }
    return number;
  }

  function getHead() {
    return snake[snake.length - 1];
  }

  function generateFoodLocation() {
    let location;
    do {
      location = { x: generateRandomNumber(1), y: generateRandomNumber(15) };
    } while (
      snake.filter(
        (square) => square.x === location.x && square.y === location.y
      ).length > 0
    );
    return location;
  }

  function generateRandomNumber(maximum) {
    return Math.floor(Math.random() * (maximum + 1));
  }

  function addKeydownListener() {
    window.addEventListener("keydown", (e) => {
      if (e.code.startsWith("Arrow")) {
        active = true;
        console.log(snake);
      }
      switch (e.code) {
        case "ArrowLeft":
          nextMove = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          nextMove = { x: 1, y: 0 };
          break;
        case "ArrowUp":
          nextMove = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          nextMove = { x: 0, y: 1 };
          break;
      }
    });
  }
});
