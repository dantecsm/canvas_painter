/* 1.初始化画布环境 */
let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

autoSetCanvasSize();

// 环境变量
let using = false;
let eraserEnabled = false;
let penWidth = 4;
let penColor = 'black';
let lastPoint = { x: undefined, y: undefined };
let newPoint = { x: undefined, y: undefined };

/* 2.监听用户动作 */
listenToUser(canvas);


/* 3.工具函数 */
function listenToUser(canvas) {
    listenToMouse(canvas);
    listenToClick(canvas);
}

function listenToMouse(canvas) {
    if (document.body.ontouchstart !== undefined) {
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

    } else {
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

        document.body.onmouseup = function(e) {
            using = false;
            canvas.className = ''
            lastPoint = { x: undefined, y: undefined }
        }
    }
}


function listenToClick(canvas) {
    // tool.onclick = function() {
    //     let imgAddr = prompt('请输入图片网址', '0w0')
    //     console.log(imgAddr)
    //     document.body.style.backgroundImage = "url(" + imgAddr + ")"
    // }

    // thin.onclick = function() {
    //     penWidth = 4;
    //     thin.classList.add('active')
    //     bold.classList.remove('active')
    // }

    // bold.onclick = function() {
    //     penWidth = 8;
    //     thin.classList.remove('active')
    //     bold.classList.add('active')
    // }

    // black.onclick = function() {
    //     penColor = "black"
    //     removeAll()
    //     black.classList.add('active')
    // }

    // red.onclick = function() {
    //     penColor = "red";
    //     removeAll()
    //     red.classList.add('active')
    // }

    // green.onclick = function() {
    //     penColor = "green";
    //     removeAll()
    //     green.classList.add('active')
    // }

    // blue.onclick = function() {
    //     penColor = "blue";
    //     removeAll()
    //     blue.classList.add('active')
    // }

    // function removeAll() {
    //     black.classList.remove('active')
    //     red.classList.remove('active')
    //     green.classList.remove('active')
    //     blue.classList.remove('active')
    // }
}






