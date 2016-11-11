import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { color } from '../../vars'

const PlainActionButtonRaised = ({ action, onClick, label, style }) => (
  <RaisedButton
    label={label}
    primary
    style={Object.assign(styles, style)}
    onMouseUp={onClick}
  />
)

const styles = {
  backgroundColor: color.green,
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch({ type : ownProps.action });
//     }
//   }
// }
//
// export default connect(null, mapDispatchToProps)(PlainActionButton)

export default PlainActionButtonRaised;
