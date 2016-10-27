import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'

const NextButton = ({ onClick }) => (
  <FlatButton
    primary={true}
    label=">"
    onMouseUp={onClick}
  />
)

const mapDispatchToProps = (dispatch) => {
  return {
    onClick : () => {
      dispatch({ type : 'VIEW_NEXT_MONTH' });
    }
  }
}

export default connect(null, mapDispatchToProps)(NextButton)
