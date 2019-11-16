const functions = require("firebase-functions")
const admin = require("firebase-admin")
const moment = require("moment")

module.exports = {
  getSignedURL: async (req, res) => {
    const storage = admin.storage()
    const bucket = storage.bucket()
    const filename = `image_${Number(new Date())}`
    const signedURL = await bucket.file(filename).getSignedUrl({
      action: "write",
      contentType: "application/x-www-form-urlencoded",
      expires: moment().utc().add(10, "minutes").format(),
    })
    if(signedURL[0] === undefined) {
      res.json({
        error: "failed"
      })
      return
    }
    const downloadURL = await bucket.file(filename).getSignedUrl({
      action: "read",
      expires: "03-09-2491"
    })
    res.json({
      signedURL: signedURL[0],
      downloadURL: downloadURL[0]
    })
  }
}
