var jid;
phoneInfo = function(id) {
    jid=id;
    $.ajax({
        type: "get",
        url: "/json/" + jid,//此处要改为相应的id
        async: true,
        success: function(item) {
            //$.each(data.phone, function(i, item) {
                // if (item.name == "小米6") {
                    console.log(item);
                    $(".zk_mi6Name").text(item.name);
                    $(".zk_mi6brief").html("<font color='#ff4a00'>【" + item.activity + "】</font>" + item.brief);
                    $(".zk_mi6price").text(item.type[0].price);
                    $(".zk_mi6choosen>.col-xs-10").text(item.name + " " + item.type[0].name + " " + item.type[0].ram + " " + item.type[0].rom + " " + item.type[0].color + " x1");
                    $(".zk_mi6stock>.col-xs-10").text("剩余" + item.type[0].stock + "件");
                    $(".zk_mi6Store").text(item.stock); 
                    $(".zk_mi6pics").html("<img src=" + item.urls1[0].url + " />" + "<img src=" + item.urls1[1].url + " />" + "<img src=" + item.urls1[2].url + " />" + "<div class='col-xs-12 zk_mi6more' style='text-align: center;font-size:2rem;background-color:white;color:#FF5722' onclick='showMore()'>点击查看更多</div>");
                    $(".zk_mi6nameAndSpec").text(item.name + " " + item.type[0].name + " " + item.type[0].ram + " " + item.type[0].rom + " " + item.type[0].color);
                    $(".zk_mi6icon").html("<img src=" + item.type[0].pic + "  />");
                //     return false;
                // }
            //});
        }
    });
}

function changePic(num) {
    $("#top" + num).css("color", "#FF5722");
    $("#top" + num).siblings().css("color", "#333");
    $.ajax({
        type: "get",
        url: "/json/"+jid,
        async: true,
        success: function(item) {
               
            var str = "";
            switch (num) {
                case 1:
                    for (var j = 0; j < 3; j++)
                        str += "<img src=" + item.urls1[j].url + "/>";
                    break;
                case 2:
                    for (var j = 0; j < item.urls2.length; j++)
                        str += "<img src=" + item.urls2[j].url + "/>";
                    break;
                case 3:
                    for (var j = 0; j < item.urls3.length; j++)
                        str += "<img src=" + item.urls3[j].url + "/>";
                    break;
            }
            $(".zk_mi6pics").html(str);
        }
    });
}

function up() {
    $(".zk_mi6cover").css("display", "block");
    $(".zk_mi6hide").css("display", "block");
    var str = $(".zk_mi6choosen>.col-xs-10").text().split(" ");
    $(".zk_mi6standard").html("");
    $(".zk_mi6standard1").html("");
    $.ajax({
        type: "get",
        url: "/json/"+jid,
        async: true,
        success: function(item) {
            var types = new Array();
            if (item.name == str[0]) 
            {
                for(var j=0;j<item.type.length;j++)
                {
                    var typeStr = item.type[j].name + " " + item.type[j].ram + " " + item.type[j].rom;
                    var isRepeated = false;
                    for (var i = 0; i < types.length; i++) {
                        if (types[i] == typeStr) {
                            isRepeated = true;
                            break;
                        }
                    }
                    if (!isRepeated)
                        types.push(typeStr);
                }
                //按照系统的逻辑来看，规格+颜色具体地将每一部手机区别开，因此当规格选定了之后，颜色不应该出现重复的情况,这里应该还有点问题
                for(var j=0;j<item.type.length;j++)
                {
                    if (item.type[j].name == str[1] && item.type[j].ram == str[2] && item.type[j].rom == str[3]) 
                    {
                        if (item.type[j].color == str[4]) 
                        {
                            if (parseInt(item.type[j].stock) > 0)
                                $(".zk_mi6standard1").append("<div class='col-xs-3' style='text-align: center;margin-right: 1rem;border: 1px solid #f56600;color:#f56600'>" + item.type[j].color + "</div>");
                            else {
                                $(".zk_mi6standard1").append("<div class='col-xs-3' style='text-align: center;margin-right: 1rem;border: 1px dashed #f56600;color:#f56600'>" + item.type[0].color + "</div>");
                                $(".zk_commit").text("已售罄");
                                $(".zk_commit").addClass("zk_noStock");
                            }
                        } else
                            $(".zk_mi6standard1").append("<div class='col-xs-3' style='text-align: center;margin-right: 1rem;'>" + item.type[0].color + "</div>");
                    }
                }
            }
            for (var i = 0; i < types.length; i++) {
                if ((str[1] + " " + str[2] + " " + str[3]) == types[i])
                    $(".zk_mi6standard").append("<div class='col-xs-12 zk_mi6choosed' style='border: 1px solid #f56600;color:#f56600'>" + types[i] + "</div>");
                else
                    $(".zk_mi6standard").append("<div class='col-xs-12'>" + types[i] + "</div>");
            }
        }
    });
}

function down() {
    $(".zk_mi6cover").css("display", "none");
    $(".zk_mi6hide").css("display", "none");
}

function commitOrder(divCtrl) {
    if ($(divCtrl).hasClass("zk_noStock")) {
        /*$(".zk_wrongInfo").text("您所选择的颜色已售罄");*/
    } else {
        //此处应该跳转到购物车页面
    }
}

