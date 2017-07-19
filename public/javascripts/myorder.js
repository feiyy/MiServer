function showDetail(divIdNum) {

    console.log("进啦");
    if ($("#zk_orderhide" + divIdNum).hasClass("zk_hide")) {
        $("#zk_orderhide" + divIdNum).removeClass("zk_hide");
        $("#zk_orderhide" + divIdNum).css("display", "block");
    } else {
        $("#zk_orderhide" + divIdNum).addClass("zk_hide");
        $("#zk_orderhide" + divIdNum).css("display", "none");
    }
}
initialize = function() {
    $.ajax({
        type: "get",
        url: "/json/myorder.json",
        async: true,
        success: function(data) {
            var j = 0;
            $.each(data.order, function(i, item) {
                var str = "<div class='col-xs-9 zk_orderId'>" +
                    "<div class='col-xs-4'>订单编号</div>" +
                    "<div class='col-xs-5'>" + item.orderId + "</div>" +
                    "</div>" +
                    "<div class='col-xs-3 zk_orderState'>" + item.orderState + "</div>" +
                    "<div class='zk_Space col-xs-12'></div>";
                for (var k = 0; k < item.orderItemsPic.length; k++) {
                    str += "<div class='zk_orderItem col-xs-12'>" +
                        "<div class='col-xs-3'><img src='" + item.orderItemsPic[k].url + "'></div>" +
                        "<div class='col-xs-9'>" + item.orderItemsName[k].name + "</div>" +
                        "</div>";
                }
                str += "<div class='col-xs-12 zk_orderDetail zk_hide' id='zk_orderhide" + j + "'>" +
                    "<div class='col-xs-4'>下单日期：</div>" +
                    "<div class='col-xs-8 zk_orderDate'>" + item.orderDate + "</div>" +
                    "<div class='col-xs-4'>支付方式：</div>" +
                    "<div class='col-xs-8 zk_orderPayMethod'>" + item.orderPayMethod + "</div>" +
                    "<div class='col-xs-4'>收货人：</div>" +
                    "<div class='col-xs-8 zk_orderBuyer'>" + item.orderBuyer + "</div>" +
                    "<div class='col-xs-4'>收货日期：</div>" +
                    "<div class='col-xs-8 zk_orderRecDate'>" + item.orderRecDate + "</div>" +
                    "<div class='col-xs-4'>收货地址：</div>" +
                    "<div class='col-xs-8 zk_orderRecAddr'>" + item.orderRecAddr + "</div>" +
                    "</div>" +
                    "<div class='zk_Space col-xs-12'></div>" +
                    "<div class='col-xs-5'></div>" +
                    "<div class='col-xs-3 zk_orderItemNum'>共" + item.orderItemNum + "件商品</div>" +
                    "<div class='col-xs-2' style='font-size: 0.8rem;color: #999;padding-top: 0.5rem;padding-bottom: 0.5rem;'>总金额:</div>" +
                    "<div class='col-xs-2 zk_orderItemMoney'>" + item.orderItemMoney + "元</div>" +
                    "<div class='col-xs-12 zk_turnDown'>" +
                    "<div class='col-xs-12' style='text-align: right;font-size: 0.8rem;color: #bdbdbd;' onclick='showDetail(" + j + ")'>点击查看订单详情</div>" +
                    "</div>" +
                    "<div class='col-xs-12 space'></div>";
                $("#zk_orderPush").append(str);
                j++;
            });
        }
    });
}
initialize();