/*
 * 工具栏事件模块
 */

let toolEvent = [
    {el: pen, ev: 'click', cb: onPenClick},
    {el: eraser, ev: 'click', cb: onEraserClick},
    {el: color, ev: 'click', cb: onColorClick},
    {el: colorSelector, ev: 'input', cb: onColorSelectorInput},
    {el: openFile, ev: 'click', cb: onOpenFileClick},
    {el: background, ev: 'click', cb: onBackgroundClick},
    {el: clear, ev: 'click', cb: onClearClick},
    {el: download, ev: 'click', cb: onDownloadClick},
    {el: size, ev: 'input', cb: onSizeInput},
    {el: colorPad, ev: 'click', cb: onColorPadClick},
    {el: colorPad, ev: 'dblclick', cb: onColorPadDblclick}
]

bindEvents(toolEvent)

// 事件
function onPenClick() {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

function onEraserClick() {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

function onColorClick() {
    colorSelector.click()
}

function onColorSelectorInput(e) {
    penColor = e.currentTarget.value
    deactivateColors()
}

function onOpenFileClick() {
    paintSelector.click()
}

function onBackgroundClick() {
    backgroundSelector.click()
}

function onClearClick() {
    clearCanvas()
}

function onDownloadClick() {
    let url = canvas.toDataURL("image/png")
    let a = document.createElement('a')
    a.href = url
    a.download = '我的作品'
    a.click()
}

function onSizeInput(e) {
    setPenWidth(e.currentTarget.value)
}

function onColorPadClick(e) {
    penColor = e.target.dataset.source
    activateColor(e.target)
}

function onColorPadDblclick(e) {
    frequentColorSelector.click()
    let that = e.target
    frequentColorSelector.oninput = function() {
        penColor = that.style.backgroundColor = that.dataset.source = this.value
        this.value = ''
    }
}
