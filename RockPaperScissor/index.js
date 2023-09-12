const computerChoiceDisplay = document.getElementById("computer-choice")
const userChoiceDisplay = document.getElementById("user-choice")
const scoreUserDisplay = document.getElementById("user-score")
const scoreComputerDisplay = document.getElementById("computer-score")
const resultDisplay = document.getElementById("result")
const gameover = document.getElementById("over")
const playagain = document.getElementById("playagain")
const winner = document.getElementById("winner")


const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")
const restartGame = document.getElementById("restart")

possibleChoices = [rock, paper, scissors]

playagain.style.display = "none";




let userChoice
let computerChoice
let result

let userscore = 0
let computerscore = 0


possibleChoices.forEach(possibleChoices =>
    possibleChoices.addEventListener("click", (e) => {
        userChoice = e.target.id
        userChoiceDisplay.innerHTML = `User selects ${userChoice}`
        generateComputerChoice()
        getResult()
    }))

const generateComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1
    console.log(randomNumber)

    if (randomNumber === 1) {
        computerChoice = "rock"
    }

    if (randomNumber === 2) {
        computerChoice = "paper"
    }

    if (randomNumber === 3) {
        computerChoice = "scissors"
    }

    computerChoiceDisplay.innerHTML = `Computer selects ${computerChoice}`
}


const getResult = () => {

    if (userChoice === computerChoice) {
        result = "Its a draw"

    }

    if (userChoice === "scissors" && computerChoice === "rock") {
        result = "You lost!"
        scoreComputerDisplay.innerHTML = ++computerscore

    }

    if (userChoice === "scissors" && computerChoice === "paper") {
        result = "You win!"
        scoreUserDisplay.innerHTML = ++userscore

    }

    if (userChoice === "rock" && computerChoice === "paper") {
        result = "You lost!"
        scoreComputerDisplay.innerHTML = ++computerscore

    }

    if (userChoice === "rock" && computerChoice === "scissors") {
        result = "You win!"
        scoreUserDisplay.innerHTML = ++userscore

    }

    if (userChoice === "paper" && computerChoice === "scissors") {
        result = "You lost!"
        scoreComputerDisplay.innerHTML = ++computerscore

    }

    if (userChoice === "paper" && computerChoice === "rock") {
        result = "You win!"
        scoreUserDisplay.innerHTML = ++userscore

    }

    resultDisplay.innerHTML = result

    if (userscore == 3) {
        winner.innerHTML = "User win!!"
        gameWinner()
    }

    if (computerscore == 3) {
        winner.innerHTML = "Computer win!!"
        gameWinner()
    }

}

const gameWinner = () => {
    gameover.innerHTML = "Game Over"
    playagain.innerHTML = "Play Again"
    restartGame.remove()
    playagain.style.display = "block";

    var action = document.getElementById("action-message")
    action.innerHTML = ""

    gameover.style.position = "fixed";
    gameover.style.left = "0";
    gameover.style.bottom = "0";
    gameover.style.width = "100%";
    gameover.style.height = "50px";
    gameover.style.padding = "10px";
    gameover.style.backgroundColor = "red";
    gameover.style.textAlign = "center";
    gameover.style.color = "white";
    gameover.style.fontSize = "25px";
    gameover.style.fontWeight = "bold";


    var choices = document.querySelectorAll('.choice');
    // Option 1: Disable click events on the images
    // choices.forEach(function (choice) {
    //     choice.style.pointerEvents = 'none';
    // });

    // Option 2: Remove the images from the front page
    choices.forEach(function (choice) {
        choice.parentNode.removeChild(choice);
    });

}

restartGame.addEventListener('click', () => {
    userscore = 0
    computerscore = 0
    scoreComputerDisplay.innerHTML = 0
    scoreUserDisplay.innerHTML = 0
    computerChoiceDisplay.innerHTML = ""
    userChoiceDisplay.innerHTML = ""
    resultDisplay.innerHTML = "Waiting for user turn"

})

playagain.addEventListener('click', () => {
    location.reload()
})










