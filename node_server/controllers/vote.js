const eventModel      = require('../models/event')
const genErrorHandler = require('../lib/errorHandler.js')

module.exports = (db) => {
  return (req, res) => {

    const opts = {
      events: eventModel(db),
      error: genErrorHandler(res)
    }

    switch (req.method) {
      case 'POST':
        post(req, res, opts)
        break
      case 'OPTIONS':
        res.status(200).end()
        break
    }
  }
}

function post (req, res, opts) {
  const { events, error } = opts

  if (!req.params.eventId || !req.body.time)
    return res.status(400).send('Invalid')

  events
    .incrementVote(req.params.eventId, req.body.time)
    .then( (event) => {
      res.status(200).json(event)
    })
    .catch(error)
}
