'use strict';
class GLRandom {
  /**
   * 构造函数
   * @param {number} min  最小整数值
   * @param {number} max  最大整数值
   * @param {Map} percentage 概率数 [值,百分比]
   */
  constructor(min, max, percentage = new Map()) {
    this.min = Math.trunc(min);
    this.max = Math.trunc(max);
    this.MATH_RANGE = 100; // 分成100份
    this.percentage = percentage;
  }

  get percentage() {
    if (!this._percentage) {
      this._percentage = new Map();
    }
    return this._percentage;
  }

  /**
   * 分配比例
   * @param {Map} map 设置 值-百分比
   */
  set percentage(map) {
    let result = Array.from(map.values()).reduce((p, v, a) => {
      return p - v;
    }, 1);
    for (let i = this.min; i < this.max; i++) {
      if (map.has(i)) {
        this.percentage.set(i, map.get(i));
      } else {
        this.percentage.set(i, result / (this.max - this.min - map.size));
      }
    }
  }

  /**
   * 根据比例生成取值范围
   */
  range() {
    let [start, random, keys] = [
      0,
      this.MATH_RANGE,
      Array.from(this.percentage.keys())
    ];
    for (let i = 0; i < keys.length; i++) {
      let temp = this.percentage.get(keys[i]);
      this.percentage.set(keys[i], [start, (start += temp * random)]);
    }
  }

  /**
   * 生成随机数
   */
  create() {
    let num = Math.random() * this.MATH_RANGE;
    for (let data of this.percentage.entries()) {
      if (num >= data[1][0] && num < data[1][1]) {
        return data[0];
      }
    }
    return null;
  }
}
const db = uniCloud.database()
exports.main = async (event, context) => {

	// console.log('event : ', event)
	let callback = {};
	let openId = event.token;
	let arrData = [0,1,2,3,4,5,6,7];
	// const dbCmd = db.command
	// const collection = db.collection('user_xiandou');
	// let isHasRes = await collection.where({
	// 	openId: dbCmd.eq(openId)
	// })
	// .get();
	// let xiandou = isHasRes.data[0]['xiandou'];
	// TODO 这里根据仙豆的数量限制 抽奖范围的等级
	// 随机数范围 ：40~900 
		let random = new GLRandom(0, 10000);
 
		// 调整概率
		random.percentage = new Map([
				[0,0.2],   // 调整值为41的数值，概率为20%  
				[1,0.1],   // 调整值为46的数值，概率为50%  
				[2,0.1],   // 调整值为90的数值，概率为5%  
				[3,0.005],   // 调整值为90的数值，概率为5%  
				[4,0.02],   // 调整值为90的数值，概率为5%  
				[5,0.005],   // 调整值为90的数值，概率为5%  
				[6,0.005],   // 调整值为90的数值，概率为5%  
				[7,0.005],   // 调整值为90的数值，概率为5%  
		]);
 
		// 生成值区间
		random.range();
 
		// 生成概率随机数
		
		let randomNum = random.create();
		console.log(randomNum);
		/**
		 * 范围外的 根据值的区间  指向固定
		 */
		if(7 < randomNum <= 5000){
			randomNum = 6;
		}else if(5000 < randomNum){
			randomNum = 7;
		}
		console.log(randomNum);

	callback = {
		data: randomNum,
		mesg: 'success',
		code: 200,
	};

	return callback
};
