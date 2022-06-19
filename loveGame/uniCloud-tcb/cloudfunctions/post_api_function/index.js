'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let callback = {};
	const res = await uniCloud.httpclient.request(event.apiUrl, {
	    method: 'GET',
	    data: event.data,
	    contentType: 'json', // 指定以application/json发送data内的数据
	    dataType: 'json' // 指定返回值为json格式，自动进行parse
	  })
	  
	let backData = res;
	console.log(backData)
	// callback = {
	// 	data:res,
	// 	mesg: 'success',
	// 	code: 200,
	// };
	
	//返回数据给客户端
	return backData
};
