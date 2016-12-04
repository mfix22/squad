import React from 'react'
// import { connect } from 'react-redux'
import AppBar from '../AppBar'
import Form from '../Form'
import CalendarPaper from '../calendar/CalendarPaper'
import Confirmation from '../Confirmation'

const style = {
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  container: {
    display: 'flex',
    minHeight: '700px',
    minWidth: '1200px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1600px',
    width: '100%',
  }
}

class Scheduler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div style={style.container}>
        <AppBar />
        <div style={style.paperContainer}>
          <Form />
          <CalendarPaper />
        </div>
        <Confirmation />
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     dates: state.dates,
//     times: state.times,
//   }
// }
//
// export default connect(mapStateToProps)(Scheduler)

export default Scheduler
