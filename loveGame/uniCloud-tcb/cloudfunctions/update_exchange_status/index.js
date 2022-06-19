'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let callback = {};
	let keyWord = event.keyWord;
	let openId = event.token;
	let id = event.id;
	// 先查积分有没有满足最小
	const dbCmd = db.command
	const collection = db.collection('user_xiandou');
	//TODO  -  iu（测试这里的return 结果 是否正确）
	let xiandou = await collection.where({
		openId: dbCmd.eq(openId)
	})
	.get()
	let xiandouNum = xiandou.data[0]['xiandou'];
	let exchangeNum = xiandou.data[0]['exchangeNum'];
	console.log(xiandouNum)
	if(xiandouNum < 1000){
		callback = {
			data:'小仙女只有'+ xiandouNum + '仙豆哟～',
			mesg: 'error',
			code: 200,
		};
	}else{
		let exchangeRes = await db.collection('exchange_list').where({
			_id: dbCmd.eq(id)
		})
		.get()
		let exchangeNum = exchangeRes.data[0]['exchangeNum'];
		
		if(xiandouNum < exchangeNum){
			callback = {
				data:'这里需要'+exchangeNum+'仙豆，请继续加油～',
				mesg: 'error',
				code: 200,
			};
		}else{
			let new_exchangeNum = xiandouNum - exchangeNum;
			
			// 更新仙豆
			let pushArr = {
					'xiandou': new_exchangeNum,
					'exchangeNum': exchangeNum + 1,
				};
			let res1 = await collection.where({
					openId: dbCmd.eq(openId)
				}).update(pushArr);
			// 更新个人兑换标记
			let updateExUArr = {
				
			};
			updateExUArr[keyWord] = 1;
			const exchangeUserDB =  db.collection('exchange_data_user');
			let exres = await exchangeUserDB.where({
				openId: dbCmd.eq(openId)
			}).update(updateExUArr);
			// 增加兑换记录
			let addRecord = {
				useXiandou:exchangeNum,
				keyWord:keyWord,
				openId:openId,
				type:'exchange',
			};
			let res2 = await db.collection('exchange_record')
			.add(addRecord)
			callback = {
				data:'兑换成功',
				mesg: 'success',
				code: 200,
			};
		}
	}
	
	//返回数据给客户端
	return callback
};
