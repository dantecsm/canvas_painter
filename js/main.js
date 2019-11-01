let html = document.documentElement
let canvas = document.getElementById("painter");
let context = canvas.getContext('2d');

let using = false;
let eraserEnabled = false;
let penWidth = 7;
let penColor = 'black';
let eraserSize = 20;
let bezierQueue = [];

let PEN_WIDTH_MIN = 1
let PEN_WIDTH_MAX = 40

init()

function init() {
    resizeCanvas()
}
