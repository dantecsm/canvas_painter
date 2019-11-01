/*
 * 画布事件模块
 */

let canvasEvent = {
	mouseEvent: [
        {el: canvas, ev: 'mousedown', cb: onCanvasMousedown},
        {el: canvas, ev: 'mousemove', cb: onCanvasMousemove},
        {el: html, ev: 'mouseup', cb: onCanvasMouseup},
        {el: canvas, ev: 'wheel', cb: onCanvasWheel},
	],
	touchEvent: [
		{el: canvas, ev: 'touchstart', cb: onCanvasTouchstart},
		{el: canvas, ev: 'touchmove', cb: onCanvasTouchmove},
		{el: html, ev: 'touchend', cb: onCanvasTouchend}
	]
}

!canTouch() && bindEvents(canvasEvent.mouseEvent)
canTouch() && bindEvents(canvasEvent.touchEvent)

// 事件
function onCanvasMousedown (e) {
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

function onCanvasMousemove (e) {
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

function onCanvasMouseup (e) {
    using = false;
    canvas.className = ''
    lastPoint = { x: undefined, y: undefined }
}

function onCanvasWheel (e) {
    let value = penWidth - e.deltaY / 100
    setPenWidth(value)
}

function onCanvasTouchstart(e) {
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

function onCanvasTouchmove(e) {
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

function onCanvasTouchend(e) {
    using = false;
    lastPoint = { x: undefined, y: undefined }
}
