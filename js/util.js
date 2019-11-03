function resizeCanvas() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
}

function drawBezierLine([p1, p2, p3, p4], penWidth, penColor) {
    // 记录用户动作
    addCommand(drawBezierLine, arguments)

    //保证画粗笔不会出现毛线
    context.beginPath();
    context.lineWidth = penWidth;
    context.strokeStyle = penColor;
    context.lineCap = 'round'
    context.lineJoin = 'round'

    context.moveTo(p1.x, p1.y)
    context.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
    context.stroke()
}

function clearCanvas() {
    // 记录用户动作
    addCommand(clearCanvas, arguments)

    context.clearRect(0, 0, canvas.width, canvas.height)
}

function wipeCanvas({x, y}, size) {
    // 记录用户动作
    addCommand(wipeCanvas, arguments)

    context.clearRect(x - size/2, y - size/2, size, size)
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

function bindEvents(hash) {
    hash.forEach(o => o.el.addEventListener(o.ev, o.cb))
}

function canTouch() {
    return document.body.ontouchstart!==undefined
}

function isNarrowScreen() {
    return document.documentElement.clientWidth <= 800
}

function debounce(fn, delay) {
    let timer
    return function() {
        let that = this
        let args = arguments

        clearTimeout(timer)

        timer = setTimeout(function() {
            fn.apply(that, args)
        }, delay)
    }
}
