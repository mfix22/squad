import { combineReducers } from 'redux'
import events from './events'
import date from './date'
import votes from './votes'
import form from './form'

const calendarReducers = combineReducers({
  date,
  events,
  votes,
  form
})

export default calendarReducers
