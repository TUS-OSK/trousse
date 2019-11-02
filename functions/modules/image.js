const functions = require("firebase-functions")
const admin = require("firebase-admin")
const moment = require("moment")

module.exports = {
  getSignedURL: async (req, res) => {
    const bucket = admin.storage().bucket()
    const filename = `image_${Number(new Date())}`
    const url = await bucket.file(filename).getSignedUrl({
      action: "write",
      expires: moment().utc().add(10, "minutes").format(),
    })
    if(url[0] === undefined) {
      res.json({
        error: "failed"
      })
      return
    }
    res.json({
      url: url[0]
    })
  }
}
