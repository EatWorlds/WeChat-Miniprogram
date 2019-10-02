Component({
  properties: {
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPic()
      }
    }
  },
  data: {
    isModal: false, //是否显示拒绝保存图片后的弹窗
    imgDraw: {}, //绘制图片的大对象
    sharePath: '', //生成的分享图
    visible: false
  },
  methods: {
    handlePhotoSaved() {
      this.savePhoto(this.data.sharePath)
    },
    handleClose() {
      this.setData({
        visible: false
      })
    },
    drawPic() {
      // if (this.data.sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
      //     this.setData({
      //         visible: true
      //     })
      //     this.triggerEvent('initData')
      //     return
      // }
      const app = getApp()
      this.setData({
        sharePath: app.globalData.src,
        visible: true,
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData')
    },
    
    preventDefault() {},
    // 保存图片
    savePhoto(path) {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      this.setData({
        isDrawImage: false
      })
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
          setTimeout(() => {
            this.setData({
              visible: false
            })
          }, 300)
        },
        fail: (res) => {
          wx.getSetting({
            success: res => {
              let authSetting = res.authSetting
              if (!authSetting['scope.writePhotosAlbum']) {
                this.setData({
                  isModal: true
                })
              }
            }
          })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({
              visible: false
            })
          }, 300)
        }
      })
      wx.uploadFile({
        url: 'https://aiyou.ac.cn/project/xcxbwg/upload.php', //接口地址
        filePath: path,
        name: 'file',
        success(res) {
          console.log(res.data)
          const result = JSON.parse(res.data)
          console.log(result.result)
          wx.request({
            method: 'POST',
            url: 'https://aiyou.ac.cn/project/xcxbwg/webservice.php', //接口
            data: {
              "_url": "user/image/add",
              "image": result.result,
              "openid": wx.getStorageSync('openid'),
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
            }
          })
        }
      })
    }
  }
})