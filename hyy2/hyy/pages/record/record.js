// pages/record/record.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    typeShow: "hide",
    showModal:'hide',
    currentTab: 0,
    recordList: [], //全部
    notAppointment: [], //未赴约     对应状态标识为1
    processing: [], //办理中        对应状态标识为4
    haveAppointment: [], //已赴约   对应状态标识为5
    canceList: [], //已取消         对应状态标识为2
    breakAppointment: [], //爽约    对应状态标识为3
    card: null,
  },
  onLoad: function(options) {

  },
  onShow: function() {
    this.getRecord()
   var openid = wx.getStorageSync("OPENID")
    if (openid == undefined || openid == null) {
      wx.login({
        success: res => {
          console.log(res.code)
          wx.request({
            url: app.globalData.baseUrl + 'getopenid?code=' + res.code + '&appid=	wxace8cb59dc89b5d9&appsecret=3fc6b07671b7c419314a326df0bc69ad',
            method: 'POST',
            success: function (res) {
              openid = res.data.openid
              wx.setStorageSync("OPENID", openid)
              console.log(res, openid, "返回用户信息")
            }
          })
        }
      })
    }
  },
  onPullDownRefresh: function() {
    var that = this;
    wx.showNavigationBarLoading();
    setTimeout(function(){
      that.getRecord()
      wx.hideNavigationBarLoading(); 
      wx.stopPullDownRefresh()
    },1500)
  },
  onReachBottom: function() {

  },
  hideModal(){
    var that = this;
    if (that.data.showModal == 'show'){
      that.setData({
        typeShow: 'hide',
        showModal: 'hide'
      })
    }
  },
  toggleHandle() {
    var that = this
    if (that.data.typeShow == 'hide') {
      that.setData({
        typeShow: 'show',
        showModal:'show'
      })
    } else {
      that.setData({
        typeShow: 'hide',
        showModal: 'hide'
      })
    }
  },
  swichNav(e) {
    var that = this;
    var current = e.target.dataset.current;
    that.setData({
      currentTab: current,
      typeShow: 'hide',
      showModal:'hide'
    })
    if (current == 0) {
      that.getRecord()
    } else if (current == 1) {
      that.getRecord()
    } else if (current == 3) {
      that.getRecord()
    } else if (current == 4) {
      that.getRecord()
    } else if (current == 5) {
      that.getRecord()
    }
  },
  getRecord() {
    // console.log(wx.getStorageSync('OPENID'))
    var that = this
    util.AJAX(
      app.globalData.baseUrl + 'findintappoint',
      'GET', {
        openid: wx.getStorageSync('OPENID')
      },
      res => {
        console.log(res,"预约纪录里面的信息")
        var notAppointment = [];
        var processing = [];
        var haveAppointment = [];
        var canceList = [];
        var breakAppointment = [];
        var arr = res.data.map(function (item,index){
          return item.idCard
          // console.log(item.idCard,index)
         })
        for (let i = 0; i < res.data.length; i++) {     
          // console.log(res.data[i].idCard)
          if (res.data[i].idCard.length == 18) {
            res.data[i].idCardss = res.data[i].idCard
            res.data[i].idCard = res.data[i].idCard.substring(0, 6) + '********' + res.data[i].idCard.substring(14, 18)
          } else if (res.data[i].idCard.length == 15) {
            res.data[i].idCard = res.data[i].idCard.substring(0, 6) + '*****' + res.data[i].idCard.substring(11, 15)
          }
          if (res.data[i].status == 1) {
            notAppointment.push(res.data[i])
          }else if (res.data[i].status == 5) {
            haveAppointment.push(res.data[i])
          } else if (res.data[i].status == 2) {
            canceList.push(res.data[i])
          } else if (res.data[i].status == 3) {
            breakAppointment.push(res.data[i])
          } else if (res.data[i].status == 4){
            processing.push(res.data[i])
          }
        }
        // console.log(res.data, "dcs")
        that.setData({
          recordList: res.data,
          notAppointment: notAppointment,
          processing: processing,
          haveAppointment: haveAppointment,
          canceList: canceList,
          breakAppointment: breakAppointment
        })
      }, res => {
        wx.showToast({
          title: '加载失败',
        })
      }
    )
  },
  cancelHandle(e) {
    var that = this;
    // console.log(e)
    var cId = e.currentTarget.dataset.id;
    var cStatus = e.currentTarget.dataset.status;
    // console.log(cId, cStatus)
    wx.showModal({
      title: '提示',
      content: '是否取消预约？',
      success: function(res) {
        if (res.confirm) {
          util.AJAX(
            app.globalData.baseUrl + 'updateintappointstatus',
            'GET', {
              id: cId,
              status: 2
            },
            res => {
              console.log(res)
              that.getRecord()
            }
          )
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 去评价
  goEvaluate(e) {
    // console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../evaluate/evaluate?id=' + id
    })
  },
  // 再次预约
  goAlign(e) {
    console.log(e)
    var latticeid = e.currentTarget.dataset.latticeid; //机构ID
    var businessid = e.currentTarget.dataset.businessid; //业务类型ID
    var idCard = e.currentTarget.dataset.idcardss; //身份证号码
    var syCount = e.currentTarget.dataset.sycount;
    var cansyCount=e.currentTarget.dataset.cansycount;
    var days = e.currentTarget.dataset.syday;
    // console.log(idCard)
    console.log('机构ID:' + latticeid, '身份证号码:' + idCard, '业务类型ID:' + businessid)
    if (syCount >= cansyCount ){
      wx.showToast({
        title: '您的爽约次数已达' + cansyCount +'次，'+ days + '天内不能再次预约',
        icon:'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../startOrder/order?latticeid=' + latticeid + '&idCard=' + idCard + '&businessid=' + businessid,
      })
    }
    
  },
  // 跳转详情页
  goDetail(e) {
    var sId = e.currentTarget.dataset.id;
    var latticeId = e.currentTarget.dataset.latticeid;
    console.log(sId, latticeId)
    wx.navigateTo({
      url: '../recordDetail/recordDetail?id=' + sId + '&latticeid=' + latticeId
    })
  },
  // 跳转评价详情页
  goEvaluateDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '加载中...',
      icon:'none'
    })
    wx.navigateTo({
      url: '../evaluateDetail/evaluateDetail?id=' + id
    })
  },
  submit:function(e){
    console.log(e,"formid")
    var latticeid = e.currentTarget.dataset.latticeid; //机构ID
    var businessid = e.currentTarget.dataset.businessid; //业务类型ID
    var idCard = e.currentTarget.dataset.idcardss; //身份证号码
    var syCount = e.currentTarget.dataset.sycount;
    var cansyCount = e.currentTarget.dataset.cansycount;
    var days = e.currentTarget.dataset.syday;
    app.globalData.formids.push(e.detail.formId)
    // console.log(idCard)
    console.log('机构ID:' + latticeid, '身份证号码:' + idCard, '业务类型ID:' + businessid)
    if (syCount >= cansyCount) {
      wx.showToast({
        title: '您的爽约次数已达' + cansyCount + '次，' + days + '天内不能再次预约',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../startOrder/order?latticeid=' + latticeid + '&idCard=' + idCard + '&businessid=' + businessid + '&itmerids=' + new Date().getTime(),
      })
    }
  }
})