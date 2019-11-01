let html = document.documentElement
let canvas = document.getElementById("painter");
let context = canvas.getContext('2d');

let using = false;
let eraserEnabled = false;
let penWidth = 7;
let penColor = 'black';
let lastPoint = { x: undefined, y: undefined };
let newPoint = { x: undefined, y: undefined };

let PEN_WIDTH_MIN = 1
let PEN_WIDTH_MAX = 40

init()

function init() {
    resizeCanvas()
}
