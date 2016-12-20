const adminModel      = require('../models/admin')
const genErrorHandler = require('../lib/errorHandler.js')

module.exports = (db) => {
  return (req, res) => {
    const opts = {
      admins: adminModel(db),
      error: genErrorHandler(res)
    }

    switch (req.method) {
      case 'GET':
        get(req, res, opts)
        break
      case 'POST':
        post(req, res, opts)
        break
    }
  }
}

function get (req, res, opts) {

  const { admins, error } = opts

  if (!req.params.eventId || !req.query.key)
    return res.status(400).send('Invalid')

  admins
    .get(req.params.eventId)
    .then( (admin) => {
      const valid = admin.key === req.query.key
      res.status(200).json({ valid })
    })
    .catch(error)
}

function post (req, res, opts) {
  const { admins, error } = opts

  if (!req.params.eventId)
    return res.status(400).send('Invalid')

  admins
    .insert(req.params.eventId)
    .then( (admin) => {
      res.status(200).json(admin)
    })
    .catch(error)
}
