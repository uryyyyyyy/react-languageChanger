'use strict';
import React  from 'react';
import TextForm  from '../utils/myComponents/TextForm';
import PasswordForm  from '../utils/myComponents/PasswordForm';
import AsyncUtil  from '../utils/functions/AsyncUtil';
import Logger  from '../utils/functions/Logger';
import AlertMessage  from '../utils/myComponents/AlertMessage';

export default React.createClass({
	propTypes: {
		changeValid: React.PropTypes.func,
		isValid: React.PropTypes.bool
	},
	getInitialState() {
		return {
			accountId: "",
			currentPass: ""
		};
	},

	changeIsValid(res) {
		res ? this.props.changeValid(true) : this.props.changeValid(false);
	},
	changeAccountId(value) {
		this.setState({accountId: value});
		this.props.changeValid(false);
	},
	changecurrentPass(value) {
		this.setState({currentPass: value});
		this.props.changeValid(false);
	},
	check() {
		Logger.debug('check');
		const postObj = {
			accountId: this.state.accountId,
			currentPass: this.state.currentPass
		};
		AsyncUtil.postAjaxAsync('webAPI/checkAccount', postObj)
			.then(this.changeIsValid);
	},
	render() {
		const vDOM = this.props.isValid ?
		<div>ok</div> :
		<AlertMessage value="cannot velify account" />;
		return (
			<dl>
				<dt>Account ID</dt>
				<dd>
					<TextForm onChange={this.changeAccountId}
					value={this.state.accountId}/>
				</dd>
				<dt>current Password</dt>
				<dd>
					<PasswordForm onChange={this.changecurrentPass}
					value={this.state.currentPass}/>
				</dd>
				<dt>check</dt>
				<dd>
					<button onClick={this.check}
					children="check account" />
				</dd>
				<dt></dt>
				<dd>{vDOM}</dd>
			</dl>
		);
	}
});
