const validator = require('./validator')('admin')
const genId     = require('../lib/genId')

module.exports = (db) => {
  const admins = db.collection('admins')

  return {
    get: get.bind(null, admins),
    insert: insert.bind(null, admins),
  }
}

function get (admins, id) {
  return new Promise((resolve, reject) => {
    admins
      .find({ id })
      .limit(1)
      .next()
      .then((admin) => {
        if (!admin) {
          throw new Error('not found')
        } else {
          resolve(admin)
        }
      })
      .catch(reject)
  })
}

function insert (admins, id) {
  return new Promise((resolve, reject) => {
    const admin = { id }

    // validate
    if (!validator.validate(admin))
      reject(new Error('invalid'))

    const cleanedAdmin = validator.extract(admin, {
      includeOptional: true
    })
    cleanedAdmin.key = genId()

    admins
    .find({ id })
    .limit(1)
    .next()
    .then((admin) => {
      if (admin) {
        throw new Error('already exists')
      } else {
        return admins.insertOne(cleanedAdmin)
      }
    })
    .then((result) => resolve(result.ops[0]))
    .catch(reject)
  })
}
