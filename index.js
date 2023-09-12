const symbols = ['Rock Paper Scissors', 'Snake Game', 'Tic Tac Toe', 'Drawing Time']
count = 0
let inthandle = setInterval(() => {
    document.getElementById("textAnimation").innerHTML = symbols[count];
    count = (count + 1) % symbols.length
}, 800)


