'use strict';

exports.getExpireAt = () => {
	let data = addHours(new Date(Date.now()), 1);
	return data;
}

function addHours(obj, h) {
	let date = new Date(obj.setHours(obj.getHours() + h));
	//let data = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
	//return data;
	return date;
}

function addMinutes(obj, m) {
	let date = new Date(obj.setMinutes(obj.getMinutes() + m));
	//let data = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
	//return data;
	return date;
}