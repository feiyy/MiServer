var itemsMoney = 0;
var itemNum = 0;
var itemAddr = "";
var payMethod = "";
var itemBuyer = "";
var itemPhone = "";
var itemsName = [];
var itemsPic = [];
var userpwd="";

var addrChoosen = false;
var methodChoosen = false;

function comedown(divCtrl, divName) {
    if (divCtrl.classList.contains("zk_down")) {
        // $("." + divName).css("display", "block");
        divCtrl.classList.remove("zk_down");
        divCtrl.classList.add("zk_turnUp");
        divCtrl.getElementsByTagName("img")[0].src = "/img/getUp.png";
        $("." + divName).slideDown();
    } else {
        //$("." + divName).css("display", "none");
        divCtrl.classList.remove("zk_turnUp");
        divCtrl.classList.add("zk_down");
        divCtrl.getElementsByTagName("img")[0].src = "/img/getDown.png";
        $("." + divName).slideUp();
    }
}

function chooseAddr(divName, divCtrl) {
    if ($(divCtrl).hasClass("zk_noChoose")) {
        var chDiv = $("." + divName + " .zk_choose");
        chDiv.removeClass("zk_choose");
        chDiv.addClass("zk_noChoose");
        chDiv.find("img").attr("src", "img/check_normal.png");
        divCtrl.getElementsByTagName("img")[0].src = "/img/check_press.png";
        divCtrl.classList.remove("zk_noChoose");
        divCtrl.classList.add("zk_choose");
        if (divName == "zk_payMethod") {
            payMethod = $(divCtrl).siblings(".col-xs-8").text();
            methodChoosen = true;
        } else {
            itemPhone = $(divCtrl).siblings().find(".zk_userPhone").text();
            itemBuyer = $(divCtrl).siblings().find(".zk_username").text();
            itemAddr = $(divCtrl).siblings().find(".zk_position").text();
            addrChoosen = true;
        }
    } else {
        divCtrl.getElementsByTagName("img")[0].src = "/img/check_normal.png";
        divCtrl.classList.remove("zk_choose");
        divCtrl.classList.add("zk_noChoose");
        if (divName == "zk_payMethod")
            methodChoosen = false;
        else
            addrChoosen = false;
    }
}

function initModel()
{
    console.log("模态框初始化");
    if (methodChoosen && addrChoosen)
    {
        $("#zk_payModel .modal-title").text(payMethod);
        $("#zk_payModel").modal("show");
    }
    else if(methodChoosen)
    {

        $("#zk_warnModel .modal-body").text("请选择收货地址");
        $("#zk_warnModel").modal("show");
    }
    else if(addrChoosen)
    {
        $("#zk_warnModel .modal-body").text("请选择支付方式");
        $("#zk_warnModel").modal("show");
    }
    else
    {
        $("#zk_warnModel .modal-body").text("请选择支付方式和收货地址");
        $("#zk_warnModel").modal("show");
    }
} 
function pay() {

    var date = new Date();
    var createDate = "" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    console.log("addr:" + addrChoosen + " method:" + methodChoosen);
    
    if (methodChoosen && addrChoosen) {

        console.log("都选择了");
        var data = {
            orderRecAddr: itemAddr,
            orderRecDate: "",
            orderBuyer: itemBuyer,
            orderPayMethod: payMethod,
            orderDate: createDate,
            orderState: "运输中",
            orderId: date.getTime().toString(16)
        };
        console.log(data);
        $.ajax({
            type: "post",
            url: "/payment/topay",
            data: data,
            async: true,
            success: function(item) {
                console.log(item);
                if (item == "login") {
                    window.location.href = "/users/login";
                } else {
                    window.location.href = "/myorder/all";
                }
            }
        });
    }

}
init = function(id) {
    $.ajax({
        type: "get",
        url: "/order",
        async: true,
        success: function(item) {
            userpwd=item.pwd;
            var str = "<div class='col-xs-12 zk_address'>" +
                "<div class='col-xs-10'>" +
                "<div class='col-xs-12' style='padding-bottom: 0.5rem;'>" +
                "<div class='zk_username'>" + item.address[0].name + "</div>" +
                "<div class='zk_userPhone'>" + item.address[0].phone + "</div>" +
                "</div>" +
                "<div class='col-xs-12 zk_position'>" + item.address[0].addr + "</div>" +
                "</div>" +
                "<div class='col-xs-2 zk_noChoose' onclick='chooseAddr(\"zk_address\",this)'>" +
                "<img src='img/check_normal.png' />" +
                "</div>" +
                "</div>";
            itemPhone = item.address[0].phone;
            itemName = item.address[0].name;
            itemAddr = item.address[0].addr;
            $("#zk_userAddr").append(str);
            for (var i = 1; i < item.address.length; i++) {
                str = "<div class='col-xs-12 zk_address zk_address zk_address_hide' style='display:none'>" +
                    "<div class='col-xs-10'>" +
                    "<div class='col-xs-12' style='padding-bottom: 0.5rem;'>" +
                    "<div class='zk_username'>" + item.address[i].name + "</div>" +
                    "<div class='zk_userPhone'>" + item.address[i].phone + "</div>" +
                    "</div>" +
                    "<div class='col-xs-12 zk_position'>" + item.address[i].addr + "</div>" +
                    "</div>" +
                    "<div class='col-xs-2 zk_noChoose' onclick='chooseAddr(\"zk_address\",this)'>" +
                    "<img src='img/check_normal.png' />" +
                    "</div>" +
                    "</div>";
                $("#zk_userAddr").append(str);
            }
            str = "<div class='col-xs-12 zk_turnDown'>" +
                "<div class='col-xs-8' style='text-align: right;font-size: 1rem;color: #bdbdbd;'>使用其他地址</div>" +
                "<div class='col-xs-1 zk_down' onclick='comedown(this,\"zk_address_hide\")'><img src='img/getDown.png'></div>" +
                "</div>";
            $("#zk_userAddr").append(str);
            for (var i = 0; i < item.payment.length; i++) {
                if (item.payment[i].orderState == "待付款") {
                    itemsMoney = item.payment[i].orderItemsMoney;
                    itemNum = item.payment[i].orderItemsName.length;
                    for (var k = 0; k < item.payment[i].orderItemsName.length; k++) {
                        itemsName.push(item.payment[i].orderItemsName[k].name);
                        itemsPic.push(item.payment[i].orderItemsPic[k].url);
                        str = "<div class='zk_payMethod col-xs-12'>" +
                            "<div class='col-xs-2 zk_logo'>" +
                            "<img src='" + item.payment[i].orderItemsPic[k].url + "' />" +
                            "</div>" +
                            "<div class='col-xs-8 zk_proName'>" + item.payment[i].orderItemsName[k].name + "</div>" +
                            "<div class='col-xs-2 zk_proNum' style='padding-top:0.5rem;'>x"+item.payment[i].orderItemsCount[k].goodsCount+"</div>" +
                            "</div>";
                        $("#zk_paymentPush").append(str);
                    }
                    break;
                }
            }
        }
    });
}
function clearpwd()
{
    console.log($("#zk_paypwd").val());
    $("#zk_paypwd").val("");
}
function checkpwd()
{
    console.log(userpwd);
    
    if(userpwd==$("#zk_paypwd").val())
    {
        console.log("进来了");
        pay();
    }
}