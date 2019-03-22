{
  let view = {
    el: 'section.menuBar',
    template: `
    <div class="icons-wrapper">
      <svg class="icon" id="pencil">
        <use xlink:href="#icon-pencil"></use>
      </svg>
      <svg class="icon" id="eraser">
        <use xlink:href="#icon-eraser"></use>
      </svg>
      <svg class="icon" id="color">
        <use xlink:href="#icon-color"></use>
      </svg>
      <svg class="icon" id="download">
        <use xlink:href="#icon-download"></use>
      </svg>
      <svg class="icon" id="clear">
        <use xlink:href="#icon-delete"></use>
      </svg>
    </div>
    <div class="icons-wrapper">
      <svg class="icon" id="undo">
        <use xlink:href="#icon-undo"></use>
      </svg>
      <svg class="icon" id="redo">
        <use xlink:href="#icon-redo"></use>
      </svg>
      <svg class="icon" id="open">
        <use xlink:href="#icon-open"></use>
      </svg>
    </div>
    `,
    init() {
    	this.$el = $(this.el)
    },
    render(data) {
    	this.$el.html(this.template)
    }
  }
  let model = {
    data: {},
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.init()
      this.view.render(this.model.data)
      this.bindEvents()
    },
    bindEvents() {
    	this.view.$el.on('click', '#pencil', e => {
    		$(e.currentTarget).addClass('active').siblings('.active').removeClass('active')
    		window.eventHub.emit('select', 'pencil')
    	})
    	this.view.$el.on('click', '#eraser', e => {
    		$(e.currentTarget).addClass('active').siblings('.active').removeClass('active')
    		window.eventHub.emit('select', 'eraser')
    	})
    	this.view.$el.on('click', '#clear', e => {
    		window.eventHub.emit('clearCvs')
    	})
    	this.view.$el.on('click', '#download', e => {
    		window.eventHub.emit('download')
    	})
    }
  }
  controller.init(view, model)
}