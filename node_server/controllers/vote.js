module.exports = (db) => {
  return (req, res) => {

    const opts = {
      events: eventModel(db),
      error: genErrorHandler(res)
    }

    switch (req.method) {
      case 'POST':
        post(req, res, opts)
    }
  }
}

function post (req, res, opts) {
  const { events, error } = opts

  if (!req.params.eventId)
    return res.status(400).send('Invalid')

  events
    .incrementVote(req.params.eventId)
    .then()
    .catch(error)
}
