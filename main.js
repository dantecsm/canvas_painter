/*1.初始化画布环境*/
let canvas = document.getElementById("painter");
let context = canvas.getContext('2d');

resizeCanvas();

//环境变量
let using = false;
let eraserEnabled = false;
let penWidth = 7;
let penColor = 'black';
let lastPoint = { x: undefined, y: undefined };
let newPoint = { x: undefined, y: undefined };

let PEN_WIDTH_MIN = 1
let PEN_WIDTH_MAX = 40

/*2.监听用户动作*/
listenToUser(canvas);


function listenToUser(canvas) {
    listenToMouse(canvas)
    listenToClick(canvas)
    listenToInput(canvas)
    listenToResze(canvas)
}

function listenToMouse(canvas) {
    document.body.ontouchstart!==undefined ? bindTouchEvent(canvas) : bindMouseEvent(canvas)
}

function bindTouchEvent(canvas) {
    canvas.ontouchstart = function(e) {
            e.preventDefault()
            using = true;
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = { x: x, y: y };
            }
        }

        canvas.ontouchmove = function(e) {
            e.preventDefault()
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
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
        let x = e.clientX;
        let y = e.clientY;
        if (eraserEnabled) {
            context.clearRect(x - 10, y - 10, 20, 20)
        } else {
            lastPoint = { x: x, y: y };
        }
    }

    canvas.onmousemove = function(e) {
        e.preventDefault()
        let x = e.clientX;
        let y = e.clientY;
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

    canvas.onwheel = function(e) {
        let value = penWidth - e.deltaY / 100
        setPenWidth(value)
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
        let url = canvas.toDataURL("image/png")
        let a = document.createElement('a')
        a.href = url
        a.download = '我的作品'
        a.click()
    }

    size.oninput = function(e) {
        setPenWidth(e.currentTarget.value)
    }

    colorPad.onclick = function(e) {
        penColor = e.target.dataset.source
        activateColor(e.target)
    }

    colorPad.ondblclick = function(e) {
        frequentColorSelector.click()
        let that = e.target
        frequentColorSelector.oninput = function() {
            penColor = that.style.backgroundColor = that.dataset.source = this.value
            this.value = ''
        }
    }
}

function listenToInput(canvas) {
    colorSelector.oninput = function(e) {
        penColor = e.currentTarget.value
        deactivateColors()
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
        document.body.style.backgroundImage = `url(${url})`
    }
}

function listenToResze(canvas) {
    window.onresize = function() {
        resizeCanvas();
    }
}

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

function activateColor(el) {
    deactivateColors()
    el.classList.add('active')
}

function deactivateColors() {
    let colors = document.getElementsByClassName('color')
    for(let i=0; i<colors.length; i++) {
        colors[i].classList.remove('active')
    }
}

function setPenWidth(value) {
    if(value < PEN_WIDTH_MIN || value > PEN_WIDTH_MAX) return
    penWidth = size.value = value
    let left = value * (92 - 7) / (40 - 1) + 5
    sizeVal.style.left = `${left}%`
    sizeVal.innerText = value
}
