const { Router }      = require('express')

const eventController = require('../controllers/event')
const voteController  = require('../controllers/vote')

module.exports = function ({ db }) {

  const router = Router()

  router.all('/event/:eventId?', eventController(db))
  router.all('/vote', voteController(db))

  // 404 if none found
  router.use((req, res, next) => {
    res.status(404).send('not found!')
  })

  return router
}
