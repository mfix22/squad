import React from 'react'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import moment from 'moment'

import Label from './Label'
import { sendVote } from '../api'
import { color } from '../vars'
import { CHANGE_TIME, CHANGE_DATE, ADD_OPTION, DELETE_OPTION } from '../actions'

const style = {
  form: {
    position: 'relative',
    paddingTop: '12px',
    margin: '16px 0px 0px 0px'
  },
  timePicker: {
    width: '88px',
    marginRight: '16px',
    float: 'left'
  },
  datePicker: {
    width: '124px',
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
  return `${moment(option.time).format('MMM Do')},
    ${moment(option.time).format('LT')} -
   ${moment(option.time).add(1, 'h').format('LT')}`
}

const DatePickerWithList = ({
                              time,
                              date,
                              options,
                              disabled,
                              hintTextTimeFrom,
                              hintTextDate,
                              handleVote,
                              handleSubmit,
                              handleChangeTime,
                              handleChangeDate,
                              handleChipDelete }) => {
  return (
    <div>
      <form style={style.form} onSubmit={handleSubmit}>
        <Label labelFor="TimePicker" text="When" />
        <TimePicker
          hintText={hintTextTimeFrom}
          value={time}
          onChange={handleChangeTime}
          textFieldStyle={style.timePicker}
          style={style.timeFrom}
        />
        {
          /*
          <TimePicker
            hintText={hintTextTimeTo}
            value={form.timeTo}
            onChange={handleChangeTimeTo}
            textFieldStyle={style.timePicker}
            style={style.timeTo}
          />
          */
        }
        <DatePicker
          autoOk
          value={date}
          hintText={hintTextDate}
          textFieldStyle={style.datePicker}
          mode="landscape"
          onChange={handleChangeDate}
        />
        {/* <PlainActionButton label="Add option" onClick={this.handleSubmit} action="ADD_OPTION">
          <input type="submit" value="Submit" style={style.submit} />
        </PlainActionButton> */}
        <FlatButton label="Add option" disabled={disabled} onClick={handleSubmit} />
      </form>
      <div style={style.chips}>
        <Label labelFor="Chips" text="Options" />
        {options.map((option, index) => {
          return (
            <Chip
              key={option.id}
              style={style.chip}
              onRequestDelete={() => handleChipDelete(option.time)}
            >
              <Avatar
                onClick={() => handleVote(option)}
                size={24}
                style={{ cursor: 'pointer' }}
                backgroundColor={(index === 0) ? color.green : null}
              >
                {option.count}
              </Avatar>
              {optionToDisplayString(option)}
            </Chip>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { time, date, options } = state.form
  return {
    options,
    time: (!time) ? null : moment(time).toDate(),
    date: (!date) ? null : moment(date).toDate(),
    disabled: !time || !date // TODO|| !state.form.duration
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
  handleSubmit: (e) => {
    e.preventDefault()
    dispatch({
      type: ADD_OPTION
    })
  },
  handleChipDelete: (id) => {
    dispatch({
      type: DELETE_OPTION,
      id
    })
  },
  handleVote: (option) => {
    dispatch(sendVote(option.time))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerWithList)
