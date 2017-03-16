import React from 'react'
import { Router } from 'react-router'
import routes from './routes'
import createBrowserHistory from 'history/createBrowserHistory'

class AppRouter extends React.Component {

  render () {

    const history = createBrowserHistory()

    return (
      <Router
        {...{history}}
        {...this.props}>
        {routes}
      </Router>
    )
  }
}

export default AppRouter
