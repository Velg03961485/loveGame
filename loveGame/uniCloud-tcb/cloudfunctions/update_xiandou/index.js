'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let callback = {};
	let operationMode = event.operationMode || '';
	let openId = event.token;
	const dbCmd = db.command
	if(operationMode == 'getUserInfo'){
		const userInfoDB = db.collection('ace-user');
		let userRes = await userInfoDB.where({
			openid: dbCmd.eq(openId)
		})
		.get();
		if(userRes.data.length == 0){
			callback = {
				data:'请先登陆',
				mesg: 'success',
				code: 500,
			};
		}else{
			callback = {
				data:userRes.data[0],
				mesg: 'success',
				code: 200,
			};
		}
	}else if(operationMode == 'updateUserInfo'){
		let avatarUrl = event.avatarUrl;
		let nickname = event.nickname;
		const userInfoDB = db.collection('ace-user');
		let userRes = await userInfoDB.where({
			openid: dbCmd.eq(openId)
		})
		.get();
		let pushArr = {
			'nickName': nickname,
			'avatarUrl': avatarUrl,
		};
		userInfoDB.where({
			openid: dbCmd.eq(openId)
		}).update(pushArr);
		callback = {
			data:'更新成功',
			mesg: 'success',
			code: 200,
		};
	}else{
		// 查询当前用户 有没有 仙豆的 数据表 有返回数据 没有创建并返回数据
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
	}
	
	
	//返回数据给客户端
	return callback;
};
