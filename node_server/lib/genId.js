const crypto = require('crypto')

module.exports = function () {
  return crypto
          .createHash('md5')
          .update(crypto.pseudoRandomBytes(15).toString())
          .digest('hex')
          .slice(0, 10)
}
