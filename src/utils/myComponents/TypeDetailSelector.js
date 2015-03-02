'use strict';
import React  from 'react';
import Select  from 'react-select/src/Select';
import Logger  from '../functions/Logger';
import AsyncUtil  from '../functions/AsyncUtil';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		value: React.PropTypes.string,
		type_: React.PropTypes.string
	},
	getInitialState() {
		return {
			options: []
		};
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.type_ === this.props.type_){return;}
		if(nextProps.type_){
			AsyncUtil.getAjaxAsync(`webAPI/${nextProps.type_}/all`)
				.then(this.convertToSelect)
				.then(this.setData);
		}else{
			AsyncUtil.dummyPromise()
			.then(this.setData);
		}
	},
	setData: function(arr) {
		this.setState({
			options: arr
		});
	},

	convertToSelect(typeDetails) {
		return typeDetails.map(v => {
			return {
				value: String(v.id),
				label: v.name
			};
		});
	},

	onChange(val, selectedValues) {
		var langCode = selectedValues.map(v => v.value)[0];
		this.props.onChange(langCode);
	},
	render() {
		return (
			<div style={{width: 500}}>
			<Select
			value={this.props.value}
			options={this.state.options}
			onChange={this.onChange}
			/>
			</div>
		);
	}
});
