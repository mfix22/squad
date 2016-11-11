import React from 'react'
import MaterialAppBar from 'material-ui/AppBar'

import { color } from '../vars'

const AppBar = () => (
  <MaterialAppBar
    title="Squad"
    style={style.appBar}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
)

const style = {
  appBar: {
    backgroundColor: color.green,
  },
}

export default AppBar
