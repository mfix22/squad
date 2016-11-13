import { combineReducers } from 'redux'
import events from './events'
import date from './date'
import view from './view'

const calendarReducers = combineReducers({
  date,
  events,
  view,
})

export default calendarReducers
