var React = require('react')
require('../stylesheets/main.less')

var MainContainer = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  },
})

module.exports = MainContainer
