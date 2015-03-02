'use strict';
import React  from 'react';
import AsyncUtil  from '../utils/functions/AsyncUtil';
import Logger  from '../utils/functions/Logger';

import LanguageSelectForm  from './LanguageSelectForm';

export default React.createClass({
	propTypes: {},
	getInitialState() {
		return {
			isValidPassword: false
		};
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
				<h2 children='which one do you want to change?' />
				<LanguageSelectForm />
			</div>
		);
	}
});
