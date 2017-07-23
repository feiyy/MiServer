var itemsMoney=0;
var itemNum=0;
var itemAddr="";
var payMethod="";
var itemBuyer="";
var itemPhone="";
var itemsName=[];
var itemsPic=[];

function comedown(divCtrl, divName) {
    if (divCtrl.classList.contains("zk_down")) {
        $("." + divName).css("display", "block");
        divCtrl.classList.remove("zk_down");
        divCtrl.classList.add("zk_turnUp");
        divCtrl.getElementsByTagName("img")[0].src = "/img/getUp.png";
    } else {
        $("." + divName).css("display", "none");
        divCtrl.classList.remove("zk_turnUp");
        divCtrl.classList.add("zk_down");
        divCtrl.getElementsByTagName("img")[0].src = "/img/getDown.png";
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
		if(divName=="zk_payMethod")
			payMethod=$(divCtrl).siblings(".col-xs-8").text();
		else
		{
			itemPhone=$(divCtrl).siblings().find(".zk_userPhone").text();
			itemBuyer=$(divCtrl).siblings().find(".zk_username").text();
			itemAddr=$(divCtrl).siblings().find(".zk_position").text();
		}
    } else {
        divCtrl.getElementsByTagName("img")[0].src = "/img/check_normal.png";
        divCtrl.classList.remove("zk_choose");
        divCtrl.classList.add("zk_noChoose");
    }
}
function pay()
{
	var date=new Date();
	var createDate=""+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();

	var data={
		orderRecAddr:itemAddr,
		orderRecDate:"",
		orderBuyer:itemBuyer,
		orderPayMethod:payMethod,
		orderDate:createDate,
		orderState:"运输中",
		orderId:date.getTime().toString(16)
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
			}
<<<<<<< HEAD
			else
			{
				window.location.href="/myorder/all";
=======
			else if(item == "success")
			{
				window.location.href = "/myorder/all";
>>>>>>> 7bf45b606372d304fe2cf8da9a6d7412626a88bc
			}
        }
    });
}
init=function(id)
{
	$.ajax({
		type:"get",
		url:"/order/"+id,
		async:true,
		success:function(item)
		{
			var str="<div class='col-xs-12 zk_address'>"+
						"<div class='col-xs-10'>"+
							"<div class='col-xs-12' style='padding-bottom: 0.5rem;'>"+
								"<div class='zk_username'>"+item.address[0].name+"</div>"+
								"<div class='zk_userPhone'>"+item.address[0].phone+"</div>"+
							"</div>"+
							"<div class='col-xs-12 zk_position'>"+item.address[0].addr+"</div>"+
						"</div>"+
						"<div class='col-xs-2 zk_noChoose' onclick='chooseAddr(\"zk_address\",this)'>"+
							"<img src='img/check_normal.png' />"+
						"</div>"+
					"</div>";
			itemPhone=item.address[0].phone;
			itemName=item.address[0].name;
			itemAddr=item.address[0].addr;
			$("#zk_userAddr").append(str);
			for(var i=1;i<item.address.length;i++)
			{
				str="<div class='col-xs-12 zk_address zk_address zk_address_hide' style='display:none'>"+
						"<div class='col-xs-10'>"+
							"<div class='col-xs-12' style='padding-bottom: 0.5rem;'>"+
								"<div class='zk_username'>"+item.address[i].name+"</div>"+
								"<div class='zk_userPhone'>"+item.address[i].phone+"</div>"+
							"</div>"+
							"<div class='col-xs-12 zk_position'>"+item.address[i].addr+"</div>"+
						"</div>"+
						"<div class='col-xs-2 zk_noChoose' onclick='chooseAddr(\"zk_address\",this)'>"+
							"<img src='img/check_normal.png' />"+
						"</div>"+
					"</div>";
				$("#zk_userAddr").append(str);
			}
			str="<div class='col-xs-12 zk_turnDown'>"+
						"<div class='col-xs-8' style='text-align: right;font-size: 1rem;color: #bdbdbd;'>使用其他地址</div>"+
						"<div class='col-xs-1 zk_down' onclick='comedown(this,\"zk_address_hide\")'><img src='img/getDown.png'></div>"+
				"</div>";
			$("#zk_userAddr").append(str);
			for(var i=0;i<item.payment.length;i++)
			{
				if(item.payment[i].orderState=="待付款")
				{
					itemsMoney=item.payment[i].orderItemsMoney;
					itemNum=item.payment[i].orderItemsName.length;
					for(var k=0;k<item.payment[i].orderItemsName.length;k++)
					{
						itemsName.push(item.payment[i].orderItemsName[k].name);
						itemsPic.push(item.payment[i].orderItemsPic[k].url);
						str="<div class='zk_payMethod col-xs-12'>"+
								"<div class='col-xs-2 zk_logo'>"+
									"<img src='"+item.payment[i].orderItemsPic[k].url+"' />"+
								"</div>"+
								"<div class='col-xs-10 zk_proName'>"+item.payment[i].orderItemsName[k].name+"</div>"+
							"</div>";
						$("#zk_paymentPush").append(str);
					}
					break;
				}
			}
		}
	});
}