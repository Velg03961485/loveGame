Component({
  properties: {
    // IUicon-chuang | IUicon-iconfontzhizuobiaozhun023140 | IUicon-jijifuli | IUicon-zhuanpanshezhi | IUicon-duihuan | IUicon-dazhuanpan | IUicon-shiwutubiao-39-copy | IUicon-shiwutubiao-39 | IUicon-tubiaozhizuomoban- | IUicon-shuibei | IUicon-chabei | IUicon-maomi | IUicon-shuihu | IUicon-shuijuenv | IUicon-xishu | IUicon-shuibei1 | IUicon-checked | IUicon-weixinfang | IUicon-wumai | IUicon-dayu | IUicon-wu | IUicon-shandian | IUicon-yu | IUicon-xue | IUicon-daxue | IUicon-feng | IUicon-qiliu | IUicon-dayu-1 | IUicon-shandian-1 | IUicon-wumai-1 | IUicon-yu-1 | IUicon-daxue-1 | IUicon-wu-1 | IUicon-yintian-1 | IUicon-xue-1 | IUicon-yueliang | IUicon-wumai-2 | IUicon-wu-2 | IUicon-taiyang | IUicon-daka | IUicon-yuyin | IUicon-youxi
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
