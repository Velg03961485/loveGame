
import exc_1 from "@/static/exc_1.png";
import exc_2 from "@/static/exc_2.png";
import exc_3 from "@/static/exc_3.png";
import exc_4 from "@/static/exc_4.png";
import exc_5 from "@/static/exc_5.png";
import exchangeData from "@/pages/home/exchangeData.json";

export default{
	data(){
		return{
			exc_1:exc_1,
			imgData:{
				exc_1:exc_1,
				exc_2:exc_2,
				exc_3:exc_3,
				exc_4:exc_4,
				exc_5:exc_5,
			},
			exchangeData:exchangeData,
		}
	},
	onLoad(){
		console.log(this.exchangeData);
	},
	methods:{
		
	},
}