import React from 'react'
import { List, ListItem } from 'material-ui/List'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Moment from 'moment'

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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TimePicker
            hintText={this.props.hintTextTimeFrom}
            // floatingLabelText={this.props.label}
            // floatingLabelFixed
            value={this.state.timeFrom}
            onChange={this.handleChangeTimeFrom}
          />
          <TimePicker
            hintText={this.props.hintTextTimeTo}
            // floatingLabelText={this.props.label}
            // floatingLabelFixed
            value={this.state.timeTo}
            onChange={this.handleChangeTimeTo}
          />
          <DatePicker
            value={this.state.date}
            hintText={this.props.hintTextDate}
            container="inline"
            textFieldStyle={{ display: 'block' }}
            mode="landscape"
            onChange={this.handleChangeDate}
          />
          <input type="submit" value="Submit" />
        </form>
        <List>
          {this.state.options.map((option, index) => {
            console.log(this.state.options)
            return <ListItem key={index} primaryText={option.toString()} />
          })}
        </List>
      </div>
    )
  }
}

export default DatePickerWithList
