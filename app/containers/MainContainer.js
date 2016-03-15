var React = require('react');

var MainContainer = React.createClass({
    render: function() {
        return (
        	<div>
	            <h2> This is your MainContainer. It is set as your parent route. It will always be active. </h2>
	            {this.props.children}
            </div>
        )
    }
});

module.exports = MainContainer;