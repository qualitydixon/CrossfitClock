var React = require('react');
require('../stylesheets/main.less');

var MainContainer = React.createClass({
    render: function() {
        return (
        	<div>
	            {this.props.children}
                <a target="_blank" href="https://github.com/qualitydixon"><i className="fa fa-github icon git"></i></a>
                <a target="_blank" href="https://twitter.com/dixonbydesign"><i className="fa fa-twitter icon git"></i></a>
            </div>
        )
    }
});

module.exports = MainContainer;