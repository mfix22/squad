import React from 'react'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import AutoComplete from 'material-ui/AutoComplete'
import moment from 'moment'

import Label from './Label'
import { sendVote, sendEvent } from '../api'
import { color } from '../vars'
import { CHANGE_TIME, CHANGE_DATE, CHANGE_DURATION, ADD_OPTION, DELETE_OPTION } from '../actions'

const style = {
  form: {
    position: 'relative',
    paddingTop: '12px',
    margin: '16px 0px 0px 0px'
  },
  timePicker: {
    width: '136px',
    marginRight: '16px',
    float: 'left'
  },
  durationPicker: {
    width: '96px',
    marginTop: '16px',
    float: 'left'
  },
  datePicker: {
    width: '136px',
    float: 'left'
  },
  submit: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  chips: {
    paddingTop: '24px',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: '4px',
  }
}

const optionToDisplayString = (option) => {
  return `${moment(option).format('MMM Do')}, ${moment(option).format('LT')}`
}

const humanize = (time) => {
  if (time < 60 * 60 * 1000) return `${Math.floor(time / (60 * 1000))} minutes`
  return `${time / (60 * 60 * 1000)} hours`
}

const baseValues = [30, 60, 15, 90, 120, 45]
                    .concat([...Array(29).keys()].map(key => key + 1))
                    .concat([...Array(8).keys()].map(key => (key + 5) * 30))
// convert minutes to milliseconds
const timeValues = baseValues.map(minutes => minutes * 60 * 1000).map(value => ({
  text: humanize(value),
  value
}))

// const getRoundedTime = () => {
//   const time = moment()
//   const minutes = 30 - (time.minutes() % 30)
//   const c = time.add(time.minutes() + minutes, 'm')
//   return c.toDate()
// }

const DatePickerWithList = ({
                              time,
                              date,
                              options,
                              duration,
                              disabled,
                              params,
                              hintTextTimeFrom,
                              hintTextDate,
                              handleVote,
                              handleSubmit,
                              handleChangeTime,
                              handleChangeDate,
                              handleChangeDuration,
                              handleChipAdd,
                              handleChipDelete }) => {
  const EDIT_FORM = params && !params.event_id
  return (
    <div>
      {
        (EDIT_FORM) ? (
          <form style={style.form} onSubmit={handleSubmit}>
            <Label labelFor="TimePicker" text="When" />
            <TimePicker
              hintText={hintTextTimeFrom}
              value={time}
              onChange={handleChangeTime}
              textFieldStyle={style.timePicker}
            />
            <DatePicker
              autoOk
              value={date}
              hintText={hintTextDate}
              textFieldStyle={style.datePicker}
              mode="landscape"
              onChange={handleChangeDate}
            />
            <FlatButton label="Add option" disabled={disabled} onClick={handleChipAdd} />
          </form>
        ) : null
      }
      <div style={style.chips}>
        <Label labelFor="Chips" text="Options" />
        {options.map((option, index) => {
          const timeKey = Object.keys(option)[0]
          const count = option[timeKey]
          return (
            <Chip
              key={index}
              style={style.chip}
              onRequestDelete={EDIT_FORM ? () => handleChipDelete(timeKey) : null}
            >
              {
                (!EDIT_FORM) ? (
                  <Avatar
                    onClick={() => handleVote(option)}
                    size={24}
                    style={{ cursor: 'pointer' }}
                    backgroundColor={(index === 0) ? color.green : null}
                  >
                    {count}
                  </Avatar>
                ) : null // don't display vote counts unless voting
              }
              {optionToDisplayString(timeKey)}
            </Chip>
          )
        })}
      </div>
      <AutoComplete
        openOnFocus
        hintText={humanize(duration)}
        dataSource={timeValues}
        dataSourceConfig={{ text: 'text', value: 'value' }}
        filter={AutoComplete.fuzzyFilter}
        maxSearchResults={5}
        style={style.durationPicker}
        onNewRequest={handleChangeDuration}
        floatingLabelFixed
        floatingLabelText="How long?"
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { time, date, options, duration } = state.form
  return {
    options,
    time: (!time) ? null : moment(time).toDate(),
    date: (!date) ? null : moment(date).toDate(),
    duration,
    disabled: !time || !date
  }
}

const mapDispatchToProps = dispatch => ({
  handleChangeTime: (e, time) => {
    dispatch({
      type: CHANGE_TIME,
      time
    })
  },
  handleChangeDate: (e, date) => {
    dispatch({
      type: CHANGE_DATE,
      date
    })
  },
  handleChipAdd: () => {
    dispatch({
      type: ADD_OPTION
    })
  },
  handleChipDelete: (time) => {
    dispatch({
      type: DELETE_OPTION,
      time
    })
  },
  handleVote: (option) => {
    dispatch(sendVote(option.time))
  },
  handleChangeDuration: (choice) => {
    dispatch({
      type: CHANGE_DURATION,
      duration: choice.value
    })
  },
  handleSubmit: (e) => {
    e.preventDefault()
    dispatch(sendEvent())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerWithList)
