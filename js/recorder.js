let commandQueue = []
let undoing = false

function addCommand(fn, args) {
    args = JSON.parse(JSON.stringify([...args]))
    !undoing && commandQueue.push({fn, args})
}

function undo() {
    commandQueue.pop()
    undoing = true
    redraw()
    undoing = false
}

function redraw() {
    clearCanvas()
    for(let i=0; i<commandQueue.length; i++) {
        let {fn, args} = commandQueue[i]
        fn.apply(null, args)
    }
}

document.addEventListener('keydown', e => {
    e.ctrlKey && e.key === 'z' && undo()
})