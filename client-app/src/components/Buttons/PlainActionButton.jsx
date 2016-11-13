import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'

const PlainActionButton = ({ className, action, onClick, label, children }) => (
  <FlatButton
    primary={true}
    label={label}
    onMouseUp={onClick}
    action={action}
  >
    {children}
  </FlatButton>
)

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({ type : ownProps.action });
    }
  }
}

export default connect(null, mapDispatchToProps)(PlainActionButton)
