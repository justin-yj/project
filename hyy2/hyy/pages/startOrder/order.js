const app = getApp();
var domain = app.globalData.domain;
var leixing;
var riqi;
var timeRiqi;
var appoTimeId2;
var shijianduanID;
var openid;
var nowTime;
var details;
var chooseDay;
var obj = [];
var apptimeId = [];
var usercardArr = [];
var userArr = [];
var dcsindexid;
var token;
Page({
  data: {
    disable: true, //提交按钮是否可点击
    userCar: false,
    classfiy: [],
    appoTimeId: 0,
    timeDuan: [], //日期选择数据
    arr: [],
    chooseOn: false,
    multiArray: [],
    multiIndex: [0, 0],
    index: 0,
    arrinput: [],
    isShow: false,
    warning: false,
    imgSrc: '',
    codes: 1,
    isblackOrder: "",
    yzmValue: '',
    canInput: false,
    warningMsg: "",
    canbind: false,
    blackOrde:[],
    isBacks:false,
    warnings:false,
    showNotice: false,
  },
  elseData:{
    latticeid :null,
    idCar:null,
    lxbs:[],
    leixingid:""
  },
  //选择日期触发
  bindMultiPickerChange: function(e) {
    this.getImage()
    timeRiqi = this.data.multiArray[0][e.detail.value[0]]
    shijianduanID = apptimeId[e.detail.value[0]][e.detail.value[1]]
    this.setData({
      multiIndex: e.detail.value,
      disable:true
    })
  },
  //改变日期触发
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    for (let i = 0; i <= chooseDay; i++) {
      if (e.detail.column == 0) {
        if (data.multiIndex[0] == i) {
          data.multiArray[1] = obj[i]
        }
        data.multiIndex[1] = 0;
      }
    }

    this.setData(data);
  },
  
  onLoad: function(options) {
    var that = this;
    that.getImage();
    that.elseData.latticeid = options.latticeid;
    var businessid = options.businessid
    if (options.idCard != null || options.idCard != undefined){
      that.canOrders(options.idCard)
      that.setData({
        arrinput: options.idCard
      })
    } else {
      wx.getStorage({
        key: 'idcars',
        success: function(res) {
          usercardArr = res.data
          usercardArr = Array.from(new Set(usercardArr))
          if (res.data == undefined) {} else {
            that.canOrders(usercardArr[0])
            that.setData({
              arrinput: usercardArr[0]
            })
          }
        }
      })
    }
    //业务类型请求
    wx.request({
      url: domain + '/businesscount?latticeid=' + that.elseData.latticeid,
      success: function(res) {
        console.log(res,"业务类型")
        leixing = res.data.map(item => {
          return item.businessname;
        });
        that.elseData.lxbs = res.data.map(item => {
          return item.id;
        });
        var ids = that.elseData.lxbs.findIndex((value, index, arr) => {
          return value == businessid
        })
        if (ids == -1) {
          details = options.details;
          that.elseData.leixingid = options.id || that.elseData.lxbs[0];
        } else {
          details = ids;
          that.elseData.leixingid = businessid;
        }
        if (details != undefined) {
          that.setData({
            index: details
          });
        }
        that.setData({
          classfiy: leixing
        });
        //日期时间段请求
        that.getTimeDuan(that.elseData.leixingid)

      }
    })
  },
  // 业务类型 
  bindPickerChange: function(e) {
    var indexid = e.detail.value;
    var that = this;
    that.getImage()
    timeRiqi = undefined;
    shijianduanID = undefined;
    that.setData({
      multiIndex: [0, 0],
      index: indexid,
      disable: true
    })
    riqi = [];
    that.elseData.leixingid = that.elseData.lxbs[indexid];
    that.getTimeDuan(that.elseData.leixingid)
  },
  getTimeDuan: function(res) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    wx.request({
      url: domain + '/appointmentPeople?latticeid=' + that.elseData.latticeid + '&businesstypeid=' + res,
      success: function(res) {
        console.log(res)
        wx.hideLoading()
        var riqiList = res.data
        riqi = riqiList.map(item => {
          return item.appoDate;
        });
        var times = riqiList.map(item => {
          return [item.startime + '-' + item.endtime];
        });
        times = [...new Set(times)]
        riqi = [...new Set(riqi)]
        var duan = riqiList.map(item => {
          return [item.daynumber, item.startime + '-' + item.endtime + '剩余:' + (item.number - item.peoplecount) + "个", item.number, item.peoplecount, item.appoTimeId, item.appoDate, item.startime];
        });
        chooseDay = duan[duan.length - 1][0] //获取可预约的天数
        obj = [];
        apptimeId = [];
        var datariqi = [];
        console.log(duan)
        duan.forEach(v => {
          var timeLength = Number(v[6].split(":")[0]) * 60 + Number(v[6].split(":")[1])
          if (!Array.isArray(obj[v[0]])) {
            obj[v[0]] = []
          }
          if (!Array.isArray(apptimeId[v[0]])) {
            apptimeId[v[0]] = []
          }
          console.log(v[0],"天数")
          if (v[0] == 0 && v[2] > v[3]) {

            if (Number(v[6].split(":")[0]) * 60 + Number(v[6].split(":")[1]) > nowTime) {
              obj[v[0]].push(v[1])
              apptimeId[v[0]].push(v[4])
              datariqi.push(v[5])
            }
          } else if (v[2] > v[3]) {
            obj[v[0]].push(v[1])
            apptimeId[v[0]].push(v[4])
            datariqi.push(v[5])
          }
        })
        console.log("bbb", obj[0])
        if (obj[0] == undefined || obj[0][0] == undefined) {
          obj.shift()
        }
       
        if (apptimeId[0] == undefined || apptimeId[0][0] == undefined) {
          apptimeId.shift()
        }
        
        shijianduanID = apptimeId[0][0]
        var aa = [...new Set(datariqi)]
        timeRiqi = aa[0]
        console.log("aaa",obj[0].length,obj)
        if (obj[0].length == 0){
          that.setData({
            warnings:true,
            canInput:true
          })
        }else{
          that.setData({
            warnings: false,
            canInput: false
          })
        }
        that.setData({
          showClassfly: false,
          timeDuan: res.data,
          multiArray: [aa, obj[0]]
        })
        
      }
    })
  },
  //页面显示时触发
  onShow: function() {
    nowTime = new Date().getHours() * 60 + new Date().getMinutes()+10
    riqi = [];
    var that = this;
    openid = wx.getStorageSync("OPENID")
  },
  submit: function(e) {
     var that = this;
    app.globalData.formids.push(e.detail.formId)
    if (!that.validateIdCard(that.data.arrinput)) {
      that.setData({
        warning: true
      })
    } else if (openid == undefined || openid == null) {
      wx.showToast({
        title: '无法获取openid',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast();
      }, 500)
    } else if (that.elseData.leixingid == undefined) {
      wx.showToast({
        title: '请选择业务类型',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast();
      }, 500)
    } else if (timeRiqi == undefined) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast();
      }, 500)
    } else if (that.data.codes != 0) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast();
      }, 500)
    } else if (timeRiqi == undefined) {
      wx.showToast({
        title: '请选择时间段',
        icon: 'none'
      })
      setTimeout(() => {
        wx.hideToast();
      }, 500)
    } else {
      that.setData({
        userCar: false,
        disable: true
      })
      wx.request({
        url: domain + '/intappointmentmessage',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          'Idcard': that.data.arrinput,
          'openid': openid,
          'businessTypesId': that.elseData.leixingid,
          'latticeId': that.elseData.latticeid,
          'appoDate': timeRiqi,
          'appoTimeId': shijianduanID,
          "formid": app.globalData.formids,
          "code": that.data.yzmValue,
          "token": token
        },
        success: function(res) {
          app.globalData.formids = []
          that.setData({
            yzmValue: ""
          })
          //身份证确认无误后，存在缓存里
          usercardArr.unshift(that.data.arrinput)
          wx.setStorage({
            key: 'idcars',
            data: usercardArr
          })
          if (res.data.message == "提交成功") {
            wx.showToast({
              title: res.data.message,
            })
            setTimeout(() => {
              wx.hideToast();
              wx.switchTab({
                url: '../record/record',
              })
            }, 1000)
          } else {
            that.getImage();
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
            setTimeout(() => {

              wx.hideToast();
            }, 1000)
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '提交失败',
          })
        }
      })
    }
  },
  //选择上次的身份证触发
  chooseId: function(e) {
    var that = this
    dcsindexid = e.currentTarget.dataset.id;
    if (userArr == "") {
      that.setData({
        isShow: false,
        warning: false
      })
    } else {
      that.getImage()
      that.canOrders(userArr[dcsindexid])
      that.setData({
        arrinput: userArr[dcsindexid],
        warning: false,
        canInput: false,
        isShow: false,
        disable:true
      })
    }
  },
  isHide: function(e) {
    this.setData({
      isShow: false
    })
  },
  //输入框变化触发
  userIdcar: function(res) {
    var that = this;
    userArr = [];
    that.elseData.idCar = res.detail.value;
    Array.from(new Set(usercardArr)).forEach(function(item) {
      if (item.indexOf(that.elseData.idCar) == 0) {
        userArr.push(item)
      }
    })
   
    if (res.detail.value.length == 18) {
      that.setData({
        isShow: false
      })
      if (that.validateIdCard(that.elseData.idCar)) {
        that.canOrders(res.detail.value)
        that.setData({
          warning: false,
          arrinput: that.elseData.idCar,
          canInput: false,
        })
      } else {
        that.setData({
          arrinput: that.elseData.idCar,
          warning: true,
          canInput: true,
          warningMsg: "身份证号无效",
          arr: userArr
        })
      }
    } else {
      that.setData({
        arrinput: that.elseData.idCar,
        canInput: true,
        warning: false,
        arr: userArr,
        isShow:true
      })
    }
    if (res.detail.value.length == 0) {
      that.setData({
        warning: false,
        arr: userArr
      })
    }
    that.setData({
      arr: userArr
    })

  },
  //输入框失去焦点
  hideFocus: function() {
    var that = this;
    if(that.data.arrinput.length == 0 ){
      if (that.data.isShow == false){
        that.setData({
          warningMsg: "身份证号不能为空",
          warning: true,
          canInput: true,
        })
      }else{
        that.setData({
          warningMsg: "身份证号不能为空",
          warning: true,
          canInput: true,
          isShow: false
        })
      }
    } else if (that.data.arrinput.length > 0 && that.data.arrinput.length<18){
      if (that.data.isShow == false){
        that.setData({
          warningMsg: "身份证号位数不对",
          warning: true,
          canInput: true,
         
        })
      }else{
        that.setData({
          warningMsg: "身份证号位数不对",
          warning: true,
          canInput: true,
          isShow: false
        })
      }
    } else if (!that.validateIdCard(that.data.arrinput)){
      that.getImage()
      if (that.data.isShow == false){
        that.setData({
          warningMsg: "身份证号无效",
          warning: true,
          canInput: true,
        })
      }else{
        that.setData({
          warningMsg: "身份证号无效",
          warning: true,
          canInput: true,
          isShow: false
        })
      }
     
    }else{
      that.setData({
        isBacks: true,
        warning:false
      })
    }
    that.getImage()
    
  },
  //输入框获取焦点
  getFocus: function(e) {
    var that = this;
    that.setData({
      isBacks: false
    })
    userArr = Array.from(new Set(usercardArr));
    that.setData({
      isShow: true,
      arr: userArr,
      warning: false
    })
  },
  //是否进入黑名单校验
  canOrders: function(e) {
    var that = this;
    wx.request({
      url: domain + '/whetherblacklist',
      data: {
        "idCard": e,
        'id': that.elseData.latticeid
      },
      success: function(res) {
        that.setData({
          isblackOrder: res.data.fool,
          blackOrde:res.data
        })
        if (res.data.fool) {

        } else {
          that.setData({
            disable: true,
            isBacks:true
          })
          // wx.showToast({
          //   title: '您爽约次数已达' + res.data.breakappointmentnumb + '次，' + res.data.breakappointment + '天内不能再次预约',
          //   icon: "none"
          // })

        }
      }
    })
  },
  //身份证校验
  validateIdCard: function(id, backInfo) {
    var info = {
        y: "1900",
        m: "01",
        d: "01",
        sex: "male",
        valid: false,
        length: 0
      },
      initDate = function(length) {
        info.length = length;
        var a = length === 15 ? 0 : 2, // 15:18
          temp;
        info.y = (a ? "" : "19") + id.substring(6, 8 + a);
        info.m = id.substring(8 + a, 10 + a);
        info.d = id.substring(10 + a, 12 + a);
        info.sex = id.substring(14, 15 + a) % 2 === 0 ? "female" : "male";
        temp = new Date(info.y, info.m - 1, info.d);
        return (temp.getFullYear() == info.y * 1) &&
          (temp.getMonth() + 1 == info.m * 1) &&
          (temp.getDate() == info.d * 1);
      },
      back = function() {
        return backInfo ? info : info.valid;
      };
    if (typeof id !== "string") return back();
    // 18
    if (/^\d{17}[0-9x]$/i.test(id)) {
      if (!initDate(18)) return back();
      id = id.toLowerCase().split("");
      var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        y = "10x98765432".split(""),
        sum = 0;
      for (var i = 0; i < 17; i++) sum += wi[i] * id[i];
      if (y[sum % 11] === id.pop().toLowerCase()) info.valid = true;
      return back();
    }
    // 15
    else if (/^\d{15}$/.test(id)) {
      if (initDate(15)) info.valid = true;
      return back();
    } else {
      return back();
    }
  },
  getImage: function() {
    var that = this
    wx.request({
      url: domain + '/imageCode',
      success: function(res) {
        token = res.data.token
        that.setData({
          imgSrc: "data:image/jpeg;base64," + res.data.codePic,
          yzmValue: ""

        })
      }
    })
  },
  //更换验证码
  changeOne: function() {
    var that = this
    that.getImage()

  },
  tijiao: function(e) {
    var that = this;
    that.setData({
      yzmValue: e.detail.value
    })
    if (e.detail.value.length == 4 && that.data.warnings == false) {
      wx.request({
        url: domain + '/imageVerifyCode',
        data: {
          "code": e.detail.value,
          "token": token
        },
        success: function(res) {
          that.setData({
            codes: res.data.code
          })
          if (res.data.code != 0) {
            that.getImage();
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            setTimeout(function() {
              wx.hideToast()
            }, 1000)
            that.setData({
              disable: true
            })
          } else if (that.data.isblackOrder == false){
            that.setData({
              disable: true,  
            })
          }else{
            that.setData({
              disable: false
            })
          }
        }
      })
    } else {
      that.setData({
        disable: true
      })
    }
  }
})