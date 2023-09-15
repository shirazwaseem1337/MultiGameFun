// Game constant and variables
let inputDir = { x: 0, y: 0 }  // initial direction 0 (snake static)
const foodSound = new Audio("../SnakeGame/music/food.mp3")
const gameOverSound = new Audio('../SnakeGame/music/gameover.mp3');
const moveSound = new Audio('../SnakeGame/music/move.mp3');
const musicSound = new Audio('../SnakeGame/music/music.mp3');


let speed = 10;                   // modes rkh lena
let lastPaintTime = 0;
let score = 0;


// snake head 

// snake is array iska boht elements ha it is increasing size by eating food
let snakeArr = [
    { x: 13, y: 15 }
]

// food is not array
food = { x: 6, y: 7 };




// Game functions
function main(ctime) {

    window.requestAnimationFrame(main);       // ab main call huta rhy ga
    // console.log(ctime)           // game chal rha boht tezi sy timer

    // reducing fps as requestAnimationFrame gives very very good fps so how we play game?

    // 1/speed kitni der baad render

    // return; nahi chae ye render wait kro jab tk if conditon fail tb lastPaintTime update kia

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;       // jab tk fail na hu 
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        // if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        //     return true;
        // }

        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }



    // If you bump into the wall
    // grid 0 sy 18 tk ha
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}


function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");

        // reset krrhy alert enter krne ke baad means dubara reset krna game
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food

    // jab snake ki mundi braber hujaye food sy and coordinates match hujaye
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        score += 1

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;   // new wala set
        }

        scoreBox.innerHTML = "Score: " + score;

        // unshift -> arr ke starting mein add      jahan move krrhaa wahan py add   when you eaten uski mundi ki direction py aik khana add
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        // kahan sy grid shru
        // making it easy so 2 sy 16 mein generate
        let a = 2;
        let b = 16;
        // generating new food,     as its int so math.round a sy lekr b tk generate no. formula for generating random number
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake
    // har aik segment ko iske agy wala ke upper rkh do

    // we iterate our whole snake body
    // ulta snake chala rhy -2 is lia 2nd last element sy start krrhy and tb tk chalao all the way 0 tk mtlb end head is 0

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };  // all together new object created     // i + 1 -> last element
    }

    // index element ko kahan daal rhy? yahan
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and Food
    // Display the snake
    // sab sy phely board clean
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        // jitna khata jaye utny snake array mein add krta rhy
        // sarey objects jo snake array mein ha

        // creating element
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;        // row is not x upper sy daal rhy 1 2 3 4 krke neeche jarha
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {      // agar phela element ha means head ha
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}















// Main logic
let hiscore = localStorage.getItem("hiscore");  // console mein null arha
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);         // hiscore = localStorage.getItem("hiscore");
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}

window.requestAnimationFrame(main)


// 1st arg event listener , 2nd function
window.addEventListener("keydown", e => {     // keydown koi bhi button
    musicSound.play()

    // Store the previous direction
    const prevDirX = inputDir.x;
    const prevDirY = inputDir.y;

    // konsi key dabai gye?
    switch (e.key) {
        case "ArrowUp":
            // Ignore the "up" key if the previous direction was "down"
            if (prevDirY !== 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            // Ignore the "down" key if the previous direction was "up"
            if (prevDirY !== -1) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;

        case "ArrowLeft":
            // Ignore the "left" key if the previous direction was "right"
            if (prevDirX !== 1) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;

        case "ArrowRight":
            // Ignore the "right" key if the previous direction was "left"
            if (prevDirX !== -1) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;

        default:
            break;
    }

    // Play move sound if the direction changed
    if (prevDirX !== inputDir.x || prevDirY !== inputDir.y) {
        moveSound.play();
    }
}
)

// Add event listeners for mobile arrow buttons
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

upButton.addEventListener("click", () => {
    if (inputDir.y !== 1) {
        inputDir.x = 0;
        inputDir.y = -1;
    }
});

downButton.addEventListener("click", () => {
    if (inputDir.y !== -1) {
        inputDir.x = 0;
        inputDir.y = 1;
    }
});

leftButton.addEventListener("click", () => {
    if (inputDir.x !== 1) {
        inputDir.x = -1;
        inputDir.y = 0;
    }
});

rightButton.addEventListener("click", () => {
    if (inputDir.x !== -1) {
        inputDir.x = 1;
        inputDir.y = 0;
    }
});
