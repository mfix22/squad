import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'

const PlainActionButton = ({ className, action, onClick, label}) => (
  <FlatButton
    primary={true}
    label={label}
    onMouseUp={onClick}
  />
)

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick : () => {
      dispatch({ type : ownProps.action });
    }
  }
}

export default connect(null, mapDispatchToProps)(PlainActionButton)
