var db = require("./mongo.js");
var user = {
    uname: "张三",
    pwd: "123",
    hphoto: "/images/account/userimg.png",
    sex: "男",
    phone: "13888888888",
    address: [{ name: "张三", phone: "177****1234", addr: "辽宁省沈阳市浑南新区东北大学浑南校区" },
        { name: "李四", phone: "172****3456", addr: "广东省深圳市南山区西丽镇宝珠花园" },
        { name: "王五", phone: "176****5678", addr: "湖北省武汉市洪山区东方雅苑二期" }
    ],
    shoppingcart: [{ goodsId: "1", goodsName: "小米随身wifi", goodsPrice: "19.00", goodsCount: "2", url: "/images/details/lightblack.jpg" },
        { goodsId: "2", goodsName: "米兔故事机", goodsPrice: "149.00", goodsCount: "4", url: "/images/details/lightblack.jpg" },
        { goodsId: "3", goodsName: "小米随身wifi", goodsPrice: "19.00", goodsCount: "2", url: "/images/details/mi63.jpg" },
        { goodsId: "4", goodsName: "米兔故事机", goodsPrice: "149.00", goodsCount: "4", url: "/images/details/mi62.jpg" }
    ],
    payment: [{ orderId: "5160607962200971", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem1.jpg" }], orderItemsName: [{ name: "小米手环 2 黑色" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2016/04/23 17:46", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "1", orderItemMoney: "149" },
        { orderId: "232456786543333", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem21.jpg" }, { url: "img/orderItem22.jpg" }, { url: "img/orderItem23.jpg" }], orderItemsName: [{ name: "小米手环 石墨黑" }, { name: "红米Note 2 移动版 灰色 16GB" }, { name: "小米礼品袋 透明" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2015/09/21 14:11", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "3", orderItemMoney: "869" },
        { orderId: "232456786543333", orderState: "代付款", orderItemsPic: [{ url: "img/orderItem21.jpg" }, { url: "img/orderItem22.jpg" }, { url: "img/orderItem23.jpg" }], orderItemsName: [{ name: "小米手环 石墨黑" }, { name: "红米Note 2 移动版 灰色 16GB" }, { name: "小米礼品袋 透明" }], orderDate: "", orderPayMethod: "", orderBuyer: "", orderRecDate: "", orderRecAddr: "", orderItemNum: "3", orderItemMoney: "869" },
        { orderId: "5160607962200971", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem1.jpg" }], orderItemsName: [{ name: "小米手环 2 黑色" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2016/04/23 17:46", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "1", orderItemMoney: "149" },
        { orderId: "232456786543333", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem21.jpg" }, { url: "img/orderItem22.jpg" }, { url: "img/orderItem23.jpg" }], orderItemsName: [{ name: "小米手环 石墨黑" }, { name: "红米Note 2 移动版 灰色 16GB" }, { name: "小米礼品袋 透明" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2015/09/21 14:11", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "3", orderItemMoney: "869" }
    ]
}

