
// var deviceModelHandle = require('../../utils/comhandle/deviceModelHandle.js')

var util = require('../util.js')

var deviceModelInfo = [
  {
    'id': 0,
    'uidkey': 'unknown',
    'name': '未知设备',    
  },
  {
    'id': 1,
    'uidkey': 'DNKAA',
    'name': '807控制器',
    
  },
  {
    'id': 2,
    'uidkey': 'DNKAB',
    'name': '壁挂机',
    
  },
  {
    'id': 3,
    'uidkey': 'DNKAC',
    'name': '806控制器',
    
  },
  {
    'id': 4,
    'uidkey': 'DNKAL',
    'name': '817控制器',
    
  },
  {
    'id': 5,
    'uidkey': 'DNKAO',
    'name': '827控制器',
    
  },
]

// 将UID字符串提取出设备的秘钥
function uidToUIDKey(uidStr) {
  var uidBuff = util.hexStringToByte(uidStr)

  var oneBuff = [],
    zeroBuff = [],
    oneCount = 0,
    zeroCount = 0
  for (var i = 0; i < 2; i++)
    for (var j = 0; j < 8; j++) {
      if ((uidBuff[i] >> (7 - j)) & 0x01) {
        oneBuff[oneCount] = i * 8 + j
        oneCount++
      } else {
        zeroBuff[zeroCount] = i * 8 + j
        zeroCount++
      }
    }

  var keyBuff = []
  for (var i = 0; i < 5; i++) {
    if (oneCount >= 5) keyBuff[i] = uidBuff[oneBuff[i] + 2]
    else keyBuff[i] = uidBuff[zeroBuff[i] + 2]
  }

  var strBuff1 = keyBuff.slice(0, 3)
  var strBuff2 = keyBuff.slice(3)

  var chkBuff2 = uidBuff.slice(0, 2)
  var chkBuff1 = uidBuff.slice(17)

  strBuff1[0] ^= chkBuff1[0]
  strBuff1[1] ^= chkBuff1[1]
  strBuff1[2] ^= chkBuff1[2]
  strBuff2[0] ^= chkBuff2[0]
  strBuff2[1] ^= chkBuff2[1]

  keyBuff = strBuff1.concat(strBuff2)

  var keyStr = ''
  for (var i = 0; i < 5; i++) {
    keyStr = keyStr.concat(String.fromCharCode(keyBuff[i]))
  }

  return keyStr
}
// 根据设备秘钥得出设备的类型名称
function uidkeyToDeviceModel(uidkey) {
  
  for (var i = 1; i < deviceModelInfo.length; i++) {
    if (uidkey == deviceModelInfo[i].uidkey)
      return deviceModelInfo[i]
  }

  return deviceModelInfo[0]
}

module.exports = {
  deviceModelInfo: deviceModelInfo,
  uidToUIDKey: uidToUIDKey,
  uidkeyToDeviceModel: uidkeyToDeviceModel
}