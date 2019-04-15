// pages/evaluateDetail/evaluateDetail.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    obj:{},
    id:''
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    var that = this
    util.AJAX(
      app.globalData.baseUrl + 'findevaluation',
      'GET', {
        id:that.data.id
      },
      res => {
        console.log(res)
        that.setData({
          obj:res.data
        })
      }
    )
  },
  onShow: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})