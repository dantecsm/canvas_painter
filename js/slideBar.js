{
  let view = {
    el: 'section.slideBar',
    template: `
    `,
    render(data = {}) {}
  }
  let model = {
    data: {},
    init() {},
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.model.init()
      this.view.render(this.model.data)
    }
  }
  controller.init(view, model)
}