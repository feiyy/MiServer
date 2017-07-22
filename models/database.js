var db = require('./mongo.js');

var user = {
    uname: "张三",
    pwd: "123",
    hphoto: "/images/account/userimg.png",
    sex: "男",
    address: [{ name: "张三", phone: "177****1234", addr: "辽宁省沈阳市浑南新区东北大学浑南校区" },
        { name: "李四", phone: "172****3456", addr: "广东省深圳市南山区西丽镇宝珠花园" },
        { name: "王五", phone: "176****5678", addr: "湖北省武汉市洪山区东方雅苑二期" }
    ],
    shoppingcart: [{ goodsId: "1", goodsName: "小米随身wifi", goodsPrice: "19.00", goodsCount: "2", url: "/img/lightblack.jpg" },
        { goodsId: "2", goodsName: "米兔故事机", goodsPrice: "149.00", goodsCount: "4", url: "/img/lightblack.jpg" },
        { goodsId: "3", goodsName: "小米随身wifi", goodsPrice: "19.00", goodsCount: "2", url: "/img/mi63.jpg" },
        { goodsId: "4", goodsName: "米兔故事机", goodsPrice: "149.00", goodsCount: "4", url: "/img/mi62.jpg" }
    ],
    payment: [{ orderId: "5160607962200971", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem1.jpg" }], orderItemsName: [{ name: "小米手环 2 黑色" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2016/04/23 17:46", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "1", orderItemMoney: "149" },
        { orderId: "232456786543333", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem21.jpg" }, { url: "img/orderItem22.jpg" }, { url: "img/orderItem23.jpg" }], orderItemsName: [{ name: "小米手环 石墨黑" }, { name: "红米Note 2 移动版 灰色 16GB" }, { name: "小米礼品袋 透明" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2015/09/21 14:11", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "3", orderItemMoney: "869" },
        { orderId: "232456786543333", orderState: "代付款", orderItemsPic: [{ url: "img/orderItem21.jpg" }, { url: "img/orderItem22.jpg" }, { url: "img/orderItem23.jpg" }], orderItemsName: [{ name: "小米手环 石墨黑" }, { name: "红米Note 2 移动版 灰色 16GB" }, { name: "小米礼品袋 透明" }], orderDate: "", orderPayMethod: "", orderBuyer: "", orderRecDate: "", orderRecAddr: "", orderItemNum: "3", orderItemMoney: "869" }
    ]
}

db.addUser(user, function(doc) { console.log(doc) });