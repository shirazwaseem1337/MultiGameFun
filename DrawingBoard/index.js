const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d")
let start_backgroundColor = "white" // for clear button
context.fillStyle = "white"
context.fillStyle = start_backgroundColor
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;
let is_eraser = false; // Flag to track eraser mode
let last_draw_color = "black"; // Store the last selected color

let restore_array = [];
let index = -1; // 0 means already a path inside



function change_color(element) {
    if (is_eraser) {
        // If eraser mode is on, don't change the draw_color
        return;
    }
    draw_color = element.style.background;
    last_draw_color = draw_color; // Store the last selected color

}

function toggleEraser() {
    is_eraser = !is_eraser;
    const eraserButton = document.getElementById("eraserButton");

    if (is_eraser) {
        eraserButton.classList.add("button-highlighted");

        last_draw_color = draw_color; // Store the last selected color

        // If eraser mode is on, set the draw_color to match the background color (white)
        draw_color = start_backgroundColor;
    } else {
        eraserButton.classList.remove("button-highlighted");

        // If eraser mode is off, reset draw_color to the last selected color
        draw_color = last_draw_color;
    }
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);


canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);



function start(event) {
    is_drawing = true;
    const x = event.type === "touchstart" ? event.touches[0].clientX - canvas.offsetLeft : event.clientX - canvas.offsetLeft;
    const y = event.type === "touchstart" ? event.touches[0].clientY - canvas.offsetTop : event.clientY - canvas.offsetTop;
    context.beginPath();
    context.moveTo(x, y);
    event.preventDefault();
}


function draw(event) {
    if (is_drawing) {
        const x = event.type === "touchmove" ? event.touches[0].clientX - canvas.offsetLeft : event.clientX - canvas.offsetLeft;
        const y = event.type === "touchmove" ? event.touches[0].clientY - canvas.offsetTop : event.clientY - canvas.offsetTop;

        context.lineTo(x, y);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    };

    event.preventDefault();
}


function stop(event) {
    if (is_drawing) {
        context.stroke();
        context.closePath(); // start function mein begin kia tha
        is_drawing = false
    };

    event.preventDefault();

    if (event.type != "mouseout") {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1 // now index will be on 0
    };

    console.log(restore_array)
}


function clear_button() {
    context.fillStyle = start_backgroundColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1
}



function undo_last() {
    if (index <= 0) {
        clear_button();  // nothing inside so clear it
    }

    else {
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0)
    }
}

