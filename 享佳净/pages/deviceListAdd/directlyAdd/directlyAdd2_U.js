var deviceModelHandle = require('../../../utils/comhandle/deviceModelHandle.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    modelName: '',
    modelid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var key = deviceModelHandle.uidToUIDKey(options.UID)
    var devicemodel = deviceModelHandle.uidkeyToDeviceModel(key)

    this.setData({
      uid: options.UID,
      modelName: devicemodel.name,
      modelid: devicemodel.id,
    })
  },

  nextBtnClk: function() {
    var clkDeviceNum = 0
    var i = this.data.id
    if ((i == 1) || (i == 3))
      clkDeviceNum = 0
    else if (i == 4)
      clkDeviceNum = 1
    else if (i == 5)
      clkDeviceNum = 2
    else if (i == 0)
      clkDeviceNum = 3
    wx.navigateTo({
      url: "../directlyAdd/directlyAdd3?clkDeviceNum=" + clkDeviceNum
    })
  },

  finishBtnClk: function() {
    wx.switchTab({
      url: '../../deviceList/deviceList'
    })
  }


})