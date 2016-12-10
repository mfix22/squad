import React from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

import { color } from '../vars'

const style = {
  backgroundColor: color.error,
  textAlign: 'center',
  maxWidth: '240px'
}

const ErrorPopUp = ({ error }) => (
  <Snackbar
    open={!!error}
    message={error || 'No Error'}
    bodyStyle={style.snackbar}
  />
)

const mapStateToProps = state => ({
  error: state.error
})

export default connect(mapStateToProps)(ErrorPopUp)
