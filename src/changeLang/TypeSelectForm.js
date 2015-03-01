'use strict';
import React  from 'react';
import Select  from 'react-select/src/Select';
import Logger  from '../utils/functions/Logger';

export default React.createClass({
	propTypes: {
		changeType: React.PropTypes.func,
		type: React.PropTypes.string
	},
	getInitialState() {
		return {
			types: ['user', 'food', 'other']
		};
	},

	changeType(res) {
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
				<dt>Type</dt>
				<dd>
					<LanguageSelector value='ja'/>
				</dd>
				<dt>Japanese Name</dt>
				<dd>
				<LanguageSelector value='ja'/>
				</dd>
				<dt>Langage</dt>
				<dd>
				<LanguageSelector value='ja'/>
				</dd>
				<dt>current Name</dt>
				<dd>
				<TextForm onChange={this.changecurrentPass}
				value={this.state.currentPass}/>
				</dd>
				<dt>new Name</dt>
				<dd>
					<button onClick={this.check}
					children="check account" />
				</dd>
			</dl>
		);
	}
});
