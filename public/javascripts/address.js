function modifyAddr(j) {
    $(".zk_modName").val($("#zk_address" + j + " .zk_addrUser").text());
    $(".zk_modPhone").val($("#zk_address" + j + " .zk_addrPhone").text());
    $(".zk_modAddr").val($("#zk_address" + j + " .zk_addrSpecific").text());
}
initialize = function() {
    $.ajax({
        type: "get",
        url: "/json/address.json",
        async: true,
        success: function(data) {
            var j = 0;
            $.each(data.address, function(i, item) {
                var str = "<div class='zk_addrDetail col-xs-12' id='zk_address" + j + "'>" +
                    "<div class='col-xs-12'>" +
                    "<div class='col-xs-3 zk_addrUser'>" + item.name + "</div>" +
                    "<div class='col-xs-4 zk_addrPhone'>" + item.phone + "</div>" +
                    "<div class='col-xs-12 zk_addrSpecific'>" + item.addr + "</div>" +
                    "<div class='col-xs-12' style='background-color: rgba(0,0,0,0.1);height: 1px;padding-bottom: 0;padding-top: 0;'></div>" +
                    "<div class='col-xs-6 zk_addrModify'  data-toggle='modal' data-target='#myModal' data-whatever=" + j + " onclick='modifyAddr(" + j + ")'>修改</div>" +
                    "<div class='col-xs-6 zk_addrDelete'>删除</div>" +
                    "</div>" +
                    "</div>";
                $(".zk_addrs").append(str);
                /*str="<div class='col-xs-6 zk_addrHold' onclick='keepInDB("+j+")'>保存</div>"+
                	"<div class='col-xs-6 zk_addrConcel'>取消</div>";
                $(".push .modal .modal-footer").append(str);*/
                j++;
            });
        }
    });
}
initialize();

function keepInDB(divNum) {
    console.log(divNum);
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