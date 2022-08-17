'use strict';
const uniID = require("uni-id")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	return await uniID.loginByWeixin({
		code: event.code
	})
};
