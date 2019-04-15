/**
 * @file pageination.js
 * @author zhangyuhan2016 <hi_zhangyuhan@163.com>
 */

class Page {
  constructor ({el = '.pagination-box', now = 1, show = 5, total = 1000, size = 10, click = null} = {}) {
    this.now = now
    this.show = show
    this.total = total
    this.size = size
    this.min = 1
    this.max = total / size
    this.contentArr = []
    this.contentDom = []
    this.dom = document.querySelector(el)
    this.abDom = []
    this.otherDom = []
    this.click = click
  }

  init () {
    // dom数组
    let cArr = ['back', 'prev', 'next', 'cont', 'min', 'max']
    cArr.forEach(v => {
      this.otherDom.push(this.dom.querySelector(`button[name="${v}"]`))
    })
    this.otherDom[4].innerText = this.min
    this.otherDom[5].innerText = this.max
    // 创建dom
    this.getContent()
    // 点击事件
    this.dom.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        let type = e.target.getAttribute('name')
        let tempNumber = 0
        switch (type) {
          case 'back': {
            tempNumber = -1
            break
          }
          case 'cont': {
            tempNumber = 1
            break
          }
          case 'prev': {
            tempNumber = -this.show
            break
          }
          case 'next': {
            tempNumber = this.show
            break
          }
          default: {
            tempNumber = parseInt(e.target.innerText) - this.now
          }
        }
        this.now += tempNumber
        typeof this.click === 'function' ? this.click(this.now, type) : null
        this.getContent()
        this.upData()
      }
    })
    let nextButton = this.otherDom[2]
    this.abDom = this.otherDom.slice(-2)
    this.contentArr.forEach(v => {
      let b = document.createElement('button')
      b.innerText = v
      this.contentDom.push(b)
      this.dom.insertBefore(b, nextButton)
    })
    this.upData()
  }

  upData () {
    this.abDom.forEach(v => v.className = '')
    this.otherDom[0].className = ''
    this.otherDom[3].className = ''
    if (this.now <= this.min) {
      this.now = this.min
      this.abDom[0].className = 'now'
      this.otherDom[0].className = 'stop'
    }
    if (this.now >= this.max) {
      this.now = this.max
      this.abDom[1].className = 'now'
      this.otherDom[3].className = 'stop'
    }
    this.contentDom.forEach((v, i) => {
      v.className = ''
      let n = this.contentArr[i]
      if (n === this.now) {
        v.className = 'now'
      }
      v.innerText = n
    })
  }

  getContent () {
    let n = this.now
    let size = this.show
    let arr = []
    for (let i = 0; i < size; i++) {
      arr[i] = i
    }
    // default
    let content = Math.floor(arr.length / 2)
    let show = [true, true]
    let mapF = (v, i) => {
      let step = content - i
      return n - step
    }
    // min
    if (n <= size - this.min) {
      mapF = (v, i) => {
        return this.min + 1 + i
      }
      show[0] = false
    }
    // max
    if (this.max - size < n) {
      mapF = (v, i) => {
        return this.max - size + i
      }
      show[1] = false
    }
    this.contentArr = arr.map(mapF)
    show.forEach((v, i) => {
      this.otherDom[(i + 1)].style.display = v ? 'inline-block' : 'none'
    })
  }
}

/*
* el Dom节点
* show 索引数量
* total 数据总数
* size 每页条数
* now 当前索引
* click 点击事件
* */
let clickF = (number, type) => {
  console.log('--number,type--', number, type)
}
let p = new Page({
  show: 11,
  total: 10000,
  size: 80,
  click: clickF
})
p.init()
