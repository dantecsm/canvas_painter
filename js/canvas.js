{
  let view = {
    el: '.canvas',
    init() {
    	this.cvs = $(this.el)[0]
    	this.ctx = $(this.el)[0].getContext('2d')
    	this.width = $(this.el).width()
    	this.height = $(this.el).height()
    }
  }
  let model = {
    data: {
    	bold: 1,
    	curObject: 'pencil',
    	color: '#000',
    	using: false,
    	lastPoint: {},
    	newPoint: {},
    	device: 'PC'
    }
    init() {
    	this.data.device = document.body.ontouchstart? 'Mobile': 'PC'
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.init()
      this.model.init()
      this.bindEvents()
      this.bindEventHub()
    },
    bindEvents() {
    	window.onresize = this.autoSetCanvasSize.bind(this)
    },
    bindEventHub() {
    	window.eventHub.on('select', target => {
    		this.model.data.curObject = target
    	})
    	window.eventHub.on('clearCvs', () => {
    		this.view.ctx.clearRect(0, 0, this.width, this.height)
    	})
    	window.eventHub.on('download', () => {
				let a = $('<a></a>')
				a.attr('href', this.view.cvs.toDataURL("image/png"))
				a.attr('download', '我的作品')
				a.trigger('click')
    	})
    },
    autoSetCanvasSize() {
    	$(this.view.cvs).width(document.documentElement.width)
    	$(this.view.cvs).height(document.documentElement.height)
    },
    draw(lastPoint, newPoint) {
			this.view.ctx.beginPath()
			this.view.ctx.lineWidth = this.model.data.bold
			this.view.ctx.strokeStyle = this.model.data.color
			this.view.ctx.lineCap = 'round'
			this.view.ctx.lineJoin = 'round'

			this.view.ctx.moveTo(this.model.data.lastPoint.x, this.model.data.lastPoint.y)
			this.view.ctx.lineTo(this.model.data.newPoint.x, this.model.data.newPoint.y)
			this.view.ctx.stroke()
			this.view.ctx.closePath()
    }
  }
  controller.init(view, model)
}