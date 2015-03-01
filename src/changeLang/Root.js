'use strict';
import React  from 'react';
import AsyncUtil  from '../utils/functions/AsyncUtil';
import Logger  from '../utils/functions/Logger';
import LanguageSelector  from '../utils/myComponents/LanguageSelector';
import TextForm  from '../utils/myComponents/TextForm';
import AccountCheckForm  from './AccountCheckForm';

export default React.createClass({
	propTypes: {},
	getInitialState() {
		return {
			isValidAccount: false,
			isValidPassword: false
		};
	},
	changeIsValidAccount(value) {
		this.setState({isValidAccount: value});
	},
	changeIsValidNewPassword(value) {
		this.setState({isValidPassword: value});
	},

	post() {
		Logger.debug('post');
		const postObj = {
			accountId: this.refs.accountForm.state.accountId,
			currentPass: this.refs.accountForm.state.currentPass,
			newPass: this.refs.newPasswordForm.state.newPass,
		};
		AsyncUtil.postAjaxAsync('webAPI/changePass', postObj);
	},
	render() {
		return (
			<div>
				<h2 children='Check Current Account' />
				<AccountCheckForm ref="accountForm"
				changeValid={this.changeIsValidAccount}
				isValid={this.state.isValidAccount} />

				<h2 children='what do you want to change?' />
				<LanguageSelector value='ja'/>
				<TextForm />
				<TextForm />

				<button onClick={this.post} children='Change password' />
			</div>
		);
	}
});
