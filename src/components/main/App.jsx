import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

/* Store */
import { Store } from '../../redux/store'

/* Components */
import Routes from './Routes'

export default props => {
  return (
    <Provider store={Store}>
      <HashRouter>
          <Routes />
      </HashRouter>
    </Provider>
  )
}