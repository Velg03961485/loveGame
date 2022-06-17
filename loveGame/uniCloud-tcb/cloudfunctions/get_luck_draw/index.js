'use strict';
exports.main = async (event, context) => {

	console.log('event : ', event)
	let arrData = [1,2,3,4,5,6,7,8];
	let r = Math.random();
	console.log(r)

	return event
};
