var React = require('react');

var Home = React.createClass({
  render: function () {
    return (
      <div> This is your home component, which is currently set as the IndexRoute in app/config/routes.js. It shows when no other routes are active. </div>
    )
  }
});

module.exports = Home;