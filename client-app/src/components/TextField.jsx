import React from 'react'
import MaterialTextField from 'material-ui/TextField'

import { color } from '../vars'

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const TextField = ({ hint, label }) => (
  <MaterialTextField
    hintText={hint}
    floatingLabelText={label}
    floatingLabelFixed
  />
)

const style = {
  appBar: {
    backgroundColor: color.green,
  },
}

export default TextField
