/*1.初始化画布环境*/
var yyy = document.getElementById("xxx");
var context = yyy.getContext('2d');

autoSetCanvasSize();

//环境变量
var using = false;
var eraserEnabled = false;
var penWidth = 4;
var penColor = 'black';
var lastPoint = { x: undefined, y: undefined };
var newPoint = { x: undefined, y: undefined };

/*2.监听用户动作*/
listenToUser(yyy);


/*3.下面是工具函数*/
function autoSetCanvasSize() {
    yyy.width = document.documentElement.clientWidth
    yyy.height = document.documentElement.clientHeight
}

function drawLine(lastPoint, newPoint) {
    context.beginPath();
    context.lineWidth = penWidth;
    context.strokeStyle = penColor;
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(newPoint.x, newPoint.y);
    context.stroke();
    context.closePath();
}

window.onresize = function () {
    autoSetCanvasSize();
}

function listenToUser(yyy) {
    if (document.body.ontouchstart !== undefined) {
        yyy.ontouchstart = function (e) {
            using = true;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = { x: x, y: y };
            }
        }

        yyy.ontouchmove = function (e) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                }
                else {
                    newPoint = { x: x, y: y };
                    drawLine(lastPoint, newPoint);
                    lastPoint = newPoint;
                }
            }
        }

        yyy.ontouchend = function (e) {
            using = false;
            lastPoint = { x: undefined, y: undefined }
        }

    } else {
        yyy.onmousedown = function (e) {
            using = true;
            var x = e.clientX;
            var y = e.clientY;
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = { x: x, y: y };
            }
        }

        yyy.onmousemove = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                }
                else {
                    newPoint = { x: x, y: y };
                    drawLine(lastPoint, newPoint);
                    lastPoint = newPoint;
                }
            }
        }

        yyy.onmouseup = function (e) {
            using = false;
            lastPoint = { x: undefined, y: undefined }
        }
    }

    eraser.onclick = function () {
        eraserEnabled = true
        actions.className = 'actions x'
    }

    brush.onclick = function () {
        eraserEnabled = false
        actions.className = 'actions'
    }

    black.onclick = function () {
        penColor = "black";
    }

    red.onclick = function () {
        penColor = "red";
    }

    green.onclick = function () {
        penColor = "green";
    }

    blue.onclick = function () {
        penColor = "blue";
    }
}