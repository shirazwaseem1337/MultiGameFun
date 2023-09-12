let music = new Audio("/TicTacToe/music/music.mp3")
let audioTurn = new Audio("./music/ting.mp3")
let gameover = new Audio("./music/gameover.mp3")

let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

// Function to check for a win
// e0 e1 e2
// 0  1  2
// 3  4  5
// 6  7  8
const checkWin = () => {
    let boxText = document.getElementsByClassName('boxtext');
    // let wins = [
    //     [0, 1, 2, 5, 5, 0],
    //     [3, 4, 5, 5, 15, 0],
    //     [6, 7, 8, 5, 25, 0],
    //     [0, 3, 6, -5, 15, 90],
    //     [1, 4, 7, 5, 15, 90],
    //     [2, 5, 8, 15, 15, 90],
    //     [0, 4, 8, 5, 15, 45],
    //     [2, 4, 6, 5, 15, 135],
    // ]
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxText[e[0]].innerText + " Won! Reset to Play Again"
            isgameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            // toggleWidthBasedOnMediaQuery();
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

// Game Logic
let boxes = document.getElementsByClassName("box");  // will return html collection so arr mein krke forEach laga dia

// Har box py event listener lagana so
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector(".boxtext")
    element.addEventListener("click", () => {
        if (isgameover) {
            return; // If the game is over or the box is already clicked, do nothing
        }
        if (boxText.innerText === '') {
            boxText.innerText = turn;       // andr walay span ko turn bana do
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                if (checkTie()) {
                    document.getElementsByClassName("info")[0].innerText = "It's a tie! Reset to Play Again";
                } else {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                }
            }
        }
    })
})

// Function to check for a tie
const checkTie = () => {
    let boxText = document.getElementsByClassName('boxtext');
    for (let i = 0; i < boxText.length; i++) {
        if (boxText[i].innerText === '') {
            return false; // If any box is empty, it's not a tie
        }
    }
    return true; // All boxes are filled, it's a tie
}

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})

// Function to toggle the width based on the media query
function toggleWidthBasedOnMediaQuery() {
    const mediaQuery = window.matchMedia("(max-width: 950px)");
    const lineElement = document.querySelector(".line");

    // Function to handle the media query change
    function handleMediaQueryChange(e) {
        if (e.matches) {
            lineElement.style.width = "0vw"; // Set the width to 0vw
        }
    }

    // Add an initial check
    handleMediaQueryChange(mediaQuery);

    // Add a listener to update when the media query state changes
    mediaQuery.addEventListener("change", handleMediaQueryChange);
}

// Call the function to set up the initial state
toggleWidthBasedOnMediaQuery();



