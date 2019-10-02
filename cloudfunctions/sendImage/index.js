const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.customerServiceMessage.send({
      touser: event.openid,
      msgtype: 'image',
      image: {
        mediaId: 'dEQPLiFZE8h2lAMzb0J9zQo5-gh5sS2Pe1h7K8JNOi--uUUICjMq2eIDYdzbeWMv'
      }
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}