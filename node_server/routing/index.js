const { Router }          = require('express')
const eventController     = require('../controllers/event')
const voteController      = require('../controllers/vote')
const authTokenController = require('../controllers/authToken')

module.exports = function ({ db }) {

  const router = Router()

  router.all('/event/:eventId?', eventController(db))
  router.all('/vote/:eventId', voteController(db))
  //router.all('/admin/:eventId', voteController(db))
  router.all('/authToken/:eventId', authTokenController(db))

  // 404 if none found
  router.use((req, res, next) => {
    res.status(404).send('not found!')
  })

  return router
}
