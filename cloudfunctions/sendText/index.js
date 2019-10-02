const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.customerServiceMessage.send({
      touser: event.openid,
      msgtype: 'text',
      text: {
        content: '关注公众号，回复【证件照】即可获得'
      }
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}