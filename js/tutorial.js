let PCTutorial = [
		{
		  element: '#background',
		  intro: '临摹工具，可临摹本地图片'
		},
		{
		  element: '#openFile',
		  intro: '编辑工具，可编辑本地图片'
		},
		{
		  element: '.sizePad',
		  intro: '调节画笔粗细，也可在任意地方通过滑轮操作'
		},
		{
		  element: '.colorPad',
		  intro: '双击调色盘定义常用颜色，单击调色盘快捷使用'
		},
		{
			element: '#pen',
			intro: '按或按住 Ctrl + Z 撤销上一步操作，按或按住 Ctrl + Y 还原'
		}
	]

let mobileTutorial = [
		{
		  element: '#background',
		  intro: '临摹工具，可临摹本地图片'
		},
		{
		  element: '#openFile',
		  intro: '编辑工具，可编辑本地图片'
		},
		{
		  element: '.colorPad',
		  intro: '单击调色盘使用颜色'
		}
	]

let hinted = localStorage.getItem('hinted')
if(!hinted) {
	localStorage.setItem('hinted', true)
	startTutorial()
}

function startTutorial() {
	let steps = isNarrowScreen() ? mobileTutorial : PCTutorial

	introJs()
	.setOptions({steps})
	.setOption("nextLabel", "下一个")
	.setOption("prevLabel", "上一个")
	.setOption("skipLabel", "跳过")
	.setOption("doneLabel", "完成")
	.setOption("overlayOpacity", 0)
	.setOption("highlightClass", "intro-highlight")
	.start()
}
