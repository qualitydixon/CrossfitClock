import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import '../stylesheets/main.less'

export default class MainContainer extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={HomeContainer} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired,
}