function addGoods(num) {
    if (num < 0 && parseInt($(".zk_mi6number").text()) > 0)
        $(".zk_mi6number").text(parseInt($(".zk_mi6number").text()) + num);
    else if (num > 0 && parseInt($(".zk_mi6number").text()) < parseInt($(".zk_mi6Store").text()))
        $(".zk_mi6number").text(parseInt($(".zk_mi6number").text()) + num);
}

function showMore() {
    $.ajax({
        type: "get",
        url: "/json/"+jid,
        async: true,
        success: function(item) {
            console.log("shsaodhasha");
                if (item.name == "小米6") {
                    var str = "";
                    for (var j = 0; j < item.urls1.length; j++)
                        str += "<img src=" + item.urls1[j].url + "/>";
                    $(".zk_mi6pics").html(str);
                }
        }
    });
}
$(function() {

    $(".content").scroll(
        function(event) {
            //console.log("scrollTop:" + parseInt($(".content").scrollTop()) + " html font-size:" + $("html").css("font-size"))
            if ((parseInt($(".content").scrollTop()) / parseInt($("html").css("font-size"))) >= 35) {
                $(".zk_mi6top").css({ "position": "fixed", "top": "0", "width": "100%" });
            } else {
                $(".zk_mi6top").css({ "position": "static", "top": "auto", "width": "100%" });
            }
        })
    $(".zk_mi6standard").click(
        function(e) {
            //样式变换
            var divCtrl = $(e.target);
            if (!divCtrl.hasClass("zk_mi6standard")) {
                divCtrl.css({ "color": "#f56600" });
                divCtrl.css({ "border": "1px solid #f56600" });
                divCtrl.addClass("zk_mi6choosed");
                divCtrl.siblings().css({ "color": "rgba(0,0,0,0.87)" });
                divCtrl.siblings().css({ "border": "0.01rem solid rgba(0,0,0,0.15)" });
                divCtrl.siblings().removeClass("zk_mi6choosed");
                console.log(divCtrl.attr("class"));

                var str = divCtrl.text().split(" ");
                $.ajax({
                    type: "get",
                    url: "/json/"+jid,
                    async: true,
                    success: function(item) {
                        $(".zk_mi6standard1").html("");
                        for(var i=0;i<item.type.length;i++)
                        {
                           if (item.type[i].name == str[0] && item.type[i].ram == str[1] && item.type[i].rom == str[2])
                                    $(".zk_mi6standard1").append("<div class='col-xs-3' style='text-align: center;margin-right: 1rem;'>" + item.type[i].color + "</div>");  
                        }
                    }
                });
            }
        });
    $(".zk_mi6standard1").click(
        function(e) {
            //样式变换
            var divCtrl = $(e.target);
            if (!divCtrl.hasClass("zk_mi6standard1")) {
                divCtrl.css({ "color": "#f56600" });
                divCtrl.css({ "border": "1px solid #f56600" });
                divCtrl.addClass("zk_mi6choosed1");
                divCtrl.siblings().css({ "color": "rgba(0,0,0,0.87)" });
                divCtrl.siblings().css({ "border": "0.01rem solid rgba(0,0,0,0.15)" });
                divCtrl.siblings().removeClass("zk_mi6choosed1");
                console.log(divCtrl.attr("class"));

                var str = divCtrl.text();
                var specs = $(".zk_mi6choosed").text().split(" ");
                $.ajax({
                    type: "get",
                    url: "/json/"+jid,
                    async: true,
                    success: function(item) {
                        for(var i=0;i<item.type.length;i++)
                        {
                            console.log(specs[1]);
                            if (item.type[i].name == specs[0] && item.type[i].ram == specs[1] && item.type[i].rom == specs[2] && item.type[i].color == str) 
                            {
                                $(".zk_mi6brief").html("<font color='#ff4a00'>【" + item.activity + "】</font>" + item.brief);
                                console.log(item.type[i].price+"元");
                                $(".zk_mi6price").text(item.type[i].price);
                                $(".zk_mi6choosen>.col-xs-10").text(item.name + " " + item.type[i].name + " " + item.type[i].ram + " " + item.type[i].rom + " " + item.type[i].color + " x1");
                                $(".zk_mi6stock>.col-xs-10").text("剩余" + item.type[i].stock + "件");
                                $(".zk_mi6pics").html("<img src=" + item.urls1[0].url + " />" + "<img src=" + item.urls1[1].url + " />" + "<img src=" + item.urls1[2].url + " />");
                                $(".zk_mi6nameAndSpec").text(item.name + " " + item.type[i].name + " " + item.type[i].ram + " " + item.type[i].rom + " " + item.type[i].color);
                                $(".zk_mi6icon").html("<img src=" + item.type[i].pic + "/>");
                                $(".zk_mi6Store").text(item.type[i].stock);
                                if (parseInt(item.type[i].stock) > 0) {
                                    $(".zk_commit").text("确定");
                                    $(".zk_commit").removeClass("zk_noStock");
                                    $(".zk_wrongInfo").text("请尽快购买");
                                } else {
                                    $(".zk_commit").text("已售罄");
                                    $(".zk_commit").addClass("zk_noStock");
                                    divCtrl.css({ "border": "1px dashed #f56600" });
                                    $(".zk_wrongInfo").css("color", "red");
                                    $(".zk_wrongInfo").text("已售罄");
                                }
                            }
                        }
                    }
                });
            }
        });
});