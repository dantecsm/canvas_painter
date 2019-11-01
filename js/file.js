/*
 * 图片上传处理模块
 */

let fileEvent = [
    {el: paintSelector, ev: 'input', cb: onPaintSelectorInput},
    {el: backgroundSelector, ev: 'input', cb: onBackgroundSelectorInput}
]

bindEvents(fileEvent)

function onPaintSelectorInput(e) {
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

function onBackgroundSelectorInput(e) {
    let file = e.currentTarget.files[0]
    let url = URL.createObjectURL(file)
    document.body.style.backgroundImage = `url(${url})`
}