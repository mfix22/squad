import { combineReducers } from 'redux'
import events from './events'
import date from './date'

const calendarReducers = combineReducers({
  date,
  events,
})

export default calendarReducers
