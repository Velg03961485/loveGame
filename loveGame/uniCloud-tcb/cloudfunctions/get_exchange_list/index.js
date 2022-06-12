'use strict';
exports.main = async (event, context) => {
	const res = await db.collection('exchange_list').get()
	return res
};
