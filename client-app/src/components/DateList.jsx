import React from 'react'
import Chip from 'material-ui/Chip'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import Moment from 'moment'

import Label from './Label'
import PlainActionButton from './Buttons/PlainActionButton'

const style = {
  form: {
    position: 'relative',
    paddingTop: '12px',
    marginTop: '16px'
  },
  timePicker: {
    width: '88px',
    display: 'block',
  },
  timeFrom: {
    position: 'absolute',
  },
  timeTo: {
    marginLeft: '104px',
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
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: '4px',
  }
}

const optionToDisplayString = (option) => {
  return `${Moment(option.date).format('MMM Do YY')},
    ${Moment(option.timeFrom).format('h:mmA')} -
   ${Moment(option.timeTo).format('h:mmA')}`
}

class DatePickerWithList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
    }

    this.handleChangeTimeFrom = this.handleChangeTimeFrom.bind(this)
    this.handleChangeTimeTo = this.handleChangeTimeTo.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChipDelete = this.handleChipDelete.bind(this)
  }

  handleChangeTimeTo(event, time) {
    this.setState({
      timeTo: time,
    })
  }

  handleChangeTimeFrom(event, time) {
    this.setState({
      timeFrom: time,
    })
  }

  handleChangeDate(event, date) {
    this.setState({ date })
  }

  handleSubmit(event) {
    const arr = this.state.options
    arr.push({
      timeFrom: this.state.timeFrom,
      timeTo: this.state.timeTo,
      date: this.state.date
    })

    this.setState({
      options: arr,
      timeFrom: null,
      timeTo: null,
      date: null,
    })

    event.preventDefault()
  }

  handleChipDelete(index) {
    console.log(index)
    const arr = this.state.options
    arr.splice(index, 1)
    this.setState({
      options: arr
    })
  }

  render() {
    return (
      <div>
        <form style={style.form} onSubmit={this.handleSubmit}>
          <Label labelFor="TimePicker" text="When" />
          <TimePicker
            hintText={this.props.hintTextTimeFrom}
            value={this.state.timeFrom}
            onChange={this.handleChangeTimeFrom}
            textFieldStyle={style.timePicker}
            style={style.timeFrom}
          />
          <TimePicker
            hintText={this.props.hintTextTimeTo}
            value={this.state.timeTo}
            onChange={this.handleChangeTimeTo}
            textFieldStyle={style.timePicker}
            style={style.timeTo}
          />
          <DatePicker
            value={this.state.date}
            hintText={this.props.hintTextDate}
            textFieldStyle={{ display: 'block' }}
            mode="landscape"
            onChange={this.handleChangeDate}
          />
          {/* <PlainActionButton label="Add option" onClick={this.handleSubmit} action="ADD_OPTION">
            <input type="submit" value="Submit" style={style.submit} />
          </PlainActionButton> */}
          <FlatButton label="Add option" onClick={this.handleSubmit}></FlatButton>

        </form>
        <div style={style.chips}>
          {this.state.options.map((option, index) => {
            console.log(this.state.options)
            return <Chip key={index} style={style.chip} onRequestDelete={() => this.handleChipDelete(index)}>{optionToDisplayString(option)}</Chip>
          })}
        </div>
      </div>
    )
  }
}

export default DatePickerWithList
