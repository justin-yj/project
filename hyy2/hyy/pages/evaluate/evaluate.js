// pages/evaluate/evaluate.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    service1:'',
    id:''
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      id:options.id
    })
    // util.AJAX(
    //   app.globalData.baseUrl + 'findevaluate',
    //   'GET', {
    //     latticeid: 1
    //   },
    //   res => {
    //     console.log(res)
    //   }, res => {
    //     console.log("请求数据失败！")
    //   }
    // )
  },
  onShow: function () {
  
  },
  radioChange1(e) {
    console.log(e.detail.value)
    this.setData({
      service1: e.detail.value,
    })
  },
  // radioChange2(e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     service2: e.detail.value,
  //   })
  // },
  // radioChange3(e){
  //   console.log(e.detail.value)
  //   this.setData({
  //     service3: e.detail.value,
  //   })
  // },
  formSubmit(e){
    var that = this
    console.log(e.detail.value)
    if(e.detail.value.reservationService == ''){
      wx.showToast({
        title: '请对预约服务进行评价',
        icon: 'none'
      })
    }else{
      util.AJAX(
        app.globalData.baseUrl + 'joinsetevaluation',
        'GET', {
          id: that.data.id,    //网点ID
          evaluationHierarchy: that.data.service1,//预约服务
        },
        res => {
          console.log(res)
          if (res.data.evaluationHierarchy == 3){
            wx.showToast({
              title: '感谢您的评价，我们会努力改进服务！',
              icon: 'none',
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../evaluateDetail/evaluateDetail?id=' + that.data.id
              })
            },2000)
          } else if (res.data.evaluationHierarchy == 2){
            wx.showToast({
              title: '感谢您的评价，我们会继续提高服务质量！',
              icon: 'none',
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../evaluateDetail/evaluateDetail?id=' + that.data.id
              })
            }, 2000)
          } else if (res.data.evaluationHierarchy == 1) {
            wx.showToast({
              title: '感谢您对我们的认可和支持，有您的鼓励我们会做的更好！',
              icon: 'none',
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../evaluateDetail/evaluateDetail?id=' + that.data.id
              })
            }, 2000)
          }
        }, res => {
          console.log("提交失败！")
        }
      )
    }
    
  }
})