var details = [{
        name: "小米笔记本Air",
        category: "notebook",
        //search页图标，shopcart页图标
        spic: "/images/details/Air13.3/spic.webp",
        //category页图标
        cpic: "/images/details/Air13.3/cpic.png",
        price: 4999,
        activity: "",
        brief: "NVIDIA 940MX 独立显卡 / 轻薄全金属机身 / 8GB 内存 + 256GB SSD / 第六代 Intel 酷睿i5 处理器 / FHD 全贴合屏幕 / 高能量密度电池",
        type: [{ name: "小米笔记本Air", ram: "8GB", rom: "256GB", color: "银色13.3英寸", pic: "/images/details/Air13.3/silver.webp", price: "4999", stock: "3" }],
        urls1: [{ url: "/images/details/Air13.3/url1_1.jpg" }, { url: "/images/details/Air13.3/url1_2.jpg" }, { url: "/images/details/Air13.3/url1_3.jpg" }, { url: "/images/details/Air13.3/url1_4.jpg" }, { url: "/images/details/Air13.3/url1_5.jpg" }, { url: "/images/details/Air13.3/url1_6.jpg" }, { url: "/images/details/Air13.3/url1_7.jpg" }, { url: "/images/details/Air13.3/url1_8.jpg" }],
        urls2: [{ url: "/images/details/Air13.3/url2_1.png" }, { url: "/images/details/Air13.3/url2_2.png" }, { url: "/images/details/Air13.3/url2_3.jpg" }, { url: "/images/details/Air13.3/url2_4.jpg" }],
        slideurl: [{ url: "/images/details/Air13.3/slide1.webp" }, { url: "/images/details/Air13.3/slide2.webp" }]
    }, {
        name: "红米Note4X",
        category: "phone",
        //search页图标,shopcart页图标
        spic: "/images/details/homgmiNote4X/spic.webp",
        //category页图标
        cpic: "/images/details/homgmiNote4X/cpic.png",
        price: 799,
        activity: "",
        brief: "5.5'金属机身 / 4100mAh 超长续航 / 骁龙 625处理器",
        type: [{ name: "全网通", ram: "4GB", rom: "64GB", color: "浅蓝色", pic: "/images/details/homgmiNote4X/lightblue.webp", price: "1299", stock: "1" },
            { name: "全网通", ram: "3GB", rom: "16GB", color: "樱花粉", pic: "/images/details/homgmiNote4X/pink.webp", price: "799", stock: "1" },
            { name: "全网通", ram: "3GB", rom: "32GB", color: "蓝绿色", pic: "/images/details/homgmiNote4X/bluegreen.webp", price: "999", stock: "3" },
            { name: "全网通", ram: "4GB", rom: "64GB", color: "香槟金", pic: "/images/details/homgmiNote4X/golden.webp", price: "1299", stock: "5" },
            { name: "移动4G+版", ram: "4GB", rom: "64GB", color: "磨砂黑", pic: "/images/details/homgmiNote4X/black.webp", price: "1299", stock: "9" }
        ],
        urls1: [{ url: "/images/details/homgmiNote4X/url1_1.jpg" }, { url: "/images/details/homgmiNote4X/url1_2.jpg" }, { url: "/images/details/homgmiNote4X/url1_3.jpg" }, { url: "/images/details/homgmiNote4X/url1_4.jpg" }, { url: "/images/details/homgmiNote4X/url1_5.jpg" }, { url: "/images/details/homgmiNote4X/url1_6.jpg" }, { url: "/images/details/homgmiNote4X/url1_7.jpg" }, { url: "/images/details/homgmiNote4X/url1_8.jpg" }, { url: "/images/details/homgmiNote4X/url1_9.jpg" }],
        urls2: [{ url: "/images/details/homgmiNote4X/url2_1.jpg" }, { url: "/images/details/homgmiNote4X/url2_2.jpg" }, { url: "/images/details/homgmiNote4X/url2_3.jpg" }, { url: "/images/details/homgmiNote4X/url2_4.jpg" }, { url: "/images/details/homgmiNote4X/url2_5.jpg" }],
        urls3: [{ url: "/images/details/homgmiNote4X/3_1.png" }],
        slideurl: [{ url: "/images/details/homgmiNote4X/slide1.webp" }, { url: "/images/details/homgmiNote4X/slide2.webp" }]
    }, {
        name: "米家扫地机器人",
        category: "smart",
        //search页图标，shopcart页图标
        spic: "/images/details/mijiasaodijiqiren/spic.webp",
        //category页图标
        cpic: "/images/details/mijiasaodijiqiren/cpic.png",
        price: 1699,
        activity: "【7.19-7.21，赠扫地机器人虚拟墙】",
        brief: "高精度激光测距，智能规划路径 / 1800Pa 大风压澎湃吸力 / 远程智能控制 ，定时清扫 / 大电池持久清扫",
        type: [{ name: "米家扫地机器人", ram: "2GB", rom: "8GB", color: "白色", pic: "/images/details/mijiasaodijiqiren/white.webp", price: "1699", stock: "3" }],
        urls1: [{ url: "/images/details/mijiasaodijiqiren/url1_1.jpg" }, { url: "/images/details/mijiasaodijiqiren/url1_2.jpg" }, { url: "/images/details/mijiasaodijiqiren/url1_3.jpg" }, { url: "/images/details/mijiasaodijiqiren/url1_4.jpg" }, { url: "/images/details/mijiasaodijiqiren/url1_5.jpg" }, { url: "/images/details/mijiasaodijiqiren/url1_6.jpg" }, { url: "/images/details/mijiasaodijiqiren/url1_7.jpg" }, { url: "/images/details/mijiasaodijiqiren/url1_8.jpg" }],
        urls2: [{ url: "/images/details/mijiasaodijiqiren/url2_1.jpg" }],
        slideurl: [{ url: "/images/details/mijiasaodijiqiren/slide1.webp" }, { url: "/images/details/mijiasaodijiqiren/slide2.webp" }]
    }, {
        name: "小米5s",
        category: "phone",
        //search页图标,shopcart页图标
        spic: "/images/details/xiaomi5s/spic.webp",
        //category页图标
        cpic: "/images/details/xiaomi5s/cpic.png",
        price: 1999,
        activity: "",
        brief: "“暗夜之眼”超感光相机 / 无孔式超声波指纹识别 / 骁龙 821 旗舰处理器 / 全金属一体化机身",
        type: [{ name: "全网通版", ram: "3GB", rom: "64GB", color: "哑光深灰", pic: "/images/details/xiaomi5s/darkgary.webp", price: "1999", stock: "2" },
            { name: "全网通版", ram: "3GB", rom: "64GB", color: "哑光金色", pic: "/images/details/xiaomi5s/golden.webp", price: "1999", stock: "3" }
        ],
        urls1: [{ url: "/images/details/xiaomi5s/url1_1.jpg" }, { url: "/images/details/xiaomi5s/url1_2.jpg" }, { url: "/images/details/xiaomi5s/url1_3.jpg" }, { url: "/images/details/xiaomi5s/url1_4.jpg" }, { url: "/images/details/xiaomi5s/url1_5.jpg" }, { url: "/images/details/xiaomi5s/url1_6.jpg" }, { url: "/images/details/xiaomi5s/url1_7.jpg" }, { url: "/images/details/xiaomi5s/url1_8.jpg" }],
        urls2: [{ url: "/images/details/xiaomi5s/url2_1.jpg" }, { url: "/images/details/xiaomi5s/url2_2.jpg" }, { url: "/images/details/xiaomi5s/url2_3.jpg" }],
        urls3: [{ url: "/images/details/xiaomi5s/3_1.png" }],
        slideurl: [{ url: "/images/details/xiaomi5s/slide1.webp" }]
    }, {
        name: "小米5sPlus",
        category: "phone",
        //search页图标,shopcart页图标
        spic: "/images/details/xiaomi5sPlus/spic.webp",
        //category页图标
        cpic: "/images/details/xiaomi5sPlus/cpic.png",
        price: 2299,
        activity: "",
        brief: "5.7' 大屏双摄像头 / 骁龙 821 旗舰处理器 / 轻薄金属机身 / 4GB内存+64GB容量",
        type: [{ name: "全网通版", ram: "4GB", rom: "64GB", color: "拉丝深灰", pic: "/images/details/xiaomi5sPlus/lsdarkgary.webp", price: "2299", stock: "2" },
            { name: "全网通版", ram: "4GB", rom: "64GB", color: "拉丝金色", pic: "/images/details/xiaomi5sPlus/lsgolden.webp", price: "2299", stock: "3" }
        ],
        urls1: [{ url: "/images/details/xiaomi5sPlus/url1_1.jpg" }, { url: "/images/details/xiaomi5sPlus/url1_2.jpg" }, { url: "/images/details/xiaomi5sPlus/url1_3.jpg" }, { url: "/images/details/xiaomi5sPlus/url1_4.jpg" }, { url: "/images/details/xiaomi5sPlus/url1_5.jpg" }, { url: "/images/details/xiaomi5sPlus/url1_6.jpg" }, { url: "/images/details/xiaomi5sPlus/url1_7.jpg" }, { url: "/images/details/xiaomi5sPlus/url1_8.jpg" }],
        urls2: [{ url: "/images/details/xiaomi5sPlus/url2_1.jpg" }, { url: "/images/details/xiaomi5sPlus/url2_2.jpg" }],
        urls3: [{ url: "/images/details/xiaomi5sPlus/3_1.png" }],
        slideurl: [{ url: "/images/details/xiaomi5sPlus/slide1.webp" }, { url: "/images/details/xiaomi5sPlus/slide2.webp" }, { url: "/images/details/xiaomi5sPlus/slide3.webp" }]
    }, {
        name: "小米6",
        category: "phone",
        //search页图标,shopcart页图标
        spic: "/images/details/xiaomi6/spic.webp",
        //category页图标
        cpic: "/images/details/xiaomi6/cpic.png",
        price: 2499,
        activity: "【7月14日早10点，小米6 64GB 亮白色 首卖】",
        brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
        type: [{ name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/images/details/xiaomi6/lightblack.jpg", price: "2999", stock: "0" },
            { name: "全网通版", ram: "6GB", rom: "64GB", color: "亮黑色", pic: "/images/details/xiaomi6/lightblack.jpg", price: "2499", stock: "2" },
            { name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮白色", pic: "/images/details/xiaomi6/lightwhite.jpg", price: "2899", stock: "3" },
            { name: "全网通版", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/images/details/xiaomi6/lightblack.jpg", price: "2899", stock: "5" },
            { name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮蓝色", pic: "/images/details/xiaomi6/lightblue.jpg", price: "2499", stock: "0" },
            { name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮白色", pic: "/images/details/xiaomi6/lightwhite.jpg", price: "2499", stock: "9" }
        ],
        urls1: [{ url: "/images/details/xiaomi6/mi61.jpg" }, { url: "/images/details/xiaomi6/mi62.jpg" }, { url: "/images/details/xiaomi6/mi63.jpg" }, { url: "/images/details/xiaomi6/mi64.jpg" }, { url: "/images/details/xiaomi6/mi65.jpg" }, { url: "/images/details/xiaomi6/mi66.jpg" }, { url: "/images/details/xiaomi6/mi67.jpg" }, { url: "/images/details/xiaomi6/mi68.jpg" }, { url: "/images/details/xiaomi6/mi69.jpg" }, { url: "/images/details/xiaomi6/mi610.jpg" }, { url: "/images/details/xiaomi6/mi611.jpg" }, { url: "/images/details/xiaomi6/mi612.jpg" }, { url: "/images/details/xiaomi6/mi613.jpg" }, { url: "/images/details/xiaomi6/mi614.jpg" }, { url: "/images/details/xiaomi6/mi615.jpg" }],
        urls2: [{ url: "/images/details/xiaomi6/parameter1.jpg" }, { url: "/images/details/xiaomi6/parameter2.jpg" }, { url: "/images/details/xiaomi6/parameter3.jpg" }, { url: "/images/details/xiaomi6/parameter4.jpg" }],
        urls3: [{ url: "/images/details/xiaomi6/yushou.jpg" }],
        slideurl: [{ url: "/images/details/xiaomi6/slide1.webp" }, { url: "/images/details/xiaomi6/slide2.webp" }, { url: "/images/details/xiaomi6/slide3.webp" }]
    }, {
        name: "小米MIX",
        category: "phone",
        //search页图标，shopcart页图标
        spic: "/images/details/xiaomiMIX/spic.webp",
        //category页图标
        cpic: "/images/details/xiaomiMIX/cpic.png",
        price: 3499,
        activity: "【小米MIX下单立减200元，领券再减50元，还享3/6期分期免息】",
        brief: "6.4' 全面屏 / 全陶瓷机身 / 骁龙 821 性能版 / 4GB内存+128GB闪存 / 4400mAh 大电量 / 陶瓷声学系统 / 超声波距离感应",
        type: [{ name: "全网通", ram: "4GB", rom: "128GB", color: "皓月白", pic: "/images/details/xiaomiMIX/white.webp", price: "3499", stock: "1" },
            { name: "全网通", ram: "4GB", rom: "128GB", color: "黑色", pic: "/images/details/xiaomiMIX/black.webp", price: "3499", stock: "1" },
            { name: "全网通", ram: "6GB", rom: "256GB", color: "黑金", pic: "/images/details/xiaomiMIX/blackgold.webp", price: "3999", stock: "3" }
        ],
        urls1: [{ url: "/images/details/xiaomiMIX/url1_1.jpg" }, { url: "/images/details/xiaomiMIX/url1_2.jpg" }, { url: "/images/details/xiaomiMIX/url1_3.jpg" }, { url: "/images/details/xiaomiMIX/url1_4.jpg" }, { url: "/images/details/xiaomiMIX/url1_5.jpg" }, { url: "/images/details/xiaomiMIX/url1_6.jpg" }, { url: "/images/details/xiaomiMIX/url1_7.jpg" }, { url: "/images/details/xiaomiMIX/url1_8.jpg" }],
        urls2: [{ url: "/images/details/xiaomiMIX/url2_1.jpg" }, { url: "/images/details/xiaomiMIX/url2_2.jpg" }, { url: "/images/details/xiaomiMIX/url2_3.jpg" }, { url: "/images/details/xiaomiMIX/url2_4.jpg" }, { url: "/images/details/xiaomiMIX/url2_5.jpg" }, { url: "/images/details/xiaomiMIX/url2_6.jpg" }],
        urls3: [{ url: "/images/details/xiaomiMIX/3_1.png" }],
        slideurl: [{ url: "/images/details/xiaomiMIX/slide1.webp" }, { url: "/images/details/xiaomiMIX/slide2.webp" }, { url: "/images/details/xiaomiMIX/slide3.webp" }]
    }, {
        name: "小米魔方控制器",
        category: "smart",
        //search页图标，shopcart页图标
        spic: "/images/details/xiaomimofang/spic.webp",
        //category页图标
        cpic: "/images/details/xiaomimofang/cpic.png",
        price: 69,
        activity: "",
        brief: "搭配小米多功能网关，做生活的魔术师 / 联动小米智能产品，6种动作操控",
        type: [{ name: "魔方控制器", ram: "", rom: "", color: "粉红", pic: "/images/details/xiaomimofang/pink.webp", price: "69", stock: "3" },
            { name: "魔方控制器", ram: "", rom: "", color: "蓝色", pic: "/images/details/xiaomimofang/blue.webp", price: "69", stock: "3" },
            { name: "魔方控制器", ram: "", rom: "", color: "白色", pic: "/images/details/xiaomimofang/white.webp", price: "69", stock: "3" }
        ],
        urls1: [{ url: "/images/details/xiaomimofang/url1_1.jpg" }, { url: "/images/details/xiaomimofang/url1_2.jpg" }, { url: "/images/details/xiaomimofang/url1_3.jpg" }, { url: "/images/details/xiaomimofang/url1_4.jpg" }, { url: "/images/details/xiaomimofang/url1_5.jpg" }, { url: "/images/details/xiaomimofang/url1_6.jpg" }, { url: "/images/details/xiaomimofang/url1_7.jpg" }, { url: "/images/details/xiaomimofang/url1_8.jpg" }],
        urls2: [{ url: "/images/details/xiaomimofang/url2_1.jpg" }],
        slideurl: [{ url: "/images/details/xiaomimofang/slide1.webp" }, { url: "/images/details/xiaomimofang/slide2.webp" }]
    }, {
        name: "小米Note2",
        category: "phone",
        //search页图标
        spic: "/images/details/xiaomiNote2/spic.webp",
        //category页图标
        cpic: "/images/details/xiaomiNote2/cpic.png",
        price: 2799,
        activity: "【限时特惠 下单立减300，还享花呗6期分期免息】",
        brief: "5.7' 双曲面柔性屏 / 3D曲面玻璃 / 骁龙 821 性能版 / 2256万超高像素相机 / 4070mAh 超长续航",
        type: [{ name: "全网通", ram: "4GB", rom: "64GB", color: "亮银黑", pic: "/images/details/xiaomiNote2/silverblack.webp", price: "2799", stock: "2" },
            { name: "全网通", ram: "4GB", rom: "64GB", color: "冰川银", pic: "/images/details/xiaomiNote2/icesilver.webp", price: "2799", stock: "0" },
            { name: "全网通", ram: "4GB", rom: "64GB", color: "亮黑色", pic: "/images/details/xiaomiNote2/lightblack.webp", price: "2799", stock: "3" },
            { name: "全网通", ram: "6GB", rom: "64GB", color: "亮黑色", pic: "/images/details/xiaomiNote2/lightblack.webp", price: "2899", stock: "5" },
            { name: "全网通", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/images/details/xiaomiNote2/lightblack.webp", price: "3299", stock: "9" },
            { name: "全网通", ram: "6GB", rom: "128GB", color: "冰川银", pic: "/images/details/xiaomiNote2/icesilver.webp", price: "3299", stock: "0" },
            { name: "全球版", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/images/details/xiaomiNote2/lightblack.webp", price: "3499", stock: "9" },
            { name: "全球版", ram: "6GB", rom: "128GB", color: "冰川银", pic: "/images/details/xiaomiNote2/icesilver.webp", price: "3499", stock: "0" }
        ],
        urls1: [{ url: "/images/details/xiaomiNote2/url1_1.jpg" }, { url: "/images/details/xiaomiNote2/url1_2.jpg" }, { url: "/images/details/xiaomiNote2/url1_3.jpg" }, { url: "/images/details/xiaomiNote2/url1_4.jpg" }, { url: "/images/details/xiaomiNote2/url1_5.jpg" }, { url: "/images/details/xiaomiNote2/url1_6.jpg" }, { url: "/images/details/xiaomiNote2/url1_7.jpg" }, { url: "/images/details/xiaomiNote2/url1_8.jpg" }],
        urls2: [{ url: "/images/details/xiaomiNote2/url2_1.jpg" }, { url: "/images/details/xiaomiNote2/url2_2.jpg" }, { url: "/images/details/xiaomiNote2/url2_3.jpg" }, { url: "/images/details/xiaomiNote2/url2_4.jpg" }, { url: "/images/details/xiaomiNote2/url2_5.jpg" }, { url: "/images/details/xiaomiNote2/url2_6.jpg" }],
        urls3: [{ url: "/images/details/xiaomiNote2/3_1.png" }],
        slideurl: [{ url: "/images/details/xiaomiNote2/slide1.webp" }, { url: "/images/details/xiaomiNote2/slide2.webp" }, { url: "/images/details/xiaomiNote2/slide3.webp" }]
    }, {
        name: "AMAZFIT手表",
        category: "smart",
        //search页图标，shopcart页图标
        spic: "/images/details/yundongshoubiao/spic.webp",
        //category页图标
        cpic: "/images/details/yundongshoubiao/cpic.png",
        price: 799,
        activity: "【7.19-7.21日享小米分期6期免息】",
        brief: "蓝牙听歌 / 索尼28纳米GPS / 陶瓷表圈 / 运动心率 / 智能通知提醒 / 支付宝快捷支付 / 5天续航",
        type: [{ name: "Amazfit运动手表", ram: "1GB", rom: "4GB", color: "红色", pic: "/images/details/yundongshoubiao/red.webp", price: "799", stock: "3" },
            { name: "Amazfit运动手表", ram: "1GB", rom: "4GB", color: "黑色", pic: "/images/details/yundongshoubiao/black.webp", price: "799", stock: "3" }
        ],
        urls1: [{ url: "/images/details/yundongshoubiao/url1_1.jpg" }, { url: "/images/details/yundongshoubiao/url1_2.jpg" }, { url: "/images/details/yundongshoubiao/url1_3.jpg" }, { url: "/images/details/yundongshoubiao/url1_4.jpg" }, { url: "/images/details/yundongshoubiao/url1_5.jpg" }, { url: "/images/details/yundongshoubiao/url1_6.jpg" }, { url: "/images/details/yundongshoubiao/url1_7.jpg" }, { url: "/images/details/yundongshoubiao/url1_8.jpg" }],
        urls2: [{ url: "/images/details/yundongshoubiao/url2_1.jpg" }, { url: "/images/details/yundongshoubiao/url2_2.jpg" }, { url: "/images/details/yundongshoubiao/url2_3.jpg" }],
        slideurl: [{ url: "/images/details/yundongshoubiao/slide1.webp" }, { url: "/images/details/yundongshoubiao/slide2.webp" }]
    }

]

for (var index = 0; index < details.length; index++) {
    var element = details[index];
    db.addDetail(element, function(doc) {
        console.log(doc + ":" + element.name);
    })
}

db.addUser(user, function(doc) { console.log(doc) });