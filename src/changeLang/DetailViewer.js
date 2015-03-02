'use strict';
import React  from 'react';
import AsyncUtil  from '../utils/functions/AsyncUtil';
import Logger  from '../utils/functions/Logger';

export default React.createClass({
	propTypes: {
		type_: React.PropTypes.string,
		id: React.PropTypes.string,
		lang: React.PropTypes.string
	},
	getInitialState() {
		return {value: ""};
	},

	componentWillReceiveProps(nextProps){
		if((nextProps.type_ === this.props.type_) &&
			(nextProps.id === this.props.id) &&
			(nextProps.lang === this.props.lang) ){return;}
		if(!nextProps.type_){return;}
		if(!nextProps.id){return;}
		if(!nextProps.lang){return;}
		AsyncUtil.getAjaxAsync(`webAPI/${nextProps.type_}/${nextProps.id}/${nextProps.lang}`)
			.then(this.setData);
	},
	setData: function(obj) {
		this.setState({
			value: obj.name
		});
	},

	render() {
		return (
			<p children={this.state.value} />
		);
	}
});
