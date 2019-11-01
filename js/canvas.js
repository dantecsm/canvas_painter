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
        wipeCanvas({x, y}, eraserSize)
      } else {
        bezierQueue = [{x, y}, {x, y}, {x, y}]
      }
}

function onCanvasMousemove (e) {
    e.preventDefault()
    let x = e.clientX;
    let y = e.clientY;
    if (using) {
        if (eraserEnabled) {
            wipeCanvas({x, y}, eraserSize)
            canvas.className = 'eraserOn'
        } else {
            bezierQueue.push({x, y})
            if(bezierQueue.length === 4) {
                drawBezierLine(bezierQueue, penWidth, penColor)
                bezierQueue.splice(0, 3)
            }
        }
    }
}

function onCanvasMouseup (e) {
    using = false;
    canvas.className = ''
    bezierQueue = []
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
        wipeCanvas({x, y}, eraserSize)
    } else {
        bezierQueue = [{x, y}, {x, y}, {x, y}]
    }
}

function onCanvasTouchmove(e) {
    e.preventDefault()
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    if (using) {
        if (eraserEnabled) {
            wipeCanvas({x, y}, eraserSize)
        } else {
             bezierQueue.push({x, y})
            if(bezierQueue.length === 4) {
                drawBezierLine(bezierQueue, penWidth, penColor)
                bezierQueue.splice(0, 3)
            }
        }
    }
}

function onCanvasTouchend(e) {
    using = false;
    bezierQueue = []
}
