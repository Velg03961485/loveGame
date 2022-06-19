'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	console.log('event : ', event)
	let callback = {};
	let openId = event.token;
	let arrData = [0,1,2,3,4,5,6,7];
	const dbCmd = db.command
	const collection = db.collection('user_xiandou');
	let isHasRes = await collection.where({
		openId: dbCmd.eq(openId)
	})
	.get();
	let xiandou = isHasRes.data[0]['xiandou'];
	// TODO 这里根据仙豆的数量限制 抽奖范围的等级
	
	let index = Math.floor((Math.random()*arrData.length)); 
	let winNum = arrData[index];
	callback = {
		data: index,
		mesg: 'success',
		code: 200,
	};

	return callback
};
