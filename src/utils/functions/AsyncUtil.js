'use strict';
import Promise  from 'bluebird';
import Logger  from './Logger';

export default {
	getAjaxAsync(url) {
		Logger.debug('GET url:' + url);
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();
			req.open('GET', url);
			req.onload = () => {
				if (req.status == 200) {//XXX only 200?
					resolve(this.onSuccessHandle(req.response));
				}
				else {
					this.onErrorHandle(req);
					reject(req);
				}
			};
			req.send();
		}).bind(this);
	},

	postAjaxAsync(url, postObj) {
		Logger.debug('POST url:' + url);
		Logger.debug(postObj);
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();
			req.open('POST', url);
			req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			req.onload = () => {
				if (req.status == 200) {//XXX only 200?
					resolve(this.onSuccessHandle(req.response));
				}
				else {
					this.onErrorHandle(req);
					reject(req);
				}
			};
			req.send(JSON.stringify(postObj));
		}).bind(this);
	},

	dummyPromise() {
		return new Promise((resolve, reject) => {
			resolve();
		});
	},

	onSuccessHandle(response) {
		const resJson = JSON.parse(response);
		Logger.debug(resJson);
		if(resJson.message){
			Logger.success(resJson.message, "Server Response");
		}
		return resJson;
	},

	onErrorHandle(res) {
		try{
			var resJson = JSON.parse(res.response);
			Logger.error(resJson.message, "Server Error");
		}catch(e){
			Logger.error(res.response, "Network Error");
		}
	}

}
