import React from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

import Logo from './Logo'
import SchedulingStepper from './SchedulingStepper'
import NotificationsButton from './buttons/NotificationsButton'
import AvatarButton from './buttons/AvatarButton'
import { color } from '../vars'

const style = {
  appBar: {
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    position: 'relative',
    zIndex: 1100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '24px',
    paddingRight: '24px',
    height: '64px'
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  }
}

const AppBar = () => (
  <div style={style.appBar}>
    <div style={style.container}>
      <IconButton>
        <NavigationMenu />
      </IconButton>
      <Logo />
    </div>
    <SchedulingStepper activeStep={1} />
    <div style={style.container}>
      <NotificationsButton />
      <AvatarButton src="./images/user-jake.png" />
    </div>
  </div>
)

export default AppBar
