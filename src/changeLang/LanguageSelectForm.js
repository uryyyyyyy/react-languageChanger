'use strict';
import React  from 'react';
import AsyncUtil  from '../utils/functions/AsyncUtil';
import TextForm  from '../utils/myComponents/TextForm';
import Logger  from '../utils/functions/Logger';
import LanguageSelector  from '../utils/myComponents/LanguageSelector';
import TypeSelector  from '../utils/myComponents/TypeSelector';
import TypeDetailSelector  from '../utils/myComponents/TypeDetailSelector';

import DetailViewer  from './DetailViewer';

export default React.createClass({
	propTypes: {},
	getInitialState() {
		return {
			type_: undefined,
			currentName: undefined,
			language: "ja",
			newName: "newName",
			detailId: undefined
		};
	},

	changeLanguage(value) {
		this.setState({language: value});
	},
	changeNewName(value) {
		this.setState({newName: value});
	},
	changeType(value) {
		this.setState({
			type_: value,
			detailId: undefined
		});
	},
	changeDetailId(value) {
		this.setState({detailId: value});
	},

	post() {
		Logger.debug('post');
		const postObj = {
			newName: this.state.newName
		};
		AsyncUtil.postAjaxAsync(`webAPI/${this.state.type_}/${this.state.detailId}/${this.state.language}`, postObj);
	},
	render() {
		return (
			<dl>
				<dt>Type</dt>
				<dd>
				<TypeSelector onChange={this.changeType} value={this.state.type_}/>
				</dd>
				<dt>Japanese Name</dt>
				<dd>
				<TypeDetailSelector onChange={this.changeDetailId} type_={this.state.type_} value={this.state.detailId}/>
				</dd>
				<dt>Langage</dt>
				<dd>
				<LanguageSelector onChange={this.changeLanguage} value={this.state.language}/>
				</dd>
				<dt>Current Name</dt>
				<dd>
				<DetailViewer type_={this.state.type_} id={this.state.detailId} lang={this.state.language} />
				</dd>
				<dt>new Name</dt>
				<dd>
				<TextForm onChange={this.changeNewName}
				value={this.state.newName}/>
				</dd>
				<dt>Button</dt>
				<dd><button onClick={this.post} children='Save' /></dd>
			</dl>
		);
	}
});
