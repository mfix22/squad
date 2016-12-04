import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Chip from 'material-ui/Chip'
import Paper from './Paper'
import { color } from '../vars'
// import RadioField from '../RadioField'
// import EmojiBar from './EmojiBar'

const style = {
  form: {
    flexDirection: 'column',
    minWidth: '460px',
    width: '460px',
    height: '444px',
    padding: '24px 36px',
    margin: '0 8px 0 0'
  },
  h2: {
    display: 'inline-block',
    fontFamily: 'San Francisco, BlinkMacSystemFont, -apple-system, Helvetica Neue, Helvetica, sans-serif',
    margin: '0px 0px 4px 0px',
    fontSize: '36px'
  },
  h4: {
    display: 'inline-block',
    fontFamily: 'San Francisco, BlinkMacSystemFont, -apple-system, Helvetica Neue, Helvetica, sans-serif',
    margin: '0px 0px 24px 0px',
    fontSize: '16px'
  },
  sendButton: {
    width: '104px',
    margin: '8px 8px',
    display: 'inline-block'
  },
  image: {
    display: 'inline-block',
    width: '92px',
    height: '92px',
    margin: '0 auto 8px'
  },
  code: {
    fontFamily: 'Consolas, Courier New, monospace',
    margin: '0px 0px 16px',
    fontSize: '24px'
  },
  item: {
    margin: '4px 4px 16px',
    display: 'inline-block'
  }
}
let link

const copy = (node) => {
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(node)
  selection.removeAllRanges()
  selection.addRange(range)
  const success = document.execCommand('copy')
  selection.removeAllRanges()
}

class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleTouchTap() {
    this.setState({
      open: true,
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <Paper style={style.form}>
        <img
          style={style.image}
          alt="Success" src="./images/party.png"
        />
        <h2 style={style.h2}>{'Event created.'}</h2>
        <h4 style={style.h4}>{'Would you like to share it?'}</h4>
        <code
          ref={(node) => {
            link = node
          }}
          style={style.code}
        >
          squadup.io/my_fake_id
        </code>
        <div style={style.list}>
          {this.props.emails.map((item, index) => {
            return <Chip key={index} style={style.item}>{item}</Chip>
          })}
        </div>
        <div>
          <RaisedButton
            primary
            label="Send"
            style={style.sendButton}
          />
          <RaisedButton
            label="Copy"
            style={style.sendButton}
            backgroundColor={color.blue}
            labelColor="white"
            onClick={() => {
              copy(link)
              // link.blur()
              this.setState({ open: true })
            }}
          />
          <Snackbar
            open={this.state.open}
            message="Copied!"
            autoHideDuration={3000}
            bodyStyle={{
              backgroundColor: color.green
            }}
          />
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  emails: state.emails
})

const mapDispatchToProps = (dispatch) => {
  return {
    onSend: () => {
      dispatch({
        type: 'SEND_EMAILS'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
