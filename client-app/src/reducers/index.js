import { combineReducers } from 'redux'
import events from './events'

const calendarReducers = combineReducers({
  events,
})

export default calendarReducers
