function modifyAddr(j) {
    $(".zk_modName").val($("#zk_address" + j + " .zk_addrUser").text());
    $(".zk_modPhone").val($("#zk_address" + j + " .zk_addrPhone").text());
    $(".zk_modAddr").val($("#zk_address" + j + " .zk_addrSpecific").text());
}
initialize = function(id) {
    $.ajax({
        type: "get",
        url: "/order/"+id,
        async: true,
        success: function(item) {
            console.log(id);
            var j = 0;
            for(var i=0;i<item.address.length;i++)
            {
                var str = "<div class='zk_addrDetail col-xs-12' id='zk_address" + j + "'>" +
                    "<div class='col-xs-12'>" +
                    "<div class='col-xs-3 zk_addrUser'>" + item.address[i].name + "</div>" +
                    "<div class='col-xs-4 zk_addrPhone'>" + item.address[i].phone + "</div>" +
                    "<div class='col-xs-12 zk_addrSpecific'>" + item.address[i].addr + "</div>" +
                    "<div class='col-xs-12' style='background-color: rgba(0,0,0,0.1);height: 1px;padding-bottom: 0;padding-top: 0;'></div>" +
                    "<div class='col-xs-6 zk_addrModify'  data-toggle='modal' data-target='#myModal' data-whatever=" + j + " onclick='modifyAddr(" + j + ")'>修改</div>" +
                    "<div class='col-xs-6 zk_addrDelete' onclick='removeAddr(" + j + ")' >删除</div>" +
                    "</div>" +
                    "</div>";
                $(".zk_addrs").append(str);
                j++;
            }
        }
    });
}

function keepInDB(divNum) {
    //这是修改地址在数据库信息的方法
    console.log(divNum);
}
function removeAddr(divNum)
{
    //这是将对应的地址从数据库删除的方法
    console.log("remove"+divNum);
}
$(function() {
    $("#myModal").on("show.bs.modal",
        function(event) {
            console.log("come in")
            var button = $(event.relatedTarget);
            var recipient = button.data('whatever');
            $(this).find(".modal-footer").html("");
            $(this).find(".modal-footer").append("<div class='col-xs-6 zk_addrHold' onclick='keepInDB(" + parseInt(recipient) + ")'>保存</div><div class='col-xs-6 zk_addrConcel'>取消</div>");
        });
});