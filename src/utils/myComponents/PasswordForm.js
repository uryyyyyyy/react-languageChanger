'use strict';
import React  from 'react';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.string
	},
	getInitialState() {
		return {
			text:''
		};
	},
	onChange(e) {
		this.props.onChange(e.target.value);
	},
	render() {
		return (
			<input type="password"
			className="form-control"
			value={this.props.value}
			onChange={this.onChange}
			/>
		);
	}
});
