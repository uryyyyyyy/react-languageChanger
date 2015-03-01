'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		value: React.PropTypes.string
	},
	render() {
		return (
			<div style={{color: 'red'}}
			children={this.props.value} />
		);
	}
});
