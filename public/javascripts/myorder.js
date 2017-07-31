var itemsMoney = 0;
var itemNum = 0;
var itemAddr = "";
var payMethod = "";
var itemBuyer = "";
var itemPhone = "";
var itemsName = new Array();
var itemsPic = new Array();
var jid = "";

function showDetail(divIdNum) {
    if ($("#zk_orderhide" + divIdNum).hasClass("zk_hide")) {
        $("#zk_orderhide" + divIdNum).removeClass("zk_hide");
        $("#zk_orderhide" + divIdNum).slideDown();
    } else {
        $("#zk_orderhide" + divIdNum).addClass("zk_hide");
        $("#zk_orderhide" + divIdNum).slideUp();
    }
}

function changeState(i) {

    console.log("进来了")
    $.ajax({
        type: "post",
        url: "/myorder/changestate",
        data: { count: i },
        async: true,
        success: function(item) {
            window.location.href = "/myorder/all";
        }
    });
}
initialize = function(id, state) {
    jid = id;
    $.ajax({
        type: "get",
        url: "/order",
        async: true,
        success: function(item) {
            var j = 0;
            console.log(state);
            if (state == "send") {
                for (var i = 0; i < item.payment.length; i++) {
                    console.log(i);
                    if (item.payment[i] == null || item.payment[i] == undefined) {
                        j++;
                        continue;
                    }
                    if (item.payment[i].orderState == "运输中") {
                        console.log("进来了");
                        var str = "<div class='col-xs-9 zk_orderId'>" +
                            "<div class='col-xs-4'>订单编号</div>" +
                            "<div class='col-xs-5'>" + item.payment[i].orderId + "</div>" +
                            "</div>" +
                            "<div class='col-xs-3 zk_orderState' id='zk_state" + j + "'>" + item.payment[i].orderState + "</div>" +
                            "<div class='zk_Space col-xs-12'></div>";

                        if (item.payment[i].orderItemsPic == null || item.payment[i].orderItemsPic == undefined) {
                            j++;
                            continue;
                        }
                        console.log(i + "订单中有" + item.payment[i].orderItemsPic.length + "个图片");
                        for (var k = 0; k < item.payment[i].orderItemsPic.length; k++) {
                            str += "<div class='zk_orderItem col-xs-12'>" +
                                "<div class='col-xs-3'><img src='" + item.payment[i].orderItemsPic[k].url + "'></div>" +
                                "<div class='col-xs-9'>" + item.payment[i].orderItemsName[k].name + "</div>" +
                                "</div>";
                        }
                        str += "<div class='col-xs-12 zk_orderDetail zk_hide' id='zk_orderhide" + j + "'>" +
                            "<div class='col-xs-4'>下单日期：</div>" +
                            "<div class='col-xs-8 zk_orderDate'>" + item.payment[i].orderDate + "</div>" +
                            "<div class='col-xs-4'>支付方式：</div>" +
                            "<div class='col-xs-8 zk_orderPayMethod'>" + item.payment[i].orderPayMethod + "</div>" +
                            "<div class='col-xs-4'>收货人：</div>" +
                            "<div class='col-xs-8 zk_orderBuyer'>" + item.payment[i].orderBuyer + "</div>" +
                            "<div class='col-xs-4'>收货日期：</div>" +
                            "<div class='col-xs-8 zk_orderRecDate'>" + item.payment[i].orderRecDate + "</div>" +
                            "<div class='col-xs-4'>收货地址：</div>" +
                            "<div class='col-xs-8 zk_orderRecAddr'>" + item.payment[i].orderRecAddr + "</div>" +
                            "<div class='col-xs-9'></div>" +
                            "</div>" +
                            "<div class='col-xs-2 col-xs-offset-9' style='color: #FF5722;text-align: center;font-size: .75rem;border: 1px solid #FF5722;margin-bottom: .5rem;border-radius: 1rem;padding: 0.1rem 0;' onclick='changeState(" + j + ")'>确认收货</div>" +
                            "<div class='zk_Space col-xs-12'></div>" +
                            "<div class='col-xs-4'></div>" +
                            "<div class='col-xs-3 zk_orderItemNum'>共" + item.payment[i].orderItemNum + "件商品</div>" +
                            "<div class='col-xs-2' style='font-size: 0.8rem;color: #999;padding-top: 0.5rem;padding-bottom: 0.5rem;'>总金额:</div>" +
                            "<div class='col-xs-3 zk_orderItemMoney'>" + item.payment[i].orderItemMoney + "元</div>" +
                            "<div class='col-xs-12 zk_turnDown'>" +
                            "<div class='col-xs-12' style='text-align: right;font-size: 0.8rem;color: #bdbdbd;' onclick='showDetail(" + j + ")'>点击查看订单详情</div>" +
                            "</div>" +
                            "<div class='col-xs-12 space'></div>";
                        $("#zk_orderPush").append(str);
                    }
                    j++;
                }
            } else if (state == "all") {
                for (var i = 0; i < item.payment.length; i++) {
                    console.log(i);
                    if (item.payment[i] == null || item.payment[i] == undefined) {
                        j++;
                        continue;
                    }
                    console.log("进来了");
                    var str = "<div class='col-xs-9 zk_orderId'>" +
                        "<div class='col-xs-4'>订单编号</div>" +
                        "<div class='col-xs-5'>" + item.payment[i].orderId + "</div>" +
                        "</div>" +
                        "<div class='col-xs-3 zk_orderState'  id='zk_state" + j + "'>" + item.payment[i].orderState + "</div>" +
                        "<div class='zk_Space col-xs-12'></div>";

                    if (item.payment[i].orderItemsPic == null || item.payment[i].orderItemsPic == undefined) {
                        j++;
                        continue;
                    }
                    console.log(i + "订单中有" + item.payment[i].orderItemsPic.length + "个图片");
                    for (var k = 0; k < item.payment[i].orderItemsPic.length; k++) {
                        str += "<div class='zk_orderItem col-xs-12'>" +
                            "<div class='col-xs-3'><img src='" + item.payment[i].orderItemsPic[k].url + "'></div>" +
                            "<div class='col-xs-9'>" + item.payment[i].orderItemsName[k].name + "</div>" +
                            "</div>";
                    }
                    if(item.payment[i].orderState!="待付款")
                        str += "<div class='col-xs-12 zk_orderDetail zk_hide' id='zk_orderhide" + j + "'>" +
                        "<div class='col-xs-4'>下单日期：</div>" +
                        "<div class='col-xs-8 zk_orderDate'>" + item.payment[i].orderDate + "</div>" +
                        "<div class='col-xs-4'>支付方式：</div>" +
                        "<div class='col-xs-8 zk_orderPayMethod'>" + item.payment[i].orderPayMethod + "</div>" +
                        "<div class='col-xs-4'>收货人：</div>" +
                        "<div class='col-xs-8 zk_orderBuyer'>" + item.payment[i].orderBuyer + "</div>" +
                        "<div class='col-xs-4'>收货地址：</div>" +
                        "<div class='col-xs-8 zk_orderRecAddr'>" + item.payment[i].orderRecAddr + "</div>" +
                        "<div class='col-xs-9'></div>" +
                        "</div>";
                    if (item.payment[i].orderState == "运输中")
                        str += "<div class='col-xs-2 col-xs-offset-9' style='color: #FF5722;text-align: center;font-size: .75rem;border: 1px solid #FF5722;margin-bottom: .5rem;border-radius: 1rem;padding: 0.1rem 0;' onclick='changeState(" + j + ")'>确认收货</div>";
                    str += "<div class='zk_Space col-xs-12'></div>" +
                        "<div class='col-xs-4'></div>" +
                        "<div class='col-xs-3 zk_orderItemNum'>共" + item.payment[i].orderItemNum + "件商品</div>" +
                        "<div class='col-xs-2' style='font-size: 0.8rem;color: #999;padding-top: 0.5rem;padding-bottom: 0.5rem;'>总金额:</div>" +
                        "<div class='col-xs-3 zk_orderItemMoney'>" + item.payment[i].orderItemMoney + "元</div>" +
                        "<div class='col-xs-12 zk_turnDown'>" +
                        "<div class='col-xs-12' style='text-align: right;font-size: 0.8rem;color: #bdbdbd;' onclick='showDetail(" + j + ")'>点击查看订单详情</div>" +
                        "</div>" +
                        "<div class='col-xs-12 space'></div>";
                    $("#zk_orderPush").append(str);
                    j++;
                }
            } else if (state == "done") {
                for (var i = 0; i < item.payment.length; i++) {
                    console.log(i);
                    if (item.payment[i] == null || item.payment[i] == undefined) {
                        j++;
                        continue;
                    }
                    if (item.payment[i].orderState == "已完成") {
                        console.log("进来了");
                        var str = "<div class='col-xs-9 zk_orderId'>" +
                            "<div class='col-xs-4'>订单编号</div>" +
                            "<div class='col-xs-5'>" + item.payment[i].orderId + "</div>" +
                            "</div>" +
                            "<div class='col-xs-3 zk_orderState'  id='zk_state" + j + "'>" + item.payment[i].orderState + "</div>" +
                            "<div class='zk_Space col-xs-12'></div>";

                        if (item.payment[i].orderItemsPic == null || item.payment[i].orderItemsPic == undefined) {
                            j++;
                            continue;
                        }
                        console.log(i + "订单中有" + item.payment[i].orderItemsPic.length + "个图片");
                        for (var k = 0; k < item.payment[i].orderItemsPic.length; k++) {
                            str += "<div class='zk_orderItem col-xs-12'>" +
                                "<div class='col-xs-3'><img src='" + item.payment[i].orderItemsPic[k].url + "'></div>" +
                                "<div class='col-xs-9'>" + item.payment[i].orderItemsName[k].name + "</div>" +
                                "</div>";
                        }
                        str += "<div class='col-xs-12 zk_orderDetail zk_hide' id='zk_orderhide" + j + "'>" +
                            "<div class='col-xs-4'>下单日期：</div>" +
                            "<div class='col-xs-8 zk_orderDate'>" + item.payment[i].orderDate + "</div>" +
                            "<div class='col-xs-4'>支付方式：</div>" +
                            "<div class='col-xs-8 zk_orderPayMethod'>" + item.payment[i].orderPayMethod + "</div>" +
                            "<div class='col-xs-4'>收货人：</div>" +
                            "<div class='col-xs-8 zk_orderBuyer'>" + item.payment[i].orderBuyer + "</div>" +
                            "<div class='col-xs-4'>收货地址：</div>" +
                            "<div class='col-xs-8 zk_orderRecAddr'>" + item.payment[i].orderRecAddr + "</div>" +
                            "<div class='col-xs-9'></div>" +
                            "</div>" +
                            "<div class='zk_Space col-xs-12'></div>" +
                            "<div class='col-xs-4'></div>" +
                            "<div class='col-xs-3 zk_orderItemNum'>共" + item.payment[i].orderItemNum + "件商品</div>" +
                            "<div class='col-xs-2' style='font-size: 0.8rem;color: #999;padding-top: 0.5rem;padding-bottom: 0.5rem;'>总金额:</div>" +
                            "<div class='col-xs-3 zk_orderItemMoney'>" + item.payment[i].orderItemMoney + "元</div>" +
                            "<div class='col-xs-12 zk_turnDown'>" +
                            "<div class='col-xs-12' style='text-align: right;font-size: 0.8rem;color: #bdbdbd;' onclick='showDetail(" + j + ")'>点击查看订单详情</div>" +
                            "</div>" +
                            "<div class='col-xs-12 space'></div>";
                        $("#zk_orderPush").append(str);
                    }
                    j++;
                }
            } else {
                for (var i = 0; i < item.payment.length; i++) {
                    console.log(i);
                    if (item.payment[i] == null || item.payment[i] == undefined) {
                        j++;
                        continue;
                    }
                    if (item.payment[i].orderState == "待付款") {
                        console.log("进来了");
                        var str = "<div class='col-xs-9 zk_orderId'>" +
                            "<div class='col-xs-4'>订单编号</div>" +
                            "<div class='col-xs-5'>" + item.payment[i].orderId + "</div>" +
                            "</div>" +
                            "<div class='col-xs-3 zk_orderState'  id='zk_state" + j + "'>" + item.payment[i].orderState + "</div>" +
                            "<div class='zk_Space col-xs-12'></div>";

                        if (item.payment[i].orderItemsPic == null || item.payment[i].orderItemsPic == undefined) {
                            j++;
                            continue;
                        }
                        console.log(i + "订单中有" + item.payment[i].orderItemsPic.length + "个图片");
                        for (var k = 0; k < item.payment[i].orderItemsPic.length; k++) {
                            str += "<div class='zk_orderItem col-xs-12'>" +
                                "<div class='col-xs-3'><img src='" + item.payment[i].orderItemsPic[k].url + "'></div>" +
                                "<div class='col-xs-9'>" + item.payment[i].orderItemsName[k].name + "</div>" +
                                "</div>";
                        }
                        // str += "<div class='col-xs-12 zk_orderDetail zk_hide' id='zk_orderhide" + j + "'>" +
                        //     "<div class='col-xs-4'>下单日期：</div>" +
                        //     "<div class='col-xs-8 zk_orderDate'>" + item.payment[i].orderDate + "</div>" +
                        //     "<div class='col-xs-4'>支付方式：</div>" +
                        //     "<div class='col-xs-8 zk_orderPayMethod'>" + item.payment[i].orderPayMethod + "</div>" +
                        //     "<div class='col-xs-4'>收货人：</div>" +
                        //     "<div class='col-xs-8 zk_orderBuyer'>" + item.payment[i].orderBuyer + "</div>" +
                        //     "<div class='col-xs-4'>收货日期：</div>" +
                        //     "<div class='col-xs-8 zk_orderRecDate'>" + item.payment[i].orderRecDate + "</div>" +
                        //     "<div class='col-xs-4'>收货地址：</div>" +
                        //     "<div class='col-xs-8 zk_orderRecAddr'>" + item.payment[i].orderRecAddr + "</div>" +
                        //     "<div class='col-xs-9'></div>" +
                        //     "<div class='col-xs-3' style='color:#FF5722;text-align:right;' onclick='changeState(" + j + ")'>确认收货</div>" +
                        //     "</div>" +
                        //     "<div class='zk_Space col-xs-12'></div>" +
                        //     "<div class='col-xs-4'></div>" +
                        //     "<div class='col-xs-3 zk_orderItemNum'>共" + item.payment[i].orderItemNum + "件商品</div>" +
                        //     "<div class='col-xs-2' style='font-size: 0.8rem;color: #999;padding-top: 0.5rem;padding-bottom: 0.5rem;'>总金额:</div>" +
                        //     "<div class='col-xs-3 zk_orderItemMoney'>" + item.payment[i].orderItemMoney + "元</div>" +
                        //     "<div class='col-xs-12 zk_turnDown'>" +
                        //     "<div class='col-xs-12' style='text-align: right;font-size: 0.8rem;color: #bdbdbd;' onclick='showDetail(" + j + ")'>点击查看订单详情</div>" +
                        //     "</div>" +
                        //     "<div class='col-xs-12 space'></div>";
                        $("#zk_orderPush").append(str);
                    }
                    j++;
                }
            }
        }
    });
}