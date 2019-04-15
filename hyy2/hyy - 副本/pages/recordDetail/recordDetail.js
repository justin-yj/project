// pages/recordDetail/recordDetail.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    sId:'',
    latticeid:'',
    detail:{}
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      sId: options.id,
      latticeid: options.latticeid
    })
    console.log(that.data.latticeid)
    that.getDetail()
  },
  onShow: function () {
  
  },
  getDetail(){
    var that = this;
    util.AJAX(
      app.globalData.baseUrl + 'findappointmentbyid?id='+that.data.sId,
      'GET', {},
      res => {
        // console.log(res)
        if (res.data.idCard.length == 18){
          res.data.idCardss = res.data.idCard
          res.data.idCard = res.data.idCardss.substring(0, 6) + '********' + res.data.idCard.substring(14, 18)
        } else if (res.data.idCard.length == 15){
          res.data.idCardss = res.data.idCard
          res.data.idCard = res.data.idCard.substring(0, 6) + '*****' + res.data.idCard.substring(11, 15)
        }
        console.log(res.data)
        that.setData({
          detail:res.data
        })
      }
    )
  },
  // 预约须知
  goNotice(){
    wx.navigateTo({
      url: '../notes/notes',
    })
  },
  // 再次预约
  goAlign(e){
    var latticeid = this.data.latticeid;
    var idCard = e.currentTarget.dataset.idcardss; //身份证号码
    var businessid = e.currentTarget.dataset.businessid; //业务类型ID
    var syCount = e.currentTarget.dataset.sycount;
    var cansyCount = e.currentTarget.dataset.cansycount;
    var days = e.currentTarget.dataset.syday;
    console.log('机构ID:' + latticeid, '身份证号码:' + idCard, '业务类型ID:' + businessid)
    if (syCount >= cansyCount) {
      wx.showToast({
        title: '您的爽约次数已达' + cansyCount + '次，'+  days  +'天内不能再次预约',
        icon: 'none',
        duration:2000
      })
    } else {
      wx.navigateTo({
        url: '../startOrder/order?latticeid=' + latticeid + '&idCard=' + idCard + '&businessid=' + businessid,
      })
    }
  },
  // 取消预约
  goCancel(e){
    var that = this;
    // console.log(e)
    var cId = that.data.sId;
    console.log(cId)
    wx.showModal({
      title: '提示',
      content: '是否取消预约？',
      success: function (res) {
        if (res.confirm) {
          util.AJAX(
            app.globalData.baseUrl + 'updateintappointstatus',
            'GET', {
              id: cId,
              status: 2
            },
            res => {
              console.log(res)
              that.getDetail()
            }
          )
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 立即评价
  goEvaluate(){
    wx.navigateTo({
      url: '../evaluate/evaluate'
    })
  },
  // 跳转评价详情页
  goEvaluateDetail(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../evaluateDetail/evaluateDetail?id=' + id
    })
  }
})