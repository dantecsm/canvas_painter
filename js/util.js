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
