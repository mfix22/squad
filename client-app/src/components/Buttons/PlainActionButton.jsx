import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';

const PlainActionButton = ({ disabled, style, action, onClick, label, children }) => (
  <FlatButton
    primary
    label={label}
    onMouseUp={onClick}
    action={action}
    style={style}
    disabled={disabled}
  >
    {children}
  </FlatButton>
)

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({ type: ownProps.action });
    }
  }
}

export default connect(null, mapDispatchToProps)(PlainActionButton)
