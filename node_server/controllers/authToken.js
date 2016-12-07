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
    }
  }
}

function post (req, res, opts) {
  const { events, error } = opts

    if (!req.params.eventId || !req.body.token || typeof req.body.token !== 'string')
      res.status(400).send('Invalid')

  events
    .addAuthToken(req.params.eventId, req.body.token)
    .then( event => res.status(200).json(event))
    .catch(error)
}
