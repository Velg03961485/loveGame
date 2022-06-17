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
	let xiandouNum = collection.where({
		openId: dbCmd.eq(openId)
	})
	.get()
	.then((res)=>{
		let xiandou = res.data[0]['xiandou'];
		return xiandou;
	})
	console.log(xiandouNum)
	if(xiandouNum < 1000){
		callback = {
			data:'兑换条件不满足',
			mesg: 'success',
			code: 200,
		};
	}else{
		db.collection('exchange_list').where({
			_id: dbCmd.eq(id)
		})
		.get()
		.then((res)=>{
			let exchangeNum = res.data[0]['exchangeNum'];
			if(xiandouNum < exchangeNum){
				callback = {
					data:'兑换条件不满足',
					mesg: 'success',
					code: 200,
				};
			}else{
				let new_exchangeNum = exchangeNum - xiandouNum;
				let pushArr = {
						'xiandou': new_exchangeNum
					};
				collection.where({
						openId: dbCmd.eq(openId)
					}).update(pushArr);
				})
				db.collection('exchange_record')
				.add(res.data[0])
				.then(()=>{
					callback = {
						data:'兑换成功',
						mesg: 'success',
						code: 200,
					};
				})
			}
		})
	}
	
	//返回数据给客户端
	return callback
};
