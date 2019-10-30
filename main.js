/*1.初始化画布环境*/
var canvas = document.getElementById("painter");
var context = canvas.getContext('2d');

resizeCanvas();

//环境变量
var using = false;
var eraserEnabled = false;
var penWidth = 10;
var penColor = 'black';
var lastPoint = { x: undefined, y: undefined };
var newPoint = { x: undefined, y: undefined };

/*2.监听用户动作*/
listenToUser(canvas);


/*3.下面是工具函数*/
function resizeCanvas() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
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
    resizeCanvas();
}

colorSelector.oninput = function(e) {
    penColor = e.currentTarget.value
}

paintSelector.oninput = function(e) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    let file = e.currentTarget.files[0]
    let url = URL.createObjectURL(file)
    console.log(url)
    let img = new Image()
    img.onload = function() {
        let offsetLeft = (canvas.width - img.width) / 2
        let offsetTop = (canvas.height - img.height) / 2
        context.drawImage(img, offsetLeft, offsetTop, img.width, img.height)
    }
    img.src = url
    e.currentTarget.value = ''
}

backgroundSelector.oninput = function(e) {
    let file = e.currentTarget.files[0]
    let url = URL.createObjectURL(file)
    document.documentElement.style.backgroundImage = `url(${url})`
}

function listenToUser(canvas) {
    listenToMouse(canvas);
    listenToClick(canvas);
}

function listenToMouse(canvas) {
    document.body.ontouchstart!==undefined ? bindTouchEvent(canvas) : bindMouseEvent(canvas)
}

function bindTouchEvent(canvas) {
    canvas.ontouchstart = function(e) {
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

        canvas.ontouchmove = function(e) {
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

        canvas.ontouchend = function(e) {
            using = false;
            lastPoint = { x: undefined, y: undefined }
        }
}

function bindMouseEvent(canvas) {
    canvas.onmousedown = function(e) {
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

    canvas.onmousemove = function(e) {
        e.preventDefault()
        var x = e.clientX;
        var y = e.clientY;
        if (using) {
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
                canvas.className = 'eraserOn'
            } else {
                newPoint = { x: x, y: y };
                drawLine(lastPoint, newPoint);
                lastPoint = newPoint;
            }
        }
    }

    document.documentElement.onmouseup = function(e) {
        using = false;
        canvas.className = ''
        lastPoint = { x: undefined, y: undefined }
    }
}

function listenToClick(canvas) {
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

    color.onclick = function() {
        colorSelector.click()
    }

    upload.onclick = function() {
        paintSelector.click()
    }

    background.onclick = function() {
        backgroundSelector.click()
    }

    clear.onclick = function() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    download.onclick = function() {
        var url = canvas.toDataURL("image/png")
        var a = document.createElement('a')
        a.href = url
        a.download = '我的作品'
        a.click()
    }

    size.oninput = function(e) {
        let {value, min, max} = e.currentTarget
        penWidth = value
        let left = 85 * value / (max - min) + 5
        sizeVal.style.left = `${left}%`
        sizeVal.innerText = value
    }

    black.onclick = function() {
        penColor = "black"
        removeOtherColor()
        black.classList.add('active')
    }

    red.onclick = function() {
        penColor = "red";
        removeOtherColor()
        red.classList.add('active')
    }

    green.onclick = function() {
        penColor = "green";
        removeOtherColor()
        green.classList.add('active')
    }

    blue.onclick = function() {
        penColor = "blue";
        removeOtherColor()
        blue.classList.add('active')
    }

    function removeOtherColor() {
        let colors = document.getElementsByClassName('color')
        for(let i=0; i<colors.length; i++) {
            colors[i].classList.remove('active')
        }
    }
}