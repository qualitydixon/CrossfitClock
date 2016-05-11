import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import MainContainer from '../containers/MainContainer'
import HomeContainer from '../containers/HomeContainer'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
    </Route>
  </Router>
)

module.exports = routes
