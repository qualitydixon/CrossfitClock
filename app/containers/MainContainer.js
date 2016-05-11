import React, { PropTypes } from 'react'
require('../stylesheets/main.less')

function MainContainer (props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired,
}


module.exports = MainContainer
