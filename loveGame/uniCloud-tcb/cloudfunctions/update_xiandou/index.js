'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let callback = {};
	let openId = event.token;
	// 查询当前用户 有没有 仙豆的 数据表 有返回数据 没有创建并返回数据
	const dbCmd = db.command
	const collection = db.collection('user_xiandou');
	let isHasRes = await collection.where({
		openId: dbCmd.eq(openId)
	})
	.get();
	console.log(isHasRes)
	if(isHasRes.data.length == 0){
		let res = await collection.add({
			openId: openId,
			xiandou: 0,
			exchangeNum: 0,
		});
		callback = {
			data:{
				openId: openId,
				xiandou: 0,
				exchangeNum: 0,
			},
			mesg: 'success',
			code: 200,
		};
	}else{
		callback = {
			data:isHasRes.data[0],
			mesg: 'success',
			code: 200,
		};
	}
	//返回数据给客户端
	return callback;
};
