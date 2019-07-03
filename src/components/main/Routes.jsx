import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

/* Components */
import Component from '../components/Component'
import ErrorBoundary from './error-boundary/ErrorBoundary'

const routes = [
  {
    path: '/',
    component: Component,
    exact: true
  }
]

const RouteBuilder = route => {
  return (
    <Route
      exact={!!route.exact}
      path={route.path}
      render={props => (
        <ErrorBoundary>
          <route.component {...props} />
        </ErrorBoundary>
      )} />
  )
}

export default props => {
  return (
    <Switch>
      {routes.map((route, key) => (<RouteBuilder key={key} {...route} />))}
      <Redirect from="*" to="/" />
    </Switch>
  )
}