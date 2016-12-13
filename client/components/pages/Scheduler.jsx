import React from 'react'
import { withRouter } from 'react-router'
import Base from './Base'

class Scheduler extends React.Component {

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      return 'You have unsaved information, are you sure you want to leave this page?'
    })
  }

  render() {
    const { params, children } = this.props
    return <Base params={params}>{children}</Base>
  }
}

export default withRouter(Scheduler)
