const app = getApp()
var util = require('../../../utils/util.js')
var UDPCom = require('../../../utils/api/UDPCom/UDPCom.js')
var deviceModelHandle = require('../../../utils/comhandle/deviceModelHandle.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceInfo: "",
    infoItem_title: ["型号", "UID", "软件版本", "硬件版本", "运行时间"],
    infoItem_value: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      deviceInfo: app.globalData.mainDeviceInfo
    })
    //获得showInputModel组件
    this.modifyEquipmentName = this.selectComponent("#modifyDeviceNameModel")

    this.sendGetDeviceOtherInforequest()

  },
  // 编辑设备名称点击
  modifyNameClk: function() {
    this.modifyEquipmentName.show()
  },
  // 修改设备名称取消
  modifyDeviceNameCancel: function() {
    this.modifyEquipmentName.hide()
  },
  // 修改设备名称确认
  modifyDeviceNameSure(e) {
    var that = this
    that.sendModifyDeviceNamerequest(e.detail)
    this.modifyEquipmentName.hide();
  },
  // 修改设备名称的接口
  sendModifyDeviceNamerequest: function(devicename) {
    var that = this
    util.request({
      url: "/equipment/define",
      data: {
        equipmentUID: that.data.deviceInfo.UID,
        equipmentAlias: devicename,
        token: wx.getStorageSync('token'),
      },
      success: function(result) {
        if (util.checkError(result.data) == true) {
          app.globalData.mainDeviceInfo.name = devicename
          that.setData({
            deviceInfo: app.globalData.mainDeviceInfo
          })
          util.showToast("设备名称修改成功")
        }
      },
    }, true)
  },
  // 获取设备信息
  sendGetDeviceOtherInforequest: function() {
    var that = this
    util.request({
      url: "/equipment/query",
      data: {
        equipmentUID: that.data.deviceInfo.UID,
        token: wx.getStorageSync('token'),
      },
      success: function(result) {
        if (util.checkError(result.data) == true) {
          var uidkey = deviceModelHandle.uidToUIDKey(result.data.data.equipmentUID)
          var modelname = deviceModelHandle.uidkeyToDeviceModel(uidkey).name + ' (' + uidkey + ',' + result.data.data.equipmentModel + ')'
          var deviceLine = that.data.deviceInfo.hasOwnProperty("usedTime") ? true : false
          that.setData({
            'infoItem_value[0]': modelname,
            'infoItem_value[1]': result.data.data.equipmentUID,
            'infoItem_value[2]': result.data.data.softwareVersion,
            'infoItem_value[3]': result.data.data.firmwareVersion,
            'infoItem_value[4]': result.data.data.equipmentWorktime,
            'infoItem_value[4]': deviceLine ? that.data.deviceInfo.usedTime + "小时" : '设备离线无法获取该时间',
          })
          if ((deviceLine == true) && (result.data.data.softwareVersion == " ")) {
            that.getDeviceInfoForDevice()
          }
        } else {
          util.showToast("获取设备信息失败")
          setTimeout(function() {
            wx.navigateBack()
          }, 1500);
        }
      },
      fail: function(result) {
        setTimeout(function() {
          wx.navigateBack()
        }, 1500);
      }
    }, true)
  },
  // 通过UDP直接从设备获取设备信息
  getDeviceInfoForDevice: function() {
    var that = this

    UDPCom.getUDP_DeviceInfo(that.data.deviceInfo.UID, {
      failHandler: function(result) {
        util.showToast("获取设备信息失败失败！")
      },
      successHandler: function(result) {
        var recDataStr = result.data.data
        if ((recDataStr.substr(0, 6) == 'aa5501') && (recDataStr.substr(14, 8) == '03030167')) {
          var equipmentModelBuff = util.hexStringToByte(recDataStr.substr(62, 40))
          var softwareVersionBuff = util.hexStringToByte(recDataStr.substr(102, 40))
          var firmwareVersionBuff = util.hexStringToByte(recDataStr.substr(142, 40))

          var equipmentModel = util.stringToASCIIByte(equipmentModelBuff)
          var softwareVersion = util.stringToASCIIByte(softwareVersionBuff)
          var firmwareVersion = util.stringToASCIIByte(firmwareVersionBuff)
          that.sendModifyDeviceInforequest(equipmentModel, softwareVersion, firmwareVersion)
        }
      }
    })
  },
  // 修改设备信息的接口
  sendModifyDeviceInforequest: function (equipmentModel, softwareVersion, firmwareVersion) {
    var that = this
    util.request({
      url: "/equipment/define",
      data: {
        equipmentUID: that.data.deviceInfo.UID,
        equipmentModel: equipmentModel,
        softwareVersion: softwareVersion,
        firmwareVersion: firmwareVersion,
        token: wx.getStorageSync('token'),
      },
      success: function (result) {
        if (util.checkError(result.data) == true) {
          var uidkey = deviceModelHandle.uidToUIDKey(that.data.deviceInfo.UID)
          var modelname = deviceModelHandle.uidkeyToDeviceModel(uidkey).name + ' (' + uidkey + ',' + equipmentModel + ')'          
          that.setData({
            'infoItem_value[0]': modelname,
            'infoItem_value[2]': softwareVersion,
            'infoItem_value[3]': firmwareVersion,
          })
          util.showToast("获取设备信息成功")
        }
      },
    }, true)
  },
})