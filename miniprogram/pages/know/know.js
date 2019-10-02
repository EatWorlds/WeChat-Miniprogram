// miniprogram/pages/know/know.js
// const myPackage = require('remove.bg')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  toTakePhoto() {
    wx.navigateTo({
      url: '../takePhoto/takePhoto'
    })
  },

  chooseImage(type = 'camera') { //选取图片
    const that = this
    wx.chooseImage({
      sizeType: ['compressed'], //original 原图，compressed 压缩图
      c: ['album', 'camera'], //album 从相册选图，camera 使用相机
      success(res) {
        const image = res.tempFiles[0]
        //console.log(image)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success(res) {
            //console.log(res.data)

            let dataParams = {
              "image_file_b64": res.data,
              "size": 'auto',
              "type": 'person',
              "format": 'png',
              "crop": true
            }

            wx.showLoading({
              titleS: '图片处理中...'
            })

            // ai6g6i4v23yzwYXUqafmC9jw
            var key = 'a4EAKztncUzav3f5RWajX2XV'
            console.log(key)
            wx.request({
              url: 'https://api.remove.bg/v1.0/removebg', //接口地址
              data: dataParams,
              header: {
                'Accept': 'application/json',
                'content-type': 'application/json', // 默认值
                'X-Api-Key': key
              },
              method: 'POST',
              success(res) {
                wx.setStorageSync('response', res.data.data.result_b64)
                console.log(res)
                console.log(res.data)
                console.log(res.data.data)
                console.log(res.data.data.result_b64)
                
                
                var filePath = `${wx.env.USER_DATA_PATH}/bbg.png`
                wx.getFileSystemManager().writeFile({
                  filePath: filePath,
                  data: res.data.data.result_b64,
                  encoding: 'base64',
                  success: res => {
                    console.log(filePath)
                    app.globalData.image = filePath
                    wx.setStorageSync('image', filePath)
                    wx.hideLoading()
                    wx.navigateTo({
                      url: '../preview/preview'
                    })
                  },
                  fail: res => {
                    console.log(res)
                    wx.hideLoading()
                    wx.showToast({
                      title: '失败，请重试',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              }
            })
          }
        })

        // 图片过大
        if (image.size > 1024 * 1000) {
          console.log('图片过大，上传失败', res) //压缩了之后不会过大
          wx.showToast({
            icon: 'none',
            title: '图片过大, 请重新拍张小的！'
          })
          return false
        }
        //that.setData({ image: image.path })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})