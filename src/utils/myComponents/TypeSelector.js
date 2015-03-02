'use strict';
import React  from 'react';
import Select  from 'react-select/src/Select';
import Logger  from '../functions/Logger';
import AsyncUtil  from '../functions/AsyncUtil';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func
	},
	getInitialState() {
		return {
			options: [
			{value: 'user', label: 'user'},
			{value: 'food', label: 'food'},
			{value: 'other', label: 'other'}
			]
		};
	},
	convertToLangCode(selectedValues) {
		var code = selectedValues.map(function(selectedValue){
			return selectedValue.value;
		});
		return code[0];
	},
	onChange(val, selectedValues) {
		var langCode = this.convertToLangCode(selectedValues);
		this.props.onChange(langCode);
	},

	render() {
		return (
			<div style={{width: 200}}>
			<Select
			value={this.props.value}
			options={this.state.options}
			onChange={this.onChange}
			/>
			</div>
		);
	}
});
