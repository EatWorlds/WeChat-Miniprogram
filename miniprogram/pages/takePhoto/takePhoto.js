const app = getApp()
Page({
  data: {
    isModal: false, //是否显示拒绝保存图片后的弹窗
    src: '',
    position: 'back',
    isCanDraw: false,
  },

  flip() {
    if (this.data.position == "back") {
      this.setData({
        position: 'front',
      })
    } else {
      this.setData({
        position: 'back',
      })
    }
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        app.globalData.src = res.tempImagePath
        this.setData({
          src: res.tempImagePath,
          isCanDraw: true
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
    wx.getSetting({
      success: res => {
        let authSetting = res.authSetting
        if (!authSetting['scope.camera']) {
          this.setData({
            isModal: true
          })
        }
      }
    })
  },

  createShareImage() {
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  },
})