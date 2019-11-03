let commandStack = []
let stackTop = -1
let redrawing = false

function addCommand(fn, args) {
  if(!redrawing) {
		stackTop += 1
	  args = JSON.parse(JSON.stringify([...args]))
  	commandStack[stackTop] = {fn, args}
  	commandStack.length = stackTop + 1
  }
}

function undo() {
	if(stackTop >= 0) {
		stackTop -= 1
	  redrawing = true
	  redraw()
	  redrawing = false
	}
}

function redo() {
	if(stackTop + 1 < commandStack.length) {
		stackTop += 1
	  redrawing = true
	  redraw()
	  redrawing = false		
	}
}

function redraw() {
  clearCanvas()
  for(let i=0; i<=stackTop; i++) {
      let {fn, args} = commandStack[i]
      fn.apply(null, args)
  }
}

document.addEventListener('keydown', e => {
  e.ctrlKey && e.key === 'z' && undo()
})

document.addEventListener('keydown', e => {
  e.ctrlKey && e.key === 'y' && redo()
})
