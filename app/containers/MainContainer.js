import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/main.less'

export default function MainContainer(props) {
  return <div>{props.children}</div>
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired,
}
