var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 扫uid码直接添加设备
  uidBtnClk: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        var scancodebuff = res.result.split("&")
        if (that.checkScancodeText(scancodebuff)) {
          that.sendAddAdministratorrequest(scancodebuff)
        }
      },
      fail: (res) => {
        util.showToast("扫描二维码失败")
      }
    })
  },
  // 检测扫描到的二维码的合法性
  checkScancodeText: function (scancodebuff) {
    if ((scancodebuff.length != 5) || (scancodebuff[0] != "DNKAC") || (scancodebuff[1] != "F")) {
      util.showToast("扫描的非设备UID码")
      return false
    }
    return true
  },
  // 添加管理员用户
  sendAddAdministratorrequest: function (scancodebuff) {
    util.request({
      url: "/equipment/add",
      data: {
        token: wx.getStorageSync('token'),
        equipmentUID: scancodebuff[3],
        equipmentAlias: "设备" + scancodebuff[3].substr(36,4),
        equipmentModel:" ",
        softwareVersion: " ",
        firmwareVersion: " ",
        sn: " ",
      },
      success: function (result) {
        if (util.checkError(result.data) == true) {
          util.showToast("添加设备成功")
          wx.navigateTo({
            url: "../directlyAdd/directlyAdd2_U?UID=" + scancodebuff[3]
          })
        }
      },
    }, true)
  },

  // 点击wifi配网
  wifiBtnClk:function(){
    wx.navigateTo({
      url: "../directlyAdd/directlyAdd2_W"
    })
  }

})