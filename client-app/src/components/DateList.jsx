import React from 'react'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import moment from 'moment'

import Label from './Label'
import { color } from '../vars'

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

const optionToDisplayString = (vote) => {
  return `${moment(vote.date).format('MMM Do YY')},
    ${moment(vote.timeFrom).format('LT')} -
   ${moment(vote.timeTo).format('LT')}`
}

const DatePickerWithList = ({
                              form,
                              hintTextTimeFrom,
                              hintTextTimeTo,
                              hintTextDate,
                              handleSubmit,
                              handleChangeTimeFrom,
                              handleChangeTimeTo,
                              handleChangeDate,
                              handleChipDelete }) => {
  return (
    <div>
      <form style={style.form} onSubmit={handleSubmit}>
        <Label labelFor="TimePicker" text="When" />
        <TimePicker
          hintText={hintTextTimeFrom}
          value={form.timeFrom}
          onChange={handleChangeTimeFrom}
          textFieldStyle={style.timePicker}
          style={style.timeFrom}
        />
        <TimePicker
          hintText={hintTextTimeTo}
          value={form.timeTo}
          onChange={handleChangeTimeTo}
          textFieldStyle={style.timePicker}
          style={style.timeTo}
        />
        <DatePicker
          autoOk
          value={form.date}
          hintText={hintTextDate}
          textFieldStyle={style.datePicker}
          mode="landscape"
          onChange={handleChangeDate}
        />
        {/* <PlainActionButton label="Add option" onClick={this.handleSubmit} action="ADD_OPTION">
          <input type="submit" value="Submit" style={style.submit} />
        </PlainActionButton> */}
        <FlatButton label="Add option" onClick={handleSubmit} />
      </form>
      <div style={style.chips}>
        <Label labelFor="Chips" text="Options" />
        {form.votes.map((vote, index) => {
          return (
            <Chip
              key={vote.id}
              style={style.chip}
              onRequestDelete={() => handleChipDelete(vote.id)}
            >
              <Avatar size={24} backgroundColor={(index === 0) ? color.green : null}>
                {vote.count}
              </Avatar>
              {optionToDisplayString(vote)}
            </Chip>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  form: state.form
})

const mapDispatchToProps = dispatch => ({
  handleChangeTimeFrom: (e, time) => {
    dispatch({
      type: 'CHANGE_TIME_FROM',
      time
    })
  },
  handleChangeTimeTo: (e, time) => {
    dispatch({
      type: 'CHANGE_TIME_TO',
      time
    })
  },
  handleChangeDate: (e, date) => {
    dispatch({
      type: 'CHANGE_DATE',
      date
    })
  },
  handleSubmit: (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_VOTE'
    })
  },
  handleChipDelete: (id) => {
    dispatch({
      type: 'DELETE_VOTE',
      id
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerWithList)

// class DatePickerWithList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       options: props.option,
//     }
//
//     this.handleChangeTimeFrom = this.handleChangeTimeFrom.bind(this)
//     this.handleChangeTimeTo = this.handleChangeTimeTo.bind(this)
//     this.handleChangeDate = this.handleChangeDate.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.handleChipDelete = this.handleChipDelete.bind(this)
//   }
//
//   handleChangeTimeTo(event, time) {
//     this.setState({
//       timeTo: time,
//     })
//   }
//
//   handleChangeTimeFrom(event, time) {
//     this.setState({
//       timeFrom: time,
//     })
//   }
//
//   handleChangeDate(event, date) {
//     this.setState({ date })
//   }
//
//   handleSubmit(event) {
//     const arr = this.state.options
//     arr.push({
//       timeFrom: this.state.timeFrom,
//       timeTo: this.state.timeTo,
//       date: this.state.date
//     })
//
//     this.setState({
//       options: arr,
//       timeFrom: null,
//       timeTo: null,
//       date: null,
//     })
//
//     event.preventDefault()
//   }
//
//   handleChipDelete(index) {
//     const arr = this.state.options
//     arr.splice(index, 1)
//     this.setState({
//       options: arr
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         <form style={style.form} onSubmit={this.handleSubmit}>
//           <Label labelFor="TimePicker" text="When" />
//           <TimePicker
//             hintText={this.props.hintTextTimeFrom}
//             value={this.state.timeFrom}
//             onChange={this.handleChangeTimeFrom}
//             textFieldStyle={style.timePicker}
//             style={style.timeFrom}
//           />
//           <TimePicker
//             hintText={this.props.hintTextTimeTo}
//             value={this.state.timeTo}
//             onChange={this.handleChangeTimeTo}
//             textFieldStyle={style.timePicker}
//             style={style.timeTo}
//           />
//           <DatePicker
//             value={this.state.date}
//             hintText={this.props.hintTextDate}
//             textFieldStyle={{ display: 'block' }}
//             mode="landscape"
//             onChange={this.handleChangeDate}
//           />
//           {/* <PlainActionButton label="Add option" onClick={this.handleSubmit} action="ADD_OPTION">
//             <input type="submit" value="Submit" style={style.submit} />
//           </PlainActionButton> */}
//           <FlatButton label="Add option" onClick={handleSubmit} />
//
//         </form>
//         <div style={style.chips}>
//           {this.state.options.map((option, index) => {
//             return <Chip key={index} style={style.chip} onRequestDelete={handleChipDelete}>{optionToDisplayString(option)}</Chip>
//           })}
//         </div>
//       </div>
//     )
//   }
// }
//
// export default DatePickerWithList
