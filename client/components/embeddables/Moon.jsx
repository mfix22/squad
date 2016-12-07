import React from 'react'
import moment from 'moment'
import { getMoonIllumination } from 'suncalc'

const moonStyle = {
  margin: '1px 0',
  zIndex: 1000,
  position: 'relative'
}

const getEmoji = (value) => {
  if (value < 0.01) return '🌑'
  if (value < 0.245) return '🌒'
  if (value < 0.255) return '🌓'
  if (value < 0.495) return '🌔'
  if (value < 0.505) return '🌕'
  if (value < 0.745) return '🌖'
  if (value < 0.755) return '🌗'
  return '🌘'
}

const Moon = ({ date }) => (
  <div style={moonStyle}>
    {getEmoji(getMoonIllumination(moment(date).toDate()).phase)}
  </div>
)

export default Moon
