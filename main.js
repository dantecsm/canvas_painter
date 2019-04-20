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

    context.lineCap = 'round'  //保证画粗笔不会出现毛线
    context.lineJoin = 'round'

    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(newPoint.x, newPoint.y);
    context.stroke();
    context.closePath();
}

window.onresize = function() {
    autoSetCanvasSize();
}

function listenToUser(yyy) {
    listenToMouse(yyy);
    listenToClick(yyy);
}

function listenToMouse(yyy) {
    if (document.body.ontouchstart !== undefined) {
        yyy.ontouchstart = function(e) {
            e.preventDefault()
            using = true;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = { x: x, y: y };
            }
        }

        yyy.ontouchmove = function(e) {
            e.preventDefault()
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                } else {
                    newPoint = { x: x, y: y };
                    drawLine(lastPoint, newPoint);
                    lastPoint = newPoint;
                }
            }
        }

        yyy.ontouchend = function(e) {
            using = false;
            lastPoint = { x: undefined, y: undefined }
        }

    } else {
        yyy.onmousedown = function(e) {
            e.preventDefault()
            using = true;
            var x = e.clientX;
            var y = e.clientY;
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = { x: x, y: y };
            }
        }

        yyy.onmousemove = function(e) {
            e.preventDefault()
            var x = e.clientX;
            var y = e.clientY;
            if (using) {
                if (eraserEnabled) {
                    context.clearRect(x - 10, y - 10, 20, 20)
                    yyy.className = 'eraserOn'
                } else {
                    newPoint = { x: x, y: y };
                    drawLine(lastPoint, newPoint);
                    lastPoint = newPoint;
                }
            }
        }

        document.body.onmouseup = function(e) {
            using = false;
            yyy.className = ''
            lastPoint = { x: undefined, y: undefined }
        }
    }
}


function listenToClick(yyy) {
    tool.onclick = function() {
        let imgAddr = prompt('请输入图片网址', '')
        console.log(imgAddr)
        document.body.style.backgroundImage = "url(" + imgAddr + ")"
    }

    pen.onclick = function() {
        eraserEnabled = false
        pen.classList.add('active')
        eraser.classList.remove('active')
    }

    eraser.onclick = function() {
        eraserEnabled = true
        eraser.classList.add('active')
        pen.classList.remove('active')
    }

    clear.onclick = function() {
        context.clearRect(0, 0, yyy.width, yyy.height)
    }

    download.onclick = function() {
        var url = yyy.toDataURL("image/png")
        var a = document.createElement('a')
        a.href = url
        a.download = '我的作品'
        a.click()
    }

    thin.onclick = function() {
        penWidth = 4;
        thin.classList.add('active')
        bold.classList.remove('active')
    }

    bold.onclick = function() {
        penWidth = 8;
        thin.classList.remove('active')
        bold.classList.add('active')
    }

    black.onclick = function() {
        penColor = "black"
        removeAll()
        black.classList.add('active')
    }

    red.onclick = function() {
        penColor = "red";
        removeAll()
        red.classList.add('active')
    }

    green.onclick = function() {
        penColor = "green";
        removeAll()
        green.classList.add('active')
    }

    blue.onclick = function() {
        penColor = "blue";
        removeAll()
        blue.classList.add('active')
    }

    function removeAll() {
        black.classList.remove('active')
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }
}