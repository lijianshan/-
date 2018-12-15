const app = getApp()
var util = require('../../../utils/util.js');
var UDPCom = require('../../../utils/api/UDPCom/UDPCom.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    superPasswordOk :false,
    superPasswordValue:0,
    titles:["进风","出风"],
    titlesIndex: 0,
    gears: ["一档:", "二档:", "三档:", "四档:", "五档:", "六档:", "七档:"],
    gearsValue: [0, 0, 0, 0, 0, 0, 0],
    gearsNum:0,
    deviceInfo: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      deviceInfo: app.globalData.mainDeviceInfo
    })
  },

  // 密码输入框获取
  passwordInput: function (e) {
    this.data.superPasswordValue = e.detail.value
  },

  //密码输入确定
  passwordSureClk:function(e){
    var that =this
    if (that.data.superPasswordValue  == "181215"){
      that.setData({
        superPasswordOk: true
      })
    }else{
      util.showToast("超级密码错误")
    }
  },

  //进风出风选择
  titlesSwitch: function (e) {
    var that = this    
    if (that.data.titlesIndex != e.currentTarget.id) {
      that.setData({
        titlesIndex: parseInt(e.currentTarget.id)
      })
    }
  },
  
  //档位选择
  gearsClk: function(e) {
    var that = this
    that.data.gearsNum = e.currentTarget.id
  },

  // 速度修改
  valueInput: function (e) {
    var that =this
    that.data.gearsValue[that.data.gearsNum] = parseInt(e.detail.value)
  },

  // 读取转速
  readClk: function (e) {
    var that = this 

    UDPCom.getUDP_MotorValue(that.data.deviceInfo.UID, that.data.titlesIndex + 1, {
      failHandler: function (result) {
        util.showToast("获取设备转速失败！")
      },
      successHandler: function (result) {
        var recDataStr = result.data.data
        if ((recDataStr.substr(0, 6) == 'aa5501') && (recDataStr.substr(14, 8) == '0305012b')) {
          var xishu = util.hexStringToByte(recDataStr.substr(80, 2))          
          var tempbuff=[]
          for(var i=0;i<7;i++){
            tempbuff[i] = util.hexStringToByte(recDataStr.substr(66 +2*i, 2)) * xishu 
          }
          that.setData({
            gearsValue: tempbuff
          })
        }
      }
    })
  },

  // 设置转速 
  setClk: function (e) {
    var that = this
    var buff =[]
    var gearsbuff =[]
    for (var i = 0; i < 7; i++) {
      gearsbuff[i] = parseInt(that.data.gearsValue[i]/10)
    }
    buff = buff.concat(that.data.titlesIndex+1).concat(0).concat(gearsbuff).concat(0x0a)
    console.log(buff)
    UDPCom.sendUDP_MotorValue(that.data.deviceInfo.UID, buff, {
      failHandler: function (result) {
        util.showToast("设置设备转速失败！")
      },
      successHandler: function (result) {
        util.showToast("设置设备转速成功！")
      }
    })
  }
})