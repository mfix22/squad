module.exports = (res) => {
  return (err) => {
    switch (err.message) {
      case 'not found':
        res.status(400).json({ message: 'Event not found.'})
        break
      case 'invalid':
        res.status(400).json({ message: 'Invalid request'})
        break
      default:
        res.status(500).json({ message: err.message})
    }
  }
}
